import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SchemaDrivenComponent } from '../components/SchemaDrivenComponent'
import { MockedProvider } from '@apollo/client/testing'

describe('SchemaDrivenComponent', () => {
  it('renders correctly based on schema', () => {
    render(
      <MockedProvider>
        <SchemaDrivenComponent />
      </MockedProvider>
    )

    expect(screen.getByText('Sample 1')).toBeInTheDocument()
    expect(screen.getByText('Sample 2')).toBeInTheDocument()
  })
})
