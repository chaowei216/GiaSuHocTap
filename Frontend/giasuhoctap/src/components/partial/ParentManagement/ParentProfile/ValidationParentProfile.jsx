import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    // fullName: Yup.string()
    //     .required('* Họ và tên là bắt buộc'),
    //     phone: Yup.string()
    //     .required("Vui lòng nhập số điện thoại")
    //     .min(10, "Số điện thoại ít nhất 10 số")
    //     .max(11, "Số điện thoại nhiều nhất 11 số") // Sửa từ "10" thành "11"
    //     .matches(
    //         /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/,
    //         "Vui lòng nhập số không nhập ký tự"
    //     ),
    // birthdate: Yup.date()
    //     .nullable()
    //     .required('* Ngày sinh là bắt buộc'),
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
    image: Yup.string()
        .required('* Vui lòng nhập ít nhất 1 ảnh'),
    password: Yup.string()
        .required('* Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .max(20, 'Mật khẩu không được quá 20 ký tự')
        .matches(
            /^(?=.*[!@#$%^&*])/,
            'Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)'
        )    
});
