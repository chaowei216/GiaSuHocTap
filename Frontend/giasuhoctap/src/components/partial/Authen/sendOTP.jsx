import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./sendOTP.module.css"
import HttpsIcon from '@mui/icons-material/Https';
import logoTutor from "/img/passHinh.png"
import { useEffect, useRef, useState } from "react";
import { SignIn, VerifyUser } from "../../../api/AuthenApi";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CountdownTimer from "../../../utils/CountdownTimer";
import { toast } from "react-toastify";
import WaitingModal from "../../global/WaitingModal";
const defaultTheme = createTheme();
export default function SendOTP() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { sendOtp } = useAuth();
    let { email } = useParams();
    const userRef = useRef();
    const [otp, setOTP] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (otp == "" || otp == null) {
            toast.error("Vui lòng điền mã otp");
            return;
        }
        const decodedEmail = atob(email);
        setIsModalOpen(true)
        try {
            sendOtp(otp, decodedEmail)
        } catch (error) {
            console.error("OTP send failed", error);
        } finally {
            setIsModalOpen(false);
        }
    };
    useEffect(() => {
        userRef.current.focus();
    }, [])
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="sm" className={styles.layout_container}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 6,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div className={styles.logoTutor} >
                            <img src={logoTutor} />
                        </div>
                        <Typography component="h1" variant="h4">
                            Xác thực mã OTP
                        </Typography>

                        <CountdownTimer />

                        <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
                            Nhập mã OTP trong mail của bạn ở dưới đây
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                type="number"
                                ref={userRef}
                                fullWidth
                                id="otp"
                                label="Mã OTP"
                                onChange={(event) => {
                                    setOTP(event.target.value);
                                }}
                                name="otp"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <HttpsIcon />
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Gửi mã OTP
                            </Button>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <Link href="/login" variant="body2">
                                    Trở về trang đăng nhập
                                </Link>
                            </div>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <WaitingModal open={isModalOpen} setOpen={setIsModalOpen} />
        </>
    );
}
