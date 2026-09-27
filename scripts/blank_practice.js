/**
 * Blank Practice Worksheet Generator (빈 쓰기 양식 / 연습장)
 * Provides comprehensive blank writing templates for:
 * 1. Hangeul (10-box, 8-box, Lined)
 * 2. English (4-line wide, 4-line standard, 4-line divided boxes)
 * 3. Hanja (Table worksheet, Crosshair grid, Rice/Mi grid)
 * 4. Math Grid (1cm graph paper)
 */

function createBlankPracticeSection(subCategory, options = {}) {
    const container = document.createElement('div');
    container.className = 'blank-practice-container-main';

    const guideStyle = document.getElementById('blank-guide-select')?.value || 'dashed';
    const showHeader = (document.getElementById('blank-header-select')?.value || 'yes') === 'yes';

    switch (subCategory) {
        case 'hangeul_8':
            return createHangeulBoxSheet(8, 10, guideStyle, showHeader, '초등 저학년 / 유치 8칸 깍두기 공책');
        case 'hangeul_line':
            return createHangeulLinedSheet(18, guideStyle, showHeader);
        case 'english_wide':
            return createEnglish4LineSheet(12, 42, guideStyle, showHeader, '영어 4선 쓰기 노트 (넓은 줄 - 유아/기초)');
        case 'english_std':
            return createEnglish4LineSheet(15, 33, guideStyle, showHeader, '영어 4선 쓰기 노트 (표준 간격 - 초등/중등)');
        case 'english_box':
            return createEnglishBoxSheet(11, guideStyle, showHeader);
        case 'hanja_grid':
            return createHanjaSquareGridSheet(8, 13, 'cross', guideStyle, showHeader, '한자 쓰기 연습장 (십자 격자)');
        case 'hanja_mi':
            return createHanjaSquareGridSheet(8, 13, 'mi', guideStyle, showHeader, '한자 정자 연습장 (米자 격자)');
        case 'math_grid':
            return createMathGridSheet(showHeader);
        case 'hanja_table':
            return createHanjaTableSheet(showHeader);
        case 'hangeul_10':
        default:
            return createHangeulBoxSheet(10, 12, guideStyle, showHeader, '초등 표준 10칸 깍두기 공책');
    }
}

/**
 * 1. Hangeul Box Grid (10-box or 8-box)
 */
function createHangeulBoxSheet(cols, rows, guideStyle, showHeader, subTitle) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    // Header Guide
    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>${subTitle}</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>학년 / 반: _______</span>
                <span>이름: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const gridContainer = document.createElement('div');
    gridContainer.className = 'blank-hangeul-grid-wrap';

    const cellClass = `blank-hangeul-cell cols-${cols} guide-${guideStyle}`;

    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'blank-hangeul-row';

        // Row number badge on left
        const rowNum = document.createElement('div');
        rowNum.className = 'blank-row-num';
        rowNum.innerText = `${r + 1}`;
        rowDiv.appendChild(rowNum);

        const boxesWrap = document.createElement('div');
        boxesWrap.className = 'blank-boxes-wrap';

        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = cellClass;
            boxesWrap.appendChild(cell);
        }

        rowDiv.appendChild(boxesWrap);
        gridContainer.appendChild(rowDiv);
    }

    wrap.appendChild(gridContainer);
    return wrap;
}

/**
 * 2. Hangeul Lined Notebook
 */
function createHangeulLinedSheet(linesCount, guideStyle, showHeader) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>초등 국어 줄공책 (문장 쓰기 연습)</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>학년 / 반: _______</span>
                <span>이름: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const linedContainer = document.createElement('div');
    linedContainer.className = 'blank-lined-container';

    for (let i = 0; i < linesCount; i++) {
        const lineRow = document.createElement('div');
        lineRow.className = `blank-lined-row guide-${guideStyle}`;
        lineRow.innerHTML = `
            <div class="blank-line-num">${i + 1}</div>
            <div class="blank-line-body">
                <div class="blank-line-midline"></div>
            </div>
        `;
        linedContainer.appendChild(lineRow);
    }

    wrap.appendChild(linedContainer);
    return wrap;
}

/**
 * 3. English 4-Line Notebook
 */
function createEnglish4LineSheet(rowsCount, rowHeight, guideStyle, showHeader, subTitle) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>${subTitle}</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>Class: _______</span>
                <span>Name: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const englishContainer = document.createElement('div');
    englishContainer.className = `blank-english-container ${rowHeight >= 40 ? 'gap-wide' : 'gap-std'}`;

    for (let r = 0; r < rowsCount; r++) {
        const unit = document.createElement('div');
        unit.className = 'blank-english-unit';
        unit.style.height = `${rowHeight}px`;

        const rowNum = document.createElement('div');
        rowNum.className = 'blank-english-num';
        rowNum.innerText = `${r + 1}`;
        unit.appendChild(rowNum);

        const linesBox = document.createElement('div');
        linesBox.className = `blank-english-lines guide-${guideStyle}`;
        linesBox.innerHTML = `
            <div class="en-line top-line"></div>
            <div class="en-line mid-line"></div>
            <div class="en-line base-line"></div>
            <div class="en-line bottom-line"></div>
        `;
        unit.appendChild(linesBox);

        englishContainer.appendChild(unit);
    }

    wrap.appendChild(englishContainer);
    return wrap;
}

/**
 * 4. English Word Box Sheet (4-lines inside divided word practice boxes)
 */
function createEnglishBoxSheet(rowsCount, guideStyle, showHeader) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>영어 낱말 칸 쓰기 연습장 (단어별 4선 분할)</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>Class: _______</span>
                <span>Name: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const container = document.createElement('div');
    container.className = 'blank-english-box-container';

    for (let r = 0; r < rowsCount; r++) {
        const row = document.createElement('div');
        row.className = 'blank-en-box-row';

        const rowNum = document.createElement('div');
        rowNum.className = 'blank-english-num';
        rowNum.innerText = `${r + 1}`;
        row.appendChild(rowNum);

        // 4 Word Boxes per row
        for (let b = 0; b < 4; b++) {
            const box = document.createElement('div');
            box.className = 'blank-en-card-box';
            box.innerHTML = `
                <div class="en-card-line top-line"></div>
                <div class="en-card-line mid-line"></div>
                <div class="en-card-line base-line"></div>
                <div class="en-card-line bottom-line"></div>
            `;
            row.appendChild(box);
        }

        container.appendChild(row);
    }

    wrap.appendChild(container);
    return wrap;
}

/**
 * 5. Hanja Square Grid Sheet (십자 / 米자 격자)
 */
function createHanjaSquareGridSheet(cols, rows, gridType, guideStyle, showHeader, subTitle) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>${subTitle}</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>날짜: ___________</span>
                <span>성명: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const gridContainer = document.createElement('div');
    gridContainer.className = 'blank-hanja-grid-wrap';

    const cellClass = `blank-hanja-cell type-${gridType} guide-${guideStyle}`;

    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'blank-hanja-row';

        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = cellClass;
            rowDiv.appendChild(cell);
        }

        gridContainer.appendChild(rowDiv);
    }

    wrap.appendChild(gridContainer);
    return wrap;
}

/**
 * 6. Hanja Table Worksheet (Classic 5-Block Table Sheet)
 */
function createHanjaTableSheet(showHeader) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (typeof createHanjaPracticeBlankSection === 'function') {
        createHanjaPracticeBlankSection(wrap);
        return wrap;
    }

    return wrap;
}

/**
 * 7. Math 1cm Graph Paper Sheet
 */
function createMathGridSheet(showHeader) {
    const wrap = document.createElement('div');
    wrap.className = 'blank-sheet-wrap';

    if (showHeader) {
        const header = document.createElement('div');
        header.className = 'blank-sheet-header-box';
        header.innerHTML = `
            <div class="blank-sheet-title-tag">
                <span>방안 모눈종이 (수학 / 도형 / 그래프)</span>
            </div>
            <div class="blank-sheet-user-meta">
                <span>날짜: ___________</span>
                <span>이름: ____________</span>
            </div>
        `;
        wrap.appendChild(header);
    }

    const mathWrap = document.createElement('div');
    mathWrap.className = 'blank-math-grid';
    wrap.appendChild(mathWrap);

    return wrap;
}
