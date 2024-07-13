import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./registerTutor.module.css";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import DatePickerValue from "../../global/BasicDatePicker";
import InputFileUpload from "../../global/UploadFile";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import cityJson from "../../../data/cityJson.json";
import { validationRegisterTutor } from "./ValidationAuthen/ValidationRegisterTutor";
import useAuth from "../../../hooks/useAuth";
const defaultTheme = createTheme();

export default function RegisterTutor() {
  const [provinces, setProvinces] = useState([]);

  const { register_tutor } = useAuth();

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
      imageUser: values.imageUser,
      imageCertificate: values.imageCertificate,
      imageIdentity: values.imageIdentity,
      district: values.district,
      job: values.job,
      major: values.major,
      idCart: values.idCart,
    };
    console.log(user);
    await register_tutor(user)
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
      imageUser: [],
      imageCertificate: [],
      imageIdentity: [],
      district: "",
      idCart: "",
      job: "",
      major: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
    validationSchema: validationRegisterTutor,
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
            Đăng ký làm gia sư
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
                  onblur={formik.handleBlur}
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={1}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Hiện là
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="job"
                    name="job"
                    value={formik.values.job}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    }}
                    label="Hiện là"
                    // error={(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="Giáo viên">Giáo viên</MenuItem>
                    <MenuItem value="Sinh viên">Sinh viên</MenuItem>
                    <MenuItem value="Sinh viên sư phạm">Sinh viên sư phạm</MenuItem>
                    <MenuItem value="Cử nhân">Cử nhân</MenuItem>
                    <MenuItem value="Kỹ sư">Kỹ sư</MenuItem>
                    <MenuItem value="Thạc sỹ">Thạc sỹ</MenuItem>
                    <MenuItem value="Tiến sỹ">Tiến sỹ</MenuItem>
                    <MenuItem value="Giảng viên">Giảng viên</MenuItem>
                    <MenuItem value="Bằng cấp khác">Bằng cấp khác</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePickerValue setFieldValue={formik.setFieldValue} formik={formik} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl style={{ width: "100%", marginTop: "7px" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    }}
                    label="Giới tính"
                    error={(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                  {(formik.touched.gender !== undefined && formik.touched.gender == true) && !!formik.errors.gender && <FormHelperText style={{ marginLeft: "13px", color: "#d32f2f" }}>{formik.errors.gender}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Thành phố
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="city"
                    value={formik.values.city}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                    }}
                    name="city"
                    error={(formik.touched.city !== undefined && formik.touched.city == true) && !!formik.errors.city}
                    label="Thành phố"
                    onChange={formik.handleChange}
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
                    <FormHelperText style={{ marginLeft: "13px", color: "#d32f2f" }}>{formik.errors.city}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={4}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="idCart"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Chứng minh nhân dân"
                  name="idCart"
                  autoComplete="idCart"
                  error={formik.touched.idCart && !!formik.errors.idCart}
                  helperText={formik.touched.idCart && formik.errors.idCart}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="major"
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                  }}
                  label="Ngành học"
                  name="major"
                  autoComplete="major"
                // error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                // helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} className="flex">
                <Typography
                  component="h1"
                  variant="button"
                  sx={{ fontWeight: "bold", margin: "auto 0", width: "20%" }}
                >
                  Ảnh thẻ
                </Typography>
                <InputFileUpload
                  setFieldValue={formik.setFieldValue}
                  formik={formik}
                  content={"Tải lên ảnh thẻ"}
                  fieldName="imageUser"
                  size={1}
                />
              </Grid>
              {(formik.touched.imageUser && formik.errors.imageUser) && <span style={{ marginLeft: "15px", color: "#d32f2f" }}>{formik.errors.imageUser}</span>}
              <Grid item xs={12} className="flex">
                <Typography
                  component="h1"
                  variant="button"
                  sx={{ fontWeight: "bold", margin: "auto 0", width: "20%" }}
                >
                  Ảnh bằng cấp
                </Typography>
                <InputFileUpload
                  setFieldValue={formik.setFieldValue}
                  formik={formik}
                  content={"Tải lên Ảnh bằng cấp"}
                  fieldName="imageCertificate"
                  size={4}
                />
              </Grid>
              {(formik.touched.imageCertificate && formik.errors.imageCertificate) && <span style={{ marginLeft: "15px", color: "#d32f2f" }}>{formik.errors.imageCertificate}</span>}
              <Grid item xs={12} className="flex">
                <Typography
                  component="h1"
                  variant="button"
                  sx={{ fontWeight: "bold", margin: "auto 0", width: "20%" }}
                >
                  Ảnh CMND/CCCD
                </Typography>
                <InputFileUpload
                  setFieldValue={formik.setFieldValue}
                  formik={formik}
                  content={"Tải lên Ảnh CMND/CCCD"}
                  fieldName="imageIdentity"
                  size={2}
                />
              </Grid>
              {(formik.touched.imageIdentity && formik.errors.imageIdentity) && <span style={{ marginLeft: "15px", color: "#d32f2f" }}>{formik.errors.imageIdentity}</span>}
            </Grid>
            <Button
              type="submit"
              style={{ width: "30rem", position: "relative", left: "30%", backgroundColor: "#a83a3b", height: "40px" }}
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Có tài khoản rồi ? Quay về đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
