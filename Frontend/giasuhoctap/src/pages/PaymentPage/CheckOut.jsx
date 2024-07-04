import React from "react";
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

const Checkout = () => {
  const navigate = useNavigate();

  const shoppingCart = [
    { name: "Coin 1", price: 10, quantity: 2, day: "2024-07-04", image: "https://via.placeholder.com/50" },
    { name: "Coin 2", price: 20, quantity: 1, day: "2024-07-04", image: "https://via.placeholder.com/50" },
  ];

  const totalPrice = shoppingCart.reduce((total, product) => {
    const productTotal = product.price * product.quantity;
    return total + productTotal;
  }, 0);

  const newObject = shoppingCart.map((product) => {
    const newDay = shoppingCart[0].day;
    return {
      type: product.name,
      Amount: product.quantity,
      startDate: newDay,
    };
  });

  const formData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    totalPrice: totalPrice,
    tickets: newObject,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData[name] = value;
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (response) {
        const responseData = await response.json();
        window.location.replace(responseData.url);
        console.log("API Response Data:", responseData);
      } else {
        // Handle errors, e.g., display an error message
      }
    } catch (error) {
      // Handle network errors
      console.log("error");
    }
  };

  return (
    <div>
      <Box
        sx={{
          background: "#333333",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '50px 0',
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
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '55px' }}>
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
                <TextField
                  fullWidth
                  required
                  name="fullName"
                  label="Complete Name"
                  variant="outlined"
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email address"
                  variant="outlined"
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  required
                  type="tel"
                  name="phoneNumber"
                  label="Phone"
                  variant="outlined"
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  name="order_comments"
                  label="Order Note"
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
                />
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
                    <Typography>${totalPrice}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography>Total:</Typography>
                    <Typography>${totalPrice}</Typography>
                  </Box>
                  <Typography variant="h6" marginTop={3} style={{ color: 'black' }}>Payment Method</Typography>
                  <RadioGroup name="paymentMethod">
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
    </div>
  );
};

export default Checkout;
