import { Container, Typography, Button, Stack } from '@mui/material'
import { SchemaDrivenComponent } from '../components/SchemaDrivenComponent'
import { resetImages } from '../state/slices/imagesSlice'
import { useDispatch } from 'react-redux'
import PublicIcon from '@mui/icons-material/Public'
import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export function Home() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simula un caricamento
    dispatch(resetImages())
    setLoading(false)
  }

  return (
    <Container maxWidth="lg" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '48px', marginTop: '28px' }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
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
      </div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<PublicIcon />}
            href="https://www.esaote.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visita Esaote Spa
          </Button>
          <Button
            variant="outlined"
            style={{ color: 'red', borderColor: 'red', border: '2px solid' }}
            startIcon={<DownloadIcon />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Stack>
      </div>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 10,
            width: '100%',
            height: '100%',
          }}
        >
          <CircularProgress color="error" />
        </div>
      )}
      <SchemaDrivenComponent />
    </Container>
  )
}
