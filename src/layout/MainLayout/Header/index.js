import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import ProfileSection from './ProfileSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 250,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >

                <Box component="span" sx={{ display: { md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <Box component="span" sx={{ display: { md: 'block' }, flexGrow: 1, alignContent: 'center' }}>
                    <Typography variant='h3' fontWeight={600} color={'whitesmoke'} fontSize={15}>Pádel In</Typography>
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', paddingLeft: '10px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: '#373DCF',
                            color: 'whitesmoke',
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClickCapture={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Box component="span" sx={{ display: {  md: 'block' }, flexGrow: 1, alignContent: 'center' }}>
                <Typography variant='h3' fontSize={15} fontWeight={600} color={'whitesmoke'} paddingLeft={2}>{localStorage.getItem('instName')}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }} >
                {/* profile section */}
                <ProfileSection />
            </Box>
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
