import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({ setFieldValue }) {
  // const [value, setValue] = React.useState(dayjs());
  const handleDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format('DD-MM-YYYY');
    console.log(formattedDate);
    setFieldValue('dateOfBirth', formattedDate); // Cập nhật giá trị dateOfBirth trong formik
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Date of birth"
          sx={{width: "100%"}}
          // value={value}
          name='dateOfBirth'
          //onChange={(newValue) => setValue(newValue)}
          // onChange={change}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}