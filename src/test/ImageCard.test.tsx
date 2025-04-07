import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageCard } from '../components/ImageCard'
import { MockedProvider } from '@apollo/client/testing'

const mockImage = {
  id: '1',
  src: '/images/sample1.JPEG',
  alt: 'Sample 1',
  likes: 0,
  isFeatured: false,
}

describe('ImageCard Component', () => {
  it('renders correctly', () => {
    render(
      <MockedProvider>
        <ImageCard
          image={mockImage}
          actions={['like', 'delete']}
          onDelete={() => {}}
        />
      </MockedProvider>
    )

    expect(screen.getByAltText('Sample 1')).toBeInTheDocument()
    expect(screen.getByText('Likes: 0')).toBeInTheDocument()
  })
})
