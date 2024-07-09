import React, { useState } from 'react';
import { Badge, Stack, Popover, Typography, Box } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import styles from './Notification.module.css';

const NotifiBell = [
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget purus sed est interdum congue. ',
    color: 'red',
  },
  {
    id: 2,
    content: 'Sed eu odio nec libero sodales feugiat a nec velit. Cras vel augue nec nisl tristique luctus vitae et odio. ',
    color: 'blue',
  },
  {
    id: 3,
    content: 'Integer in quam eget eros euismod ullamcorper.',
    color: 'purple',
  },
  {
    id: 4,
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ',
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
        sx={{ marginTop: '10px' }}
      >
        <Box sx={{ p: 2 }}>
          {NotifiBell.map((item) => (
            <Typography key={item.id} sx={{ width: '350px', borderBottom: '1px solid #4dccda', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <FiberManualRecordIcon sx={{ color: item.color, marginRight: '10px', fontSize: '12px' }} />
              <span>{item.content}</span>
            </Typography>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
