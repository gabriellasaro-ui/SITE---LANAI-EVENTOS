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
 * Avaliações reais: perfil público no Casamentos.com.br (conferido em 05/10/2026) e depoimentos
 * publicados no site antigo do Lanai (2023). Texto original; nome como aparece na fonte.
 */
export const testimonials: Testimonial[] = [
  review(
    'Anna',
    'Casamentos.com.br · out/2025',
    'Simplesmente encantador.',
    'O Lanai Eventos é simplesmente encantador: um espaço que já é lindo por si só e tornou o nosso casamento ainda mais especial!',
  ),
  review(
    'Sintia',
    'Casamentos.com.br · set/2023',
    'A cerimônia nas jabuticabeiras deixa tudo mais romântico.',
    'Espaço lindo! A cerimônia nas jabuticabeiras deixa tudo mais romântico! Amamos.',
  ),
  review(
    'Nathália Alves',
    'Depoimento no site do Lanai',
    'Não poderia ter escolhido um lugar melhor.',
    'Não poderia ter escolhido um lugar melhor para o meu casamento. Até hoje recebo elogios e mais elogios. Estrutura impecável, tudo bem cuidado, funcionários atenciosos… Morro de saudades e sempre recomendo!',
  ),
  review(
    'Thayanne',
    'Casamentos.com.br · jul/2025',
    'Tenho ciúme do Lanai, de tão perfeito.',
    'Sempre falo para todos que tenho ciúme do Lanai, de tão perfeito que o espaço é e o atendimento de toda a equipe.',
  ),
  review(
    'Rebeca Louise Santos de Paula',
    'Depoimento no site do Lanai',
    'Que lugar! Decoração impecável.',
    'Que lugar!!! Decoração impecável, muito bem cuidado, casa da noiva sensacional! Uma estrutura para crianças que nunca vi igual, muito espaço, estacionamento. Recomendo!!!',
  ),
  review(
    'Mariana',
    'Casamentos.com.br · nov/2023',
    'Lindo por natureza.',
    'O Lanai é lindo por natureza, fica ainda mais belo com o cuidado e dedicação da equipe!!',
  ),
  review(
    'Matheus Conrado Costa',
    'Depoimento no site do Lanai',
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
