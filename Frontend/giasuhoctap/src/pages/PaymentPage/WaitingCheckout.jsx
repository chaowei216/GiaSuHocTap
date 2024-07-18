import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../hooks/useAuth";
import { ResponsePayment } from "../../api/PaymentApi";
import { toast } from "react-toastify";

function WaitingCheckout() {
    const { user } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState("pending");

    useEffect(() => {
        console.log(user);
        const queryParams = window.location.search;
        const cleanQuery = queryParams.replace("?", "");
        const urlParams = new URLSearchParams(cleanQuery);
        const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
        const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
        const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

        const processPayment = async () => {
            const isSuccess = vnp_ResponseCode === "00";
            const status = isSuccess ? "success" : "fail";
            const data = {
                userId: user?.userId,
                transactionInfo: vnp_OrderInfo,
                transactionNumber: vnp_TransactionNo,
                isSuccess: isSuccess
            };

            if (user?.userId) {
                try {
                    const postMethod = await ResponsePayment(data);
                    if (postMethod.ok) {
                        const responseData = await postMethod.json();
                        if (responseData.statusCode === 201) {
                            if (isSuccess) {
                                window.location.href = "/";
                            } else {
                                toast.error("Thanh toán thất bại");
                            }
                        } else {
                            console.log(responseData.message);
                        }
                    } else {
                        console.log("There was an error processing");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An unexpected error occurred");
                }
            }

            setPaymentStatus(status);
        };

        processPayment();
    }, [user]);

    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: '50px' }}>
            {paymentStatus === "success" && (
                <Box className="status-payment">
                    <Alert severity="success" style={{ fontSize: "35px", display: "flex", alignItems: "center" }}>
                        Payment successful
                    </Alert>
                </Box>
            )}

            {paymentStatus === "fail" && (
                <Box className="status-payment">
                    <Alert severity="error" style={{ fontSize: "35px", display: "flex", alignItems: "center" }}>
                        Payment failed
                    </Alert>
                </Box>
            )}

            <Box className="buttonLoading" marginTop={4}>
                <Box className="buttonItem" marginBottom={2}>
                    <Link to="/">
                        <Button variant="contained">Back Home</Button>
                    </Link>
                </Box>
                <Box className="buttonItem">
                    <Link to="/buycoin">
                        <Button variant="contained">Go to Cart</Button>
                    </Link>
                </Box>
            </Box>
            <CircularProgress sx={{ marginTop: "50px" }} />
        </Container>
    );
}

export default WaitingCheckout;
