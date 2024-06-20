import { Button } from '@mui/material'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SendVerifyEmail } from '../api/AuthenApi';
import { toast } from 'react-toastify';

export default function CountdownTimer() {
    let { email } = useParams();
    const decodedEmail = atob(email);
    const [countdown, setCountdown] = useState(0);
    const countdownRef = useRef(null);
    const [canSendOTP, setCanSendOTP] = useState(true);
    const handleCountdown = () => {
        if (!canSendOTP) {
            return;
        }

        // Gọi API để gửi mã OTP
        SendVerifyEmail(decodedEmail).then(response => {
            if (response.statusCode === 200) {
                toast.success("Send email success");
            } else if (response.statusCode !== 200) {
                toast.error("Send failed please try agian")
            }
        }).catch(error => {
            console.error("Error:", error.message);
        });

        let seconds = 1 * 60;
        setCountdown(seconds);

        setCanSendOTP(false);
        // Cập nhật giá trị đếm ngược sau mỗi giây
        countdownRef.current = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown === 0) {
                    clearInterval(countdownRef.current);
                    setCanSendOTP(true);
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <Button
                onClick={handleCountdown}
                fullWidth
                variant="contained"
                disabled={!canSendOTP}
                sx={{ mt: 3, mb: 2, width: 150 }}
            >
                Nhận mã OTP
            </Button>
            {countdown > 0 && (
                <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                    OTP sẽ bị hết hạn sau: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}
                </div>
            )}
        </div>
    )
}
