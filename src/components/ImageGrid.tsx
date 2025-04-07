import { useState } from 'react'
import { ImageCard } from './ImageCard'
import schema from '../schema/image-schema.json'

interface Image {
  id: string
  src: string
  alt: string
  likes: number
  isFeatured: boolean
}

interface ImageGridProps {
  images: Image[]
}

export function ImageGrid({ images }: ImageGridProps) {
  const [currentImages, setCurrentImages] = useState(images)

  const handleDelete = (id: string) => {
    setCurrentImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${schema.columns || 3}, 1fr)`,
        gap: '16px',
      }}
    >
      {currentImages.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          actions={schema.imageActions.map((action) =>
            action.name.toLowerCase()
          )}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
