import { Button, Grid, Typography, Dialog, DialogContent } from '@mui/material'
import SelectCategories from 'components/SelectCategories'
import SelectTournaments from 'components/SelectTournament'
import React from 'react'
import { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'
import PartnerTableModal from './PartnerTableModal'
import StripePayment from './stripePayment'

const NewInscription = () => {
    const [values, setValues] = useState({
        TournamentID: '',
    })

    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);

    const handleUpdate = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handlePartnerModalOpen = () => {
        setIsPartnerModalOpen(true);
    }
    const handleStripeModalOpen = () => {
        if (values.TournamentID && values.CategoryID) {
            setIsStripeModalOpen(true);
        } else {
            alert('Debes seleccionar un torneo y una categoría.')
        }
    }

    const handleModalClose = () => {
        setIsPartnerModalOpen(false);
        setIsStripeModalOpen(false);
    }


    return (
        <MainCard  >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Inscripción a torneo</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                     <p>Sigue los siguientes pasos para inscribirte a un torneo:</p>
                     <ol  >
                        <li>Seleccione un torneo</li>
                        <li>Seleccione una categoría.</li>
                        <li>Realice el pago con tarjeta de crédito o débito.</li>
                        <li>Especifique el compañero para la compentencia.</li>
                     </ol>
                    </Typography>
                </Grid>
                {/* Selects */}

                <Grid item xs={1} md={0.5} sx={{display:'flex', alignItems:'center' }}>
                    1.- 
                </Grid>
                <Grid item xs={11} md={5.5}>
                    <SelectTournaments
                        label="Torneo"
                        name="TournamentID"
                        value={values.TournamentID}
                        handleupdate={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1} md={0.5} sx={{display:'flex', alignItems:'center' }}>
                    2.-
                </Grid>
                <Grid item xs={11} md={5.5}>
                                <SelectCategories
                        labe='2.- Categoría'
                        name='CategoryID'
                        value={values.CategoryID}
                        handleupdate={handleUpdate}
                    />
                </Grid>
                <Grid item xs={1} md={0.5} sx={{display:'flex', alignItems:'center' }}>
                    3.-
                </Grid>
                <Grid item xs={11} md={5.5}>
                    <Button variant="contained" color="primary" onClick={handleStripeModalOpen}>Realizar Pago</Button>
                </Grid>
                <Grid item xs={1} md={0.5} sx={{display:'flex', alignItems:'center' }}>
                    4.-
                </Grid>
                <Grid item xs={11} md={5.5}>
                    <Button variant="contained" color="primary" onClick={handlePartnerModalOpen} >Seleccionar Compañero</Button>
                </Grid>
                <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent:'space-around'}}>
                    <Button variant="contained" color="primary" onClick={handlePartnerModalOpen} >Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handlePartnerModalOpen} >Aceptar</Button>
                </Grid>
            </Grid>
            <Dialog open={isPartnerModalOpen} onClose={handleModalClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <PartnerTableModal open={isPartnerModalOpen} handleClose={handleModalClose} />
                </DialogContent>
            </Dialog>

            <Dialog open={isStripeModalOpen} onClose={handleModalClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <StripePayment open={isStripeModalOpen} handleClose={handleModalClose} tournamentid={values.TournamentID} categroryid={values.TournamentID}/>
                </DialogContent>
            </Dialog>
        </MainCard>
    )
}

export default NewInscription