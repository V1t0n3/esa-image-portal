import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import schema from '../../schema/image-schema.json'

interface Image {
  id: string
  src: string
  alt: string
  likes: number
  isFeatured: boolean
}

interface ImagesState {
  images: Image[]
}

const initialState: ImagesState = {
  images: schema.images.map((image) => ({
    ...image,
    likes: image.likes || 0,
    isFeatured: image.isFeatured || false,
  })),
}

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    likeImage: (state, action: PayloadAction<string>) => {
      const image = state.images.find((img) => img.id === action.payload)
      if (image) image.likes += 1
    },
    featureImage: (state, action: PayloadAction<string>) => {
      const image = state.images.find((img) => img.id === action.payload)
      if (image) image.isFeatured = !image?.isFeatured
    },
    resetImages: (state) => {
      state.images = initialState.images
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((image) => image.id !== action.payload)
    },
  },
})

export const { likeImage, resetImages, deleteImage } = imagesSlice.actions
export default imagesSlice.reducer
