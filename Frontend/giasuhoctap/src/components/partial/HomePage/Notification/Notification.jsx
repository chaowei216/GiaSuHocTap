import React, { useState } from 'react';
import { Badge, Stack, Popover, Typography, Box } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const NotifiBell = [
  {
    id: 1,
    content: 'Thông báo 1',
    color: 'red',
  },
  {
    id: 2,
    content: 'Thông báo 2',
    color: 'blue',
  },
  {
    id: 3,
    content: 'Thông báo 3',
    color: 'purple',
  },
  {
    id: 4,
    content: 'Thông báo 4',
    color: 'yellow',
  },
];

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(NotifiBell.length);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotificationCount(0); // Đặt số thông báo về 0 khi click vào biểu tượng
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
      >
        <Box sx={{ p: 2}}>
          {NotifiBell.map((item) => (
            <Typography key={item.id} sx={{ color: item.color }}>
              {item.content}
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
