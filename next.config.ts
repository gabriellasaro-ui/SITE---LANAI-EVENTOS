import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Servidor enxuto para a imagem Docker (.next/standalone)
  output: 'standalone',
  // Permite abrir o servidor de desenvolvimento pelo IP da rede/VPN (senão o Next bloqueia o JS em dev)
  allowedDevOrigins: ['26.250.234.10', '*.local'],
  images: {
    // Só WebP: o AVIF demora segundos para codificar cada tamanho na 1ª visita e as fotos "demoravam a aparecer"
    formats: ['image/webp'],
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  // TODO: redirecionar URLs do site antigo da Lanai que deixarem de existir
  async redirects() {
    return []
  },
}

export default nextConfig
