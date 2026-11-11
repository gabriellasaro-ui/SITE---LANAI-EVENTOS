/**
 * Planilha "Cadastro vagas": recebe as candidaturas do "Trabalhe conosco" dos 3 sites do grupo
 * e grava cada uma na aba da marca (LANAI, LIAC, LETSGO).
 *
 * Os 3 sites já enviam o mesmo POST JSON (src/app/actions/career.ts), com o campo `marca`:
 *   "Lanai Eventos" → LANAI · "Liac Eventos" → LIAC · "Let's Go Festas" → LETSGO
 * Marca desconhecida vai para a aba OUTROS, para nenhuma candidatura se perder.
 *
 * Como instalar (passo a passo completo no README do site da Lanai, seção "Trabalhe conosco → planilha"):
 *  1. Na planilha: Extensões → Apps Script. Apague o conteúdo e cole este arquivo. Salve.
 *  2. Configurações do projeto → Propriedades do script → adicione TOKEN com uma senha longa (ex.: 32 letras e números).
 *  3. Rode a função `testar` uma vez (autoriza o acesso e grava uma linha de teste em cada aba; apague depois).
 *  4. Implantar → Nova implantação → App da Web · Executar como: Eu · Quem pode acessar: Qualquer pessoa.
 *  5. No .env de cada site: CAREERS_WEBHOOK_URL=https://script.google.com/macros/s/<ID>/exec?token=<TOKEN>
 *     e reinicie o container (`docker compose up -d`; webhook não precisa de rebuild).
 *
 * Ao alterar este código depois: Implantar → Gerenciar implantações → editar → Nova versão (a URL continua a mesma).
 */

/** Aba de cada marca. A chave é o nome da marca sem acentos, apóstrofos e espaços, em minúsculas. */
const ABAS = {
  lanaieventos: 'LANAI',
  lanai: 'LANAI',
  liaceventos: 'LIAC',
  liac: 'LIAC',
  letsgofestas: 'LETSGO',
  letsgocastelo: 'LETSGO',
  letsgo: 'LETSGO',
}
const ABA_OUTROS = 'OUTROS'
const FUSO = 'America/Sao_Paulo'

const COLUNAS = [
  'Data',
  'Nome',
  'WhatsApp',
  'Link WhatsApp',
  'E-mail',
  'Bairro/cidade',
  'Área',
  'Disponibilidade',
  'Experiência',
  'Currículo (link)',
  'Consentimento LGPD',
  'Marca (site)',
  'Status',
  'Observações',
]

/** Recebe o POST dos sites. O Apps Script sempre responde 200; o resultado vai no JSON ({ ok, aba } ou { ok: false, erro }). */
function doPost(e) {
  const token = PropertiesService.getScriptProperties().getProperty('TOKEN')
  if (token && (!e || !e.parameter || e.parameter.token !== token)) return responder({ ok: false, erro: 'token' })

  let dados
  try {
    dados = JSON.parse((e && e.postData && e.postData.contents) || '{}')
  } catch (_) {
    return responder({ ok: false, erro: 'json' })
  }
  // Só candidaturas: o formulário de orçamento usa `tipo` para o tipo de evento e não deve cair aqui.
  if (dados.tipo !== 'trabalhe-conosco') return responder({ ok: false, erro: 'tipo' })
  if (!texto(dados.nome)) return responder({ ok: false, erro: 'nome' })

  const lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    const aba = abaDaMarca(dados.marca)
    const sheet = prepararAba(aba)
    sheet.appendRow(linha(dados))
    return responder({ ok: true, aba })
  } finally {
    lock.releaseLock()
  }
}

/** Abrir a URL no navegador mostra se o script está no ar (não grava nada). */
function doGet() {
  return responder({ ok: true, servico: 'cadastro-vagas', abas: ['LANAI', 'LIAC', 'LETSGO'] })
}

function abaDaMarca(marca) {
  const chave = texto(marca)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
  return ABAS[chave] || ABA_OUTROS
}

/** Cria a aba e o cabeçalho se ainda não existirem (não mexe em abas que já têm dados). */
function prepararAba(nome) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName(nome) || ss.insertSheet(nome)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUNAS)
    sheet.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold').setBackground('#e8ede4')
    sheet.setFrozenRows(1)
    sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm')
    sheet.getRange('C:C').setNumberFormat('@') // WhatsApp como texto (não vira número)
    sheet.setColumnWidths(1, COLUNAS.length, 150)
    sheet.setColumnWidth(9, 320) // Experiência
  }
  return sheet
}

function linha(d) {
  const digitos = texto(d.whatsapp).replace(/\D/g, '')
  const comDdi = digitos.length >= 12 && digitos.indexOf('55') === 0 ? digitos : '55' + digitos
  const data = d.criadoEm && !isNaN(new Date(d.criadoEm)) ? new Date(d.criadoEm) : new Date()
  return [
    data,
    seguro(d.nome),
    formatarFone(digitos),
    digitos ? 'https://wa.me/' + comDdi : '',
    seguro(d.email),
    seguro(d.cidade),
    seguro(d.area),
    seguro(d.disponibilidade),
    seguro(d.experiencia),
    seguro(d.curriculo),
    d.consentimento ? 'Sim' : 'Não',
    seguro(d.marca),
    'Novo',
    '',
  ]
}

/** (31) 99471-0070 a partir dos dígitos; se vier fora do padrão, devolve como chegou. */
function formatarFone(dig) {
  const local = dig.length > 11 && dig.indexOf('55') === 0 ? dig.slice(2) : dig
  if (local.length === 11) return '(' + local.slice(0, 2) + ') ' + local.slice(2, 7) + '-' + local.slice(7)
  if (local.length === 10) return '(' + local.slice(0, 2) + ') ' + local.slice(2, 6) + '-' + local.slice(6)
  return dig
}

function texto(v) {
  return v == null ? '' : String(v).trim()
}

/** Evita que um texto digitado no site vire fórmula na planilha (=, +, -, @). */
function seguro(v) {
  const s = texto(v).slice(0, 2000)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

/** Rode uma vez pelo editor: autoriza o script e grava uma linha de teste em cada aba (apague depois). */
function testar() {
  const token = PropertiesService.getScriptProperties().getProperty('TOKEN') || ''
  ;['Lanai Eventos', 'Liac Eventos', "Let's Go Festas"].forEach(function (marca) {
    const r = doPost({
      parameter: { token: token },
      postData: {
        contents: JSON.stringify({
          origem: 'site',
          tipo: 'trabalhe-conosco',
          marca: marca,
          nome: 'TESTE (pode apagar)',
          whatsapp: '31999999999',
          email: 'teste@exemplo.com',
          cidade: 'Pampulha',
          area: 'Outra área',
          disponibilidade: 'Fins de semana',
          experiencia: 'Linha de teste do script',
          curriculo: '',
          consentimento: 'on',
          criadoEm: new Date().toISOString(),
        }),
      },
    })
    Logger.log(marca + ' → ' + r.getContent())
  })
}
