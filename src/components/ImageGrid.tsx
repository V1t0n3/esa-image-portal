import { ImageCard } from './ImageCard'
import schema from '../schema/image-schema.json'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { resetImages } from '../state/slices/imagesSlice'

export function ImageGrid() {
  const images = useSelector((state: RootState) => state.images.images)
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(resetImages())
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${schema.columns || 3}, 1fr)`,
        gap: '16px',
      }}
    >
      <button onClick={handleReset}>Reset Images</button>
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
