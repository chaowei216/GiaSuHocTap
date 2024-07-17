import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import WarningIcon from '@mui/icons-material/Warning';
import { DeleteNewsByModerator } from "../../../api/NewsApi";
export default function DeleteNews(pros) {
    const { show, handleClose, data, isCreated, setIsCreated } = pros;
    const handleDeny = async () => {
        if (data) {
            // const response = await DeleteNewsByModerator(data.notificationId)
            // if (response.ok) {
            //     const responseJson = await response.json();
            //     if (responseJson.statusCode == 204) {
            //         setIsCreated(!isCreated)
            //         toast.success("Xóa thành công")
            //         handleClose()
            //     }
            // } else {
            //     toast.error("Error deny")
            // }
        }
    }

    return (
        <>
            <MDBModal open={show} tabIndex="-1" onClose={handleClose}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader
                            className="modal-header d-flex "
                            style={{ background: "white" }}
                        >
                            <MDBModalTitle className="text-xl" style={{ textAlign: "left", color: "#3295cf" }}>
                                <WarningIcon color="primary" fontSize="large" sx={{ marginRight: "10px" }} /> Xóa tin này ?
                            </MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <div className="form-content">
                                <div style={{ fontSize: "large", color: "#a1a1a1" }}>
                                    Bạn có chắc muốn xóa tin tức này không
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "20px" }}>
                                <div>
                                    <Button
                                        variant="primary"
                                        onClick={handleClose}
                                        active
                                        class="btn btn-danger"
                                        style={{ width: "100px", marginRight: "20px", background: "#ffffff", color: "#a3a3a3", border: "1px solid #dfdfdf" }}
                                    >
                                        Đóng
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        color="error"
                                        variant="primary"
                                        class="btn btn-outline-danger"
                                        type="submit"
                                        style={{ background: "#f74747", width: "100px", color: "white" }}
                                        onClick={handleDeny}
                                        data-mdb-dismiss="modal"
                                        active
                                    >
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}