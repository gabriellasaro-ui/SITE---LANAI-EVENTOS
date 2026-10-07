import type { SiteConfig } from './types'

/*
 * LANAI EVENTOS. O site antigo está fora do ar: dados do perfil público no Casamentos.com.br
 * (conferidos em 05/10/2026). Tudo marcado com TODO precisa ser confirmado com o cliente.
 * Não reaproveitar fatos da Liac ou da Let's Go (endereço, telefones e avaliações são de outra empresa).
 */

/* Contatos e frases de marca confirmados no site antigo (2023) via arquivo da internet. */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lanaieventos.com.br').replace(/\/$/, '')

const addressQuery = encodeURIComponent(
  'Lanai Eventos, Av. Otacílio Negrão de Lima, 7180 - Bandeirantes, Belo Horizonte - MG',
)

/** Perfil público no Casamentos.com.br */
export const casamentosUrl = 'https://www.casamentos.com.br/salao-casamento/lanai-eventos--e162494'

export const site: SiteConfig = {
  name: 'Lanai Eventos',
  tagline: 'Espaço para casamentos e eventos na Pampulha, em BH',
  description:
    'Lanai Eventos: um espaço onde sofisticação e natureza se encontram, com alameda de jabuticabeiras, gazebo e amplas áreas verdes para casamentos e eventos de 50 a 300 convidados, na Pampulha, em BH.',
  url: siteUrl,
  locale: 'pt_BR',
  schemaType: ['EventVenue', 'LocalBusiness'],
  category: 'Espaço para casamentos e eventos',
  logo: {
    // Logo oficial: só o nome em script (os círculos verdes da ID visual são amostras de cor, não fazem parte do logo)
    src: '/images/marca/logo-lanai-eventos.png',
    // versão leve (WebP) para cabeçalho e rodapé; o PNG fica para dados estruturados
    webp: '/images/marca/logo-lanai-eventos.webp',
    width: 956,
    height: 270,
    alt: 'Logo Lanai Eventos',
  },
  logoOnDark: {
    src: '/images/marca/logo-lanai-eventos-branco.png',
    webp: '/images/marca/logo-lanai-eventos-branco.webp',
    width: 956,
    height: 270,
    alt: 'Logo Lanai Eventos',
  },
  ogImage: '/images/og/og-home.jpg',
  contact: {
    // Contatos publicados no site da Lanai (2023, arquivo da internet). TODO: confirmar se seguem ativos.
    phones: [
      { label: 'WhatsApp', display: '(31) 99471-0070', e164: '+5531994710070' },
      { label: 'Telefone', display: '(31) 3318-8020', e164: '+553133188020' },
    ],
    whatsapp: {
      label: 'WhatsApp',
      display: '(31) 99471-0070',
      e164: '+5531994710070',
      defaultMessage: 'Olá! Vim pelo site do Lanai Eventos e gostaria de saber mais sobre o espaço.',
    },
    email: 'contato@lanaieventos.com.br',
  },
  address: {
    street: 'Av. Otacílio Negrão de Lima, 7180',
    neighborhood: 'Bandeirantes',
    region: 'Pampulha',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    stateCode: 'MG',
    // TODO: confirmar o CEP nos Correios (o perfil informa 31365-450)
    postalCode: '31365-450',
    country: 'BR',
    // TODO: coordenadas do pin no Perfil da Empresa no Google
    geo: undefined,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${addressQuery}`,
    mapsEmbedUrl: `https://www.google.com/maps?q=${addressQuery}&output=embed`,
    landmark: 'na orla da Lagoa da Pampulha',
  },
  // TODO: horário de atendimento comercial
  openingHours: undefined,
  // Perfil público no Casamentos.com.br (exibido no site; NÃO vai para o schema)
  rating: { value: 4.7, count: 51, platform: 'Casamentos.com.br', url: `${casamentosUrl}/opinioes` },
  // TODO: razão social e CNPJ
  legal: {
    companyName: undefined,
    cnpj: undefined,
    privacyEmail: 'contato@lanaieventos.com.br',
    policyUpdatedAt: '2026-10-05',
  },
  areaServed: ['Belo Horizonte', 'Pampulha', 'Região Metropolitana de Belo Horizonte'],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/lanai_eventos/' },
    { label: 'Facebook', href: 'https://www.facebook.com/lanaieventos/' },
    { label: 'Casamentos.com.br', href: casamentosUrl },
  ],
  // Mesma estrutura de páginas da Liac (TODO: ajustar se a Lanai tiver wireframe próprio)
  nav: [
    { label: 'Nosso espaço', href: '/nosso-espaco' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Clientes', href: '/clientes' },
    { label: 'Sobre nós', href: '/sobre' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'FAQ', href: '/perguntas-frequentes' },
    { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    { label: 'Fale conosco', href: '/contato' },
  ],
  cta: { label: 'Solicite um orçamento', href: '/contato' },
  keywords: [
    'espaço para casamento em Belo Horizonte',
    'espaço para eventos em Belo Horizonte',
    'casamento na Pampulha',
    'salão de festas na Pampulha',
    'casamento ao ar livre BH',
    'Lanai Eventos',
  ],
}

/** Fatos de destaque (perfil público no Casamentos.com.br) */
export const facts = {
  capacity: { min: 50, max: 300 },
  couples: 370,
  eventsPerDay: 1,
  awards: '6 prêmios Casamentos Awards (2018–2024)',
}

export const fullAddress = `${site.address.street} – ${site.address.neighborhood} (${site.address.region}), ${site.address.city} – ${site.address.stateCode}, ${site.address.postalCode}`

/** Abre o Google Maps já com a rota até o endereço. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`

export function whatsappUrl(message: string = site.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${site.contact.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(message)}`
}

/** WhatsApp ainda não informado: esconde botões e links de WhatsApp. */
export const hasWhatsapp = Boolean(site.contact.whatsapp.e164)

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
