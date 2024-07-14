import { Button } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SendVerifyEmail } from '../api/AuthenApi';
import { toast } from 'react-toastify';

export default function CountdownTimer() {
    let { email } = useParams();
    const decodedEmail = atob(email);
    const [countdown, setCountdown] = useState(0);
    const countdownRef = useRef(null);
    const [canSendOTP, setCanSendOTP] = useState(true);

    // Function to start countdown
    const startCountdown = (seconds) => {
        clearInterval(countdownRef.current); // Clear previous interval to prevent multiple intervals
        countdownRef.current = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 0) {
                    clearInterval(countdownRef.current);
                    setCanSendOTP(true);
                    localStorage.removeItem('countdown'); // Remove countdown from localStorage
                    return 0; // Ensure countdown state is reset to 0
                } else {
                    localStorage.setItem('countdown', prevCountdown - 1); // Update countdown in localStorage
                    return prevCountdown - 1; // Return updated countdown state
                }
            });
        }, 1000);
    };

    // Effect to load countdown from localStorage on component mount
    useEffect(() => {
        const savedCountdown = localStorage.getItem('countdown');
        if (savedCountdown && parseInt(savedCountdown) > 0) {
            setCountdown(parseInt(savedCountdown));
            setCanSendOTP(false);
            startCountdown(parseInt(savedCountdown) - 1); // Start countdown from saved value
        }
    }, []);

    // Function to handle sending OTP
    const handleCountdown = () => {
        if (!canSendOTP) {
            return;
        }

        // Call API to send OTP
        SendVerifyEmail(decodedEmail).then(response => {
            if (response.statusCode === 200) {
                toast.success("Gửi email thành công");
            } else {
                toast.error("Gửi email không thành công");
            }
        }).catch(error => {
            console.error("Lỗi sever:", error.message);
        });

        let seconds = 60; // 60 seconds countdown
        setCountdown(seconds);
        setCanSendOTP(false);
        startCountdown(seconds - 1); // Start countdown from 59 seconds (1 second less due to immediate setCountdown call)
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
                    OTP sẽ được gửi lại sau: {Math.floor(countdown / 60)}:{countdown % 60 < 10 ? '0' : ''}{countdown % 60}
                </div>
            )}
        </div>
    );
}
