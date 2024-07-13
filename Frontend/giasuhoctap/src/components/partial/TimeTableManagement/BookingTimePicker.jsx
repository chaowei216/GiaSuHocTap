import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
    OutlinedInput,
    FormControl,
    InputLabel,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { GetAllClass, GetAllCourse } from '../../../api/ResigerTutorApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const DayOfWeekOptions = [
    { label: 'Sáng Thứ 2', value: ['Monday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 2', value: ['Monday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 2', value: ['Monday', 'Evening', '18-21'] },
    { label: 'Sáng Thứ 3', value: ['Tuesday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 3', value: ['Tuesday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 3', value: ['Tuesday', 'Evening', '18-21'] },
    { label: 'Sáng Thứ 4', value: ['Wednesday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 4', value: ['Wednesday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 4', value: ['Wednesday', 'Evening', '18-21'] },
    { label: 'Sáng Thứ 5', value: ['Thursday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 5', value: ['Thursday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 5', value: ['Thursday', 'Evening', '18-21'] },
    { label: 'Sáng Thứ 6', value: ['Friday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 6', value: ['Friday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 6', value: ['Friday', 'Evening', '18-21'] },
    { label: 'Sáng Thứ 7', value: ['Saturday', 'Morning', '8-12'] },
    { label: 'Chiều Thứ 7', value: ['Saturday', 'Afternoon', '13-17'] },
    { label: 'Tối Thứ 7', value: ['Saturday', 'Evening', '18-21'] },
];

function getStyles(day, selectedDays, theme) {
    return {
        fontWeight:
            selectedDays.indexOf(day) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const BookingTimePicker = () => {
    const theme = useTheme();
    const [teachingMode, setTeachingMode] = useState(false);
    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedDayOfWeekOnline, setSelectedDayOfWeekOnline] = useState([]);
    const [selectedDayOfWeekOffline, setSelectedDayOfWeekOffline] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { user } = useAuth();
    const [formErrors, setFormErrors] = useState({
        teachingMode: '',
        selectedDayOfWeekOnline: '',
        selectedDayOfWeekOffline: '',
        selectedSubjects: '',
        selectedClasses: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const data = await GetAllClass();
                if (data.statusCode == 200) setClasses(data.data);
            } catch (error) {
                console.error('Lỗi sever');
            }
        };

        const fetchCourses = async () => {
            try {
                const data = await GetAllCourse();
                if (data.statusCode == 200) setCourses(data.data);
            } catch (error) {
                console.error('Lỗi sever:');
            }
        };

        fetchClasses();
        fetchCourses();
    }, []);

    const handleTeachingModeChange = (event) => {
        setTeachingMode(event.target.value === 'both');
    };

    const handleDayChange = (event, setState) => {
        const { target: { value } } = event;
        const filteredValues = value.filter(val => val !== null && val !== undefined && val !== '');
        setState(filteredValues);
        setFormErrors({
            ...formErrors,
            selectedDayOfWeekOnline: '',
            selectedDayOfWeekOffline: ''
        })
    };

    const handleCheckboxChange = (event, setState, state) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) { // Kiểm tra xem giá trị có phải là số hợp lệ không
            setState(event.target.checked ? [...state, value] : state.filter(item => item !== value));
        }
        setFormErrors({
            ...formErrors,
            selectedClasses: '',
            selectedSubjects: ''
        })
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            teachingMode: '',
            selectedDayOfWeekOnline: '',
            selectedDayOfWeekOffline: '',
            selectedSubjects: '',
            selectedClasses: ''
        };

        if (selectedDayOfWeekOnline.length === 0) {
            errors.selectedDayOfWeekOnline = 'Vui lòng chọn ít nhất một ngày dạy online.';
            valid = false;
        }

        if (teachingMode && selectedDayOfWeekOffline.length === 0) {
            errors.selectedDayOfWeekOffline = 'Vui lòng chọn ít nhất một ngày dạy offline.';
            valid = false;
        }

        if (selectedSubjects.length === 0) {
            errors.selectedSubjects = 'Vui lòng chọn ít nhất một môn dạy.';
            valid = false;
        }

        if (selectedClasses.length === 0) {
            errors.selectedClasses = 'Vui lòng chọn ít nhất một lớp dạy.';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const updateTutor = {
                tutorId: user?.userId,
                subjects: selectedSubjects,
                classes: selectedClasses,
                isOfflineTeaching: teachingMode,
                dayOfWeekOnline: selectedDayOfWeekOnline,
                dayOfWeekOffline: selectedDayOfWeekOffline,
            };
            console.log(updateTutor);
            // try {
            //     const response = await UpdateTutor(updateTutor);
            //     if (response.ok) {
            //         const responseJson = await response.json();
            //         if (responseJson.statusCode === 400) {
            //             setFormErrors({ ...formErrors, global: responseJson.message });
            //         } else {
            //             toast.success('Cập nhật thành công');
            //             navigate("/");
            //         }
            //     } else {
            //         toast.error('Lỗi server');
            //     }
            // } catch (error) {
            //     toast.error('Lỗi server');
            // }
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>Cập nhật thông tin gia sư</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="teaching-mode-label">Hình thức dạy</InputLabel>
                        <Select
                            labelId="teaching-mode-label"
                            value={teachingMode ? 'both' : 'online'}
                            onChange={handleTeachingModeChange}
                            label="Hình thức dạy"
                        >
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="both">Cả Online và Offline</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Typography sx={{ mb: 2 }} variant="h6">Thời gian dạy online</Typography>
                <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="day-of-week-online-label">Chọn ngày</InputLabel>
                        <Select
                            labelId="day-of-week-online-label"
                            multiple
                            value={selectedDayOfWeekOnline}
                            onChange={(event) => handleDayChange(event, setSelectedDayOfWeekOnline)}
                            input={<OutlinedInput id="select-multiple-chip" label="Chọn ngày" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value, index) => (
                                        <Chip key={index} label={DayOfWeekOptions.find(day => JSON.stringify(day.value) === JSON.stringify(value)).label} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {DayOfWeekOptions.map((day, index) => (
                                <MenuItem key={index} value={day.value} style={getStyles(day.value, selectedDayOfWeekOnline, theme)}>
                                    {day.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {formErrors.selectedDayOfWeekOnline && <div className='mt-2 text-red-500'>{formErrors.selectedDayOfWeekOnline}</div>}
                </Box>

                {teachingMode && (
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ mb: 2 }} variant="h6">Thời gian dạy offline</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="day-of-week-offline-label">Chọn ngày</InputLabel>
                            <Select
                                labelId="day-of-week-offline-label"
                                multiple
                                value={selectedDayOfWeekOffline}
                                onChange={(event) => handleDayChange(event, setSelectedDayOfWeekOffline)}
                                input={<OutlinedInput id="select-multiple-chip" label="Chọn ngày" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value, index) => (
                                            <Chip key={index} label={DayOfWeekOptions.find(day => JSON.stringify(day.value) === JSON.stringify(value)).label} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {DayOfWeekOptions.map((day, index) => (
                                    <MenuItem key={index} value={day.value} style={getStyles(day.value, selectedDayOfWeekOffline, theme)}>
                                        {day.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {formErrors.selectedDayOfWeekOffline && <div className='mt-2 text-red-500'>{formErrors.selectedDayOfWeekOffline}</div>}
                    </Box>
                )}

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Chọn các môn dạy</Typography>
                    {courses && courses.map((course) => (
                        <FormControlLabel
                            key={course.courseId}
                            control={
                                <Checkbox
                                    value={course.courseId}
                                    checked={selectedSubjects.includes(course.courseId)}
                                    onChange={(event) => handleCheckboxChange(event, setSelectedSubjects, selectedSubjects)}
                                />
                            }
                            label={course.courseName}
                        />
                    ))}
                    {formErrors.selectedSubjects && <div className='mt-2 text-red-500'>{formErrors.selectedSubjects}</div>}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Chọn các lớp dạy</Typography>
                    {classes && classes.map((cls) => (
                        <FormControlLabel
                            key={cls.classId}
                            control={
                                <Checkbox
                                    value={cls.classId}
                                    checked={selectedClasses.includes(cls.classId)}
                                    onChange={(event) => handleCheckboxChange(event, setSelectedClasses, selectedClasses)}
                                />
                            }
                            label={cls.className}
                        />
                    ))}
                    {formErrors.selectedClasses && <div className='mt-2 text-red-500'>{formErrors.selectedClasses}</div>}
                </Box>
                <div className='flex justify-end'>
                    <Button className='mt-2' variant="contained" color="primary" onClick={handleSubmit}>Cập nhật</Button>
                </div>
            </Box>
        </Box>
    );
};

export default BookingTimePicker;
