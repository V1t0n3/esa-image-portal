import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageGrid } from '../components/ImageGrid'
import { MockedProvider } from '@apollo/client/testing'

const mockImages = [
  {
    id: '1',
    src: '/images/sample1.JPEG',
    alt: 'Sample 1',
    likes: 0,
    isFeatured: false,
  },
  {
    id: '2',
    src: '/images/sample2.JPEG',
    alt: 'Sample 2',
    likes: 0,
    isFeatured: false,
  },
]

describe('ImageGrid Component', () => {
  it('renders a grid of images', () => {
    render(
      <MockedProvider>
        <ImageGrid images={mockImages} />
      </MockedProvider>
    )

    expect(screen.getByAltText('Sample 1')).toBeInTheDocument()
    expect(screen.getByAltText('Sample 2')).toBeInTheDocument()
  })
})
