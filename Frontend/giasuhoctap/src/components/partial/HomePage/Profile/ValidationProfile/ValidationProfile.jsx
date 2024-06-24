import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    youtubeLink: Yup.string().url('URL không hợp lệ').required('Bắt buộc'),
    teachingMode: Yup.string().required('Bắt buộc'),
    selectedSubjects: Yup.array().min(1, 'Chọn ít nhất một môn học'),
    selectedClasses: Yup.array().min(1, 'Chọn ít nhất một lớp học'),
    selectedDayOfWeekOnline: Yup.array().min(1, 'Chọn ít nhất một ngày để dạy online'),
    selectedDayOfWeekOffline: Yup.array().when('teachingMode', {
        is: 'both',
        then: Yup.array().min(1, 'Chọn ít nhất một ngày để dạy offline'),
        otherwise: Yup.array(),
    }),
    selectedTime: Yup.array().min(1, 'Chọn ít nhất một thời gian dạy'),
});
