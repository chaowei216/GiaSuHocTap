import { Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress, Backdrop } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";

export default function WaitingModal({ open: propOpen, setOpen }) {
    const [open, setIsOpen] = useState(false); // State to control modal open/close

    useEffect(() => {
        if (propOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(true);
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 500); // 1000 milliseconds = 1 second

            return () => clearTimeout(timer);
        }
    }, [propOpen]);

    const handleClose = () => {
        setIsOpen(false); // Close modal
        setOpen(false); // Sync state with parent
    };

    return (
        <Backdrop open={open} style={{ zIndex: 1300 }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth={true}
                disableEscapeKeyDown
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
        </Backdrop >
    );
}
