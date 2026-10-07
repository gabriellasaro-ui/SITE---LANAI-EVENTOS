# Site Lanai Eventos

Espaço para casamentos e eventos na Pampulha, em Belo Horizonte (Av. Otacílio Negrão de Lima, 7180, Bandeirantes, CEP 31365-450). Terceiro site do grupo, na **mesma pegada do site da Liac Eventos** (estrutura, componentes, animações, SEO/GEO e LGPD).

**Status:** site completo (05/10/2026), com proposta mais sofisticada para público high ticket. O site antigo está fora do ar: fatos, fotos e depoimentos vieram do perfil público no Casamentos.com.br e do site antigo no Wayback Machine. Do cliente vieram só a cor e o logo (`ID VISUAL/image.png`).

Build, tipos, lint e Prettier passam. Lighthouse mobile da home: acessibilidade, boas práticas e SEO 100; desempenho 71–82 (varia entre rodadas; CLS 0).

## Rodando

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Publicar na hospedagem (Docker)

Arquivos: `Dockerfile` (build em 3 etapas, Node 22 Alpine, Next.js `standalone`, usuário sem root, healthcheck), `docker-compose.yml` e `.dockerignore`. Serve para VPS com Docker ou painéis como Coolify, EasyPanel e Portainer.

1. Envie esta pasta para o servidor (sem `node_modules` e `.next`; o `.dockerignore` já tira isso do build).
   - Esta pasta é independente: tem `package.json` e `package-lock.json` próprios.
2. Crie o `.env` a partir do exemplo e preencha: `cp .env.example .env`
   - `NEXT_PUBLIC_SITE_URL=https://lanaieventos.com.br` (sem barra no final)
   - `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (opcionais)
   - `LEAD_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL` (opcionais; vazios = formulários seguem pelo WhatsApp)
   - `HOST_PORT=3002` (porta do servidor onde o site fica exposto)
3. Suba: `docker compose up -d --build`
4. Aponte o domínio para `http://127.0.0.1:3002` com HTTPS, pelo painel da hospedagem ou por um proxy reverso. Exemplo com Caddy (gera o certificado sozinho):

   ```
   lanaieventos.com.br, www.lanaieventos.com.br {
       reverse_proxy 127.0.0.1:3002
   }
   ```

Dia a dia:

- Atualizar o site: envie os arquivos novos e rode `docker compose up -d --build` de novo.
- Logs: `docker compose logs -f` · Status: `docker compose ps` (mostra `healthy` quando o site responde).
- As variáveis `NEXT_PUBLIC_*` são gravadas **no build**: se mudar, rode com `--build`. Os webhooks são lidos ao iniciar: basta `docker compose up -d`.
- O build precisa de internet (instala os pacotes do npm e baixa as fontes do Google).
- As fotos otimizadas ficam em cache no volume `lanai-eventos_next-cache`, que sobrevive às atualizações.
- Os 3 sites do grupo podem rodar no mesmo servidor: Let's Go na porta 3000, Liac na 3001 e Lanai na 3002 (cada um com o próprio `docker compose`).

## Estrutura

```
ID VISUAL/                  material recebido do cliente (cor + logo)
referência/                 wireframe/copy aprovados, se houver
statics/image               originais: casamentos-com-br/, site-antigo/, logo-x4.png e photos-map.json
                            (chave, arquivo, medidas, categoria, legenda e alt de cada foto; gera src/content/photos.ts)
public/images/fotos         35 fotos tratadas em WebP (realce com IA misturado ao original, até 2400 px)
public/images/marca         logo horizontal e vertical (colorido e marfim), PNG + WebP leve, ícones
public/images/og            imagens de compartilhamento 1200x630
src/
  app/                      home, nosso espaço, serviços, clientes, sobre, galeria, FAQ, contato, trabalhe conosco,
                            política de privacidade, 404, sitemap, robots, manifest, llms.txt
    actions/                formulários: orçamento (lead) e trabalhe conosco (career)
  components/
    layout/                 header (larga, transparente sobre a foto), menu, topo de página, rodapé, WhatsApp, cookies
    sections/               manifesto, ambientes editoriais, faixa de palavras, momentos, números, diferenciais,
                            FAQ, galeria com filtro, avaliações, chamada final, localização
    ui/                     botão, ícones, título de seção, círculos do logo (decorativos e com fotos), foto com legenda
    motion/                 animações (entrada ao rolar, cortina nas fotos, parallax, carrossel do topo, títulos palavra por palavra)
    forms/                  orçamento e trabalhe conosco
  config/site.ts            DADOS DA MARCA (os TODO precisam de confirmação)
  content/                  fotos, espaço/serviços, FAQ, avaliações, opções dos formulários
  lib/                      SEO, JSON-LD, consentimento de cookies
```

## Identidade visual (montada a partir da cor e do logo)

- Cores: sálvia/oliva do logo (`primary`), cacau (`accent`), verde-floresta nos blocos escuros (`ink`), marfim e areia nos fundos (`paper`, `mist`).
- Fontes: Bodoni Moda (títulos, Didone de alto contraste com destaques em itálico) e Jost (texto). Trocar se o cliente tiver fontes oficiais.
- Elementos: fotos em arco, numerais romanos, grão fino nos blocos escuros, fotos que abrem como cortina ao rolar. Os dois círculos verdes da imagem da ID visual são amostras de cor, **não** fazem parte do logo nem do site.
- Logo: só o nome em script, recortado do arquivo enviado (fundo branco removido); versão marrom e versão marfim (fotos e fundos escuros). Ícones com o "L" do logo sobre verde-floresta.

## Fotos

- Originais em `statics/image`. Tratamento: marca removida no original → Real-ESRGAN x4plus no original limpo (até 1600 px na entrada) → mistura com o original em Lanczos (IA 35–72%, mais nas fotos pequenas) → nitidez, grão fino, WebP q88. Cada foto tem uma prévia borrada (`blurDataURL`) que aparece na hora.
- A marca "♡ casamentos.com.br" (sempre no centro, 168×21 px no original) foi removida desfazendo a mistura do branco na luminância e reconstruindo a cor; nas áreas lisas, por inpaint. Nos 4 pubs, a faixa de baixo com a assinatura do fotógrafo foi recortada.
- Para trocar/adicionar fotos: colocar em `public/images/fotos` e cadastrar em `src/content/photos.ts`.

## O que já veio da base (Liac)

- Header larga com logo branco sobre a foto e colorido ao rolar; menu compacto que cabe de 1280 px a telas grandes.
- Topo de página centralizado (com carrossel e zoom suave), faixa de destaques rolando, chamada final, FAQ.
- Galeria com filtro e visualização ampliada, carrossel de avaliações com "ler completa", selo de avaliação pública.
- Formulários com validação, anti-spam, LGPD e envio por webhook ou WhatsApp.
- JSON-LD (EventVenue + LocalBusiness, FAQ, breadcrumbs), sitemap, robots com crawlers de IA, llms.txt, política de privacidade e aviso de cookies.

## Regras combinadas com o cliente (valem aqui)

- Topos **centralizados** e com margem de segurança; rótulo acima do título só na home.
- **FAQ é sempre a última seção antes do rodapé.**
- Fundos com textura/padrão da marca bem visíveis, com uma **sombra** por cima para dar leitura.
- Fotos: realce com IA **misturado** ao original (nunca IA pura, que deixa rosto "de cera").
- Muita animação, grids alinhados, header com respiro.

## Dados confirmados (perfil público no Casamentos.com.br, 05/10/2026)

- Av. Otacílio Negrão de Lima, 7180 · Bandeirantes (Pampulha) · BH · CEP 31365-450
- 50 a 300 convidados · 1 evento por dia
- Alameda de jabuticabeiras, gazebo, jardins, suíte da noiva, pub do noivo, spa, área kids, pista, cozinha, estacionamento, acessibilidade
- Nota 4,7 com 51 avaliações · mais de 370 casais · 6 prêmios Casamentos Awards (2018–2024)

## Pendências com o cliente

- [ ] **Logo em vetor (SVG/PDF)** e nomes das fontes oficiais, se houver
- [ ] Confirmar se **WhatsApp (31) 99471-0070, telefone (31) 3318-8020, e-mail e Instagram** do site antigo seguem ativos
- [ ] Fotos novas e em alta (as atuais vêm de perfis públicos e foram reconstruídas)
- [ ] Faz parte do Grupo Let's Go Festas? (a Liac exibe isso no rodapé e no JSON-LD)
- [ ] Horário de atendimento, CEP pelos Correios, coordenadas do Google, razão social e CNPJ
