limport React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CustomDatePicker from './CustomDatePicker';

describe('CustomDatePicker', () => {
  it('renders and allows selecting year, month, and day, updating MUI state', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          value={new Date(2023, 4, 15)}
          onChange={handleChange}
          minDate={new Date(2020, 0, 1)}
          maxDate={new Date(2025, 11, 31)}
          label="Test Date"
        />
      </LocalizationProvider>
    );

    // Input should be rendered with the correct value
    const input = screen.getByLabelText(/Test Date/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(dayjs(new Date(2023, 4, 15)).format('YYYY-MM-DD'));

    // Open the calendar by clicking the input
    await user.click(input);

    // Year and Month dropdowns should be visible
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Month/i)).toBeInTheDocument();

    // Open year dropdown and select a year
    await user.click(screen.getByLabelText(/Year/i));
    await user.click(screen.getByRole('option', { name: '2024' }));

    // Open month dropdown and select a month
    await user.click(screen.getByLabelText(/Month/i));
    await user.click(screen.getByRole('option', { name: 'June' }));

    // The calendar should now show June 2024
    // Find a day in June 2024 (e.g., 10th)
    const dayButton = screen.getByRole('button', { name: '10' });
    await user.click(dayButton);

    // The onChange handler should be called with the new date
    expect(handleChange).toHaveBeenCalled();
    // Optionally, check the value passed to onChange
    const calledWithDate = handleChange.mock.calls[handleChange.mock.calls.length - 1][0];
    expect(dayjs(calledWithDate).format('YYYY-MM-DD')).toBe('2024-06-10');

    // The input should update to the new value
    await waitFor(() => {
      expect(input).toHaveValue('2024-06-10');
    });
  });

  it('renders weekends in red', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          value={new Date(2023, 4, 15)}
          onChange={() => {}}
          minDate={new Date(2023, 4, 1)}
          maxDate={new Date(2023, 4, 31)}
          label="Test Date"
        />
      </LocalizationProvider>
    );
    await userEvent.click(screen.getByLabelText(/Test Date/i));
    // Find all day buttons
    const dayButtons = screen.getAllByRole('button', { name: /\d+/ });
    // Check that at least one Saturday and one Sunday are red
    const redDays = dayButtons.filter(btn => {
      const style = window.getComputedStyle(btn);
      return style.color === 'red' || style.color.includes('rgb(255, 0, 0)');
    });
    expect(redDays.length).toBeGreaterThanOrEqual(2); // At least one Sat and one Sun
  });

  it('does not close calendar when interacting with year/month dropdown', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          value={new Date(2023, 4, 15)}
          onChange={() => {}}
          minDate={new Date(2023, 4, 1)}
          maxDate={new Date(2023, 4, 31)}
          label="Test Date"
        />
      </LocalizationProvider>
    );
    await userEvent.click(screen.getByLabelText(/Test Date/i));
    // Open year dropdown
    await userEvent.click(screen.getByLabelText(/Year/i));
    // Calendar should still be open (month dropdown visible)
    expect(screen.getByLabelText(/Month/i)).toBeInTheDocument();
  });

  it('does not allow selecting disabled dates', async () => {
    const handleChange = jest.fn();
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomDatePicker
          value={new Date(2023, 4, 15)}
          onChange={handleChange}
          minDate={new Date(2023, 4, 10)}
          maxDate={new Date(2023, 4, 20)}
          label="Test Date"
        />
      </LocalizationProvider>
    );
    await userEvent.click(screen.getByLabelText(/Test Date/i));
    // Try to click a disabled day (e.g., 5th)
    const disabledDay = screen.getByRole('button', { name: '5' });
    expect(disabledDay).toBeDisabled();
    await userEvent.click(disabledDay);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
