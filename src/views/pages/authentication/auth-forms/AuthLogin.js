/* eslint-disable no-unused-vars */
import { useState } from 'react';
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
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik, validateYupSchema } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';


// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const theme = useTheme();

    const navigate = useNavigate();
    const alert = useAlert();

    const [values, setValues] = useState({
        phone: '',
        password: '',
        RequestURL: '',
    });

    const handleChange = (e) => {
        // setHasChanges(true);
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        try {
            let payload = {
                "Password": values.password,
                "Phone": values.phone,
                "RequestURL": window.location.href,
            };
            let response = await axios.post("/v1/security/login", payload)
            localStorage.setItem('club-jwt', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            localStorage.setItem('instName', response.data.institution.Name);
            if (localStorage.getItem('club-jwt')) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('club-jwt')}`;
            }
            alert.success('Bienvenido!');
            navigate("/");
        } catch (err) {
            alert.error(err.response?.data.error || err.message );
        }

    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Firmarse con telefono y contraseña</Typography>
                    </Box>
                </Grid>
            </Grid>


            <FormControl fullWidth >
                <InputLabel htmlFor="outlined-adornment-phone∫-login">Telefono</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="phone"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                    label="Telefono"
                />
            </FormControl>


            <FormControl
                fullWidth
                sx={{ ...theme.typography.customInput }}
            >
                <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onChange={handleChange}
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
                    label="Contraseña"
                    inputProps={{}}
                />
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>

                <Typography variant="subtitle1"
                    component={Link}
                    to="/pages/login/AssignNewPassword"
                    color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    Olvido contraseña?
                </Typography>
            </Stack>
            <Box sx={{ mt: 2 }}>
                <AnimateButton >
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleLogin()}
                    >
                        Ingresar
                    </Button>
                </AnimateButton>
            </Box>

        </>
    );
};

export default AuthLogin;
