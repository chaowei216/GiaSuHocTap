import React, { useEffect, useState } from "react";
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
  Avatar,
  IconButton
} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MDBCardText, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Delete, Favorite } from '@mui/icons-material';
import FooterCheckOut from "./FooterCheckOut";
import HeaderCheckout from "./HeaderCheckout";
import useAuth from "../../hooks/useAuth";
import { PaymentVnPay } from "../../api/PaymentApi";

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const Checkout = () => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  const [userCaptchaInput, setUserCaptchaInput] = useState("");
  const [coinBuy, setCoinBuy] = useState({});
  const [methodPayment, setMethodPayment] = useState("");

  const shoppingCart = [
    { name: "Coin 1", price: 10, quantity: 2, day: "2024-07-04", image: "https://via.placeholder.com/50" },
  ];

  const handleChange = (event) => {
    setMethodPayment(event.target.value)
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
    if (methodPayment == "" || methodPayment == undefined) {
      toast.error("Làm ơn chọn phương thức thành toán")
      return;
    }
    console.log("Form submitted");
    localStorage.setItem("coinBuy", JSON.stringify(coinBuy));
    const totalPriceString = coinBuy?.price.replace(" VND", "");
    const totalPrice = parseFloat(totalPriceString.replace(".", "").replace(",", "."));
    const formBuyCoin = {
      userId: user?.userId,
      paymentMethod: methodPayment,
      totalPrice: totalPrice,
      coin: Number(coinBuy?.quantity)
    }
    console.log(formBuyCoin);
    try {
      const response = await PaymentVnPay(formBuyCoin)
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.statusCode == 201) {
          window.location.replace(responseData.data);
          console.log("API Response Data:", responseData);
        } else {
          toast.error(responseData.message);
        }
      } else {
        toast.error("There was an error processing");
      }
    } catch (error) {
      console.log("Network error");
    }
  };
  useEffect(() => {
    const test = location.state; // Trích xuất state từ location
    setCoinBuy(test)
    console.log(coinBuy);
  }, [location.state])
  return (
    <div>
      <HeaderCheckout />
      <Box
        sx={{
          background: "#333333",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          paddingBottom: "20px",
          color: '#fff'
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom>Thông tin đơn hàng</Typography>
          <Typography variant="h6" gutterBottom>
            Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
          </Typography>
        </Container>
      </Box>
      <Container style={{ maxWidth: "1300px" }} sx={{ marginBottom: "40px" }}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '40px' }}>
          <form className="checkout-meta donate-page" onSubmit={handleSubmit}>
            <Grid container >
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>Billing details</Typography>
                <List>
                  <React.Fragment>
                    <ListItem alignItems="flex-start" style={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemAvatar>
                        <Avatar src={coinBuy?.image} alt="Coin buy" variant="square" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                      </ListItemAvatar>
                      <Box flexGrow={1}>
                        <ListItemText
                          primary={coinBuy?.title}
                          secondary={
                            <>
                              <Typography variant="body2" color="textSecondary" component="span">
                                Số lượng: {coinBuy?.quantity || '0'} xu
                              </Typography>
                              <br />
                              <Typography variant="body2" color="textSecondary" component="span">
                                Giá tiền: {coinBuy?.price || '0'}
                              </Typography>
                            </>
                          }
                        />
                      </Box>
                      <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        Số lượng: {coinBuy?.quantity || '0'} xu
                      </Typography>
                      <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        Giá tiền: {coinBuy?.price || '0'}
                      </Typography>
                      <IconButton edge="end" aria-label="favorite" style={{ marginLeft: '20px' }}>
                        <Favorite />
                      </IconButton>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                </List>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Tên người mua: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">{user?.fullname}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Địa chỉ: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">{user?.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Email address: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">{user?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow style={{ justifyContent: "space-between", height: "50px" }}>
                  <MDBCol sm="3" style={{ margin: "auto 0" }}>
                    <MDBCardText>Số điện thoại: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="7" style={{ margin: "auto 0" }}>
                    <MDBCardText className="text-muted font-bold">{user?.phonenumber}</MDBCardText>
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
              <Grid item md={4} justifyContent="center" >
                <Paper
                  elevation={3}
                  style={{
                    padding: '20px',
                    width: "90%",
                    height: "88%",
                    background: "white",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'black',
                    borderRadius: '8px',
                    marginLeft: "25px"
                  }}
                >
                  <Typography variant="h6" style={{ color: 'black', marginBottom: "15px" }}>Cart Total</Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Số lượng xu mua:</Typography>
                    <Typography>
                      {coinBuy?.quantity || "0"} xu
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" marginTop={2} borderBottom="1px solid #e0e0e0" paddingBottom={3}>
                    <Typography>Tổng cộng (đã gồm thuế VAT):</Typography>
                    <Typography>
                      {coinBuy?.price || "0 VND"}
                    </Typography>
                  </Box>
                  <Typography className="mb-2" variant="h6" marginTop={2} style={{ color: 'black' }}>Payment Method</Typography>
                  <RadioGroup name="paymentMethod" onChange={handleChange} sx={{ marginBottom: "25px", borderBottom: "1px solid #e0e0e0", paddingBottom: "20px" }}>
                    <FormControlLabel
                      value="Vnpay"
                      control={<Radio />}
                      label={
                        <Box display="flex" alignItems="center">
                          <img
                            className="me-2"
                            width="30px"
                            style={{ height: "25px" }}
                            src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg"
                            alt="VNPay logo"
                          />
                          VNPay
                        </Box>
                      }
                      style={{ color: 'black' }}
                    />
                  </RadioGroup>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Thanh toán
                  </Button>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid black", height: "35px", marginTop: "25px", borderRadius: "4px"
                  }}>
                    <img className="me-2" width="90px" style={{ height: "25px" }}
                      src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1.png"
                      alt="PayPal acceptance mark" />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <FooterCheckOut />
    </div>
  );
};

export default Checkout;
