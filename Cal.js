<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom DatePicker with Dropdowns</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

```
    body {
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
    }

    .container {
        max-width: 400px;
        margin: 0 auto;
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .title {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 8px;
        color: #1976d2;
    }

    .subtitle {
        color: #666;
        font-size: 0.875rem;
        margin-bottom: 24px;
    }

    .date-input-container {
        position: relative;
        margin-bottom: 16px;
    }

    .date-input {
        width: 100%;
        padding: 16px 14px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        font-size: 1rem;
        background: white;
        cursor: pointer;
        transition: border-color 0.2s;
    }

    .date-input:hover {
        border-color: #1976d2;
    }

    .date-input:focus {
        outline: none;
        border-color: #1976d2;
        border-width: 2px;
    }

    .date-input.active {
        border-color: #1976d2;
        border-width: 2px;
    }

    .input-label {
        position: absolute;
        top: -8px;
        left: 12px;
        background: white;
        padding: 0 4px;
        font-size: 0.75rem;
        color: #1976d2;
        font-weight: 500;
    }

    .calendar-popup {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        display: none;
        margin-top: 4px;
    }

    .calendar-popup.show {
        display: block;
    }

    .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;
    }

    .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
    }

    .nav-button:hover {
        background-color: #f5f5f5;
    }

    .header-controls {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .dropdown {
        border: none;
        background: none;
        font-size: 0.875rem;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .dropdown:hover {
        background-color: #f5f5f5;
    }

    .dropdown:focus {
        outline: 1px solid #1976d2;
        background-color: #f5f5f5;
    }

    .month-dropdown {
        min-width: 100px;
    }

    .year-dropdown {
        min-width: 70px;
    }

    .calendar-grid {
        padding: 16px;
    }

    .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        margin-bottom: 8px;
    }

    .weekday {
        padding: 8px;
        text-align: center;
        font-size: 0.75rem;
        font-weight: 500;
        color: #666;
    }

    .days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
    }

    .day-cell {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        font-size: 0.875rem;
        transition: all 0.2s;
        position: relative;
    }

    .day-cell:hover {
        background-color: #e3f2fd;
    }

    .day-cell.selected {
        background-color: #1976d2;
        color: white;
    }

    .day-cell.other-month {
        color: #bbb;
    }

    .day-cell.today {
        background-color: #e3f2fd;
        font-weight: 500;
    }

    .selected-date-display {
        margin-top: 16px;
        padding: 12px;
        background-color: #f5f5f5;
        border-radius: 4px;
        font-size: 0.875rem;
    }

    .features-list {
        margin-top: 24px;
    }

    .features-title {
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: #333;
    }

    .feature-item {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 4px;
    }

    .chevron {
        width: 20px;
        height: 20px;
    }
</style>
```

</head>
<body>
    <div class="container">
        <h1 class="title">Custom MUI DatePicker</h1>
        <p class="subtitle">DatePicker with separate year and month dropdowns in the calendar header</p>

```
    <div class="date-input-container">
        <label class="input-label">Select Date</label>
        <input type="text" class="date-input" id="dateInput" placeholder="mm/dd/yyyy" readonly>
        
        <div class="calendar-popup" id="calendarPopup">
            <div class="calendar-header">
                <button class="nav-button" id="prevMonth">
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                </button>
                
                <div class="header-controls">
                    <select class="dropdown month-dropdown" id="monthSelect">
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                    </select>
                    
                    <select class="dropdown year-dropdown" id="yearSelect"></select>
                </div>
                
                <button class="nav-button" id="nextMonth">
                    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="calendar-grid">
                <div class="weekdays">
                    <div class="weekday">Su</div>
                    <div class="weekday">Mo</div>
                    <div class="weekday">Tu</div>
                    <div class="weekday">We</div>
                    <div class="weekday">Th</div>
                    <div class="weekday">Fr</div>
                    <div class="weekday">Sa</div>
                </div>
                <div class="days-grid" id="daysGrid"></div>
            </div>
        </div>
    </div>
    
    <div class="selected-date-display" id="selectedDateDisplay" style="display: none;">
        Selected Date: <span id="selectedDateText"></span>
    </div>
    
    <div class="features-list">
        <h3 class="features-title">Features:</h3>
        <div class="feature-item">• Separate Month and Year dropdowns</div>
        <div class="feature-item">• Navigation arrows for quick month switching</div>
        <div class="feature-item">• Customizable year range</div>
        <div class="feature-item">• Consistent with MUI design system</div>
    </div>
</div>

<script>
    class CustomDatePicker {
        constructor() {
            this.currentDate = new Date();
            this.selectedDate = null;
            this.isOpen = false;
            
            this.dateInput = document.getElementById('dateInput');
            this.calendarPopup = document.getElementById('calendarPopup');
            this.monthSelect = document.getElementById('monthSelect');
            this.yearSelect = document.getElementById('yearSelect');
            this.daysGrid = document.getElementById('daysGrid');
            this.prevButton = document.getElementById('prevMonth');
            this.nextButton = document.getElementById('nextMonth');
            this.selectedDateDisplay = document.getElementById('selectedDateDisplay');
            this.selectedDateText = document.getElementById('selectedDateText');
            
            this.init();
        }
        
        init() {
            this.setupYearOptions();
            this.updateCalendar();
            this.bindEvents();
        }
        
        setupYearOptions() {
            const currentYear = new Date().getFullYear();
            const yearSelect = this.yearSelect;
            yearSelect.innerHTML = '';
            
            for (let year = currentYear - 10; year <= currentYear + 10; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
        }
        
        bindEvents() {
            this.dateInput.addEventListener('click', () => this.toggleCalendar());
            
            document.addEventListener('click', (e) => {
                if (!this.dateInput.contains(e.target) && !this.calendarPopup.contains(e.target)) {
                    this.closeCalendar();
                }
            });
            
            this.monthSelect.addEventListener('change', () => this.onMonthYearChange());
            this.yearSelect.addEventListener('change', () => this.onMonthYearChange());
            this.prevButton.addEventListener('click', () => this.navigateMonth(-1));
            this.nextButton.addEventListener('click', () => this.navigateMonth(1));
        }
        
        toggleCalendar() {
            if (this.isOpen) {
                this.closeCalendar();
            } else {
                this.openCalendar();
            }
        }
        
        openCalendar() {
            this.isOpen = true;
            this.calendarPopup.classList.add('show');
            this.dateInput.classList.add('active');
        }
        
        closeCalendar() {
            this.isOpen = false;
            this.calendarPopup.classList.remove('show');
            this.dateInput.classList.remove('active');
        }
        
        onMonthYearChange() {
            const month = parseInt(this.monthSelect.value);
            const year = parseInt(this.yearSelect.value);
            this.currentDate = new Date(year, month, 1);
            this.updateCalendar();
        }
        
        navigateMonth(delta) {
            this.currentDate.setMonth(this.currentDate.getMonth() + delta);
            this.updateCalendar();
        }
        
        updateCalendar() {
            this.monthSelect.value = this.currentDate.getMonth();
            this.yearSelect.value = this.currentDate.getFullYear();
            this.renderDays();
        }
        
        renderDays() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            const today = new Date();
            this.daysGrid.innerHTML = '';
            
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayCell = document.createElement('div');
                dayCell.className = 'day-cell';
                dayCell.textContent = date.getDate();
                
                if (date.getMonth() !== month) {
                    dayCell.classList.add('other-month');
                }
                
                if (date.toDateString() === today.toDateString()) {
                    dayCell.classList.add('today');
                }
                
                if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
                    dayCell.classList.add('selected');
                }
                
                dayCell.addEventListener('click', () => this.selectDate(date));
                this.daysGrid.appendChild(dayCell);
            }
        }
        
        selectDate(date) {
            this.selectedDate = date;
            this.dateInput.value = date.toLocaleDateString();
            this.selectedDateDisplay.style.display = 'block';
            this.selectedDateText.textContent = date.toLocaleDateString();
            this.renderDays();
            this.closeCalendar();
        }
    }
    
    // Initialize the date picker when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new CustomDatePicker();
    });
</script>
```

</body>
</html>
