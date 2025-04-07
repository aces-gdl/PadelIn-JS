import { Typography } from '@mui/material'
import SelectTournaments from 'components/SelectTournament'
import React from 'react'
import { useState } from 'react'
import MainCard from 'ui-component/cards/MainCard'

const NewInscription = () => {
    const [values, setValues] = useState({
        TournamentID: '',
       })

    const handleUpdate = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }


    return (
        <MainCard  >
     
            <SelectTournaments
                label="Torneo"
                name="TournamentID"
                value={values.TournamentID}
                handleupdate={handleUpdate}
             />

        </MainCard>
    )
}

export default NewInscription