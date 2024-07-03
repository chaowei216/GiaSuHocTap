import { Avatar } from '@mui/material'
import { Stack } from 'react-bootstrap'
import StarRateIcon from '@mui/icons-material/StarRate';
export default function FeedbackTutor() {
    return (
        <div>
            <div>
                <div style={{ marginTop: "23px", width: "100%", display: "flex" }}>
                    <div className="flex" style={{ width: "10%" }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/img/avatarMessi.png" />
                        </Stack>
                    </div>
                    <div className="flex border-b-2 pb-3" style={{ width: "90%" }}>
                        <div style={{ width: "80%" }}>
                            <p style={{ color: "#5f67f8", fontWeight: "bold" }} className="name_user">Nguyễn Phương Nam</p>
                            <p>Tay to,vui tính đáng để thuê :3
                            </p>
                        </div>
                        <div style={{ width: "30%", display: "flex", justifyContent: "end" }}>
                            <div>
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "23px", width: "100%", display: "flex" }}>
                    <div className="flex" style={{ width: "10%" }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/img/tutor.jpg" />
                        </Stack>
                    </div>
                    <div className="flex border-b-2 pb-3" style={{ width: "90%" }}>
                        <div style={{ width: "80%" }}>
                            <p style={{ color: "#5f67f8", fontWeight: "bold" }} className="name_user">Lưu Triều Vĩ</p>
                            <p>Tay to,vui tính đáng để thuê :3
                            </p>
                        </div>
                        <div style={{ width: "30%", display: "flex", justifyContent: "end" }}>
                            <div>
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "23px", width: "100%", display: "flex" }}>
                    <div className="flex" style={{ width: "10%" }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/img/avatar.png" />
                        </Stack>
                    </div>
                    <div className="flex border-b-2 pb-3" style={{ width: "90%" }}>
                        <div style={{ width: "80%" }}>
                            <p style={{ color: "#5f67f8", fontWeight: "bold" }} className="name_user">Lưu Hoàng Sơn</p>
                            <p>Bé xoài zễ thương lắm tay to nữa mọi người nên rent để cảm nhận nha ủng hộ bé nó nha</p>
                        </div>
                        <div style={{ width: "30%", display: "flex", justifyContent: "end" }}>
                            <div>
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{ marginTop: "23px", width: "100%", display: "flex" }}>
                    <div className="flex" style={{ width: "10%" }}>
                        <Stack direction="row" spacing={2}>
                            <Avatar alt="Remy Sharp" src="/img/logoScreen.png" />
                        </Stack>
                    </div>
                    <div className="flex border-b-2 pb-3" style={{ width: "90%" }}>
                        <div style={{ width: "80%" }}>
                            <p style={{ color: "#5f67f8", fontWeight: "bold" }} className="name_user">Phạm Hồng Nam</p>
                            <p>Bé Nam zễ thương lắm tay bé đc cái hài nên rent để cảm nhận nha ủng hộ bé nó nha</p>
                        </div>
                        <div style={{ width: "30%", display: "flex", justifyContent: "end" }}>
                            <div>
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                                <StarRateIcon sx={{ color: "#ff9948" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
