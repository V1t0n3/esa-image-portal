import schema from '../schema/image-schema.json'
import { ImageGrid } from '../components/ImageGrid'

export function SchemaDrivenComponent() {
  const { images } = schema

  if (!images || images.length === 0) {
    return <p>No images available.</p>
  }

  return (
    <div>
      <ImageGrid />
    </div>
  )
}
