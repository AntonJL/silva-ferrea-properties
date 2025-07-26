import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import theme from '../../theme'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ChakraProvider>
  )
}

describe('Layout Component', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders the Silva Ferrea title', () => {
    renderWithProviders(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    expect(screen.getByText('Silva Ferrea')).toBeInTheDocument()
  })

  it('renders navigation menu items', () => {
    renderWithProviders(
      <Layout>
        <div>Test content</div>
      </Layout>
    )
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Properties')).toBeInTheDocument()
    expect(screen.getByText('Tenants')).toBeInTheDocument()
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByText('Maintenance')).toBeInTheDocument()
    expect(screen.getByText('Documents')).toBeInTheDocument()
  })
}) 