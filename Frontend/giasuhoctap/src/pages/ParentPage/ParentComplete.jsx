import SideBar from '../../components/partial/ParentManagement/SideBar/SideBar'
import NavbarHistoryP from '../../components/partial/ParentManagement/NavbarHistoryP/NavbarHistoryP'
import Complete from '../../components/partial/ParentManagement/Complete/Complete'
import { AppBar, Box, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function ParentHistory() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
    return (
        <div style={{ height: "90vh", position: "relative", top: "0" }}>
            <div style={{
                position: "fixed", top: "0", height: "100%", bottom: "0", width: "255px", left: "0",
                borderRight: "1px solid #ddd", background: 'rgba(202, 234, 243, 0.28)'
            }}>
                <SideBar />
            </div>
            <div className="fixed top-0 left-64 z-10" style={{ width: "calc(100% - 255px)", float: "right" }}>
                <AppBar position="static" sx={{ backgroundColor: '#4dccda' }}>
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
                            <Link onClick={handleClick} color="inherit" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeIcon sx={{ mr: 0.5 }} /> Home
                            </Link>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{
                overflow: "hidden", overflowAnchor: "none", float: "right", background: 'rgba(202, 234, 243, 0.28)',
                position: "relative", width: "calc(100% - 260px)", height: "100%", maxHeight: "100%", marginTop: "65px"
            }}
                className="p-4 overflow-y-auto">
                <NavbarHistoryP />
                <Complete />
            </div>
        </div>
    )
}
