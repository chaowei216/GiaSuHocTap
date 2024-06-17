import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RejectTutor } from '../../../api/TutorManagementApi';
import { toast } from 'react-toastify';

export default function Diablog({ open, setOpen, email, setIsUpdate }) {
    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const reason = formJson.reason;
        handleClose();
        const response = await RejectTutor(email, reason)
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.statusCode == 200) {
            toast.success("Reject tutor successfully")
        } else {
            toast.error("Reject fail")
        }
        setIsUpdate(true);
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleFormSubmit
                }}
            >
                <DialogTitle>Reason</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To deny member, please enter the reason here. The system
                        will send it to user.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="reason"
                        name="reason"
                        label="Reason for reject user"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
