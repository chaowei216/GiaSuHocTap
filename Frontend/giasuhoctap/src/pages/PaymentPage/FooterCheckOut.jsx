import { Container, Typography, Box, Link } from '@mui/material';

const FooterCheckOut = () => {
    return (
        <Box
            sx={{
                background: '#333333',
                color: '#fff',
                padding: '24px 0',
                marginTop: '70px'
            }}
        >
            <Container>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer Content
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}
                >
                    <Link href="#" color="inherit" underline="none">
                        Home
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        About Us
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        Services
                    </Link>
                    <Link href="#" color="inherit" underline="none">
                        Contact
                    </Link>
                </Box>
                <Typography variant="body2" color="inherit" align="center" sx={{ marginTop: '10px' }}>
                    © 2024 Your Company. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default FooterCheckOut;
