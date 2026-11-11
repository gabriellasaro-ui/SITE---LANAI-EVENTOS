import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/site'
import { routes } from '@/config/routes'
import { galleryPhotos, heroSlides, momentsPhotos, photos, type Photo } from '@/content/photos'
import { homeServices, services, spaces } from '@/content/venue'

/** Fotos de cada página, para o sitemap de imagens. */
const pageImages: Record<string, Photo[]> = {
  '/': [...heroSlides, photos.alamedaJabuticabeiras, photos.noivosPorDoSol, ...homeServices.map((s) => s.photo)],
  '/nosso-espaco': [
    photos.loungeJardim,
    photos.lanaiNoite,
    ...spaces.flatMap((s) => (s.detail ? [s.photo, s.detail] : [s.photo])),
  ],
  '/servicos': [photos.salaoEnvidracado, photos.salaoLustres, ...services.map((s) => s.photo)],
  '/galeria': galleryPhotos,
  '/clientes': [photos.entradaEntardecer, photos.altarJabuticabeiras, ...momentsPhotos],
  '/sobre': [photos.salaoLustres, photos.floresSuspensas, photos.pergoladoMesaImperial, photos.cerimoniaJardim],
  '/contato': [photos.altarJabuticabeiras],
  '/perguntas-frequentes': [photos.recepcaoJardim],
  '/trabalhe-conosco': [photos.pergoladoLounge],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => {
    const images = [...new Set((pageImages[r.path] ?? []).map((p) => absoluteUrl(p.src)))]
    return {
      url: absoluteUrl(r.path),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      ...(images.length ? { images } : {}),
    }
  })
}
