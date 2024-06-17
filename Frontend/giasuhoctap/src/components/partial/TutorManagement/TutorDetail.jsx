import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function TutorDetail() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                maxWidth="lg"

                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold", textAlign: "center", fontSize: "x-large" }} id="customized-dialog-title">
                    Thông tin chi tiết gia sư
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className='flex'>
                        <div className='w-1/3'>
                            <div className="col-md-7" style={{ width: "100%" }}>
                                <img style={{ width: "90%" }} src="https://www.bootdey.com/image/400x300/FFB6C1/000000" alt="project-image" className="rounded" />
                            </div>
                        </div>
                        <div className="project-info-box w-1/2">
                            <div className="project-info-box mt-0">
                                <h5>PROJECT DETAILS</h5>
                                <p className="mb-0">Vivamus pellentesque, felis in aliquam ullamcorper, lorem tortor porttitor erat, hendrerit porta nunc tellus eu lectus. Ut vel imperdiet est. Pellentesque condimentum, dui et blandit laoreet, quam nisi tincidunt tortor.</p>
                            </div>
                            <p><b>Client:</b> CUPCAKE CO</p>
                            <hr style={{ width: "50%" }} />
                            <p><b>Date:</b> 14.02.2020</p>
                            <p><b>Designer:</b> James Doe</p>
                            <p><b>Tools:</b> Illustrator</p>
                            <p className="mb-0"><b>Budget:</b> $500</p>
                        </div>
                    </div>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
