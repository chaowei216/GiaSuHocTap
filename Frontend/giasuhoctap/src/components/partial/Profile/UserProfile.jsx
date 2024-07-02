import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import styles from "./UserProfile.module.css"
import useAuth from "../../../hooks/useAuth"
export default function PersonalProfile() {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <section style={{ backgroundColor: '#eee' }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px', marginBottom: "20px" }}
                                        fluid />
                                    <p className="text-muted mb-1">{user?.roleName}</p>
                                    <p className="text-muted mb-4">{user?.fullname}</p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <MDBBtn>Follow</MDBBtn>
                                        <MDBBtn outline className="ms-1">Rating</MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody className="p-0">
                                    <MDBListGroup flush className="rounded-3">
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fas icon="globe fa-lg text-warning" />
                                            <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                                            <MDBCardText>@mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                            <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                            <MDBCardText>mdbootstrap</MDBCardText>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.fullname}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.phonenumber}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Gender</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.gender}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className={styles.profile_container}>
                                        <MDBCol sm="3" className={styles.profile}>
                                            <MDBCardText>Address</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9" className={styles.profile}>
                                            <MDBCardText className="text-muted">{user?.address}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBRow>
                                <MDBCol>
                                    <MDBCard className="mb-4 mb-md-0">
                                        <MDBCardBody>
                                            <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                                            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                                            </MDBProgress>

                                            <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                                            <MDBProgress className="rounded">
                                                <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                                            </MDBProgress>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}