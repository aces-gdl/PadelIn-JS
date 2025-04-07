import React from 'react';
import { 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Box, 
  Container,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Campaign, HowToReg, EmojiEvents, Category, Leaderboard } from '@mui/icons-material';

const FeatureCard = ({ title, description, icon, linkTo }) => (
  <Card elevation={3}>
    <CardContent>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h5" component="div" mt={2}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={RouterLink} to={linkTo}>
        Más Información
      </Button>
    </CardActions>
  </Card>
);

const LandingPage = () => {
  return (
    <MainCard title="Bienvenido a Padel In - Casa del jugador de padel" >
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sistema Integral de Gestión de Eventos Deportivos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Optimiza la organización, promoción y administración de tus eventos deportivos con nuestra plataforma completa.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Promoción de Eventos"
              description="Herramientas para promocionar y difundir tus eventos deportivos de manera efectiva."
              icon={<Campaign fontSize="large" color="primary" />}
              linkTo="/promocion"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Inscripciones"
              description="Gestiona fácilmente las inscripciones de participantes para tus eventos y torneos."
              icon={<HowToReg fontSize="large" color="secondary" />}
              linkTo="/inscripciones"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Seguimiento de Torneos"
              description="Administra y da seguimiento a tus torneos en tiempo real."
              icon={<EmojiEvents fontSize="large" color="action" />}
              linkTo="/torneos"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Eventos Multicategoría"
              description="Organiza y gestiona eventos con múltiples categorías y divisiones."
              icon={<Category fontSize="large" color="error" />}
              linkTo="/multicategoria"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              title="Manejo de Rankings"
              description="Sistema de clasificación y rankings para jugadores y equipos."
              icon={<Leaderboard fontSize="large" color="success" />}
              linkTo="/rankings"
            />
          </Grid>
        </Grid>

        <Box mt={6}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Potencia tus Eventos Deportivos
            </Typography>
            <Typography variant="body1" paragraph>
              Desde la promoción hasta el manejo de rankings, nuestra plataforma te ofrece todas las herramientas necesarias para gestionar eventos deportivos de cualquier escala y complejidad.
            </Typography>
            <Button variant="contained" color="primary" component={RouterLink} to="/demo">
              Solicitar una Demostración
            </Button>
          </Paper>
        </Box>
      </Container>
    </MainCard>
  );
};

export default LandingPage;