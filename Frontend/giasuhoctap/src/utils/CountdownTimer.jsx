import { Button } from '@mui/material'
import { useRef, useState } from 'react'

export default function CountdownTimer() {
    const [countdown, setCountdown] = useState(0);
    const countdownRef = useRef(null);
    const [canSendOTP, setCanSendOTP] = useState(true);
    const handleCountdown = () => {
        if (!canSendOTP) {
            return;
        }

        // Gọi API để gửi mã OTP
        // test

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