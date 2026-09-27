/**
 * Calendar Worksheet Generator
 */

const MONTH_ENGLISH_NAMES = {
    1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
    7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
};

const LUNAR_HOLIDAYS = {
    2020: { seollal: "01-25", buddha: "04-30", chuseok: "10-01" },
    2021: { seollal: "02-12", buddha: "05-19", chuseok: "09-21" },
    2022: { seollal: "02-01", buddha: "05-08", chuseok: "09-10" },
    2023: { seollal: "01-22", buddha: "05-27", chuseok: "09-29" },
    2024: { seollal: "02-10", buddha: "05-15", chuseok: "09-17" },
    2025: { seollal: "01-29", buddha: "05-05", chuseok: "10-06" },
    2026: { seollal: "02-17", buddha: "05-24", chuseok: "09-25" },
    2027: { seollal: "02-07", buddha: "05-13", chuseok: "09-15" },
    2028: { seollal: "01-27", buddha: "05-02", chuseok: "10-03" },
    2029: { seollal: "02-13", buddha: "05-20", chuseok: "09-22" },
    2030: { seollal: "02-03", buddha: "05-09", chuseok: "09-12" },
    2031: { seollal: "01-23", buddha: "05-28", chuseok: "10-01" },
    2032: { seollal: "02-11", buddha: "05-16", chuseok: "09-19" },
    2033: { seollal: "01-31", buddha: "05-06", chuseok: "09-08" },
    2034: { seollal: "02-19", buddha: "05-25", chuseok: "09-27" },
    2035: { seollal: "02-08", buddha: "05-15", chuseok: "09-16" }
};

/**
 * Calculates all public holidays and alternative holidays for a given year.
 */
function getHolidaysForYear(year) {
    const list = [];

    const formatDateString = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Solar holidays
    const solarHolidays = [
        { month: 1, day: 1, name: "신정", allowsAlt: false },
        { month: 3, day: 1, name: "삼일절", allowsAlt: year >= 2021 },
        { month: 5, day: 5, name: "어린이날", allowsAlt: true },
        { month: 6, day: 6, name: "현충일", allowsAlt: false },
        { month: 8, day: 15, name: "광복절", allowsAlt: year >= 2021 },
        { month: 10, day: 3, name: "개천절", allowsAlt: year >= 2021 },
        { month: 10, day: 9, name: "한글날", allowsAlt: year >= 2021 },
        { month: 12, day: 25, name: "크리스마스", allowsAlt: year >= 2023 }
    ];

    solarHolidays.forEach(h => {
        list.push({
            date: new Date(year, h.month - 1, h.day),
            name: h.name,
            allowsAlt: h.allowsAlt,
            group: h.name
        });
    });

    // Lunar holidays
    const lunar = LUNAR_HOLIDAYS[year];
    if (lunar) {
        const parseMD = (str) => {
            const [m, d] = str.split('-').map(Number);
            return new Date(year, m - 1, d);
        };

        // 설날
        const seollalCenter = parseMD(lunar.seollal);
        const seollalDays = [
            { offset: -1, name: "설날 연휴" },
            { offset: 0, name: "설날" },
            { offset: 1, name: "설날 연휴" }
        ];
        seollalDays.forEach(sd => {
            const d = new Date(seollalCenter);
            d.setDate(seollalCenter.getDate() + sd.offset);
            list.push({
                date: d,
                name: sd.name,
                allowsAlt: true,
                group: "seollal"
            });
        });

        // 부처님오신날
        const buddhaDate = parseMD(lunar.buddha);
        list.push({
            date: buddhaDate,
            name: "부처님오신날",
            allowsAlt: year >= 2023,
            group: "buddha"
        });

        // 추석
        const chuseokCenter = parseMD(lunar.chuseok);
        const chuseokDays = [
            { offset: -1, name: "추석 연휴" },
            { offset: 0, name: "추석" },
            { offset: 1, name: "추석 연휴" }
        ];
        chuseokDays.forEach(cd => {
            const d = new Date(chuseokCenter);
            d.setDate(chuseokCenter.getDate() + cd.offset);
            list.push({
                date: d,
                name: cd.name,
                allowsAlt: true,
                group: "chuseok"
            });
        });
    }

    // Group holidays by date
    const holidaysByDate = {};
    list.forEach(item => {
        const key = formatDateString(item.date);
        if (!holidaysByDate[key]) {
            holidaysByDate[key] = [];
        }
        holidaysByDate[key].push(item);
    });

    const finalHolidays = {};
    const holidayDatesSet = new Set(Object.keys(holidaysByDate));
    const assignedAltDates = new Set();

    // Populate base holidays
    Object.keys(holidaysByDate).forEach(key => {
        const items = holidaysByDate[key];
        finalHolidays[key] = {
            name: items.map(i => i.name).join('/'),
            isAlternative: false
        };
    });

    // Check alternative holidays chronologically
    const sortedKeys = Object.keys(holidaysByDate).sort();

    sortedKeys.forEach(key => {
        const items = holidaysByDate[key];
        let triggersAlt = false;
        let altExplanation = "대체공휴일";

        for (const item of items) {
            if (!item.allowsAlt) continue;

            const dayOfWeek = item.date.getDay();
            const hasOverlap = items.some(other => other.group !== item.group);

            if (item.group === "seollal" || item.group === "chuseok") {
                if (dayOfWeek === 0 || hasOverlap) {
                    triggersAlt = true;
                    break;
                }
            } else {
                if (dayOfWeek === 0 || dayOfWeek === 6 || hasOverlap) {
                    triggersAlt = true;
                    break;
                }
            }
        }

        if (triggersAlt) {
            const refDate = new Date(items[0].date);
            let searchDate = new Date(refDate);
            searchDate.setDate(refDate.getDate() + 1);

            while (true) {
                const searchKey = formatDateString(searchDate);
                const day = searchDate.getDay();
                const isWeekend = (day === 0 || day === 6);
                const isBaseHoliday = holidayDatesSet.has(searchKey);
                const isAltAlready = assignedAltDates.has(searchKey);

                if (!isWeekend && !isBaseHoliday && !isAltAlready) {
                    finalHolidays[searchKey] = {
                        name: altExplanation,
                        isAlternative: true
                    };
                    assignedAltDates.add(searchKey);
                    break;
                }
                searchDate.setDate(searchDate.getDate() + 1);
            }
        }
    });

    return finalHolidays;
}

/**
 * Initializes selectors and generates the calendar page content.
 */
function initCalendarPage(target) {
    const yearSelect = document.getElementById('calendar-year-select');
    const monthSelect = document.getElementById('calendar-month-select');

    if (!yearSelect || !monthSelect) return;

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    // Populate Year Select if empty
    if (yearSelect.options.length === 0) {
        for (let y = 2020; y <= 2035; y++) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.innerText = `${y}년`;
            if (y === currentYear) opt.selected = true;
            yearSelect.appendChild(opt);
        }
    }

    // Populate Month Select if empty
    if (monthSelect.options.length === 0) {
        for (let m = 1; m <= 12; m++) {
            const opt = document.createElement('option');
            opt.value = m;
            opt.innerText = `${m}월`;
            if (m === currentMonth) opt.selected = true;
            monthSelect.appendChild(opt);
        }
    }

    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);

    // Build the calendar DOM structure
    generateCalendarGrid(target, selectedYear, selectedMonth);
}

/**
 * Generates the calendar grid table
 */
function generateCalendarGrid(target, year, month) {
    target.innerHTML = '';

    const holidays = getHolidaysForYear(year);

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'calendar-wrapper';
    // 1. Header (Year and English Month Name)
    const header = document.createElement('div');
    header.className = 'calendar-header';
    
    const yearText = document.createElement('div');
    yearText.className = 'calendar-year';
    yearText.innerText = year;

    const monthText = document.createElement('div');
    monthText.className = 'calendar-month';
    // Nov -> November (11월)
    monthText.innerText = `${MONTH_ENGLISH_NAMES[month]}`;

    header.appendChild(monthText);
    header.appendChild(yearText);
    wrapper.appendChild(header);    // 2. Grid Table
    const table = document.createElement('table');
    table.className = 'calendar-table';

    // Table Header (Days of week)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const weekdays = [
        { name: 'Sunday', class: 'col-sun' },
        { name: 'Monday', class: 'col-mon' },
        { name: 'Tuesday', class: 'col-tue' },
        { name: 'Wednesday', class: 'col-wed' },
        { name: 'Thursday', class: 'col-thu' },
        { name: 'Friday', class: 'col-fri' },
        { name: 'Saturday', class: 'col-sat' }
    ];

    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.innerText = day.name;
        if (day.class) th.className = day.class;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table Body (Weeks and Days)
    const tbody = document.createElement('tbody');

    const totalDays = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay(); // 0 is Sunday, 6 is Saturday

    let dayCounter = 1;
    let rowCount = 0;
    
    // First Row
    let tr = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
        const td = document.createElement('td');
        if (i < startDay) {
            td.className = 'empty-cell';
            tr.appendChild(td);
        } else {
            populateDayCell(td, year, month, dayCounter, i, holidays);
            dayCounter++;
            tr.appendChild(td);
        }
    }
    tbody.appendChild(tr);
    rowCount++;

    // Subsequent Rows
    while (dayCounter <= totalDays) {
        tr = document.createElement('tr');
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            if (dayCounter <= totalDays) {
                populateDayCell(td, year, month, dayCounter, i, holidays);
                dayCounter++;
            } else {
                td.className = 'empty-cell';
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        rowCount++;
    }

    // Set class to adjust row height based on row count (5 vs 6 rows)
    table.classList.add(`weeks-${rowCount}`);

    table.appendChild(tbody);
    wrapper.appendChild(table);
    target.appendChild(wrapper);
}

/**
 * Fills in a single day cell's number and editable content
 */
function populateDayCell(td, year, month, day, weekdayIndex, holidays) {
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const holidayInfo = holidays ? holidays[dateKey] : null;

    // Add color class
    if (holidayInfo) {
        td.className = 'cell-holiday';
    } else if (weekdayIndex === 0) {
        td.className = 'cell-sun';
    } else if (weekdayIndex === 6) {
        td.className = 'cell-sat';
    } else {
        td.className = 'cell-weekday';
    }

    // Day number container
    const header = document.createElement('div');
    header.className = 'calendar-day-header';

    const numSpan = document.createElement('span');
    numSpan.className = 'calendar-day-num';
    numSpan.innerText = day;

    header.appendChild(numSpan);

    if (holidayInfo) {
        const nameSpan = document.createElement('span');
        nameSpan.className = 'calendar-holiday-name';
        nameSpan.innerText = holidayInfo.name;
        header.appendChild(nameSpan);
    }

    td.appendChild(header);

    // Editable text area
    const contentDiv = document.createElement('div');
    contentDiv.className = 'calendar-cell-content';
    contentDiv.contentEditable = true;
    contentDiv.setAttribute('spellcheck', 'false');

    // Retrieve saved content from localStorage
    const storageKey = `calendar-note-${year}-${month}-${day}`;
    contentDiv.innerText = localStorage.getItem(storageKey) || '';

    // Auto-save on input
    contentDiv.addEventListener('input', () => {
        localStorage.setItem(storageKey, contentDiv.innerText);
    });

    td.appendChild(contentDiv);
}

/**
 * Clears all calendar notes for the currently selected year and month
 */
function clearCalendarNotes() {
    const yearSelect = document.getElementById('calendar-year-select');
    const monthSelect = document.getElementById('calendar-month-select');
    if (!yearSelect || !monthSelect) return;

    const year = yearSelect.value;
    const month = monthSelect.value;

    if (confirm(`${year}년 ${month}월의 모든 메모를 삭제하시겠습니까?`)) {
        const totalDays = new Date(year, month, 0).getDate();
        for (let d = 1; d <= totalDays; d++) {
            localStorage.removeItem(`calendar-note-${year}-${month}-${d}`);
        }
        refreshContent();
    }
}
