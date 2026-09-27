/**
 * Clock (시계 보기) Worksheet Generator
 */

function createClockSection(subType, difficulty) {
    const container = document.createElement('div');
    container.className = 'clock-worksheet';

    // Description header
    const desc = document.createElement('div');
    desc.className = 'sheet-instruction';
    if (subType === 'read_clock') {
        desc.innerHTML = '<i class="fas fa-clock"></i> 시계를 보고 네모 칸에 몇 시 몇 분인지 적어보세요.';
    } else if (subType === 'draw_hands') {
        desc.innerHTML = '<i class="fas fa-pencil-alt"></i> 주어진 시간을 보고 시계에 짧은 바늘(시침)과 긴 바늘(분침)을 알맞게 그려보세요.';
    } else {
        desc.innerHTML = '<i class="fas fa-puzzle-piece"></i> 문제를 잘 읽고 알맞은 시간을 쓰거나 시계바늘을 그려보세요.';
    }
    container.appendChild(desc);

    const grid = document.createElement('div');
    grid.className = 'clock-grid';

    // 6 questions per page is ideal for clean A4 printing
    const questionCount = 6;
    const questions = generateClockQuestions(questionCount, difficulty);

    questions.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = 'clock-card';

        const qNumber = document.createElement('div');
        qNumber.className = 'clock-q-num';
        qNumber.innerText = `${idx + 1}`;
        item.appendChild(qNumber);

        // Determine mode for this item
        let currentMode = subType;
        if (subType === 'mixed') {
            currentMode = idx % 2 === 0 ? 'read_clock' : 'draw_hands';
        }

        const clockSvg = generateClockSVG(q.hour, q.minute, currentMode === 'read_clock');
        const clockWrap = document.createElement('div');
        clockWrap.className = 'clock-svg-wrap';
        clockWrap.innerHTML = clockSvg;
        item.appendChild(clockWrap);

        const promptArea = document.createElement('div');
        promptArea.className = 'clock-prompt-area';

        if (currentMode === 'read_clock') {
            promptArea.innerHTML = `
                <div class="clock-answer-box">
                    <span class="clock-input-blank"></span> <span class="clock-unit">시</span>
                    <span class="clock-input-blank"></span> <span class="clock-unit">분</span>
                </div>
            `;
        } else {
            promptArea.innerHTML = `
                <div class="clock-target-time">
                    <span class="target-badge">${q.hour}시 ${q.minute === 0 ? '정각' : q.minute + '분'}</span>
                </div>
            `;
        }

        item.appendChild(promptArea);
        grid.appendChild(item);
    });

    container.appendChild(grid);
    return container;
}

/**
 * Generate randomized unique clock questions based on difficulty
 */
function generateClockQuestions(count, difficulty) {
    const list = [];
    const used = new Set();

    while (list.length < count) {
        let hour = Math.floor(Math.random() * 12) + 1;
        let minute = 0;

        if (difficulty === 'hour') {
            minute = 0;
        } else if (difficulty === 'half') {
            minute = Math.random() < 0.5 ? 0 : 30;
        } else if (difficulty === 'five_min') {
            minute = Math.floor(Math.random() * 12) * 5;
        } else { // one_min
            minute = Math.floor(Math.random() * 60);
        }

        const key = `${hour}:${minute}`;
        if (!used.has(key) || list.length >= 12) {
            used.add(key);
            list.push({ hour, minute });
        }
    }

    return list;
}

/**
 * Render Clock as crisp SVG
 * showHands: boolean (if false, render blank center for children to draw hands)
 */
function generateClockSVG(hour, minute, showHands = true) {
    const size = 180;
    const center = size / 2;
    const radius = 78;

    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="analog-clock">`;

    // Outer drop shadow & clock dial
    svg += `
        <circle cx="${center}" cy="${center}" r="${radius}" fill="#ffffff" stroke="#334155" stroke-width="4"/>
        <circle cx="${center}" cy="${center}" r="${radius - 4}" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
    `;

    // 60 minute ticks
    for (let i = 0; i < 60; i++) {
        const angle = (i * 6) * Math.PI / 180;
        const isHourTick = i % 5 === 0;
        const innerR = isHourTick ? radius - 10 : radius - 5;
        const strokeW = isHourTick ? 2.5 : 1;
        const strokeColor = isHourTick ? '#1e293b' : '#94a3b8';

        const x1 = center + Math.sin(angle) * radius;
        const y1 = center - Math.cos(angle) * radius;
        const x2 = center + Math.sin(angle) * innerR;
        const y2 = center - Math.cos(angle) * innerR;

        svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeW}" stroke-linecap="round"/>`;
    }

    // Numbers 1 to 12
    const numR = radius - 19;
    for (let h = 1; h <= 12; h++) {
        const angle = (h * 30) * Math.PI / 180;
        const nx = center + Math.sin(angle) * numR;
        const ny = center - Math.cos(angle) * numR;

        svg += `<text x="${nx.toFixed(1)}" y="${(ny + 5).toFixed(1)}" text-anchor="middle" font-family="'Inter', 'Nanum Gothic', sans-serif" font-size="14" font-weight="700" fill="#0f172a">${h}</text>`;
    }

    if (showHands) {
        // Calculate hand angles
        // Minute hand: 360 deg in 60 mins -> 6 deg/min
        const minuteAngle = (minute * 6) * Math.PI / 180;
        // Hour hand: 30 deg/hour + 0.5 deg/min
        const hourAngle = ((hour % 12) * 30 + minute * 0.5) * Math.PI / 180;

        // Hour hand (shorter, thicker, dark blue/slate)
        const hourLen = radius * 0.52;
        const hx = center + Math.sin(hourAngle) * hourLen;
        const hy = center - Math.cos(hourAngle) * hourLen;
        svg += `<line x1="${center}" y1="${center}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#2563eb" stroke-width="4.5" stroke-linecap="round"/>`;

        // Minute hand (longer, thinner, bright reddish/orange or dark)
        const minLen = radius * 0.74;
        const mx = center + Math.sin(minuteAngle) * minLen;
        const my = center - Math.cos(minuteAngle) * minLen;
        svg += `<line x1="${center}" y1="${center}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>`;
    }

    // Center pivot dot
    svg += `<circle cx="${center}" cy="${center}" r="4.5" fill="#0f172a"/>`;
    svg += `<circle cx="${center}" cy="${center}" r="2" fill="#ffffff"/>`;

    svg += `</svg>`;
    return svg;
}
