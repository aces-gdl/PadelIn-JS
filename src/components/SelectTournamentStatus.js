/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { IconCircle } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router'

const SelectTournamentStatus = (props) => {
    const navigate = useNavigate();
    const alert = useAlert();
    const [rows, setRows] = useState([])


    return (
        <FormControl size='small' fullWidth sx={{ marginRight: 2 }}>
            <InputLabel id="TournamentStatusL">Estado</InputLabel>
            <Select
                labelId="TournamentStatusL"
                id={props.name}
                name={props.name}
                value={props.value}
                label="Estado"
                onChange={props.handleupdate}>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="announcement">Announcement</MenuItem>
                <MenuItem value="inscription">Inscription</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="finished">Finished</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectTournamentStatus