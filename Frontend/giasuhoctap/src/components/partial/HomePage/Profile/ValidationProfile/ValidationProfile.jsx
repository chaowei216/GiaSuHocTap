import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    youtubeLink: Yup.string().url('Liên kết Youtube không hợp lệ'),
    teachingMode: Yup.boolean().oneOf([true], 'Vui lòng chọn hình thức dạy').required('Vui lòng chọn hình thức dạy'),
    selectedSubjects: Yup.array().min(1, 'Vui lòng chọn ít nhất một môn học'),
    selectedClasses: Yup.array().min(1, 'Vui lòng chọn ít nhất một lớp học'),
    selectedDayOfWeekOnline: Yup.array().min(1, 'Vui lòng chọn ít nhất một ngày dạy online'),
    selectedDayOfWeekOffline: Yup.array().when('teachingMode', {
        is: true,
        then: Yup.array().min(1, 'Vui lòng chọn ít nhất một ngày dạy offline')
    })
});
