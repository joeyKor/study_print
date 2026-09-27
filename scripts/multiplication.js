/**
 * Multiplication (구구단) Worksheet Generator
 */

function createMultiplicationSection(subType, danOption) {
    const container = document.createElement('div');
    container.className = 'multiplication-worksheet';

    const countSelect = document.getElementById('multi-count-select');
    const count = countSelect ? parseInt(countSelect.value) || 28 : 28;

    // Header info (score & time)
    const headerInfo = document.createElement('div');
    headerInfo.className = 'multi-header-info';
    headerInfo.innerHTML = `
        <div class="multi-stat-box">
            <span class="stat-label"><i class="fas fa-stopwatch"></i> 걸린 시간:</span>
            <span class="stat-line">_____ 분 _____ 초</span>
        </div>
        <div class="multi-stat-box">
            <span class="stat-label"><i class="fas fa-check-circle"></i> 맞은 개수:</span>
            <span class="stat-line">_____ / ${subType === 'dan_practice' ? (danOption === 'all' ? '72' : '36') : (subType === 'table' ? '72' : count)} 개</span>
        </div>
    `;
    container.appendChild(headerInfo);

    if (subType === 'table') {
        container.appendChild(createMultiplicationTable());
        return container;
    }

    if (subType === 'dan_practice') {
        container.appendChild(createDanPractice(danOption));
        return container;
    }

    // Shuffle or Blank
    const questions = generateMultiplicationQuestions(subType, danOption, count);

    const grid = document.createElement('div');
    grid.className = 'multi-grid-cards';

    questions.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'multi-card';

        const qNum = document.createElement('div');
        qNum.className = 'multi-q-num';
        qNum.innerText = `${idx + 1}`;
        card.appendChild(qNum);

        const exp = document.createElement('div');
        exp.className = 'multi-expression';

        if (subType === 'blank') {
            if (q.blankType === 1) {
                exp.innerHTML = `<span class="multi-blank"></span> <span class="op">×</span> <span class="num">${q.num2}</span> <span class="eq">=</span> <span class="num">${q.result}</span>`;
            } else if (q.blankType === 2) {
                exp.innerHTML = `<span class="num">${q.num1}</span> <span class="op">×</span> <span class="multi-blank"></span> <span class="eq">=</span> <span class="num">${q.result}</span>`;
            } else {
                exp.innerHTML = `<span class="num">${q.num1}</span> <span class="op">×</span> <span class="num">${q.num2}</span> <span class="eq">=</span> <span class="multi-blank"></span>`;
            }
        } else {
            // standard shuffle quiz
            exp.innerHTML = `
                <span class="num">${q.num1}</span> 
                <span class="op">×</span> 
                <span class="num">${q.num2}</span> 
                <span class="eq">=</span> 
                <span class="multi-answer-line"></span>
            `;
        }

        card.appendChild(exp);
        grid.appendChild(card);
    });

    container.appendChild(grid);
    return container;
}

/**
 * Generate questions for shuffle or blank mode
 */
function generateMultiplicationQuestions(subType, danOption, count) {
    const list = [];
    const used = new Set();

    let allowedDans = [];
    if (danOption === 'all') {
        allowedDans = [2, 3, 4, 5, 6, 7, 8, 9];
    } else {
        const d = parseInt(danOption);
        allowedDans = isNaN(d) ? [2, 3, 4, 5, 6, 7, 8, 9] : [d];
    }

    // Try to ensure balanced distribution
    while (list.length < count) {
        const num1 = allowedDans[Math.floor(Math.random() * allowedDans.length)];
        const num2 = Math.floor(Math.random() * 9) + 1;
        const key = `${num1}x${num2}`;

        if (allowedDans.length === 1 || !used.has(key) || list.length >= allowedDans.length * 9) {
            used.add(key);
            const blankType = Math.floor(Math.random() * 3) + 1;
            list.push({
                num1,
                num2,
                result: num1 * num2,
                blankType
            });
        }
    }

    return list;
}

/**
 * Dan Practice:
 * If 'all': Shows 2단 ~ 9단 all 8 tables (4 columns x 2 rows) perfectly filling A4!
 * If specific dan (e.g. 7단): Shows 4 columns (1회차 순서, 2회차 순서, 3회차 셔플, 4회차 빈칸) perfectly filling A4!
 */
function createDanPractice(danOption) {
    const wrap = document.createElement('div');
    wrap.className = 'dan-practice-container';

    if (danOption === 'all') {
        // Render 2~5 in Row 1, 6~9 in Row 2
        const grid = document.createElement('div');
        grid.className = 'dan-practice-all-grid';

        for (let dan = 2; dan <= 9; dan++) {
            const col = document.createElement('div');
            col.className = 'dan-practice-col';

            const title = document.createElement('div');
            title.className = 'dan-col-title';
            title.innerText = `[ ${dan} 단 ]`;
            col.appendChild(title);

            for (let i = 1; i <= 9; i++) {
                const row = document.createElement('div');
                row.className = 'dan-row';
                row.innerHTML = `
                    <span class="dan-num">${dan}</span>
                    <span class="dan-op">×</span>
                    <span class="dan-num">${i}</span>
                    <span class="dan-eq">=</span>
                    <span class="dan-blank"></span>
                `;
                col.appendChild(row);
            }
            grid.appendChild(col);
        }
        wrap.appendChild(grid);
    } else {
        // Specific Dan 4-column mastery layout
        const d = parseInt(danOption) || 2;
        const grid = document.createElement('div');
        grid.className = 'dan-practice-single-grid';

        const stages = [
            { title: `[ 1단계 ] ${d}단 순서대로 쓰기`, type: 'seq' },
            { title: `[ 2단계 ] ${d}단 2회차 복습`, type: 'seq' },
            { title: `[ 3단계 ] ${d}단 섞어서 풀기`, type: 'shuffle' },
            { title: `[ 4단계 ] ${d}단 빈칸 채우기`, type: 'blank' }
        ];

        stages.forEach(st => {
            const col = document.createElement('div');
            col.className = 'dan-practice-col';

            const title = document.createElement('div');
            title.className = 'dan-col-title';
            title.innerText = st.title;
            col.appendChild(title);

            let multList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            if (st.type === 'shuffle' || st.type === 'blank') {
                multList = [...multList].sort(() => 0.5 - Math.random());
            }

            multList.forEach((i, idx) => {
                const row = document.createElement('div');
                row.className = 'dan-row';

                if (st.type === 'blank') {
                    if (idx % 2 === 0) {
                        row.innerHTML = `
                            <span class="dan-num">${d}</span>
                            <span class="dan-op">×</span>
                            <span class="dan-blank-box"></span>
                            <span class="dan-eq">=</span>
                            <span class="dan-num">${d * i}</span>
                        `;
                    } else {
                        row.innerHTML = `
                            <span class="dan-blank-box"></span>
                            <span class="dan-op">×</span>
                            <span class="dan-num">${i}</span>
                            <span class="dan-eq">=</span>
                            <span class="dan-num">${d * i}</span>
                        `;
                    }
                } else {
                    row.innerHTML = `
                        <span class="dan-num">${d}</span>
                        <span class="dan-op">×</span>
                        <span class="dan-num">${i}</span>
                        <span class="dan-eq">=</span>
                        <span class="dan-blank"></span>
                    `;
                }
                col.appendChild(row);
            });

            grid.appendChild(col);
        });

        wrap.appendChild(grid);
    }

    return wrap;
}

/**
 * 2~9 Multiplication Grid Table to fill in
 */
function createMultiplicationTable() {
    const wrap = document.createElement('div');
    wrap.className = 'multi-table-wrap';

    const title = document.createElement('div');
    title.className = 'sheet-instruction';
    title.innerHTML = '<i class="fas fa-th"></i> 가로와 세로 숫자를 곱하여 빈칸을 알맞게 채워 구구단 표를 완성해 보세요.';
    wrap.appendChild(title);

    const table = document.createElement('table');
    table.className = 'multi-times-table';

    // Header row
    const thead = document.createElement('thead');
    const headerTr = document.createElement('tr');
    headerTr.innerHTML = `<th>×</th>`;
    for (let col = 1; col <= 9; col++) {
        headerTr.innerHTML += `<th>${col}</th>`;
    }
    thead.appendChild(headerTr);
    table.appendChild(thead);

    // Body rows (2 to 9)
    const tbody = document.createElement('tbody');
    for (let r = 2; r <= 9; r++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th class="row-header">${r}단</th>`;
        for (let c = 1; c <= 9; c++) {
            // Randomly leave some filled as hints (around 22% hints)
            const isHint = Math.random() < 0.22;
            if (isHint) {
                tr.innerHTML += `<td class="hint-cell">${r * c}</td>`;
            } else {
                tr.innerHTML += `<td class="empty-cell"></td>`;
            }
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);

    return wrap;
}
