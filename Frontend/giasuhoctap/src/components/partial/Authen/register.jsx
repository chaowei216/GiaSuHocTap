import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./register.module.css";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import DatePickerValue from "../../global/BasicDatePicker";
import InputFileUpload from "../../global/UploadFile";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import cityJson from "../../../data/cityJson.json";
import { validationRegisterParent } from "./ValidationAuthen/ValidationRegisterParent";
const defaultTheme = createTheme();

export default function Register() {
  const [provinces, setProvinces] = useState([]);
  
  useEffect(() => {
    setProvinces(cityJson.data);
  }, []);

  const submitForm = async (values) => {
    const user = {
      fullName: values.lastName + " " + values.firstName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      city: values.city,
      address: values.address,
      image: values.image,
      district: values.district,
    };
    console.log(user);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      city: "",
      address: "",
      image: [],
      district: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
    validationSchema: validationRegisterParent,
  });
  console.log(formik.touched.city !== undefined);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" className={styles.layout_container}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
            Phụ huynh đăng ký
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Họ"
                  name="lastName"
                  autoComplete="family-name"
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Số điện thoại"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerValue setFieldValue={formik.setFieldValue} formik={formik} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%", marginTop: "7px" }} error={formik.errors.gender && formik.touched.gender}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label="Giới tính"
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    }}
                    error={(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                {(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender && <FormHelperText style={{ marginLeft: "13px", color: "#d32f2f" }}>{formik.errors.gender}</FormHelperText>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%", marginTop: "7px" }} error={formik.errors.city && formik.touched.city}>
                  <InputLabel id="demo-simple-select-helper-label">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="city"
                    value={formik.values.city}
                    name="city"
                    label="Thành phố"
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    }}
                    error={(formik.touched.city !== undefined && formik.touched.city == true) && !!formik.errors.city}
                  >
                    {provinces &&
                      provinces.data &&
                      provinces.data.map((province) => (
                        <MenuItem key={province._id} value={province.name}>
                          {province.name_with_type}
                        </MenuItem>
                      ))}
                  </Select>
                  {(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender && (
                    <FormHelperText>{formik.errors.city}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <TextField
                  requiredc
                  fullWidth
                  id="district"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Quận"
                  name="district"
                  autoComplete="district"
                  error={formik.touched.district && !!formik.errors.district}
                  helperText={formik.touched.district && formik.errors.district}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Địa chỉ"
                  name="address"
                  autoComplete="address"
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload
                  setFieldValue={formik.setFieldValue}
                  content={"Upload hình (tùy chọn)"}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
