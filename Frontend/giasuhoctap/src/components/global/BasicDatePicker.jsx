import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText, makeStyles } from '@mui/material';
import styles from "../global/DatePicker.module.css";
export default function DatePickerValue({ setFieldValue, formik }) {
  // const [value, setValue] = React.useState(dayjs());
  const [touched, setTouched] = React.useState(false);

  const handleDateChange = (newValue) => {
    const formattedDate = dayjs(newValue).format('DD-MM-YYYY');
    console.log(formattedDate);
    setFieldValue('dateOfBirth', formattedDate); // Cập nhật giá trị dateOfBirth trong formik
    setTouched(true);
  };
  console.log(formik);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Ngày tháng năm sinh"
          sx={{ width: "100%" }}
          name='dateOfBirth'
          className={(!!formik.errors.dateOfBirth)  ? styles.test : ''}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              helperText: (touched && !!formik.errors.dateOfBirth) && `${formik.errors.dateOfBirth}`
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}