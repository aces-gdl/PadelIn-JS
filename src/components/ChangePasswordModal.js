import React, { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAlert } from 'react-alert';

const ChangePasswordModal = ({ open, handleClose }) => {
  const alert = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('La contraseña actual es requerida'),
    newPassword: Yup.string()
      .min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial')
      .required('La nueva contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir')
      .required('Confirma la nueva contraseña'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post('/v1/security/change-password', {
          UserId: user.IdUser,
          OldPassword: values.currentPassword,
          NewPassword: values.newPassword,
        });
        alert.success('Contraseña cambiada exitosamente');
        handleClose();
      } catch (error) {
        alert.error('Error al cambiar la contraseña: ' + (error.response?.data?.message || error.message));
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleTogglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const getPasswordAdornment = (field) => ({
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleTogglePasswordVisibility(field)}
          edge="end"
        >
          {(field === 'current' && showCurrentPassword) || 
           (field === 'new' && showNewPassword) || 
           (field === 'confirm' && showConfirmPassword) ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  });
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box my={2}>
            <TextField
              fullWidth
              id="currentPassword"
              name="currentPassword"
              label="Contraseña Actual"
              type={showCurrentPassword ? 'text' : 'password'}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
              helperText={formik.touched.currentPassword && formik.errors.currentPassword}
              InputProps={getPasswordAdornment('current')}
            />
          </Box>
          <Box my={2}>
            <TextField
              fullWidth
              id="newPassword"
              name="newPassword"
              label="Nueva Contraseña"
              type={showNewPassword ? 'text' : 'password'}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              InputProps={getPasswordAdornment('new')}
            />
          </Box>
          <Box my={2}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar Nueva Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              InputProps={getPasswordAdornment('confirm')}
            />
          </Box>
          <Typography variant="caption" color="textSecondary">
            La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
            Cambiar Contraseña
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ChangePasswordModal;