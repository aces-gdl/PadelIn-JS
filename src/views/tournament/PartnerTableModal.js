/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { IconCheck } from '@tabler/icons';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';

const PartnerTableModal = ({ open, handleClose }) => {
    const alert = useAlert();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadUsers();
        }
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/v1/catalogs/playersbycategory`);
            setUsers(response.data.data);
        } catch (error) {
            alert.error('Error cargando posibles compañeros: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handelPartnerSelect = (row) => {
        alert.success('Compañero seleccionado : ' + row.Name);
        handleClose();
    }


    const columns = [
        {
            name: 'Telefono',
            selector: row => row.Phone,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.Name,
            sortable: true,
        },
        {
            name: 'Categoría',
            selector: row => row.CategoryDescription,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => handelPartnerSelect(row)}
                >
                   <IconCheck />
                </IconButton>
            ),
        },
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Compañeros disponibles</DialogTitle>
            <DialogContent>
                <DataTable
                    columns={columns}
                    data={users}
                    progressPending={loading}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    highlightOnHover
                    pointerOnHover
                    responsive
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );

}

export default PartnerTableModal