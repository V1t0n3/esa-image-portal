import { gql } from '@apollo/client'

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
`;

export const FEATURE_IMAGE = gql`
  mutation FeatureImage($id: ID!) {
    featureImage(id: $id) {
      id
      isFeatured
    }
  }
`
