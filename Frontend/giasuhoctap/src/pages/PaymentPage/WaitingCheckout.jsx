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
    const { user } = useAuth()
    console.log(user);
    let paymentStatus = "fail";

    // Lấy tham số truy vấn (query parameters) từ URL
    const queryParams = window.location.search;

    // Loại bỏ ký tự "?" ở đầu chuỗi nếu có
    const cleanQuery = queryParams.replace("?", "");

    // Tạo một đối tượng chứa thông tin từ tham số truy vấn
    const urlParams = new URLSearchParams(cleanQuery);

    // Trích xuất các giá trị từ tham số truy vấn
    // const vnp_Amount = urlParams.get("vnp_Amount");
    // const vnp_BankCode = urlParams.get("vnp_BankCode");
    // const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
    // const vnp_CardType = urlParams.get("vnp_CardType");
    const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
    // const vnp_PayDate = urlParams.get("vnp_PayDate");
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    // const vnp_TmnCode = urlParams.get("vnp_TmnCode");
    const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
    // const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
    // const vnp_TxnRef = urlParams.get("vnp_TxnRef");
    // const vnp_SecureHash = urlParams.get("vnp_SecureHash");

    // In ra các giá trị
    // console.log("vnp_Amount: " + vnp_Amount);
    // console.log("vnp_BankCode: " + vnp_BankCode);
    // console.log("vnp_BankTranNo: " + vnp_BankTranNo);
    // console.log("vnp_CardType: " + vnp_CardType);
    // console.log("vnp_OrderInfo: " + vnp_OrderInfo);
    // console.log("vnp_PayDate: " + vnp_PayDate);
    // console.log("vnp_ResponseCode: " + vnp_ResponseCode);
    // console.log("vnp_TmnCode: " + vnp_TmnCode);
    // console.log("vnp_TransactionNo: " + vnp_TransactionNo);
    // console.log("vnp_TransactionStatus: " + vnp_TransactionStatus);
    // console.log("vnp_TxnRef: " + vnp_TxnRef);
    // console.log("vnp_SecureHash: " + vnp_SecureHash);

    if (vnp_ResponseCode === "00") {

        paymentStatus = "success";
        const data = {
            userId: user?.userId,
            transactionInfo: vnp_OrderInfo,
            transactionNumber: vnp_TransactionNo,
            isSuccess: true
        };
        if (user?.userId) {
            const postData = async () => {
                try {
                    const postMethod = await ResponsePayment(data);
                    if (postMethod.ok) {
                        const responseData = await postMethod.json();
                        if (responseData.statusCode == 201) {
                            window.location.href = "/"
                        } else {
                            toast.error(responseData.message);
                            return;
                        }
                    } else {
                        toast.error("There was an error processing");
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            postData();
        }
    } else {
        paymentStatus = "fail";
        const data = {
            userId: user?.userId,
            transactionInfo: vnp_OrderInfo,
            transactionNumber: vnp_TransactionNo,
            isSuccess: false
        };
        if (user?.userId) {
            const postData = async () => {
                try {
                    const postMethod = await ResponsePayment(data);
                    if (postMethod.ok) {
                        const responseData = await postMethod.json();
                        if (responseData.statusCode == 201) {
                            toast.error("Thanh toán thất bại")
                        } else {
                            toast.error(responseData.message);
                            return;
                        }
                    } else {
                        toast.error("There was an error processing");
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            postData();
        }
    }

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
