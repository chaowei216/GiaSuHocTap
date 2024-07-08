import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('* Họ và tên là bắt buộc'),
    nickname: Yup.string()
        .required('* Biệt danh là bắt buộc'),
    birthdate: Yup.date()
        .nullable()
        .required('* Ngày sinh là bắt buộc'),
    language: Yup.string()
        .required('* Ngôn ngữ là bắt buộc'),
    country: Yup.string()
        .required('* Quốc gia là bắt buộc'),
    city: Yup.string()
        .required('* Thành phố là bắt buộc'),
    gender: Yup.string()
        .required('* Giới tính là bắt buộc'),
    image: Yup.mixed()
        .required('* Vui lòng nhập ít nhất 1 ảnh')
        .test('fileSize', 'Hình ảnh quá lớn (tối đa 5MB)', (value) => {
            if (!value) return true; // allow empty values
            return value.size <= 5 * 1024 * 1024;
        })
        .test('fileType', 'Định dạng hình ảnh không hợp lệ', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        })
});
