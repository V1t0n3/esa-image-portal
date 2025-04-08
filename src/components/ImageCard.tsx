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
import { useDispatch } from 'react-redux'

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
}

export function ImageCard({ image, actions }: ImageCardProps) {
  const [likeImage] = useMutation(LIKE_IMAGE)
  const [deleteImage] = useMutation(DELETE_IMAGE)
  const [featureImage] = useMutation(FEATURE_IMAGE)
  const dispatch = useDispatch()

  const handleLike = async () => {
    likeImage({ variables: { id: image.id } })
      .then((response) => {
        if (response.data?.likeImage) {
          // Update the local state or Redux store with the new likes count
          dispatch({ type: 'images/likeImage', payload: image.id })
        }
      })
      .catch((error) => {
        console.error('Error liking image:', error)
      })
  }

  const handleDelete = async () => {
    try {
      await deleteImage({ variables: { id: image.id } })
      dispatch({ type: 'images/deleteImage', payload: image.id })
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const handleFeature = () => {
    try {
      featureImage({ variables: { id: image.id } })
      dispatch({ type: 'images/featureImage', payload: image.id })
    } catch (error) {
      console.error('Error featuring image:', error)
    }
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
      {image.isFeatured && (
        <Chip
          label="Featured"
          color="error"
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
          Likes: {image.likes}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="space-around" padding={1}>
        {actions.includes('like') && (
          <IconButton aria-label="like" onClick={handleLike} color="error">
            {image.likes > 0 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        )}

        {actions.includes('feature') && (
          <IconButton
            aria-label="feature"
            onClick={handleFeature}
            color="warning"
          >
            {image.isFeatured ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        )}
        {actions.includes('share') && (
          <IconButton
            aria-label="share"
            onClick={() => {
              navigator.clipboard.writeText(image.src)
              alert('Image link copied to clipboard!')
            }}
            color="primary"
          >
            <ShareIcon />
          </IconButton>
        )}
        {actions.includes('delete') && (
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            style={{ color: 'black' }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Card>
  )
}
