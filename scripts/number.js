/**
 * Number Writing Worksheet Generator
 * Provides 1-10, 11-20, 1-20 (Split View), 1-50 Grid, and 1-100 Grid worksheets.
 */

function createNumberSection(subCategory = 'num_1_10') {
    const container = document.createElement('div');
    const traceMode = document.getElementById('select-number-trace-type')?.value || 'all_trace';

    if (subCategory === 'num_1_20_split') {
        // 2-Column Split View: Left 1~10, Right 11~20
        container.className = 'number-section number-split-view';

        const leftCol = document.createElement('div');
        leftCol.className = 'number-col number-col-left';
        const leftHeader = document.createElement('div');
        leftHeader.className = 'number-col-badge';
        leftHeader.innerHTML = `<span><i class="fas fa-arrow-down"></i> 1 ~ 10</span>`;
        leftCol.appendChild(leftHeader);

        for (let num = 1; num <= 10; num++) {
            leftCol.appendChild(createNumberRow(num, true, traceMode));
        }

        const divider = document.createElement('div');
        divider.className = 'number-divider';

        const rightCol = document.createElement('div');
        rightCol.className = 'number-col number-col-right';
        const rightHeader = document.createElement('div');
        rightHeader.className = 'number-col-badge';
        rightHeader.innerHTML = `<span><i class="fas fa-arrow-down"></i> 11 ~ 20</span>`;
        rightCol.appendChild(rightHeader);

        for (let num = 11; num <= 20; num++) {
            rightCol.appendChild(createNumberRow(num, true, traceMode));
        }

        container.appendChild(leftCol);
        container.appendChild(divider);
        container.appendChild(rightCol);

    } else if (subCategory === 'num_grid_50' || subCategory === 'num_grid_100') {
        // Grid Table Board View (50: 10x5, 100: 10x10)
        const is100 = (subCategory === 'num_grid_100');
        const total = is100 ? 100 : 50;
        const rows = is100 ? 10 : 5;

        container.className = `number-grid-container ${is100 ? 'grid-100-view' : 'grid-50-view'}`;

        const grid = document.createElement('div');
        grid.className = 'number-board-grid';

        for (let i = 1; i <= total; i++) {
            const cell = document.createElement('div');
            cell.className = 'number-board-cell has-crosshair';

            let isBlank = false;
            if (traceMode === 'with_practice') {
                // In practice mode, alternate every even number as blank to fill in
                if (i % 2 === 0) isBlank = true;
            }

            if (isBlank) {
                cell.classList.add('number-practice-box');
                cell.innerHTML = `<span>${i}</span>`;
            } else {
                cell.innerHTML = `<span>${i}</span>`;
            }

            grid.appendChild(cell);
        }

        container.appendChild(grid);

    } else {
        // Single 1-Column Row View: 1-10 or 11-20 (10 rows, large cells)
        const is11to20 = (subCategory === 'num_11_20');
        const startNum = is11to20 ? 11 : 1;
        const endNum = is11to20 ? 20 : 10;

        container.className = 'number-section number-single-view';

        for (let num = startNum; num <= endNum; num++) {
            container.appendChild(createNumberRow(num, false, traceMode));
        }
    }

    return container;
}

/**
 * Helper to create a single row for a number
 * @param {number} num - The number
 * @param {boolean} isSplit - Whether it's in the 2-column split view
 * @param {string} traceMode - 'all_trace' or 'with_practice'
 */
function createNumberRow(num, isSplit, traceMode) {
    const row = document.createElement('div');
    row.className = 'number-row';

    // 1. Info / Model Box (Blue theme, bold)
    const infoCell = document.createElement('div');
    infoCell.className = 'number-char-cell number-info-box has-crosshair';
    infoCell.innerHTML = `<span>${num}</span>`;
    row.appendChild(infoCell);

    if (isSplit) {
        // 2-Column Split: 4 cells total [Info 1] + [3 cells]
        if (traceMode === 'with_practice') {
            for (let i = 0; i < 2; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'number-char-cell has-crosshair';
                traceCell.innerHTML = `<span>${num}</span>`;
                row.appendChild(traceCell);
            }
            const practiceCell = document.createElement('div');
            practiceCell.className = 'number-char-cell number-practice-box has-crosshair';
            practiceCell.innerHTML = `<span>${num}</span>`;
            row.appendChild(practiceCell);
        } else {
            // Default: All 3 cells are gray trace cells
            for (let i = 0; i < 3; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'number-char-cell has-crosshair';
                traceCell.innerHTML = `<span>${num}</span>`;
                row.appendChild(traceCell);
            }
        }
    } else {
        // Single Column: 7 cells total [Info 1] + [6 cells]
        if (traceMode === 'with_practice') {
            for (let i = 0; i < 3; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'number-char-cell has-crosshair';
                traceCell.innerHTML = `<span>${num}</span>`;
                row.appendChild(traceCell);
            }
            for (let i = 0; i < 3; i++) {
                const practiceCell = document.createElement('div');
                practiceCell.className = 'number-char-cell number-practice-box has-crosshair';
                practiceCell.innerHTML = `<span>${num}</span>`;
                row.appendChild(practiceCell);
            }
        } else {
            // Default: All 6 cells are gray trace cells
            for (let i = 0; i < 6; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'number-char-cell has-crosshair';
                traceCell.innerHTML = `<span>${num}</span>`;
                row.appendChild(traceCell);
            }
        }
    }

    return row;
}
