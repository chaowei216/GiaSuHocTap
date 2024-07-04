import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('* Họ và tên là bắt buộc'),
        phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .min(10, "Số điện thoại ít nhất 10 số")
        .max(11, "Số điện thoại nhiều nhất 11 số") // Sửa từ "10" thành "11"
        .matches(
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/,
            "Vui lòng nhập số không nhập ký tự"
        ),
    birthdate: Yup.date()
        .nullable()
        .required('* Ngày sinh là bắt buộc'),
    city: Yup.string()
        .required('* Thành phố là bắt buộc'),
        district: Yup.string()
        .required('* Quận/ Huyện là bắt buộc'),
    address: Yup.string()
        .min(5, "Địa chỉ có ít nhất 5 ký tự")
        .max(70, "Địa chỉ nhiều nhất là 70 ký tự")
        .required("Vui lòng nhập địa chỉ"),
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
