import { useMutation } from '@apollo/client'
import { LIKE_IMAGE, DELETE_IMAGE, FEATURE_IMAGE } from '../graphql/mutations'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Box,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ShareIcon from '@mui/icons-material/Share'
import { useState } from 'react'

interface Image {
  id: string
  src: string
  alt: string
  likes: number
  isFeatured: boolean
}

interface ImageCardProps {
  image: Image
  actions: string[]
  onDelete: (id: string) => void
}

export function ImageCard({ image, actions, onDelete }: ImageCardProps) {
  const [likeImage] = useMutation(LIKE_IMAGE)
  const [deleteImage] = useMutation(DELETE_IMAGE)
  const [featureImage] = useMutation(FEATURE_IMAGE)
  const [isLiked, setIsLiked] = useState(image.likes > 0)
  const [isFeatured, setIsFeatured] = useState(image.isFeatured)
  const [likes, setLikes] = useState(image.likes)

  const handleLike = async () => {
    try {
      const { data } = await likeImage({ variables: { id: image.id } })
      if (data && data.likeImage) {
        setIsLiked(true)
        setLikes(data.likeImage.likes)
      }
    } catch (error) {
      console.error('Error liking the image:', error)
    }
  }

  const handleDelete = async () => {
    await deleteImage({ variables: { id: image.id } })
    onDelete(image.id)
  }

  const handleFeature = () => {
    setIsFeatured(!isFeatured)
    featureImage({ variables: { id: image.id } })
  }

  return (
    <Card
      style={{
        maxWidth: 345,
        margin: 'auto',
        position: 'relative',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {isFeatured && (
        <Chip
          label="Featured"
          color="primary"
          size="small"
          style={{ position: 'absolute', top: 8, right: 8 }}
        />
      )}
      <CardMedia
        component="img"
        height="200"
        image={image.src}
        alt={image.alt}
        style={{ borderRadius: '4px 4px 0 0' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center">
          {image.alt}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Likes: {likes}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-around" padding={1}>
        {actions.includes('like') && (
          <IconButton onClick={handleLike} color="error">
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        )}
        {actions.includes('delete') && (
          <IconButton onClick={handleDelete} color="primary">
            <DeleteIcon />
          </IconButton>
        )}
        {actions.includes('feature') && (
          <IconButton onClick={handleFeature} color="warning">
            {isFeatured ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )}
        {actions.includes('share') && (
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Image link copied to clipboard!')
            }}
            color="info"
          >
            <ShareIcon />
          </IconButton>
        )}
      </Box>
    </Card>
  )
}
