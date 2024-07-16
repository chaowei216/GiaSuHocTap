import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBRow,
    MDBCol,
    MDBCardText,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import { TextField, Button, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { GetAllUser } from '../../../api/TutorManagementApi';
import useAuth from '../../../hooks/useAuth';
import { CreateNewByModerator } from '../../../api/NewsApi';

export default function CreateNew(props) {
    const { centredModal, setCentredModal, isCreated, setIsCreated } = props;
    const [listUser, setListUser] = useState([]);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState({});
    const { user } = useAuth();
    const [currentTime, setCurrentTime] = useState(new Date());
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    useEffect(() => {
        const getAllUser = async () => {
            const response = await GetAllUser();
            if (response.ok) {
                const responseJson = await response.json();
                const data = responseJson.data.data;
                setListUser(data);
            } else {
                toast.error('Lỗi server');
            }
        };
        getAllUser();
    }, []);

    const handleSave = async () => {
        let flag = true;
        if (!description) {
            setErrors((prevState) => ({
                ...prevState,
                description: 'Vui lòng nhập mô tả',
            }));
            flag = false;
        }
        if (!title) {
            setErrors((prevState) => ({
                ...prevState,
                title: 'Vui lòng nhập tiêu đề',
            }));
            flag = false;
        }
        if (!image) {
            setErrors((prevState) => ({
                ...prevState,
                image: 'Vui lòng chọn ảnh',
            }));
            flag = false;
        }
        if (flag) {
            if (user) {
                const formData = new FormData();
                formData.append('Description', description);
                formData.append('Title', title);
                formData.append('Image', "test");
                formData.append('imageFile', image);
                formData.append('CreateDate', formattedTime);
                formData.append('userId', user?.userId);
                console.log(formData.get('image'));
                const response = await CreateNewByModerator(formData);
                if (response.ok) {
                    const responseJson = await response.json();
                    if (responseJson.statusCode === 201) {
                        toast.success('Tạo tin tức thành công');
                        setIsCreated(!isCreated);
                        setCentredModal(false);
                    } else {
                        toast.error(responseJson.message);
                    }
                } else {
                    toast.error('Lỗi server');
                }
            }
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors((prevState) => ({
            ...prevState,
            image: null,
        }));
    };

    return (
        <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle style={{ fontSize: "20px" }}>Tạo tin tức mới</MDBModalTitle>
                        <MDBBtn
                            className='btn-close'
                            color='none'
                            onClick={() => setCentredModal(false)}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBRow
                            key={1}
                            style={{
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                            }}
                        >
                            <MDBCol sm='3' className={`font-bold`}>
                                <MDBCardText>Người tạo: </MDBCardText>
                            </MDBCol>
                            <MDBCol sm='9'>
                                <MDBCardText>{user?.fullname}</MDBCardText>
                            </MDBCol>
                        </MDBRow>
                        <TextField
                            fullWidth
                            label='Tiêu đề'
                            variant='outlined'
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                                setErrors((prevState) => ({
                                    ...prevState,
                                    title: null,
                                }));
                            }}
                            error={!!errors.title}
                            helperText={errors.title}
                            style={{ marginBottom: '16px', marginTop: "20px" }}
                        />
                        <MDBTextArea
                            fullWidth
                            placeholder="Mô tả"
                            rows={3}
                            id="textAreaExample"
                            contrast
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                                setErrors((prevState) => ({
                                    ...prevState,
                                    description: null,
                                }));
                            }}
                            error={!!errors.description}
                            helperText={errors.description}
                            style={{ marginBottom: '16px', marginTop: "20px" }}
                        />
                        <Box>
                            <Button
                                variant='contained'
                                component='label'
                                sx={{ marginBottom: '16px' }}
                            >
                                Chọn ảnh
                                <input
                                    type='file'
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {errors.image && (
                                <Box sx={{ color: "red", marginLeft: "6px" }}>{errors.image}</Box>
                            )}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ maxWidth: '200px', marginTop: '14px' }}
                                />
                            )}
                        </Box>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => setCentredModal(false)}
                        >
                            Đóng
                        </Button>
                        <Button
                            variant='contained'
                            sx={{ ml: 2 }}
                            onClick={handleSave}
                        >
                            Lưu
                        </Button>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}