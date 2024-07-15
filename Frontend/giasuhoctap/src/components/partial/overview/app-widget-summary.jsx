import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from '../../../utils/format-number';

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && (
        <Box sx={{ width: 64, height: 64, fontSize: 32, paddingLeft: '30px', color: '#4DA8DA' }}>
          {icon}
        </Box>
      )}

      <Stack spacing={0.5}>
        <Typography variant="h4" sx={{ color: '#4DA8DA', paddingLeft: '25px', fontSize: '25px' }}>
          {fShortenNumber(total)}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: '20px', paddingLeft: '5px' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number.isRequired, // Ensure total is required and should be a number
};
