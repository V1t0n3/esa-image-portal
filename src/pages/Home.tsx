import { Container, Typography } from '@mui/material'
import { SchemaDrivenComponent } from '../components/SchemaDrivenComponent'

export function Home() {
  return (
    <Container maxWidth="lg" style={{ padding: '24px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Image Management Portal
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        Welcome to Esaote Spa's dynamic image management system
      </Typography>
      <SchemaDrivenComponent />
    </Container>
  )
}
