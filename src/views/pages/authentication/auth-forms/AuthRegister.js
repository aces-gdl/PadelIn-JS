/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useAlert } from 'react-alert';


const UserSignup = ({ ...others }) => {
    const theme = useTheme();
    const alert = useAlert();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        phone: '',
        email: '',
        password: '',
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);


    const handleCreateUser = async () => {
        let payload = {
            "Phone": values.phone,
            "Email": values.email,
            "Password": values.password,
            "Name": values.name,
            "Birthday": '1968/10/02T09:00:00-06:00',
            "RequestURL": window.location.href,
        }
        try {
            let response = await axios.post("/v1/security/signup", payload)
            navigate("/");

        } catch (error) {
            console.log('Error ')
            alert.error('Error al crear cuenta...')
        }
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>

                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Firmate con tu cuenta de correo</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        fullWidth
                        label="Nombre (s)"
                        margin="normal"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        sx={{ ...theme.typography.customInput }}
                    />
                </Grid>

            </Grid>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-register">Teléfono</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-phone-register"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    inputProps={{}}
                />

            </FormControl>
            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-register">Email ó Nombre de usuario</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    inputProps={{}}
                />

            </FormControl>

            <FormControl
                fullWidth

                sx={{ ...theme.typography.customInput }}
            >
                <InputLabel htmlFor="outlined-adornment-password-register">Clave secreta</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Clave secreta"
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{}}
                />

            </FormControl>

            {strength !== 0 && (
                <FormControl fullWidth>
                    <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    style={{ backgroundColor: level?.color }}
                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Estoy deacuerdo con los  &nbsp;
                                <Typography variant="subtitle1" component={Link} to="#">
                                    Terminos & Condiciones.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>


            <Box sx={{ mt: 2 }}>
                <AnimateButton>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateUser}
                    >
                        Registrate
                    </Button>
                </AnimateButton>
            </Box>

        </>
    );
};

export default UserSignup;
