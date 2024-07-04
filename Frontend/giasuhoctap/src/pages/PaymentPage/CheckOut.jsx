import React, { useState } from "react";
import {
  Button,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/partial/HomePage/Footer/Footer";
import { MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const Checkout = () => {
  const navigate = useNavigate();
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    captcha: ""
  });

  const shoppingCart = [
    { name: "Coin 1", price: 10, quantity: 2, day: "2024-07-04", image: "https://via.placeholder.com/50" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCaptchaChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptchaInput !== captchaCode) {
      toast.error("CAPTCHA code does not match. Please try again.");
      setCaptchaCode(generateRandomCode());
      setUserCaptchaInput("");
      return;
    }

    console.log("Form submitted");
    localStorage.setItem("orderItem", JSON.stringify(formData));
    try {
      const response = await fetch("https://localhost:44352/api/Payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        window.location.replace(responseData.url);
        console.log("API Response Data:", responseData);
      } else {
        console.log("Error in response");
      }
    } catch (error) {
      console.log("Network error");
    }
  };

  return (
    <div>
      <Box
        sx={{
          background: "#333333",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '40px 0',
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>Cart Checkout</Typography>
          <Typography variant="h6" gutterBottom>
            A magical combination that sent aromas to the taste buds
          </Typography>
          <Box component="ol" sx={{ display: 'inline-flex', listStyle: 'none', padding: 0, color: '#fff' }}>
            <li className="breadcrumb-item">
              <a href="index.html" style={{ color: '#fff', textDecoration: 'none' }}>
                <i className="fa-solid fa-house"></i> Home
              </a>
            </li>
            <li className="breadcrumb-item" style={{ padding: '0 10px' }}>/</li>
            <li className="breadcrumb-item active" aria-current="page">Shop Cart</li>
            <li className="breadcrumb-item" style={{ padding: '0 10px' }}>/</li>
            <li className="breadcrumb-item active" aria-current="page">Cart Checkout</li>
          </Box>
        </Container>
      </Box>
      <Container sx={{ marginBottom: "40px" }}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
          <form className="checkout-meta donate-page" onSubmit={handleSubmit}>
            <Grid container >
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>Billing details</Typography>
                <List>
                  {shoppingCart.map((product, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={product.image} alt={product.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.name}
                          secondary={`Quantity: ${product.quantity} - Price: $${product.price}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Tên người yêu cầu: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">Lưu Việt Nam</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Địa chỉ: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">Lưu Việt Nam</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Email address: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">Lưu Việt Nam</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Số điện thoại: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">Lưu Việt Nam</MDBCardText>
                  </MDBCol>
                </MDBRow>

                <Typography variant="h6" gutterBottom marginTop={2} style={{ marginLeft: "7px" }}>
                  Nhập mã dưới đây để tránh robot
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      padding: '10px 20px',
                      marginTop: "10px",
                      backgroundColor: '#f0f0f0',
                      borderRadius: '5px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      letterSpacing: '0.1em',
                      marginRight: '10px'
                    }}
                  >
                    {captchaCode}
                  </Box>
                  <TextField
                    required
                    label="Điền mã CAPTCHA"
                    variant="outlined"
                    onChange={handleCaptchaChange}
                    value={userCaptchaInput}
                    margin="normal"
                  />
                </Box>
              </Grid>
              <Grid container xs={12} md={4} alignItems="center" justifyContent="center" >
                <Paper
                  elevation={3}
                  style={{
                    padding: '20px',
                    width: "90%",
                    background: "white",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'black',
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h6" style={{ color: 'black' }}>Cart Total</Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal:</Typography>
                    <Typography>
                      ${shoppingCart.reduce((total, product) => total + product.price * product.quantity, 0)}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography>Total:</Typography>
                    <Typography>
                      ${shoppingCart.reduce((total, product) => total + product.price * product.quantity, 0)}
                    </Typography>
                  </Box>
                  <Typography variant="h6" marginTop={3} style={{ color: 'black' }}>Payment Method</Typography>
                  <RadioGroup name="paymentMethod" onChange={handleChange}>
                    <FormControlLabel value="Vnpay" control={<Radio />} label="Vnpay" style={{ color: 'black' }} />
                  </RadioGroup>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Place Order
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default Checkout;
