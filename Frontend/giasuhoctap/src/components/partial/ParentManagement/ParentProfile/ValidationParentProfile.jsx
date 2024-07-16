import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
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
    password: Yup.string()
        .required('* Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(20, 'Mật khẩu không được quá 20 ký tự')
        .matches(
            /^(?=.*[!@#$%^&*])/,
            'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)'
        )    
});
