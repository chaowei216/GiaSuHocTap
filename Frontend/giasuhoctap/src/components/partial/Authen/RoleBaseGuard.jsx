import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
  status: PropTypes.string
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const { user } = useAuth()
  const role = user?.roleName;
  return role || "Null";
};

const useCurrentStatus = () => {
  // Logic here to get current user role
  const { user } = useAuth()
  const status = user?.status;
  return status || "Pending";
};

export default function RoleBasedGuard({ accessibleRoles, children, status = "Active" }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  const currentRole = useCurrentRole();
  const currentStatus = useCurrentStatus();
  if ((!accessibleRoles.includes(currentRole)) || (currentStatus !== status)) {
    return (
      <div style={{ background: "#f1f5f9", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Alert style={{ fontSize: "20px" }} severity="error">
          <AlertTitle style={{ fontSize: "20px" }}>Quyền truy cập bị từ chối</AlertTitle>
          Bạn không có quyền để truy cập địa chỉ này
          <AlertTitle style={{ fontSize: "20px", marginTop: "15px" }}>
            <Button onClick={handleClick}>Trở về trang chủ</Button>
          </AlertTitle>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}