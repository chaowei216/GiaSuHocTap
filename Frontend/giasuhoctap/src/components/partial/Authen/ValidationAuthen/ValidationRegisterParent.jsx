import * as yup from "yup";
import moment from "moment";
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const dateFormat = "YYYY/MM/DD";
function isValidDate(date, format) {
  return moment(date, format).isValid();
}
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);

export const validationRegisterParent = yup.object().shape({
  firstName: yup
    .string()
    .required("Vui lòng nhập tên")
    .max(20, "Không được quá 20 ký tự")
    .matches(/^[\p{L}\s.'-]+$/u, "Vui lòng nhập chữ"),
  lastName: yup
    .string()
    .required("Vui lòng nhập họ")
    .max(20, "Không được quá 20 ký tự")
    .matches(/^[\p{L}\s.'-]+$/u, "Vui lòng nhập chữ"),
  email: yup
    .string()
    .email("Vui lòng nhập email theo dạng @gmail.com")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu ít nhất là 8 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Số điện thoại ít nhất 10 số")
    .max(11, "Số điện thoại nhiều nhất 10 số")
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/,
      "Vui lòng nhập số không nhập ký tự"
    ),
  dateOfBirth: yup
    .string()
    .required("Vui lòng nhập ngày"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  city: yup.string().required("Vui lòng chọn thành phố"),
  district: yup.string().required("Vui lòng điền quận"),
  address: yup
    .string()
    .min(5, "Địa chỉ có ít nhất 5 ký tự")
    .max(70, "Địa chỉ nhiều nhất là 70 ký tự")
    .required("Vui lòng nhập địa chỉ"),
});
