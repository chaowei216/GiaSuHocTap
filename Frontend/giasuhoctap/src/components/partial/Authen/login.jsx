import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./login.module.css"
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import logoTutor from "/img/logoTutor.png"
import { useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
const defaultTheme = createTheme();
export default function Login() {
  const userRef = useRef();
  const { login, isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  //const { auth, setAuth, isAuthenticated } = useAuth()
  // const navigate = useNavigate()
  // const location = useLocation()
  // const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const userInput = {
    //   userName: data.get("email"),
    //   password: data.get("password"),
    // };
    // const response = await SignIn(userInput);
    // if (response.status == 200) {
    //   const responseJson = await response.json();
    //   const accessToken = responseJson?.result?.accessToken;
    //   const user = responseJson?.result?.user
    //   localStorage.setItem("accessToken", accessToken);
    //   setAuth({ ...auth, user, accessToken, isInitialized: true, isAuthenticated: true, });
    //   //navigate(from, { replace: true });
    // }
    await login(data.get("email"), data.get("password"));
  };
  useEffect(() => {
    userRef.current.focus();
  }, [])
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
          <Typography component="h1" variant="h5">
            Đăng nhập
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
              ref={userRef}
              fullWidth
              id="email"
              label="Địa chỉ email"
              name="email"
              autoComplete="email"
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
              name="password"
              label="Mật khẩu"
              type="password"
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon />
                ),
              }}
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{fontSize: "14px", textDecoration: "underline", color: "#1976d2"}} to="/forgot-password" variant="body2">
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link style={{fontSize: "14px", textDecoration: "underline", color: "#1976d2"}}  to="/registerParents" variant="body2">
                  {"Không có tài khoản ? Đăng ký"}
                </Link>
                <br/>
                <Link style={{fontSize: "14px", textDecoration: "underline", color: "#1976d2"}}  to="/registerTutors" variant="body2">
                  {"Không có tài khoản ? Đăng ký làm gia sư"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
