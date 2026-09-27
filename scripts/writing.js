/**
 * Writing Worksheet Generators (Hanja, Gosa, Hangeul)
 */

const HANGEUL_BASIC_DATA = [
    { char: 'ㄱ' }, { char: 'ㄴ' }, { char: 'ㄷ' }, { char: 'ㄹ' }, { char: 'ㅁ' }, 
    { char: 'ㅂ' }, { char: 'ㅅ' }, { char: 'ㅇ' }, { char: 'ㅈ' }, { char: 'ㅊ' }, 
    { char: 'ㅋ' }, { char: 'ㅌ' }, { char: 'ㅍ' }, { char: 'ㅎ' },
    { char: 'ㅏ' }, { char: 'ㅑ' }, { char: 'ㅓ' }, { char: 'ㅕ' }, { char: 'ㅗ' }, 
    { char: 'ㅛ' }, { char: 'ㅜ' }, { char: 'ㅠ' }, { char: 'ㅡ' }, { char: 'ㅣ' }
];

const HANGEUL_WORD_DATA = [
    { char: '학교' }, { char: '나비' }, { char: '우유' }, { char: '포도' }, 
    { char: '기차' }, { char: '바다' }, { char: '하늘' }, { char: '사과' },
    { char: '나무' }, { char: '우리' }, { char: '아이' }, { char: '오이' }
];

function createHangeulWritingSection(target, subCategory) {
    const container = document.createElement('div');
    container.className = 'hanja-section'; // Reuse hanja style
    
    let charactersToRender = []; // Array of { char: '학', context: '학교' }

    if (subCategory === 'basic') {
        const data = HANGEUL_BASIC_DATA;
        const selected = [...data].sort(() => 0.5 - Math.random()).slice(0, 10);
        selected.forEach(item => {
            charactersToRender.push({ char: item.char, context: '' });
        });
    } else if (subCategory === 'word') {
        const data = HANGEUL_WORD_DATA;
        // Pick 5 random words (total 10 characters)
        const selectedWords = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
        selectedWords.forEach(wordItem => {
            const word = wordItem.char;
            for (let i = 0; i < word.length; i++) {
                charactersToRender.push({ char: word[i], context: word });
            }
        });
    } else if (subCategory === 'sentence') {
        const data = [
            { char: '나는 학교에 갑니다.' },
            { char: '오늘 날씨가 참 좋아요.' },
            { char: '한글 공부는 재미있어요.' }
        ];
        // Pick 1 random sentence
        const selectedSentenceItem = data[Math.floor(Math.random() * data.length)];
        const sentence = selectedSentenceItem.char;
        for (let i = 0; i < sentence.length; i++) {
            const char = sentence[i];
            // Skip spaces and punctuation
            if (char === ' ' || char === '.' || char === '!' || char === '?') continue;
            charactersToRender.push({ char: char, context: sentence });
        }
    }

    // Render the characters
    charactersToRender.forEach(item => {
        const row = document.createElement('div');
        row.className = 'hanja-row';
        
        // Label info (The character itself and its context)
        const info = document.createElement('div');
        info.className = 'hanja-meaning-info';
        
        if (item.context) {
            const truncatedContext = item.context.length > 8 ? item.context.substring(0, 7) + '...' : item.context;
            info.innerHTML = `
                <div class="hanja-hoon-eum" style="font-size: 1.4rem;">${item.char}</div>
                <div class="hanja-level-tag" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">[${truncatedContext}]</div>
            `;
        } else {
            info.innerHTML = `<div class="hanja-hoon-eum" style="font-size: 1.6rem; font-weight: 700;">${item.char}</div>`;
        }
        row.appendChild(info);

        // 3 Tracing cells (grey text)
        for (let i = 0; i < 3; i++) {
            const charCell = document.createElement('div');
            charCell.className = 'hanja-char-cell hangeul-char-cell';
            charCell.style.fontSize = '2.4rem';
            charCell.innerHTML = `<span>${item.char}</span>`;
            row.appendChild(charCell);
        }
        
        // 2 Practice boxes
        const practiceGrid = document.createElement('div');
        practiceGrid.className = 'hanja-practice-grid';
        for (let i = 0; i < 2; i++) {
            const box = document.createElement('div');
            box.className = 'writing-box';
            practiceGrid.appendChild(box);
        }
        row.appendChild(practiceGrid);

        // Reference cell
        const refCell = document.createElement('div');
        refCell.className = 'hanja-ref-cell hangeul-char-cell';
        refCell.style.fontSize = '2.4rem';
        refCell.innerHTML = `<span>${item.char}</span>`;
        row.appendChild(refCell);

        container.appendChild(row);
    });
    
    target.appendChild(container);
}

function createWritingSection(count) {
    const container = document.createElement('div');
    container.className = 'writing-grid';
    
    for (let i = 0; i < count; i++) {
        const box = document.createElement('div');
        box.className = 'writing-box';
        container.appendChild(box);
    }
    return container;
}

// Gosa Section
function createGosaSection(target) {
    if (typeof GOSA_DATA === 'undefined') {
        target.innerHTML = '<p style="color:red">데이터를 불러오지 못했습니다. gosa.js 파일 확인이 필요합니다.</p>';
        return;
    }
    
    // Pick random items
    const shuffled = [...GOSA_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    const container = document.createElement('div');
    container.className = 'gosa-container';
    
    selected.forEach((item, index) => {
        const section = document.createElement('div');
        section.className = 'gosa-item';
        
        // Tracing row for all idioms
        const tracingRow = Array.from(item.hanja).map(char => `<div class="writing-box">${char}</div>`).join('');
        
        section.innerHTML = `
            <div class="gosa-info">
                <span class="gosa-hanja">${item.hanja}</span>
                <span class="gosa-korean">(${item.korean})</span>
                <p class="gosa-meaning">${item.meaning}</p>
            </div>
            <div class="gosa-grid">
                ${tracingRow}
                ${Array(item.hanja.length).fill('<div class="writing-box"></div>').join('')}
            </div>
        `;
        container.appendChild(section);
    });
    
    target.appendChild(container);
}

// Hanja Level Section
function createHanjaLevelSection(target, data, count) {
    const container = document.createElement('div');
    container.className = 'hanja-section';
    
    // Pick random items
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    selected.forEach(item => {
        const row = document.createElement('div');
        row.className = 'hanja-row';
        
        // Meaning and Sound (Order: Info -> Tracing -> Practice)
        const info = document.createElement('div');
        info.className = 'hanja-meaning-info';
        info.innerHTML = `
            <div class="hanja-hoon-eum">${item.hoon} <span style="color: #2563eb;">${item.eum}</span></div>
        `;
        row.appendChild(info);

        // 3 Tracing cells (Hanja character in light color)
        for (let i = 0; i < 3; i++) {
            const charCell = document.createElement('div');
            charCell.className = 'hanja-char-cell';
            if (i === 0) {
                charCell.classList.add('stroke-guide');
            }
            charCell.innerHTML = `<span>${item.character}</span>`;
            row.appendChild(charCell);
        }
        
        // 3 Practice boxes (Empty)
        const practiceGrid = document.createElement('div');
        practiceGrid.className = 'hanja-practice-grid';
        for (let i = 0; i < 3; i++) {
            const box = document.createElement('div');
            box.className = 'writing-box';
            practiceGrid.appendChild(box);
        }
        
        row.appendChild(practiceGrid);

        container.appendChild(row);
    });
    
    target.appendChild(container);
}

/**
 * Creates a completely blank Hanja Practice Worksheet matching the user's template image.
 */
function createHanjaPracticeBlankSection(target) {
    target.innerHTML = '';
    
    // 1. Title Container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'hanja-practice-title-container';
    
    const mainTitle = document.createElement('div');
    mainTitle.className = 'hanja-practice-main-title';
    mainTitle.innerText = '漢字(한자)';
    
    const dateDiv = document.createElement('div');
    dateDiv.className = 'hanja-practice-date';
    dateDiv.innerHTML = '날짜: <span class="date-line"></span>';
    
    titleContainer.appendChild(mainTitle);
    titleContainer.appendChild(dateDiv);
    target.appendChild(titleContainer);
    
    // 2. Rows Container
    const container = document.createElement('div');
    container.className = 'hanja-practice-container';
    
    // Create 8 separate tables (filling full A4 sheet)
    for (let r = 0; r < 8; r++) {
        const table = document.createElement('table');
        table.className = 'hanja-practice-table';
        
        // Header Row (thead) - ONLY FOR THE FIRST BLOCK (r === 0)
        if (r === 0) {
            const thead = document.createElement('thead');
            const headerTr = document.createElement('tr');
            
            // Define headers and their colspans:
            // Col 1: "한자" (colspan="1")
            // Col 2: "한자 단어" (colspan="2")
            // Col 3: "연습" (colspan="1")
            // Col 4: "" (colspan="1")
            // Col 5: "" (colspan="1")
            // Col 6: "" (colspan="1")
            const thConfigs = [
                { text: '한자', colspan: 1 },
                { text: '한자 단어', colspan: 2 },
                { text: '연습', colspan: 1 },
                { text: '', colspan: 1 },
                { text: '', colspan: 1 },
                { text: '', colspan: 1 }
            ];
            
            thConfigs.forEach(config => {
                const th = document.createElement('th');
                th.innerText = config.text;
                th.colSpan = config.colspan;
                headerTr.appendChild(th);
            });
            thead.appendChild(headerTr);
            table.appendChild(thead);
        }
        
        // Body (tbody)
        const tbody = document.createElement('tbody');
        
        // 1. Grid Row (Large squares with crosshair lines)
        const gridTr = document.createElement('tr');
        gridTr.className = 'grid-row';
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            const square = document.createElement('div');
            square.className = 'hanja-practice-square';
            td.appendChild(square);
            gridTr.appendChild(td);
        }
        tbody.appendChild(gridTr);
        
        // 2. Rect Row (Bottom reading/meaning boxes)
        const rectTr = document.createElement('tr');
        rectTr.className = 'rect-row';
        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            const rect = document.createElement('div');
            rect.className = 'hanja-practice-rect';
            td.appendChild(rect);
            rectTr.appendChild(td);
        }
        tbody.appendChild(rectTr);
        
        table.appendChild(tbody);
        container.appendChild(table);
    }
    
    // 3. QR Code and Category Code Footer
    const now = new Date();
    const yy = String(now.getFullYear()).substring(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const qrTextVal = `${yy}${mm}${dd}_hanja`;
    
    const footer = document.createElement('div');
    footer.className = 'hanja-practice-footer';
    
    const qrContainer = document.createElement('div');
    qrContainer.className = 'hanja-practice-qr-container';
    
    const qrText = document.createElement('div');
    qrText.className = 'hanja-practice-qr-text';
    qrText.innerText = qrTextVal;
    
    const qrImg = document.createElement('img');
    qrImg.className = 'hanja-practice-qr-img';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${qrTextVal}`;
    qrImg.alt = 'QR Code';
    
    qrContainer.appendChild(qrText);
    qrContainer.appendChild(qrImg);
    footer.appendChild(qrContainer);
    container.appendChild(footer);
    
    target.appendChild(container);
}

