import * as React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface CustomDatePickerProps extends Omit<DatePickerProps<Date>, 'onChange' | 'value'> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minYear?: number;
  maxYear?: number;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  minYear = 2000,
  maxYear = new Date().getFullYear() + 10,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(value ? value.getFullYear() : new Date().getFullYear());
  const [month, setMonth] = React.useState(value ? value.getMonth() : new Date().getMonth());

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as number;
    setYear(newYear);
    const newDate = new Date(year, month, 1);
    newDate.setFullYear(newYear);
    onChange(newDate);
  };

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as number;
    setMonth(newMonth);
    const newDate = new Date(year, month, 1);
    newDate.setMonth(newMonth);
    onChange(newDate);
  };

  React.useEffect(() => {
    if (value) {
      setYear(value.getFullYear());
      setMonth(value.getMonth());
    }
  }, [value]);

  return (
    <DatePicker
      {...props}
      value={value}
      onChange={onChange}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      slots={{
        textField: (params) => <TextField {...params} onClick={() => setOpen(true)} />,
        // Custom dropdowns above calendar
        openPickerIcon: () => null,
        // Remove default icon
        calendarHeader: (calendarHeaderProps) => (
          <Box display="flex" justifyContent="center" alignItems="center" gap={2} p={2}>
            <FormControl size="small">
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                value={month}
                label="Month"
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, i) => i).map((m) => (
                  <MenuItem key={m} value={m}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ),
      }}
    />
  );
};

export default CustomDatePicker;
