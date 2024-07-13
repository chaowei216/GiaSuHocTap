import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";

export default function WaitingModal({ open: propOpen, setOpen }) {
    const [open, setIsOpen] = useState(false); // Sử dụng state để kiểm soát trạng thái mở/đóng modal

    useEffect(() => {
        // Nếu propOpen từ cha là true, thì mở modal
        if (propOpen) {
            setIsOpen(true);
        } else {
            // Nếu không có propOpen từ cha, mở modal và sau 3 giây tự động đóng
            setIsOpen(true);
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 1000); // 3000 milliseconds = 3 seconds

            // Clear timeout khi component bị unmount
            return () => clearTimeout(timer);
        }
    }, [propOpen]);

    const handleClose = () => {
        setIsOpen(false); // Đóng modal
        setOpen(false); // Gọi hàm setOpen từ prop để đồng bộ trạng thái với cha
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">
                <span className="flex items-center text-indigo-800">
                    <AutorenewIcon />
                    <span style={{ marginLeft: "10px" }}>Vui lòng chờ xíu</span>
                </span>
                <hr></hr>
            </DialogTitle>
            <DialogContent style={{ width: '100%' }}>
                <DialogContentText id="alert-dialog-description" style={{ color: "black" }}>
                    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
                        <LinearProgress color="success" />
                    </Stack>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
