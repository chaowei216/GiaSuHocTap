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
import styles from "./forgotPassword.module.css"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import logoTutor from "/img/logoTutor.png"
import { useEffect, useRef, useState } from "react";
import { ForgotPasswordApi, SignIn } from "../../../api/AuthenApi";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const defaultTheme = createTheme();
export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  //const { auth, setAuth, isAuthenticated } = useAuth()
  // const navigate = useNavigate()
  // const location = useLocation()
  // const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email == null || email.trim().length == 0) {
      toast.error("Email empty");
      return;
    }
    const response = await ForgotPasswordApi(email)
    if (!response.ok) {
      toast.error("Error")
      return;
    }
    const responseJson = await response.json();
    if (responseJson.statusCode === 200) {
      toast.success(responseJson.message)
      setIsSuccess(true);
    } else {
      toast.error(responseJson.message)
    }
  };
  return (
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
            Quên mật khẩu
          </Typography>
          <Typography component="h1" variant="h6" sx={{ mt: 3 }}>
            Điền email của bạn và chúng tôi sẽ gửi mã code đến mail bạn
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isSuccess == false && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <MailOutlineIcon />
                  ),
                }}
              />
            )}
            {isSuccess == true && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon />
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="OTP"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon />
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Password"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon />
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Confirm Password"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <MailOutlineIcon />
                    ),
                  }}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
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
  );
}
