/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const SelectTournaments = (props) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const loadComboData = async () => {
            try {
                const response = await axios.get('/v1/catalogs/tournaments?limit=-1')
                setRows(response.data.data)                    
            } catch (error) {
                console.log('Error cargando Torneos')
            }
        }
        loadComboData();
    }, [])

    return (
        <FormControl size='small' fullWidth sx={{ marginRight: 2 }}>
            <InputLabel id="TournamentL">Torneo</InputLabel>
            <Select
                labelId="TournamentL"
                id={props.name}
                name={props.name}
                value={props.value}
                label="Torneo"
                onChange={props.handleupdate}>

                <MenuItem value='' key='AllTournaments'><Typography variant={'overline'}>Todos</Typography></MenuItem>
                {rows?.map((row) => {
                    return <MenuItem value={row.ID} key={'tour'+row.ID}>
                        <Typography variant={'overline'}>{row.Description}</Typography>
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}

export default SelectTournaments