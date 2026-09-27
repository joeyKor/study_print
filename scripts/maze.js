/**
 * Maze (미로 찾기) Worksheet Generator
 */

const MAZE_THEMES = {
    puppy: { startEmoji: '🐶', startLabel: '아기 강아지', endEmoji: '🦴', endLabel: '맛있는 뼈다귀', title: '강아지가 뼈다귀를 찾을 수 있게 도와주세요!' },
    space: { startEmoji: '🚀', startLabel: '탐사 우주선', endEmoji: '🪐', endLabel: '신비한 토성', title: '우주선을 타고 행성까지 무사히 도착해 보세요!' },
    mouse: { startEmoji: '🐭', startLabel: '꼬마 생쥐', endEmoji: '🧀', endLabel: '달콤한 치즈', title: '생쥐가 배고프지 않게 치즈를 찾아가 보세요!' },
    bee: { startEmoji: '🐝', startLabel: '꿀벌 친구', endEmoji: '🌸', endLabel: '향기로운 꽃', title: '꿀벌이 예쁜 꽃으로 날아갈 수 있게 길을 찾아주세요!' },
    car: { startEmoji: '🚗', startLabel: '노란 자동차', endEmoji: '🏠', endLabel: '스위트 홈', title: '자동차를 타고 우리 집까지 안전하게 가볼까요?' }
};

function createMazeSection(difficulty, themeKey) {
    const container = document.createElement('div');
    container.className = 'maze-worksheet';

    const theme = MAZE_THEMES[themeKey] || MAZE_THEMES.puppy;

    // Header Instruction
    const desc = document.createElement('div');
    desc.className = 'sheet-instruction';
    desc.innerHTML = `<i class="fas fa-compass"></i> ${theme.title} (벽에 부딪히지 않고 연필로 선을 그어보세요)`;
    container.appendChild(desc);

    if (difficulty === 'easy') {
        // 2 easier mazes (10x10 each) so it fills the page nicely
        const wrap = document.createElement('div');
        wrap.className = 'maze-dual-wrap';

        for (let i = 1; i <= 2; i++) {
            const mazeBox = document.createElement('div');
            mazeBox.className = 'maze-box';
            const mTitle = document.createElement('div');
            mTitle.className = 'maze-sub-title';
            mTitle.innerHTML = `<span>[미로 #${i}]</span> ${theme.startEmoji} 출발 ➔ ${theme.endEmoji} 도착`;
            mazeBox.appendChild(mTitle);

            const svg = generateMazeSVG(10, 10, theme, 340, 260);
            mazeBox.appendChild(svg);
            wrap.appendChild(mazeBox);
        }
        container.appendChild(wrap);
    } else {
        // Medium (16x16) or Hard (22x22)
        const size = difficulty === 'medium' ? 16 : 22;
        const wrap = document.createElement('div');
        wrap.className = 'maze-single-wrap';

        const infoBar = document.createElement('div');
        infoBar.className = 'maze-header-bar';
        infoBar.innerHTML = `
            <div class="maze-legend">
                <span class="legend-badge start">${theme.startEmoji} 출발</span>
                <i class="fas fa-arrow-right"></i>
                <span class="legend-badge end">${theme.endEmoji} 도착</span>
            </div>
            <div class="maze-stat">
                <span>걸린 시간: _____ 분 _____ 초</span>
            </div>
        `;
        wrap.appendChild(infoBar);

        const svg = generateMazeSVG(size, size, theme, 600, 540);
        wrap.appendChild(svg);
        container.appendChild(wrap);
    }

    return container;
}

/**
 * Generate Perfect Maze using DFS Recursive Backtracker
 */
function generateMazeMatrix(cols, rows) {
    // Each cell has walls: [top, right, bottom, left]
    const grid = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push({
                r, c,
                visited: false,
                walls: [true, true, true, true] // T, R, B, L
            });
        }
        grid.push(row);
    }

    const stack = [];
    const startCell = grid[0][0];
    startCell.visited = true;
    stack.push(startCell);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors = [];

        // Check 4 neighbors
        const { r, c } = current;
        if (r > 0 && !grid[r - 1][c].visited) neighbors.push({ dir: 0, cell: grid[r - 1][c], opp: 2 }); // Top
        if (c < cols - 1 && !grid[r][c + 1].visited) neighbors.push({ dir: 1, cell: grid[r][c + 1], opp: 3 }); // Right
        if (r < rows - 1 && !grid[r + 1][c].visited) neighbors.push({ dir: 2, cell: grid[r + 1][c], opp: 0 }); // Bottom
        if (c > 0 && !grid[r][c - 1].visited) neighbors.push({ dir: 3, cell: grid[r][c - 1], opp: 1 }); // Left

        if (neighbors.length > 0) {
            const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
            current.walls[chosen.dir] = false;
            chosen.cell.walls[chosen.opp] = false;
            chosen.cell.visited = true;
            stack.push(chosen.cell);
        } else {
            stack.pop();
        }
    }

    // Open entrance (top-left left wall) and exit (bottom-right right wall)
    grid[0][0].walls[3] = false; // Left open for start
    grid[rows - 1][cols - 1].walls[1] = false; // Right open for goal

    return grid;
}

/**
 * Render Maze as SVG Element
 */
function generateMazeSVG(cols, rows, theme, svgWidth, svgHeight) {
    const margin = 45;
    const innerW = svgWidth - margin * 2;
    const innerH = svgHeight - margin * 2;
    const cellW = innerW / cols;
    const cellH = innerH / rows;

    const maze = generateMazeMatrix(cols, rows);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('class', 'maze-svg');

    // Wall lines group
    const wallsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    wallsGroup.setAttribute('stroke', '#1e293b');
    wallsGroup.setAttribute('stroke-width', cols >= 20 ? '2.5' : '3.5');
    wallsGroup.setAttribute('stroke-linecap', 'round');

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = maze[r][c];
            const x = margin + c * cellW;
            const y = margin + r * cellH;

            // Top wall
            if (cell.walls[0]) {
                const line = createSVGLine(x, y, x + cellW, y);
                wallsGroup.appendChild(line);
            }
            // Right wall
            if (cell.walls[1]) {
                const line = createSVGLine(x + cellW, y, x + cellW, y + cellH);
                wallsGroup.appendChild(line);
            }
            // Bottom wall
            if (cell.walls[2]) {
                const line = createSVGLine(x, y + cellH, x + cellW, y + cellH);
                wallsGroup.appendChild(line);
            }
            // Left wall
            if (cell.walls[3]) {
                const line = createSVGLine(x, y, x, y + cellH);
                wallsGroup.appendChild(line);
            }
        }
    }
    svg.appendChild(wallsGroup);

    // Start Marker (left of 0,0)
    const startX = margin - 25;
    const startY = margin + cellH / 2 + 7;
    const startText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    startText.setAttribute('x', startX);
    startText.setAttribute('y', startY);
    startText.setAttribute('font-size', '24');
    startText.setAttribute('text-anchor', 'middle');
    startText.textContent = theme.startEmoji;
    svg.appendChild(startText);

    const startLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    startLabel.setAttribute('x', startX);
    startLabel.setAttribute('y', startY + 16);
    startLabel.setAttribute('font-size', '10');
    startLabel.setAttribute('font-weight', 'bold');
    startLabel.setAttribute('fill', '#059669');
    startLabel.setAttribute('text-anchor', 'middle');
    startLabel.textContent = '출발';
    svg.appendChild(startLabel);

    // Goal Marker (right of cols-1, rows-1)
    const goalX = margin + innerW + 25;
    const goalY = margin + (rows - 0.5) * cellH + 7;
    const goalText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    goalText.setAttribute('x', goalX);
    goalText.setAttribute('y', goalY);
    goalText.setAttribute('font-size', '24');
    goalText.setAttribute('text-anchor', 'middle');
    goalText.textContent = theme.endEmoji;
    svg.appendChild(goalText);

    const goalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    goalLabel.setAttribute('x', goalX);
    goalLabel.setAttribute('y', goalY + 16);
    goalLabel.setAttribute('font-size', '10');
    goalLabel.setAttribute('font-weight', 'bold');
    goalLabel.setAttribute('fill', '#dc2626');
    goalLabel.setAttribute('text-anchor', 'middle');
    goalLabel.textContent = '도착';
    svg.appendChild(goalLabel);

    return svg;
}

function createSVGLine(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1.toFixed(1));
    line.setAttribute('y1', y1.toFixed(1));
    line.setAttribute('x2', x2.toFixed(1));
    line.setAttribute('y2', y2.toFixed(1));
    return line;
}
