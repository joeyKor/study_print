/**
 * Learning Report & Achievement Dashboard Logic
 * Handles local record storage, statistics calculation, and Chart.js integration
 */

const STORAGE_KEY = 'study_worksheet_records';

const SUBJECT_MAP = {
    'daily': { name: '초등2 일일학습', category: 'daily', icon: 'fa-star', color: '#6366f1' },
    'zombie': { name: '유치5세 일일학습', category: 'daily', icon: 'fa-baby', color: '#10b981' },
    'math': { name: '연산 공부', category: 'math', icon: 'fa-calculator', color: '#3b82f6' },
    'multiplication': { name: '구구단 연습', category: 'math', icon: 'fa-times-circle', color: '#ea580c' },
    'clock': { name: '시계 공부', category: 'math', icon: 'fa-clock', color: '#0284c7' },
    'number': { name: '숫자 쓰기', category: 'math', icon: 'fa-sort-numeric-up-alt', color: '#0d9488' },
    'hangeul_word': { name: '한글 단어쓰기', category: 'language', icon: 'fa-spell-check', color: '#f43f5e' },
    'hangeul': { name: '한글 쓰기', category: 'language', icon: 'fa-language', color: '#ec4899' },
    'custom_text': { name: '맞춤 문장 쓰기', category: 'language', icon: 'fa-file-signature', color: '#8b5cf6' },
    'alphabet': { name: '알파벳 쓰기', category: 'language', icon: 'fa-font', color: '#7c3aed' },
    'english': { name: '영어 단어 학습', category: 'language', icon: 'fa-book', color: '#4f46e5' },
    'hanja': { name: '한자 쓰기', category: 'language', icon: 'fa-book-open', color: '#d97706' },
    'drawing': { name: '그리기 / 색칠', category: 'creative', icon: 'fa-palette', color: '#059669' },
    'tracing': { name: '선긋기 학습', category: 'creative', icon: 'fa-route', color: '#6366f1' },
    'maze': { name: '미로 찾기', category: 'creative', icon: 'fa-compass', color: '#16a34a' },
    'blank_practice': { name: '빈 쓰기 연습장', category: 'tools', icon: 'fa-file-alt', color: '#475569' },
    'calendar': { name: '달력 만들기', category: 'tools', icon: 'fa-calendar-alt', color: '#2563eb' }
};

// Global Chart instances
let lineChartInstance = null;
let doughnutChartInstance = null;
let currentFilterRange = '30'; // '7', '30', 'month', 'all'
let stopwatchTimer = null;
let stopwatchSeconds = 0;

// Data Management
function getRecords() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to parse records', e);
        return [];
    }
}

function saveRecords(records) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
        console.error('Failed to save records', e);
    }
}

function addRecord(data) {
    const records = getRecords();
    const newRecord = {
        id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        date: data.date, // YYYY-MM-DD
        subject: data.subject,
        subjectName: SUBJECT_MAP[data.subject]?.name || data.subject,
        correctCount: parseInt(data.correctCount, 10),
        totalCount: parseInt(data.totalCount, 10),
        accuracy: Math.round((parseInt(data.correctCount, 10) / parseInt(data.totalCount, 10)) * 100),
        timeSpentSeconds: parseInt(data.timeSpentSeconds || 0, 10),
        note: (data.note || '').trim(),
        createdAt: new Date().toISOString()
    };
    records.push(newRecord);
    saveRecords(records);
    refreshDashboard();
    return newRecord;
}

function deleteRecord(id) {
    if (!confirm('이 기록을 삭제하시겠습니까?')) return;
    let records = getRecords();
    records = records.filter(r => r.id !== id);
    saveRecords(records);
    refreshDashboard();
}

// Calculate Key Statistics
function calculateStats(records) {
    if (!records || records.length === 0) {
        return {
            totalCompleted: 0,
            avgAccuracy: 0,
            streakDays: 0,
            avgTimeMinutes: 0
        };
    }

    const totalCompleted = records.length;
    const totalAccuracy = records.reduce((sum, r) => sum + r.accuracy, 0);
    const avgAccuracy = Math.round(totalAccuracy / totalCompleted);

    // Calculate streak (consecutive days of study)
    const uniqueDates = [...new Set(records.map(r => r.date))].sort().reverse();
    let streakDays = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the most recent study was today or yesterday
    if (uniqueDates.length > 0 && (uniqueDates[0] === today || uniqueDates[0] === yesterday)) {
        streakDays = 1;
        let expectedPrevDate = new Date(uniqueDates[0]);

        for (let i = 1; i < uniqueDates.length; i++) {
            expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
            const expectedStr = expectedPrevDate.toISOString().split('T')[0];
            if (uniqueDates[i] === expectedStr) {
                streakDays++;
            } else {
                break;
            }
        }
    }

    const totalTimeSec = records.reduce((sum, r) => sum + (r.timeSpentSeconds || 0), 0);
    const avgTimeMinutes = records.filter(r => r.timeSpentSeconds > 0).length > 0
        ? Math.round(totalTimeSec / records.filter(r => r.timeSpentSeconds > 0).length / 60)
        : 0;

    return {
        totalCompleted,
        avgAccuracy,
        streakDays,
        avgTimeMinutes
    };
}

// Filter records by date range
function filterRecordsByRange(records, range) {
    if (range === 'all') return records;

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (range === 'month') {
        const thisYear = now.getFullYear();
        const thisMonth = String(now.getMonth() + 1).padStart(2, '0');
        const prefix = `${thisYear}-${thisMonth}`;
        return records.filter(r => r.date.startsWith(prefix));
    }

    const days = parseInt(range, 10);
    const cutoffDate = new Date(Date.now() - (days - 1) * 86400000);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];

    return records.filter(r => r.date >= cutoffStr && r.date <= todayStr);
}

// Format seconds into "M분 S초"
function formatDuration(sec) {
    if (!sec || sec <= 0) return '-';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m > 0 && s > 0) return `${m}분 ${s}초`;
    if (m > 0) return `${m}분`;
    return `${s}초`;
}

// Update DOM Dashboard
function refreshDashboard() {
    const allRecords = getRecords();
    const stats = calculateStats(allRecords);

    // Update Top Stat Cards
    const elStreak = document.getElementById('stat-streak');
    const elCompleted = document.getElementById('stat-completed');
    const elAccuracy = document.getElementById('stat-accuracy');
    const elAvgTime = document.getElementById('stat-avg-time');

    if (elStreak) elStreak.innerText = `${stats.streakDays}일`;
    if (elCompleted) elCompleted.innerText = `${stats.totalCompleted}회`;
    if (elAccuracy) elAccuracy.innerText = `${stats.avgAccuracy}%`;
    if (elAvgTime) elAvgTime.innerText = stats.avgTimeMinutes > 0 ? `${stats.avgTimeMinutes}분` : '-';

    // Filter records for charts
    const filteredRecords = filterRecordsByRange(allRecords, currentFilterRange);

    renderCharts(filteredRecords);
    renderRecordsTable(allRecords);
}

// Render Charts
function renderCharts(records) {
    renderLineChart(records);
    renderDoughnutChart(records);
}

function renderLineChart(records) {
    const ctx = document.getElementById('line-chart');
    if (!ctx) return;

    // Group records by date: average accuracy on each day
    const dateMap = {};
    const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));

    sorted.forEach(r => {
        if (!dateMap[r.date]) {
            dateMap[r.date] = { total: 0, count: 0 };
        }
        dateMap[r.date].total += r.accuracy;
        dateMap[r.date].count += 1;
    });

    const labels = Object.keys(dateMap).map(d => {
        const parts = d.split('-');
        return `${parts[1]}/${parts[2]}`;
    });

    const data = Object.keys(dateMap).map(d => {
        return Math.round(dateMap[d].total / dateMap[d].count);
    });

    if (lineChartInstance) {
        lineChartInstance.destroy();
    }

    if (labels.length === 0) {
        // Empty state placeholder
        lineChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['학습 데이터 없음'],
                datasets: [{
                    label: '정답률 (%)',
                    data: [0],
                    borderColor: '#cbd5e1',
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 100 }
                }
            }
        });
        return;
    }

    lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '일별 평균 정답률 (%)',
                data: data,
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#4f46e5',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `평균 정답률: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: val => `${val}%`,
                        stepSize: 20
                    },
                    grid: {
                        color: '#f1f5f9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function renderDoughnutChart(records) {
    const ctx = document.getElementById('doughnut-chart');
    if (!ctx) return;

    const countMap = {};
    records.forEach(r => {
        countMap[r.subject] = (countMap[r.subject] || 0) + 1;
    });

    const subjects = Object.keys(countMap);
    const labels = subjects.map(s => SUBJECT_MAP[s]?.name || s);
    const data = subjects.map(s => countMap[s]);
    const bgColors = subjects.map(s => SUBJECT_MAP[s]?.color || '#94a3b8');

    if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
    }

    if (subjects.length === 0) {
        doughnutChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['데이터 없음'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['#e2e8f0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
        return;
    }

    doughnutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: bgColors,
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 12,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const val = context.raw;
                            const pct = Math.round((val / total) * 100);
                            return ` ${context.label}: ${val}회 (${pct}%)`;
                        }
                    }
                }
            },
            cutout: '62%'
        }
    });
}

// Render Table History
function renderRecordsTable(records) {
    const tbody = document.getElementById('records-table-body');
    const emptyNotice = document.getElementById('records-empty-notice');
    if (!tbody) return;

    tbody.innerHTML = '';
    const sorted = [...records].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));

    if (sorted.length === 0) {
        if (emptyNotice) emptyNotice.style.display = 'block';
        return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';

    sorted.forEach((r, idx) => {
        const sub = SUBJECT_MAP[r.subject] || { name: r.subjectName, icon: 'fa-book', color: '#6366f1' };
        const tr = document.createElement('tr');

        // Accuracy badge color
        let badgeColor = '#ef4444';
        let badgeBg = '#fef2f2';
        if (r.accuracy >= 90) {
            badgeColor = '#10b981';
            badgeBg = '#ecfdf5';
        } else if (r.accuracy >= 70) {
            badgeColor = '#3b82f6';
            badgeBg = '#eff6ff';
        } else if (r.accuracy >= 50) {
            badgeColor = '#f59e0b';
            badgeBg = '#fffbeb';
        }

        tr.innerHTML = `
            <td style="font-weight: 600; color: #475569;">${r.date}</td>
            <td>
                <span class="subject-pill" style="border-left: 3px solid ${sub.color};">
                    <i class="fas ${sub.icon}" style="color: ${sub.color}; margin-right: 5px;"></i>
                    ${r.subjectName}
                </span>
            </td>
            <td style="text-align: center; font-weight: 600;">
                <span style="color: #0f172a;">${r.correctCount}</span> / <span style="color: #64748b;">${r.totalCount}</span>
            </td>
            <td style="text-align: center;">
                <span class="accuracy-badge" style="background: ${badgeBg}; color: ${badgeColor};">
                    ${r.accuracy}%
                </span>
            </td>
            <td style="text-align: center; color: #64748b; font-size: 0.88rem;">${formatDuration(r.timeSpentSeconds)}</td>
            <td style="color: #334155; font-size: 0.9rem;">${r.note || '<span style="color:#cbd5e1;">-</span>'}</td>
            <td style="text-align: center;">
                <button class="delete-btn" onclick="deleteRecord('${r.id}')" title="삭제">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Modal Form Logic
function openRecordModal(defaultSubject = '') {
    const modal = document.getElementById('record-modal');
    if (!modal) return;

    // Reset fields
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('input-date').value = today;

    const sel = document.getElementById('input-subject');
    if (defaultSubject && SUBJECT_MAP[defaultSubject]) {
        sel.value = defaultSubject;
    }

    document.getElementById('input-correct').value = '';
    document.getElementById('input-total').value = '20';
    document.getElementById('input-time-min').value = '';
    document.getElementById('input-time-sec').value = '';
    document.getElementById('input-note').value = '';
    updateAccuracyPreview();

    // Reset Stopwatch
    resetStopwatch();

    modal.style.display = 'flex';
}

function closeRecordModal() {
    const modal = document.getElementById('record-modal');
    if (modal) modal.style.display = 'none';
    stopStopwatch();
}

function updateAccuracyPreview() {
    const correct = parseInt(document.getElementById('input-correct').value || 0, 10);
    const total = parseInt(document.getElementById('input-total').value || 0, 10);
    const previewEl = document.getElementById('preview-accuracy-val');

    if (total > 0 && correct >= 0 && correct <= total) {
        const pct = Math.round((correct / total) * 100);
        previewEl.innerText = `${pct}%`;
        previewEl.style.color = pct >= 90 ? '#10b981' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f59e0b' : '#ef4444';
    } else {
        previewEl.innerText = '- %';
        previewEl.style.color = '#94a3b8';
    }
}

function submitRecordForm(e) {
    if (e) e.preventDefault();

    const date = document.getElementById('input-date').value;
    const subject = document.getElementById('input-subject').value;
    const correct = parseInt(document.getElementById('input-correct').value, 10);
    const total = parseInt(document.getElementById('input-total').value, 10);
    const min = parseInt(document.getElementById('input-time-min').value || 0, 10);
    const sec = parseInt(document.getElementById('input-time-sec').value || 0, 10);
    const note = document.getElementById('input-note').value;

    if (!date) {
        alert('학습 날짜를 선택해 주세요.');
        return;
    }
    if (isNaN(correct) || isNaN(total) || total <= 0) {
        alert('맞은 개수와 전체 문항 수를 올바르게 입력해 주세요.');
        return;
    }
    if (correct > total) {
        alert('맞은 개수가 전체 문항 수보다 클 수 없습니다.');
        return;
    }

    const totalSeconds = (min * 60) + sec;

    addRecord({
        date: date,
        subject: subject,
        correctCount: correct,
        totalCount: total,
        timeSpentSeconds: totalSeconds,
        note: note
    });

    closeRecordModal();
}

// Stopwatch functions
function toggleStopwatch() {
    const btn = document.getElementById('stopwatch-btn');
    if (!stopwatchTimer) {
        // Start
        stopwatchTimer = setInterval(() => {
            stopwatchSeconds++;
            const m = Math.floor(stopwatchSeconds / 60);
            const s = stopwatchSeconds % 60;
            document.getElementById('input-time-min').value = m;
            document.getElementById('input-time-sec').value = s;
        }, 1000);
        btn.innerHTML = '<i class="fas fa-pause"></i> 정지';
        btn.classList.add('running');
    } else {
        // Pause
        stopStopwatch();
    }
}

function stopStopwatch() {
    if (stopwatchTimer) {
        clearInterval(stopwatchTimer);
        stopwatchTimer = null;
    }
    const btn = document.getElementById('stopwatch-btn');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-play"></i> 타이머 시작';
        btn.classList.remove('running');
    }
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
}

// Filter range buttons
function setFilterRange(range, btn) {
    currentFilterRange = range;
    document.querySelectorAll('.filter-range-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    refreshDashboard();
}

// Backup & Restore
function exportRecordsJSON() {
    const records = getRecords();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `학습기록백업_${today}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function triggerImportJSON() {
    const input = document.getElementById('import-file-input');
    if (input) input.click();
}

function handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (!Array.isArray(imported)) {
                alert('올바른 백업 파일 형식이 아닙니다.');
                return;
            }
            if (confirm(`파일에서 총 ${imported.length}개의 기록을 가져옵니다. 기존 기록과 병합하시겠습니까? (취소 시 기존 데이터는 보존됩니다)`)) {
                const current = getRecords();
                // Merge by unique id
                const map = {};
                current.forEach(r => map[r.id] = r);
                imported.forEach(r => {
                    if (r.id) map[r.id] = r;
                });
                const merged = Object.values(map);
                saveRecords(merged);
                refreshDashboard();
                alert('기록을 성공적으로 가져왔습니다!');
            }
        } catch (err) {
            alert('JSON 파일을 읽는 중 오류가 발생했습니다: ' + err.message);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// Seed Sample Data (for demonstration if empty)
function loadSampleData() {
    if (getRecords().length > 0) {
        if (!confirm('기존 기록에 예시 데이터를 추가하시겠습니까?')) return;
    }

    const today = new Date();
    const sampleItems = [
        { daysAgo: 6, subject: 'daily', correct: 9, total: 9, sec: 620, note: '초등2 한자 5개 + 영단어 4개 완료' },
        { daysAgo: 5, subject: 'math', correct: 18, total: 20, sec: 240, note: '두 자릿수 덧셈 실수 2개' },
        { daysAgo: 4, subject: 'multiplication', correct: 10, total: 10, sec: 95, note: '3단 빈칸 퀴즈 만점!' },
        { daysAgo: 3, subject: 'clock', correct: 8, total: 8, sec: 180, note: '5분 단위 시계 읽기 성공' },
        { daysAgo: 2, subject: 'hangeul_word', correct: 10, total: 10, sec: 320, note: '동물 낱말 또박또박 쓰기' },
        { daysAgo: 1, subject: 'english', correct: 12, total: 12, sec: 400, note: '과일 영단어 암기 완료' },
        { daysAgo: 0, subject: 'math', correct: 20, total: 20, sec: 190, note: '시간 단축 및 100점 만점!' }
    ];

    sampleItems.forEach(item => {
        const d = new Date(today.getTime() - item.daysAgo * 86400000);
        addRecord({
            date: d.toISOString().split('T')[0],
            subject: item.subject,
            correctCount: item.correct,
            totalCount: item.total,
            timeSpentSeconds: item.sec,
            note: item.note
        });
    });

    alert('샘플 학습 데이터가 등록되었습니다! 그래프와 통계를 확인해 보세요.');
}

// Print Report
function printReport() {
    window.print();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    refreshDashboard();

    // Check URL parameters (e.g. ?action=new&subject=math)
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'new') {
        const sub = params.get('subject') || '';
        openRecordModal(sub);
    }
});
