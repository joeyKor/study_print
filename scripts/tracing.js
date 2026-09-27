/**
 * Line Drawing (선긋기) Generator
 */

const TRACING_PAIRS = [
    { start: '🐝', end: '🌸' },
    { start: '🐶', end: '🦴' },
    { start: '🚗', end: '🏠' },
    { start: '🐵', end: '🍌' },
    { start: '🐰', end: '🥕' },
    { start: '🐦', end: '🌳' },
    { start: '🌧️', end: '☂️' },
    { start: '🚀', end: '🌕' },
    { start: '🦋', end: '🌻' },
    { start: '🐿️', end: '🥜' },
    { start: '🐱', end: '🐟' },
    { start: '🧸', end: '🧺' }
];

function createTracingSection(subType) {
    const container = document.createElement('div');
    container.className = 'tracing-container';

    if (subType === 'matching') {
        return createMatchingSection();
    }

    // Standard tracing rows (Basic, Wave, Zigzag)
    const rows = 6;
    const pairs = [...TRACING_PAIRS].sort(() => 0.5 - Math.random()).slice(0, rows);

    pairs.forEach((pair, index) => {
        const row = document.createElement('div');
        row.className = 'tracing-row';
        
        const startIcon = document.createElement('div');
        startIcon.className = 'tracing-icon start';
        startIcon.innerText = pair.start;
        
        const svgContainer = document.createElement('div');
        svgContainer.className = 'tracing-line';
        svgContainer.innerHTML = generateLineSVG(subType);
        
        const endIcon = document.createElement('div');
        endIcon.className = 'tracing-icon end';
        endIcon.innerText = pair.end;
        
        row.appendChild(startIcon);
        row.appendChild(svgContainer);
        row.appendChild(endIcon);
        container.appendChild(row);
    });

    return container;
}

function generateLineSVG(type) {
    const width = 500;
    const height = 60;
    let path = '';

    switch(type) {
        case 'basic':
            path = `M 10,${height/2} L ${width-10},${height/2}`;
            break;
        case 'wave':
            path = `M 10,${height/2}`;
            for (let x = 10; x <= width - 10; x += 20) {
                const y = height/2 + Math.sin(x * 0.05) * 20;
                path += ` L ${x},${y}`;
            }
            break;
        case 'zigzag':
            path = `M 10,${height/2}`;
            let up = true;
            for (let x = 10; x <= width - 10; x += 30) {
                const y = up ? 10 : height - 10;
                path += ` L ${x},${y}`;
                up = !up;
            }
            break;
    }

    return `
        <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
            <path d="${path}" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-dasharray="8,8" />
        </svg>
    `;
}

function createMatchingSection() {
    const container = document.createElement('div');
    container.className = 'matching-container';
    
    const title = document.createElement('p');
    title.className = 'matching-instruction';
    title.innerText = '서로 관련 있는 것끼리 선으로 이어보세요.';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'matching-grid';

    const pairs = [...TRACING_PAIRS].sort(() => 0.5 - Math.random()).slice(0, 5);
    const leftItems = pairs.map(p => p.start);
    const rightItems = pairs.map(p => p.end).sort(() => 0.5 - Math.random());

    const leftCol = document.createElement('div');
    leftCol.className = 'matching-column';
    leftItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.innerHTML = `<span>${item}</span><div class="dot"></div>`;
        leftCol.appendChild(div);
    });

    const rightCol = document.createElement('div');
    rightCol.className = 'matching-column';
    rightItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.innerHTML = `<div class="dot"></div><span>${item}</span>`;
        rightCol.appendChild(div);
    });

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    container.appendChild(grid);

    return container;
}
