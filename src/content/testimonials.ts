export type Testimonial = {
  quote: string
  /** Trecho curto para o destaque do card */
  highlight: string
  author: string
  /** Origem e data (ex.: "Casamentos.com.br · out/2025") */
  party: string
  rating: number
}

const review = (author: string, party: string, highlight: string, quote: string, rating = 5): Testimonial => ({
  author,
  party,
  rating,
  highlight,
  quote,
})

/**
 * Avaliações reais, todas com nota 5:
 * - Perfil da Empresa no Google (conferido em 11/11/2026). O Google mostra só datas relativas ("2 meses atrás"):
 *   as de 2026 levam o ano; as mais antigas ficam como "Avaliação no Google".
 * - Perfil público no Casamentos.com.br (conferido em 05/10/2026) e depoimentos do site antigo do Lanai (2023).
 * Texto original, sem correções; trechos omitidos aparecem como (…). Nome como aparece na fonte.
 * Ordem: Google primeiro, intercalado com as demais fontes.
 */
export const testimonials: Testimonial[] = [
  review(
    'Duda Assis',
    'Google · 2026',
    'As jabuticabeiras foram o detalhe mais que especial!',
    'O meu casamento no Lanai foi perfeito!!!! Que espaço maravilhoso. Toda a estrutura foi perfeita! A cerimônia era o meu sonho e foi muito bom ver ele na realidade! As jabuticabeiras foram o detalhe mais que especial! E a recepção foi perfeita! Todos os convidados elogiaram e ficaram encantados com o espaço! Mas o detalhe que mais amamos foi o ipê amarelo que combinou direitinho com a nossa paleta! Foi perfeito! (…) recomendo o espaço de olhos fechados!',
  ),
  review(
    'Gabriela Alpino',
    'Google · 2026',
    'Foi tudo simplesmente perfeito.',
    'Meu casamento foi no LANAI e foi tudo simplesmente perfeito, desde a negociação até o fim da festa. A Carol nos atendeu no início e foi super atenciosa. A equipe é nota 1000, o espaço é MARAVILHOSO. Todos os convidados amaram e elogiaram muito. Estamos muito felizes!',
  ),
  review(
    'Anna',
    'Casamentos.com.br · out/2025',
    'Simplesmente encantador.',
    'O Lanai Eventos é simplesmente encantador: um espaço que já é lindo por si só e tornou o nosso casamento ainda mais especial!',
  ),
  review(
    'Rafael Tavares',
    'Avaliação no Google',
    'Faria tudo de novo do mesmo jeito.',
    'Nosso casamento no Lanai foi perfeito! A estrutura do espaço é impecável, tudo muito bem cuidado, organizado e pensado para que o grande dia seja realmente especial. Todos os nossos convidados elogiaram. Um destaque: Desde o primeiro atendimento, fomos muito bem recebidos pela Carol, que foi sempre atenciosa, prestativa e tirou todas as nossas dúvidas com muita paciência. O carinho e o profissionalismo dela fizeram toda a diferença. Somos só gratidão por essa experiência incrível! Faria tudo de novo do mesmo jeito.',
  ),
  review(
    'Jamila Piovezana',
    'Avaliação no Google',
    'O Lanai foi amor à primeira vista.',
    'Eu e Pablo estamos aqui revivendo o nosso sonho que teve o cenário mais lindo do mundo! O Lanai foi amor à primeira vista (…) Foi lindo demais (…) Ver a chuva esperar a cerimônia foi lindo, mas ver as pessoas chegando e se encantando pelo lugar de vocês, foi lindo!',
  ),
  review(
    'Thayanne',
    'Casamentos.com.br · jul/2025',
    'Tenho ciúme do Lanai, de tão perfeito.',
    'Sempre falo para todos que tenho ciúme do Lanai, de tão perfeito que o espaço é e o atendimento de toda a equipe.',
  ),
  review(
    'Tato Moraes',
    'Avaliação no Google',
    'Um dos ambientes mais encantadores de BH.',
    'Já tive a alegria de cantar em 82 casamentos no Lanai! Sem dúvida, um dos ambientes mais encantadores de BH e região – super recomendo!',
  ),
  review(
    'Nathália Alves',
    'Depoimento no site do Lanai',
    'Não poderia ter escolhido um lugar melhor.',
    'Não poderia ter escolhido um lugar melhor para o meu casamento. Até hoje recebo elogios e mais elogios. Estrutura impecável, tudo bem cuidado, funcionários atenciosos… Morro de saudades e sempre recomendo!',
  ),
  review(
    'Sabrina de Andrade',
    'Google · 2026',
    'Estrutura projetada para eventos e por isso impecável!',
    'Estrutura projetada para eventos e por isso impecável! Tudo muito lindo, organizado e perfeito para curtir um dia especial!',
  ),
  review(
    'Mabele Gontijo',
    'Avaliação no Google',
    'A alameda das jaboticabeiras é cenário de filme.',
    'Para quem quer um lugar rústico mas com uma estrutura completa e maravilhosa, Lanai é perfeito! A alameda das jaboticabeiras é cenário de filme para casamento. Muito charmoso.',
  ),
  review(
    'Sintia',
    'Casamentos.com.br · set/2023',
    'A cerimônia nas jabuticabeiras deixa tudo mais romântico.',
    'Espaço lindo! A cerimônia nas jabuticabeiras deixa tudo mais romântico! Amamos.',
  ),
  review(
    'Rodrigo Lana, fotógrafo',
    'Avaliação no Google',
    'As noivas ficam deslumbradas com as fotos.',
    'Com certeza é o espaço para casamentos de dia ou de noite mais procurado e incrível de fotografar que conheço em Belo Horizonte. As noivas ficam deslumbradas com as fotos que fazemos lá no Lanai e querem sempre casar lá.',
  ),
  review(
    'Letícia Ribeiro',
    'Google · 2026',
    'Tudo perfeito do início ao fim.',
    'Lugar maravilhoso! Tudo perfeito do início ao fim. Não dá nem para descrever!',
  ),
  review(
    'Rebeca Louise Santos de Paula',
    'Depoimento no site do Lanai',
    'Que lugar! Decoração impecável.',
    'Que lugar!!! Decoração impecável, muito bem cuidado, casa da noiva sensacional! Uma estrutura para crianças que nunca vi igual, muito espaço, estacionamento. Recomendo!!!',
  ),
  review(
    'Lincoln Adriano',
    'Avaliação no Google',
    'Não tenho como agradecer pelo carinho.',
    'Fiz meu casamento neste lugar e não tenho como agradecer pelo carinho e comprometimento que tiveram com a gente. Excelente lugar',
  ),
  review(
    'Mariana',
    'Casamentos.com.br · nov/2023',
    'Lindo por natureza.',
    'O Lanai é lindo por natureza, fica ainda mais belo com o cuidado e dedicação da equipe!!',
  ),
  review(
    'Fernanda Lima',
    'Avaliação no Google',
    'Romântico, perfeito para casamento fim de tarde.',
    'Ambiente lindo, romântico, perfeito para casamento fim de tarde.',
  ),
  review(
    'Matheus Conrado Costa',
    'Avaliação no Google',
    'Ótima estrutura para os noivos.',
    'Um espaço para casamentos e festas excelente! Com ótima estrutura para os noivos, ambiente agradável para realizar a cerimônia, salão de festa climatizado e amplo. A estrutura de cozinha é muito bem montada.',
  ),
  review(
    'Erivan',
    'Casamentos.com.br · out/2025',
    'Casar nesse espaço foi especial demais.',
    'Já se passaram três anos do dia 15/09/2022 e que saudade eu sinto daquele dia, casar nesse espaço foi especial demais!',
  ),
  review(
    'Michele',
    'Casamentos.com.br · out/2023',
    'Lindíssimo para a cerimônia.',
    'Amamos o lugar, pois ele é lindíssimo para realizar a cerimônia e tem um salão ótimo também.',
  ),
  review(
    'Evellyn',
    'Casamentos.com.br · dez/2023',
    'A equipe sempre presente do início ao fim.',
    'Lugar lindo, limpo, muito bem cuidado, a equipe do espaço sempre presente do início ao fim do evento.',
  ),
  review(
    'Marinara',
    'Casamentos.com.br · set/2023',
    'Tratamento impecável da equipe.',
    'Lugar maravilhoso, com espaço para o noivo e noiva. Tratamento impecável da equipe, amamos!',
  ),
]
