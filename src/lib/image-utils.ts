export function getImageProps(
  src: string,
  {
    width,
    quality = 75,
    format = 'webp',
  }: {
    width: number
    quality?: number
    format?: 'webp' | 'jpeg' | 'png'
  }
) {
  // For external images (e.g., CDN)
  if (src.startsWith('http')) {
    return {
      src,
      width,
      height: width, // Assuming square images, adjust if needed
      alt: '',
      loading: 'lazy' as const,
      style: { objectFit: 'cover' as const },
    }
  }

  // For local images
  return {
    src,
    width,
    height: width,
    alt: '',
    loading: 'lazy' as const,
    style: { objectFit: 'cover' as const },
    placeholder: 'blur',
    quality,
  }
}

export function generateSrcSet(src: string, widths: number[]) {
  return widths
    .map(
      (w) =>
        `${src}?w=${w}&q=75&format=webp ${w}w`
    )
    .join(', ')
}

export function generateImageSizes(breakpoints: { [key: string]: number }) {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}px) ${size}px`)
    .join(', ')
}

// Example usage:
// const imageSizes = {
//   320: 100,   // 100% width on mobile
//   768: 50,    // 50% width on tablet
//   1024: 33,   // 33% width on desktop
// }
// const sizes = generateImageSizes(imageSizes) 