export type FaqItem = { question: string; answer: string; featured?: boolean }
export type FaqGroup = { title: string; items: FaqItem[] }

/**
 * Formato "answer-first": a primeira frase responde direto (é o trecho que buscadores e IAs citam).
 * Só fatos confirmados (perfil público, site antigo e fotos do espaço); o resto orienta a falar com a equipe.
 */
export const faqGroups: FaqGroup[] = [
  {
    title: 'Estrutura',
    items: [
      {
        question: 'Qual é a capacidade do Lanai Eventos?',
        answer:
          'O Lanai Eventos recebe eventos de 50 a 300 convidados. A configuração ideal depende do formato da celebração e da montagem escolhida.',
        featured: true,
      },
      {
        question: 'É possível fazer a cerimônia e a festa no mesmo lugar?',
        answer:
          'Sim. A cerimônia acontece ao ar livre, sob a alameda de jabuticabeiras ou no gazebo, e a recepção e a festa seguem nos jardins e no salão, tudo no mesmo endereço.',
        featured: true,
      },
      {
        question: 'O Lanai realiza mais de um evento por dia?',
        answer: 'Não. O Lanai Eventos realiza um único evento por dia, com o espaço inteiro dedicado à sua celebração.',
        featured: true,
      },
      {
        question: 'Existe espaço para a noiva e o noivo se prepararem?',
        answer:
          'Sim. O Lanai tem suíte da noiva para o making of e pub do noivo, com sinuca e lounge, para os anfitriões se prepararem com privacidade.',
        featured: true,
      },
      {
        question: 'O salão é climatizado?',
        answer: 'Sim. O salão de festas do Lanai é climatizado e amplo, com amplas janelas voltadas para o jardim.',
      },
    ],
  },
  {
    title: 'Convidados',
    items: [
      {
        question: 'O espaço tem estacionamento?',
        answer: 'Sim. O Lanai Eventos conta com estacionamento para os convidados.',
      },
      {
        question: 'O espaço é acessível?',
        answer: 'Sim. O Lanai Eventos tem acessibilidade para pessoas com deficiência ou mobilidade reduzida.',
      },
      {
        question: 'Há estrutura para crianças?',
        answer:
          'Sim. O Lanai tem brinquedoteca e playground, para que as famílias aproveitem a festa com tranquilidade.',
      },
    ],
  },
  {
    title: 'Reserva e visita',
    items: [
      {
        question: 'Posso levar meu próprio buffet e fornecedores?',
        answer:
          'O espaço tem cozinha preparada para uso do buffet. As condições para fornecedores variam conforme a proposta do evento: fale com a equipe para entender as possibilidades para a sua data.',
      },
      {
        question: 'Como agendo uma visita?',
        answer:
          'Você pode solicitar uma visita pelo formulário ou pelo WhatsApp (31) 99471-0070. A equipe entra em contato para entender o seu evento e combinar o melhor horário.',
        featured: true,
      },
      {
        question: 'Com quanta antecedência devo reservar?',
        answer:
          'Quanto antes, melhor: como o Lanai realiza um único evento por dia, as datas mais procuradas costumam ser reservadas com antecedência. Consulte a disponibilidade da sua data.',
      },
    ],
  },
]

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items)
export const featuredFaqs: FaqItem[] = allFaqs.filter((f) => f.featured)
