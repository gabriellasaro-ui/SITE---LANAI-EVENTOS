import type { IconName } from '@/components/ui/Icon'
import { photos, type Photo } from './photos'

/** Faixa de destaques logo abaixo do topo (fatos do perfil público e do site antigo). */
export const highlights: { label: string; icon: IconName }[] = [
  { label: 'Cerimônia sob as jabuticabeiras', icon: 'leaf' },
  { label: '50 a 300 convidados', icon: 'users' },
  { label: 'Um único evento por dia', icon: 'calendar' },
  { label: 'Spa da Noiva e Pup Noivo', icon: 'gem' },
  { label: 'Brinquedoteca e playground', icon: 'baby' },
  { label: 'Estacionamento', icon: 'parking' },
  { label: 'Na Pampulha', icon: 'mapPin' },
]

/** Comodidades (perfil público + site antigo). Alimentam o JSON-LD e o llms.txt. */
export const amenities = [
  'Alameda de jabuticabeiras para cerimônia',
  'Gazebo',
  'Jardins e amplas áreas verdes',
  'Salão climatizado',
  'Spa da Noiva',
  'Pup Noivo',
  'Brinquedoteca e playground',
  'Pista de dança',
  'Cozinha para uso do buffet',
  'Estacionamento',
  'Acessibilidade',
  'Um evento por dia',
]

/** "Por que o Lanai" */
export const differentials: { title: string; text: string; icon: IconName; photo: Photo }[] = [
  {
    title: 'Natureza como cenário',
    text: 'Um espaço amplo de área verde, em pleno contato com a natureza, onde a cerimônia acontece sob a alameda de jabuticabeiras.',
    icon: 'leaf',
    photo: photos.cerimoniaJardim,
  },
  {
    title: 'Um único evento por dia',
    text: 'O Lanai inteiro dedicado à sua celebração, do making of à última música da pista.',
    icon: 'calendar',
    photo: photos.salaoEnvidracado,
  },
  {
    title: 'Preparação com privacidade',
    text: 'Spa da Noiva e Pup Noivo para os anfitriões se prepararem com calma e receberem as pessoas mais próximas.',
    icon: 'gem',
    photo: photos.suiteMadrinhas,
  },
  {
    title: 'Cerimônia e festa no mesmo lugar',
    text: 'Do altar entre as árvores ao salão e à pista, sem deslocamentos: a celebração flui de um ambiente para o outro.',
    icon: 'heart',
    photo: photos.lanaiNoite,
  },
  {
    title: 'Conforto para todos os convidados',
    text: 'Salão climatizado, estacionamento, acessibilidade e brinquedoteca com playground para as crianças.',
    icon: 'shield',
    photo: photos.loungeJardim,
  },
  {
    title: 'Reconhecido pelos casais',
    text: 'Mais de 370 casais e 6 prêmios Casamentos Awards entre 2018 e 2024, segundo o Casamentos.com.br.',
    icon: 'star',
    photo: photos.entradaEntardecer,
  },
]

export type Space = { title: string; text: string; photo: Photo; icon: IconName; slug: string; detail?: Photo }

/** Ambientes, na ordem em que o dia acontece. */
export const spaces: Space[] = [
  {
    slug: 'cerimonia',
    title: 'A cerimônia sob as jabuticabeiras',
    text: 'O altar montado sob a alameda de jabuticabeiras é o cenário mais romântico do Lanai: luz natural durante o dia e um túnel de luzes quando a noite cai.',
    photo: photos.altarJabuticabeiras,
    detail: photos.floresSuspensas,
    icon: 'leaf',
  },
  {
    slug: 'jardim',
    title: 'Jardins, gazebo e pergolado',
    text: 'Caminhos de pedra, mesas à sombra das árvores e um pergolado aberto para o verde: espaços para a recepção ao ar livre e para fotos inesquecíveis.',
    photo: photos.jardimSalao,
    detail: photos.recepcaoJardim,
    icon: 'flower',
  },
  {
    slug: 'salao',
    title: 'O salão',
    text: 'Telhado colonial, lustres de cristal e amplas janelas voltadas para o jardim, em um salão climatizado e amplo para o jantar e a festa.',
    photo: photos.salaoLustres,
    detail: photos.salaoMesaPosta,
    icon: 'sparkles',
  },
  {
    slug: 'suite',
    title: 'Spa da Noiva',
    text: 'Um ambiente reservado para o making of, com espaço para a noiva, as madrinhas e quem mais fizer parte desse momento.',
    photo: photos.suiteMadrinhas,
    detail: photos.spaOfuro,
    icon: 'gem',
  },
  {
    slug: 'pub',
    title: 'Pup Noivo',
    text: 'Sinuca, sofás e o clima reservado do Pup Noivo para o noivo e os padrinhos se prepararem e aproveitarem antes da cerimônia.',
    photo: photos.pubSinuca,
    detail: photos.pubLounge,
    icon: 'martini',
  },
  {
    slug: 'kids',
    title: 'Brinquedoteca e playground',
    text: 'Um espaço pensado para as crianças, para que as famílias aproveitem a festa com tranquilidade.',
    photo: photos.brinquedoteca1,
    detail: photos.brinquedoteca2,
    icon: 'baby',
  },
  {
    slug: 'pista',
    title: 'A pista',
    text: 'Da primeira dança à última música, uma pista preparada para a festa ganhar energia ao longo da noite.',
    photo: photos.salaoPista,
    detail: photos.pistaPrimeiraDanca,
    icon: 'music',
  },
]

export const layouts: { name: string; text: string; icon: IconName }[] = []

export type Service = { tag: string; title: string; text: string; photo: Photo; icon: IconName }

/** Ocasiões em destaque na home. */
export const homeServices: { title: string; text: string; photo: Photo }[] = [
  {
    title: 'Casamentos',
    text: 'Cerimônia, recepção e festa em um só endereço, com a natureza como cenário e a equipe cuidando de cada detalhe.',
    photo: photos.beijoPetalas,
  },
  {
    title: 'Cerimônias ao ar livre',
    text: 'O altar sob as jabuticabeiras, de dia ou à noite, para um “sim” cercado de verde.',
    photo: photos.noivaTunel,
  },
  {
    title: 'Bodas e renovação de votos',
    text: 'Para celebrar de novo a mesma história, com a mesma emoção do primeiro dia.',
    photo: photos.cerimoniaPorDoSol,
  },
  {
    title: 'Celebrações especiais',
    text: 'Encontros e festas que pedem um cenário à altura, para 50 a 300 convidados.',
    photo: photos.pergoladoMesaImperial,
  },
]

/** Página Serviços. */
export const services: Service[] = [
  {
    tag: 'Casamentos',
    title: 'Casamentos completos',
    text: 'Cerimônia sob as jabuticabeiras, recepção nos jardins e festa no salão, tudo no mesmo endereço e com um único evento por dia.',
    photo: photos.jardimSalao,
    icon: 'heart',
  },
  {
    tag: 'Cerimônia',
    title: 'Cerimônias ao ar livre',
    text: 'O altar montado na alameda de jabuticabeiras ou no gazebo, com luz natural de dia e um túnel de luzes à noite.',
    photo: photos.cerimoniaJardim,
    icon: 'leaf',
  },
  {
    tag: 'Recepção',
    title: 'Recepção e festa',
    text: 'Salão climatizado, pista de dança e cozinha preparada para o buffet, para 50 a 300 convidados.',
    photo: photos.salaoPista,
    icon: 'sparkles',
  },
  {
    tag: 'Bodas',
    title: 'Bodas e renovação de votos',
    text: 'Para reviver o “sim” com quem fez parte da história, no mesmo cenário romântico.',
    photo: photos.saidaNoivos,
    icon: 'gem',
  },
  {
    tag: 'Celebrações',
    title: 'Celebrações especiais',
    text: 'Festas e encontros que pedem um espaço sofisticado, cercado de verde e com toda a estrutura.',
    photo: photos.pergoladoLounge,
    icon: 'party',
  },
  {
    tag: 'Visita',
    title: 'Visita ao espaço',
    text: 'Conheça o Lanai pessoalmente, caminhe pelos jardins e visualize cada momento do seu evento com a equipe.',
    photo: photos.recepcaoJardim,
    icon: 'calendar',
  },
]
