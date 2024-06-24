import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Button from "@mui/material/Button";
import { Avatar, Stack } from "@mui/material";

export default function PersonalProfile() {
    return (
        <>
            <MDBContainer className="py-5 pt-20">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0" style={{ width: "80%" }}>
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: "linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))" }}>
                                    <Stack wrap style={{width: "150px", display: "flex", margin: "0 auto"}} className="pt-5">
                                        <img
                                            style={{ width: "100%, height: 100%" }}
                                            src="/img/avatarMessi.png"
                                            className='img-fluid rounded-circle'
                                        />
                                    </Stack>
                                    <MDBCardText className="pt-4" style={{ color: "white", fontSize: "large" }}>Tutor Manager</MDBCardText>
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6" style={{ fontSize: "20px" }}>Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>User ID</MDBTypography>
                                                <MDBCardText className="text-muted">U12345</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Phone</MDBTypography>
                                                <MDBCardText className="text-muted">0822119092</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-3">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Full Name</MDBTypography>
                                                <MDBCardText className="text-muted">Lưu Triều Sơn</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Email</MDBTypography>
                                                <MDBCardText className="text-muted">Viconbo@gmail.com</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-3">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Address</MDBTypography>
                                                <MDBCardText className="text-muted">Duong ba hai, nha con bo</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Start Date</MDBTypography>
                                                <MDBCardText className="text-muted">22/07/2003</MDBCardText>

                                            </MDBCol>
                                        </MDBRow>


                                        <MDBTypography tag="h6" style={{ fontSize: "20px" }}>Job</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Role</MDBTypography>
                                                <MDBCardText className="text-muted">Tutor</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Gender</MDBTypography>
                                                <MDBCardText className="text-muted">Male</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-3">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Status</MDBTypography>
                                                <MDBCardText className="text-muted" style={{ color: "green" }}>On Working</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6" style={{ color: "#813528", fontWeight: "bolder" }}>Rating</MDBTypography>
                                                <MDBCardText className="text-muted"><ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: '#1B7B2C' }}>
                                                    <li>
                                                        <MDBIcon fas icon="star fa-xs" />
                                                    </li>
                                                    <li>
                                                        <MDBIcon fas icon="star fa-xs" />
                                                    </li>
                                                    <li>
                                                        <MDBIcon fas icon="star fa-xs" />
                                                    </li>
                                                    <li>
                                                        <MDBIcon fas icon="star fa-xs" />
                                                    </li>
                                                    <li>
                                                        <MDBIcon fas icon="star fa-xs" />
                                                    </li>
                                                </ul></MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                    <div className="btn-footer mb-4">
                                        <Button
                                            // onClick={() => {
                                            //     handleEditNews(item);
                                            // }}
                                            variant="text"
                                            style={{ padding: 0 }}
                                        >
                                            <MDBIcon fas icon="user-edit" size="2x" />
                                        </Button>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        </>
    );
}