import React, { useState, useEffect } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function WaitingCheckout() {
    //   const navigate = useNavigate();
    //   const [countdown, setCountdown] = useState(10);
    //   const apiUrl1 = "https://localhost:44352/api/Order";
    let paymentStatus = "fail";

    //   // Lấy tham số truy vấn (query parameters) từ URL
    //   const queryParams = window.location.search;

    //   // Loại bỏ ký tự "?" ở đầu chuỗi nếu có
    //   const cleanQuery = queryParams.replace("?", "");

    //   // Tạo một đối tượng chứa thông tin từ tham số truy vấn
    //   const urlParams = new URLSearchParams(cleanQuery);

    //   // Trích xuất các giá trị từ tham số truy vấn
    //   const vnp_Amount = urlParams.get("vnp_Amount");
    //   const vnp_BankCode = urlParams.get("vnp_BankCode");
    //   const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
    //   const vnp_CardType = urlParams.get("vnp_CardType");
    //   const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
    //   const vnp_PayDate = urlParams.get("vnp_PayDate");
    //   const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    //   const vnp_TmnCode = urlParams.get("vnp_TmnCode");
    //   const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
    //   const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
    //   const vnp_TxnRef = urlParams.get("vnp_TxnRef");
    //   const vnp_SecureHash = urlParams.get("vnp_SecureHash");

    //   // In ra các giá trị
    //   console.log("vnp_Amount: " + vnp_Amount);
    //   console.log("vnp_BankCode: " + vnp_BankCode);
    //   console.log("vnp_BankTranNo: " + vnp_BankTranNo);
    //   console.log("vnp_CardType: " + vnp_CardType);
    //   console.log("vnp_OrderInfo: " + vnp_OrderInfo);
    //   console.log("vnp_PayDate: " + vnp_PayDate);
    //   console.log("vnp_ResponseCode: " + vnp_ResponseCode);
    //   console.log("vnp_TmnCode: " + vnp_TmnCode);
    //   console.log("vnp_TransactionNo: " + vnp_TransactionNo);
    //   console.log("vnp_TransactionStatus: " + vnp_TransactionStatus);
    //   console.log("vnp_TxnRef: " + vnp_TxnRef);
    //   console.log("vnp_SecureHash: " + vnp_SecureHash);

    //   if (vnp_ResponseCode === "00") {
    //     const orderDetail = JSON.parse(localStorage.getItem("orderItem"));
    //     localStorage.removeItem("shoppingCart");
    //     console.log(orderDetail);
    //     status = "success";

    //     const data = {
    //       Success: status,
    //       PaymentMethod: "VNPay",
    //       TransactionInfo: vnp_OrderInfo,
    //       TransactionId: vnp_TransactionNo,
    //       Token: vnp_SecureHash,
    //       VnPayResponseCode: vnp_ResponseCode,
    //       OrderCreate: orderDetail,
    //     };

    //     const postData = async () => {
    //       try {
    //         const postMethod = await axios.post(apiUrl1, data);
    //         console.log(postMethod.data);
    //         navigate("/");
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    //     postData();
    //   }

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: '50px' }}>
            {paymentStatus === "loading" && (
                <Box className="spinner" marginTop={4}>
                    <CircularProgress />
                </Box>
            )}

            {paymentStatus === "success" && (
                <Box className="status-payment">
                    <Alert severity="success" style={{ fontSize: "30px" }}>
                        Payment successful
                    </Alert>
                </Box>
            )}

            {paymentStatus === "fail" && (
                <Box className="status-payment">
                    <Alert severity="error" style={{ fontSize: "30px" }}>
                        Payment failed
                    </Alert>
                </Box>

            )}

            {/* Buttons to navigate */}
            <Box className="buttonLoading" marginTop={4}>
                <Box className="buttonItem" marginBottom={2}>
                    <Link to="/">
                        <Button variant="contained">Back Home</Button>
                    </Link>
                </Box>
                <Box className="buttonItem">
                    <Link to="/cart">
                        <Button variant="contained">Go to Cart</Button>
                    </Link>
                </Box>
            </Box>
            <CircularProgress sx={{marginTop: "50px"}}/>
        </Container>
    );
}

export default WaitingCheckout;
