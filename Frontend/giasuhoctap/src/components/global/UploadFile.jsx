import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ setFieldValue, formik, content, fieldName, size = 1 }) {
  const [selectedFile, setSelectedFile] = React.useState([]);
  // const handleFileInputChange = (event) => {
  //   const file = event.target.files[0];
  //   setFieldValue('image', file.name);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setSelectedFile(reader.result);
  //   };
  //   setSelectedFile(event.target.files[0]);
  // };
  const fileNamesRef = React.useRef([]);
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const promises = [];
    const maxSize = size; // Số lượng file tối đa được chọn 
    // Kiểm tra số lượng tệp đã chọn, nếu vượt quá số lượng tối đa cho phép thì thông báo lỗi
    if (selectedFile.length + 1 > size) {
      alert("Please stop");
      return;
    }
    // Thực hiện xử lý tệp và tạo các hứa (promises)
    // Sau đó cập nhật giá trị của các trường tương ứng trong formik bằng hàm setFieldValue

    // Kiểm tra và thực hiện cập nhật giá trị cho trường imageUser, imageCertificate, hoặc imageIdentity
    if (fieldName === "imageUser" || fieldName === "imageCertificate" || fieldName === "imageIdentity") {
      const fileNames = [];
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        console.log(fileName);
        // Kiểm tra xem tên file đã tồn tại trong mảng fileNamesRef.current chưa
        if (!fileNamesRef.current.includes(fileName)) {
          fileNamesRef.current.push(fileName);
        }
      }
      // Cập nhật giá trị của trường tương ứng trong formik
      setFieldValue(fieldName, fileNamesRef.current);

      // Tiến hành đọc và xử lý các tệp được chọn
      for (let i = 0; i < files.length && i < maxSize; i++) {
        const file = files[i];
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
        reader.readAsDataURL(file);
        promises.push(promise);
      }

      // Xử lý hứa (promises) và cập nhật giá trị của các tệp được chọn
      Promise.all(promises)
        .then((results) => {
          setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, ...results]);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  };
  const handleDeleteImage = (index) => {
    setSelectedFile((prevSelectedFiles) => {
      const updatedFiles = [...prevSelectedFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    fileNamesRef.current = fileNamesRef.current.filter(f => f != fileNamesRef.current[index]);
    setFieldValue(fieldName, fileNamesRef.current);
  }
  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {content}
        <VisuallyHiddenInput type="file" onChange={handleFileInputChange} multiple />
      </Button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: "10px" }}>
        {selectedFile && selectedFile.map((file, index) => (
          <div key={index + 1} style={{ position: 'relative' }}>
            <img
              key={index}
              width="100%"
              style={{
                width: 100,
                height: 100,
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              alt={`Image ${index}`}
              src={file}
            />
            <button
              style={{ position: 'absolute', top: 0, right: 0, padding: '3px', background: 'red', color: 'white', border: 'none', borderRadius: '50%' }}
              onClick={() => handleDeleteImage(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
