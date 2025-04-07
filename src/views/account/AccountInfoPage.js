import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Grid,
    Paper,
    Box,
    Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import ChangePasswordModal from 'components/ChangePasswordModal';
import axios from 'axios';

const AccountInfoPage = () => {
    const [institution, setInstitution] = useState({});
    const [user, setUser] = useState({});
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                let user = JSON.parse(localStorage.getItem('user'));
                let response = await axios.get(`/v1/institution/${user.IdInstitution}`);
                setInstitution(response.data.data);
                setUser(user);

            } catch (error) {
                console.log('Error al cargar institución')
            }
        }

        loadData();
    }, [])

    return (
        <MainCard title="Información de la Cuenta" minHeight={'300px'}>
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Datos de la Cuenta y la Institución
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" paragraph>
                        Revisa y gestiona la información de tu cuenta y la institución asociada.
                    </Typography>
                </Box>

                <Paper elevation={3} style={{ padding: '2rem' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom>
                                Información de la Institución
                            </Typography>
                            <Typography variant="body1">
                                <strong>Nombre:</strong> {institution?.Name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Dirección:</strong> {institution?.Description}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Teléfono:</strong> 33 3238-8808
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> juan.perez@ejemplo.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom>
                                Información del Usuario
                            </Typography>
                            <Typography variant="body1">
                                <strong>Nombre:</strong> {user?.Name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {user?.Email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Rol:</strong> {user?.Type}
                            </Typography>

                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Button disabled variant="contained" color="primary" component={RouterLink} to="/edit-account">
                            Editar Información
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setIsChangePasswordModalOpen(true)}
                            style={{ marginLeft: '1rem' }}
                        >
                            Cambiar Contraseña
                        </Button>
                    </Box>
                </Paper>

                <Box mt={4}>
                    <Paper elevation={3} style={{ padding: '2rem' }}>
                        <Typography variant="h6" gutterBottom>
                            Resumen de Actividad
                        </Typography>
                        <Typography variant="body1">
                            <strong>Eventos creados:</strong> 15
                        </Typography>
                        <Typography variant="body1">
                            <strong>Torneos activos:</strong> 3
                        </Typography>
                        <Typography variant="body1">
                            <strong>Participantes registrados:</strong> 150
                        </Typography>
                        <Box mt={2}>
                            <Button variant="outlined" color="primary" component={RouterLink} to="/dashboard">
                                Ver Dashboard Completo
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
            <ChangePasswordModal
                open={isChangePasswordModalOpen}
                handleClose={() => setIsChangePasswordModalOpen(false)}
            />
        </MainCard>
    );
};

export default AccountInfoPage;