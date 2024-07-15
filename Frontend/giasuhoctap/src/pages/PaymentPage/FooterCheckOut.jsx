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
                    Gia sư học tập
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}
                >
                    <Link href="/" color="inherit" underline="none">
                        Trang chủ
                    </Link>
                </Box>
                <Typography variant="body2" color="inherit" align="center" sx={{ marginTop: '10px' }}>
                    © 2024 Gia sư học tập.
                </Typography>
            </Container>
        </Box>
    );
};

export default FooterCheckOut;
