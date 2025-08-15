import React, { useState } from ‘react’;
import { DatePicker } from ‘@mui/x-date-pickers/DatePicker’;
import { LocalizationProvider } from ‘@mui/x-date-pickers/LocalizationProvider’;
import { AdapterDateFns } from ‘@mui/x-date-pickers/AdapterDateFns’;
import { PickersCalendarHeader } from ‘@mui/x-date-pickers/PickersCalendarHeader’;
import {
Box,
Select,
MenuItem,
FormControl,
IconButton,
Typography,
TextField
} from ‘@mui/material’;
import { ChevronLeft, ChevronRight } from ‘lucide-react’;

// Custom calendar header with year and month dropdowns
const CustomCalendarHeader = (props) => {
const { currentMonth, onMonthChange, minDate, maxDate } = props;

const currentYear = currentMonth.getFullYear();
const currentMonthIndex = currentMonth.getMonth();

// Generate year options (you can customize this range)
const currentYearActual = new Date().getFullYear();
const yearOptions = Array.from(
{ length: 21 }, // 10 years back, current year, 10 years forward
(_, i) => currentYearActual - 10 + i
);

// Month options
const monthOptions = [
‘January’, ‘February’, ‘March’, ‘April’, ‘May’, ‘June’,
‘July’, ‘August’, ‘September’, ‘October’, ‘November’, ‘December’
];

const handleYearChange = (event) => {
const newYear = event.target.value;
const newDate = new Date(currentMonth);
newDate.setFullYear(newYear);
onMonthChange(newDate, ‘finish’);
};

const handleMonthChange = (event) => {
const newMonth = event.target.value;
const newDate = new Date(currentMonth);
newDate.setMonth(newMonth);
onMonthChange(newDate, ‘finish’);
};

const goToPreviousMonth = () => {
const newDate = new Date(currentMonth);
newDate.setMonth(currentMonth.getMonth() - 1);
onMonthChange(newDate, ‘finish’);
};

const goToNextMonth = () => {
const newDate = new Date(currentMonth);
newDate.setMonth(currentMonth.getMonth() + 1);
onMonthChange(newDate, ‘finish’);
};

return (
<Box
sx={{
display: ‘flex’,
alignItems: ‘center’,
justifyContent: ‘space-between’,
padding: ‘8px 16px’,
borderBottom: ‘1px solid #e0e0e0’
}}
>
<IconButton onClick={goToPreviousMonth} size="small">
<ChevronLeft size={20} />
</IconButton>

```
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
    <FormControl size="small" sx={{ minWidth: 100 }}>
      <Select
        value={currentMonthIndex}
        onChange={handleMonthChange}
        variant="standard"
        sx={{ 
          fontSize: '0.875rem',
          '& .MuiSelect-select': {
            paddingBottom: 0
          }
        }}
      >
        {monthOptions.map((month, index) => (
          <MenuItem key={month} value={index} sx={{ fontSize: '0.875rem' }}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select
        value={currentYear}
        onChange={handleYearChange}
        variant="standard"
        sx={{ 
          fontSize: '0.875rem',
          '& .MuiSelect-select': {
            paddingBottom: 0
          }
        }}
      >
        {yearOptions.map((year) => (
          <MenuItem key={year} value={year} sx={{ fontSize: '0.875rem' }}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
  
  <IconButton onClick={goToNextMonth} size="small">
    <ChevronRight size={20} />
  </IconButton>
</Box>
```

);
};

// Main component
export default function CustomDatePickerDemo() {
const [selectedDate, setSelectedDate] = useState(null);

return (
<LocalizationProvider dateAdapter={AdapterDateFns}>
<Box sx={{ padding: 4, maxWidth: 400, margin: ‘0 auto’ }}>
<Typography variant="h5" gutterBottom>
Custom MUI DatePicker
</Typography>
<Typography variant=“body2” color=“text.secondary” sx={{ mb: 3 }}>
DatePicker with separate year and month dropdowns in the calendar header
</Typography>

```
    <DatePicker
      label="Select Date"
      value={selectedDate}
      onChange={(newValue) => setSelectedDate(newValue)}
      slots={{
        calendarHeader: CustomCalendarHeader,
      }}
      slotProps={{
        textField: {
          fullWidth: true,
          variant: "outlined"
        },
        popper: {
          sx: {
            '& .MuiPaper-root': {
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }
          }
        }
      }}
    />
    
    {selectedDate && (
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2">
          Selected Date: {selectedDate.toLocaleDateString()}
        </Typography>
      </Box>
    )}
    
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Features:
      </Typography>
      <Typography variant="body2" component="div">
        • Separate Month and Year dropdowns
        <br />
        • Navigation arrows for quick month switching
        <br />
        • Customizable year range
        <br />
        • Consistent with MUI design system
      </Typography>
    </Box>
  </Box>
</LocalizationProvider>
```

);
}
