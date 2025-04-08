import { ImageCard } from './ImageCard'
import schema from '../schema/image-schema.json'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export function ImageGrid() {
  const images = useSelector((state: RootState) => state.images.images)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${schema.columns || 3}, 1fr)`,
        gap: '16px',
      }}
    >
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          actions={schema.imageActions.map((action) =>
            action.name.toLowerCase()
          )}
        />
      ))}
    </div>
  )
}
