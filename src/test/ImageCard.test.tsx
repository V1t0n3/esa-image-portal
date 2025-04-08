import { render, screen, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MockedProvider } from '@apollo/client/testing'
import { ImageCard } from '../components/ImageCard'
import store from '../state/store'
import { describe, it, expect } from 'vitest'
import { LIKE_IMAGE, DELETE_IMAGE } from '../graphql/mutations'

describe('ImageCard Component', () => {
  const image = {
    id: '1',
    src: '/images/sample1.JPEG',
    alt: 'Sample Image',
    likes: 0,
    isFeatured: false,
  }

  const actions = ['like', 'delete', 'feature', 'share']

  const mocks = [
    {
      request: {
        query: LIKE_IMAGE,
        variables: { id: '1' },
      },
      result: {
        data: {
          likeImage: {
            id: '1',
            likes: 1,
          },
        },
      },
    },
    {
      request: {
        query: DELETE_IMAGE,
        variables: { id: '1' },
      },
      result: {
        data: {
          deleteImage: '1',
        },
      },
    },
  ]

  it('renders correctly', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Provider store={store}>
          <ImageCard image={image} actions={actions} />
        </Provider>
      </MockedProvider>
    )

    expect(screen.getByAltText('Sample Image')).toBeInTheDocument()
    expect(screen.getByText('Sample Image')).toBeInTheDocument()
    expect(screen.getByText('Likes: 0')).toBeInTheDocument()
  })

  it('handles LIKE button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <ImageCard image={image} actions={actions} />
        </Provider>
      </MockedProvider>
    )

    const likeButton = screen.getByRole('button', { name: /like/i })

    await act(async () => {
      fireEvent.click(likeButton)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for the mock response
    })

    const updatedState = store.getState().images
    expect(updatedState.images.find((img) => img.id === '1')?.likes).toBe(1)
  })

  it('handles DELETE button', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <ImageCard image={image} actions={actions} />
        </Provider>
      </MockedProvider>
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })

    await act(async () => {
      fireEvent.click(deleteButton)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for the mock response
    })

    const updatedState = store.getState().images
    expect(updatedState.images.find((img) => img.id === '1')).toBeUndefined()
  })

  //   it('handles FEATURE button click', async () => {
  //     render(
  //       <MockedProvider mocks={[]} addTypename={false}>
  //         <Provider store={store}>
  //           <ImageCard image={image} actions={actions} />
  //         </Provider>
  //       </MockedProvider>
  //     )

  //     const featureButton = screen.getByRole('button', { name: /feature/i })
  //     await act(async () => {
  //       fireEvent.click(featureButton)
  //       await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for the mock response
  //     })
  //     // Assert that the featured badge is displayed
  //     const updatedState = store.getState().images
  //     expect(updatedState.images.find((img) => img.id === '1')?.isFeatured).toBe(
  //       true
  //     )
  //     expect(screen.getByText('Featured')).toBeInTheDocument()
  //   })
})
