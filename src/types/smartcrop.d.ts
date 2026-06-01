declare module 'smartcrop' {
  export type CropResult = {
    topCrop?: {
      x: number
      y: number
      width: number
      height: number
    }
  }

  const smartcrop: {
    crop(
      image: HTMLImageElement,
      options: { width: number; height: number }
    ): Promise<CropResult>
  }

  export default smartcrop
}
