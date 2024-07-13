import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { GetAllTimeTableByEmail, UpdateTimetable } from '../../../api/TimetableApi';
import { toast } from 'react-toastify';

const timeSlots = [
    "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];
const daysOfWeek = [
    { label: "Thứ Hai", value: "Monday" },
    { label: "Thứ Ba", value: "Tuesday" },
    { label: "Thứ Tư", value: "Wednesday" },
    { label: "Thứ Năm", value: "Thursday" },
    { label: "Thứ Sáu", value: "Friday" },
    { label: "Thứ Bảy", value: "Saturday" }
];

const BookingTimePicker = ({ dataDetail, email, setIsCreated, isCreated, setOpenDetail }) => {
    const [data, setData] = useState([]);
    const [list, setList] = useState({});
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [period, setPeriod] = useState('');

    useEffect(() => {
        if (email) {
            const getAllTimetable = async () => {
                const response = await GetAllTimeTableByEmail(email);
                if (response.ok) {
                    const responseJson = await response.json();
                    const data = responseJson.data.data;
                    setData(data);
                } else {
                    toast.error("Lỗi server");
                }
            };
            getAllTimetable();
        }
    }, [email]);

    useEffect(() => {
        setList(dataDetail);
        setDayOfWeek(dataDetail.dayOfWeek);
        setStartTime(dataDetail.startTime);
        setEndTime(dataDetail.endTime);
        setPeriod(dataDetail.period);
    }, [dataDetail]);

    const handleDayOfWeekChange = (event) => {
        setDayOfWeek(event.target.value);
        setStartTime('');
        setEndTime('');
        setPeriod('');
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
        setEndTime('');
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const getAvailableStartTimes = () => {
        return timeSlots.filter((time) => {
            return !data.some(slot => slot.dayOfWeek === dayOfWeek && slot.startTime === time && slot.startTime !== list.startTime);
        });
    };

    const getAvailableEndTimes = () => {
        const startTimeIndex = timeSlots.indexOf(startTime);

        let availableEndTimes = timeSlots.slice(startTimeIndex + 1).filter((time) => {
            return !data.some(slot => slot.dayOfWeek === dayOfWeek && slot.startTime === startTime && slot.endTime === time);
        });

        if (dataDetail.endTime && !availableEndTimes.includes(dataDetail.endTime)) {
            availableEndTimes.push(dataDetail.endTime);
            availableEndTimes = availableEndTimes.sort((a, b) => timeSlots.indexOf(a) - timeSlots.indexOf(b));
        }

        return availableEndTimes;
    };

    const handleSubmit = async () => {
        // if (!isTimeSlotTaken(startTime, endTime)) {
        //     alert(`Booked from ${startTime} to ${endTime}`);
        // } else {
        //     alert('Time slot is not available');
        // }
        console.log(dataDetail);
        if (dataDetail) {
            const dataUpdate = {
                dayOfWeek: dayOfWeek,
                startTime: startTime,
                endTime: endTime,
                period: period
            }
            const response = await UpdateTimetable(dataDetail?.timeTableId, dataUpdate)
            if (response.ok) {
                const responseJson = await response.json();
                if (responseJson.statusCode == 200) {
                    toast.success("Thay đổi thành công")
                    setIsCreated(!isCreated)
                    setOpenDetail(false)
                }
            }
        }
    };

    // const isTimeSlotTaken = (start, end) => {
    //     return data.some(slot => slot.dayOfWeek === dayOfWeek && slot.startTime === start && slot.endTime === end);
    // };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel>Chọn Ngày</InputLabel>
                <Select
                    value={dayOfWeek}
                    label="Chọn Ngày"
                    onChange={handleDayOfWeekChange}
                >
                    {daysOfWeek.map((day) => (
                        <MenuItem key={day.value} value={day.value}>
                            {day.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '16px' }}>
                <InputLabel>Giờ bắt đầu</InputLabel>
                <Select
                    value={startTime}
                    label="Giờ bắt đầu"
                    onChange={handleStartTimeChange}
                    disabled={!dayOfWeek}
                >
                    {getAvailableStartTimes().map((time) => (
                        <MenuItem key={time} value={time}>
                            {time}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '16px' }}>
                <InputLabel>Giờ kết thúc</InputLabel>
                <Select
                    value={endTime}
                    label="Giờ kết thúc"
                    onChange={handleEndTimeChange}
                    disabled={!startTime}
                >
                    {getAvailableEndTimes().map((time) => (
                        <MenuItem key={time} value={time}>
                            {time}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '16px' }}>
                <InputLabel>Buổi</InputLabel>
                <Select
                    value={period}
                    label="Buổi"
                    onChange={(event) => setPeriod(event.target.value)}
                >
                    <MenuItem key={1} value="Sáng">
                        Sáng
                    </MenuItem>
                    <MenuItem key={2} value="Trưa">
                        Trưa
                    </MenuItem>
                    <MenuItem key={3} value="Chiều">
                        Chiều
                    </MenuItem>
                    <MenuItem key={4} value="Tối">
                        Tối
                    </MenuItem>
                </Select>
            </FormControl>
            <div className='flex justify-end'>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!startTime || !endTime}
                    style={{ marginTop: '16px' }}
                >
                    Thay đổi
                </Button>
            </div>
        </div>
    );
};

export default BookingTimePicker;
