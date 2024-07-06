import { AppBar, Toolbar, Typography, IconButton, Box, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
const HeaderCheckout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/buycoin');
    }
    return (
        <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
            <Toolbar>
                <Link style={{ color: "white" }}>
                    <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Gia Sư Học Tập
                </Typography>
                <Box sx={{ display: 'flex', gap: '15px' }}>
                    <Link href="/" color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 0.5 }} /> Home
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderCheckout;
