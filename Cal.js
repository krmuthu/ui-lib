import * as React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

interface CustomDatePickerProps extends Omit<DatePickerProps<Date>, 'onChange' | 'value'> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  textFieldProps?: React.ComponentProps<typeof TextField>;
}

const RedWeekendDay = (props: PickersDayProps<Date>) => {
  const isWeekend = props.day.getDay() === 0 || props.day.getDay() === 6;
  return (
    <PickersDay
      {...props}
      sx={{
        ...(props.sx || {}),
        color: isWeekend ? 'red' : undefined,
      }}
    />
  );
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  minDate = new Date(2000, 0, 1),
  maxDate = new Date(new Date().getFullYear() + 10, 11, 31),
  label = 'Date',
  textFieldProps,
  ...props
}) => {
  const [year, setYear] = React.useState(value ? value.getFullYear() : new Date().getFullYear());
  const [month, setMonth] = React.useState(value ? value.getMonth() : new Date().getMonth());

  // Generate years from minDate to maxDate
  const minYear = minDate.getFullYear();
  const maxYear = maxDate.getFullYear();
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  // Generate months based on selected year and min/max
  const months = Array.from({ length: 12 }, (_, i) => i).filter((m) => {
    if (year === minYear && m < minDate.getMonth()) return false;
    if (year === maxYear && m > maxDate.getMonth()) return false;
    return true;
  });

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as number;
    setYear(newYear);
    // Clamp month if out of range for new year
    let newMonth = month;
    if (newYear === minYear && month < minDate.getMonth()) newMonth = minDate.getMonth();
    if (newYear === maxYear && month > maxDate.getMonth()) newMonth = maxDate.getMonth();
    setMonth(newMonth);
    const newDate = new Date(newYear, newMonth, 1);
    onChange(newDate);
  };

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as number;
    setMonth(newMonth);
    const newDate = new Date(year, newMonth, 1);
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
      minDate={minDate}
      maxDate={maxDate}
      enableAccessibleFieldDOMStructure={false}
      slots={{
        textField: (params) => (
          <TextField
            {...params}
            {...textFieldProps}
            label={label}
            fullWidth
          />
        ),
        openPickerIcon: () => null,
        calendarHeader: (calendarHeaderProps) => (
          <>
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} p={2}>
              <FormControl size="small">
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  value={year}
                  label="Year"
                  onChange={handleYearChange}
                >
                  {years.map((y) => (
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
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>{new Date(0, m).toLocaleString('default', { month: 'long' })}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" gap={2} pb={1}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Box key={day} width={36} textAlign="center" fontWeight="bold">{day}</Box>
              ))}
            </Box>
          </>
        ),
        day: RedWeekendDay,
      }}
      slotProps={{
        calendar: {
          sx: { p: 3 }, // 24px padding
        },
      }}
    />
  );
};

export default CustomDatePicker;
