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
import { ForgotPasswordApi, ResetPassword, SignIn } from "../../../api/AuthenApi";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const defaultTheme = createTheme();
export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSuccess == false) {
      if (email == null || email.trim().length == 0) {
        toast.error("Vui lòng nhập email");
        return;
      }
      const response = await ForgotPasswordApi(email)
      if (!response.ok) {
        toast.error("Lỗi")
        return;
      }
      const responseJson = await response.json();
      if (responseJson.statusCode === 200) {
        toast.success(responseJson.message)
        setIsSuccess(true);
      } else {
        toast.error(responseJson.message)
      }
    } else {
      console.log(email, otp, password, confirmPassword);
      const response = await ResetPassword(otp, password, confirmPassword, email)
      const responseJson = await response.json();
      if (responseJson.statusCode === 204) {
        toast.success("Đổi mật khẩu thành công")
        window.location.href = "/login"
      } else {
        toast.error("Đổi mật khẩu không thành công")
      }
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
            Điền email của bạn và chúng tôi sẽ gửi mã otp đến mail bạn
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
                label="Địa chỉ email"
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
                  id="otp"
                  label="Mã OTP"
                  name="otp"
                  autoComplete="otp"
                  onChange={(e) => setOtp(e.target.value)}
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
                  id="password"
                  label="Mật khẩu"
                  name="password"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
