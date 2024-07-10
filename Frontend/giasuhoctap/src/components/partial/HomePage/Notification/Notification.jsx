import React, { useState, useEffect } from 'react';
import { Badge, Stack, Popover, Typography, Box } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { GetUserNotification } from '../../../../api/UserNotificationApi'; // Import hàm API từ file của bạn
import useAuth from '../../../../hooks/useAuth';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.userId) {
        try {
          const data = await GetUserNotification(user.userId);
          const sortedNotifications = data.data.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
          // Lấy 3 thông báo mới nhất bằng cách đảo ngược danh sách đã sắp xếp và lấy 3 phần tử đầu tiên
          const latestNotifications = sortedNotifications.slice(0, 3);
          setNotifications(latestNotifications);

          // Lấy số lượng thông báo chưa xem từ localStorage
          const storedCount = localStorage.getItem('notificationCount');
          if (storedCount) {
            setNotificationCount(parseInt(storedCount, 10));
          } else {
            setNotificationCount(data.data.length); // Cập nhật số lượng thông báo
          }
        } catch (err) {
          console.error('Failed to fetch notifications:', err);
        }
      }
    };

    fetchNotifications();
  }, [user?.userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // Đặt số thông báo về 0 khi click vào biểu tượng và lưu vào localStorage
    setNotificationCount(0);
    localStorage.setItem('notificationCount', '0');

    console.log("userId", user?.userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Stack sx={{ marginRight: "20px" }} spacing={2} direction="row">
        <Badge badgeContent={notificationCount} color="default">
          <NotificationsNoneOutlinedIcon onClick={handleClick} color="white" />
        </Badge>
      </Stack>
      <Popover
        id="popover-basic"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ marginTop: '10px' }}
      >
        <Box sx={{ p: 2 }}>
          {notifications.map((notification) => (
            <Typography key={notification.notificationId} sx={{ width: '350px', borderBottom: '1px solid #4dccda', marginBottom: '8px', display: 'flex', alignItems: 'flex-start' }}>
            {/* <FiberManualRecordIcon sx={{ marginRight: '10px', fontSize: '12px' }} /> */}
            <div style={{ flexGrow: 1 }}>
              <Typography variant="body1" sx={{ marginBottom: '4px' }}>
                {notification.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(notification.createdTime).toLocaleString()}
              </Typography>
            </div>
          </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;