import { gql } from '@apollo/client'

export const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      src
      alt
      likes
      isFeatured
    }
  }
`

export const LIKE_IMAGE = gql`
  mutation LikeImage($id: ID!) {
    likeImage(id: $id) {
      id
      likes
    }
  }
`

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    deleteImage(id: $id)
  }
`

export const MARK_FEATURED = gql`
  mutation MarkFeatured($id: ID!) {
    markFeatured(id: $id) {
      id
      isFeatured
    }
  }
`
