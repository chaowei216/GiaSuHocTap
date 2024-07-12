import React, { useState, useEffect } from 'react';
import { Badge, Stack, Popover, Typography, Box } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { GetUserNotification } from '../../../../api/UserNotificationApi'; // Import hàm API từ file của bạn
import useAuth from '../../../../hooks/useAuth';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.userId) {
        try {
          const data = await GetUserNotification(user.userId);
          const sortedNotifications = data.data.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
          setNotifications(sortedNotifications);

          // Cập nhật số lượng thông báo chưa đọc từ localStorage
          const storedViewedNotifications = JSON.parse(localStorage.getItem('viewedNotifications') || '[]');
          const unreadCount = sortedNotifications.filter(notification => !storedViewedNotifications.includes(notification.notificationId)).length;
          setUnreadCount(unreadCount);
        } catch (err) {
          console.error('Failed to fetch notifications:', err);
        }
      }
    };

    fetchNotifications();

    // Thiết lập một interval để kiểm tra thông báo mới mỗi phút
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 500); // 60000ms = 1 phút

    return () => clearInterval(intervalId); // Clear interval khi component bị unmount
  }, [user?.userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    // Lưu các thông báo đã xem vào localStorage
    const viewedNotifications = notifications.map(notification => notification.notificationId);
    localStorage.setItem('viewedNotifications', JSON.stringify(viewedNotifications));

    // Đặt số thông báo về 0 khi click vào biểu tượng
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getIconColor = (type) => {
    switch (type) {
      case 'System':
        return '#4DA8DA'; // Màu xanh cho System
      case 'Info':
        return '#4caf50'; // Màu xanh lá cho Info
      case 'Warning':
        return '#ffc107'; // Màu vàng cho Warning
      case 'Error':
        return '#f44336'; // Màu đỏ cho Error
      default:
        return '#000000';
    }
  };

  return (
    <>
      <Stack sx={{ marginRight: '20px' }} spacing={2} direction="row">
        <Badge badgeContent={unreadCount} color="error">
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
        <Box sx={{ p: 2, maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.map((notification, index) => (
            <Typography
              key={notification.notificationId}
              sx={{
                width: '350px',
                borderBottom: '1px solid #4dccda',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                ...(index >= 10 && { display: 'none' }), // Ẩn các thông báo vượt quá 10
              }}
            >
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <FiberManualRecordIcon sx={{ marginRight: '10px', fontSize: '18px', color: getIconColor(notification.notificationType) }} />
                <div>
                  <Typography variant="body1" sx={{ marginBottom: '4px' }}>
                    {notification.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(notification.createdTime).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
