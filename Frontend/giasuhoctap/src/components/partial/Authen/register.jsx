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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
      image: "",
      district: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
    validationSchema: validationRegisterParent,
  });
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
            Parent Registration Form
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
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onblur={formik.handleBlur}
                  error={formik.touched.firstName && formik.errors.firstName}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={formik.handleChange}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onblur={formik.handleBlur}
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={formik.handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onblur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={formik.handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onblur={formik.handleBlur}
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  onChange={formik.handleChange}
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  onblur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerValue setFieldValue={formik.setFieldValue} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%", marginTop: "7px" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label="Gender"
                    onChange={formik.handleChange}
                    onblur={formik.handleBlur}
                    error={formik.touched.gender && formik.errors.gender}
                    helperText={formik.touched.gender && formik.errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%", marginTop: "8px" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="city"
                    value={formik.values.city}
                    name="city"
                    label="City"
                    onChange={formik.handleChange}
                    onblur={formik.handleBlur}
                    error={formik.touched.city && formik.errors.city}
                    helperText={formik.touched.city && formik.errors.city}
                  >
                    {provinces &&
                      provinces.data &&
                      provinces.data.map((province) => (
                        <MenuItem key={province._id} value={province.name}>
                          {province.name_with_type}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <TextField
                  requiredc
                  fullWidth
                  id="district"
                  onChange={formik.handleChange}
                  label="District"
                  name="district"
                  autoComplete="district"
                  onblur={formik.handleBlur}
                  error={formik.touched.district && formik.errors.district}
                  helperText={formik.touched.district && formik.errors.district}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  onChange={formik.handleChange}
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onblur={formik.handleBlur}
                  error={formik.touched.address && formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFileUpload
                  setFieldValue={formik.setFieldValue}
                  content={"Upload Image (optional)"}
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
              Register
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
