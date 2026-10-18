/**
 * Writing Worksheet Generators (Hanja, Gosa, Hangeul)
 */

const HANGEUL_GANADA_DATA = [
    '가', '나', '다', '라', '마', '바', '사', 
    '아', '자', '차', '카', '타', '파', '하'
];

const HANGEUL_VOWEL_DATA = [
    '아', '야', '어', '여', '오', '요', '우', '유', '으', '이'
];

const HANGEUL_WORD_DATA = [
    { char: '학교' }, { char: '나비' }, { char: '우유' }, { char: '포도' }, 
    { char: '기차' }, { char: '바다' }, { char: '하늘' }, { char: '사과' },
    { char: '나무' }, { char: '우리' }, { char: '아이' }, { char: '오이' }
];

function createHangeulWritingSection(target, subCategory = 'ganada') {
    const isVowel = subCategory === 'vowel';
    const isSentence = subCategory === 'sentence';
    const isGanada = subCategory === 'ganada' || subCategory === 'basic' || (!isVowel && !isSentence);

    const container = document.createElement('div');
    container.className = `hangeul-section ${isVowel ? 'hangeul-vowel-view' : 'hangeul-ganada-view'}`;

    const traceMode = document.getElementById('select-hangeul-trace-type')?.value || 'all_trace';

    let charactersToRender = [];

    if (isVowel) {
        // 아, 야, 어, 여, 오, 요, 우, 유, 으, 이 (10글자 순서대로)
        HANGEUL_VOWEL_DATA.forEach(c => charactersToRender.push({ char: c, context: '' }));
    } else if (isGanada) {
        // 가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하 (14글자 순서대로)
        HANGEUL_GANADA_DATA.forEach(c => charactersToRender.push({ char: c, context: '' }));
    } else if (isSentence) {
        const sentences = [
            '나는 학교에 갑니다.',
            '오늘 날씨가 참 좋아요.',
            '한글 공부는 재미있어요.',
            '우리 가족을 사랑해요.'
        ];
        const selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
        for (let i = 0; i < selectedSentence.length; i++) {
            const char = selectedSentence[i];
            if (char === ' ' || char === '.' || char === '!' || char === '?') continue;
            charactersToRender.push({ char: char, context: selectedSentence });
        }
    }

    charactersToRender.forEach(item => {
        const row = document.createElement('div');
        row.className = 'hangeul-row';

        // 1. Info block (보기 기준 글자)
        const infoCell = document.createElement('div');
        infoCell.className = 'hangeul-char-cell hangeul-info-box';
        infoCell.innerHTML = `<span>${item.char}</span>`;
        row.appendChild(infoCell);

        // 6 practice/trace cells
        if (traceMode === 'with_practice') {
            // 3 trace cells + 3 practice cells
            for (let i = 0; i < 3; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'hangeul-char-cell hangeul-trace-box';
                traceCell.innerHTML = `<span>${item.char}</span>`;
                row.appendChild(traceCell);
            }
            for (let i = 0; i < 3; i++) {
                const practiceCell = document.createElement('div');
                practiceCell.className = 'hangeul-char-cell hangeul-practice-box';
                practiceCell.innerHTML = `<span>${item.char}</span>`;
                row.appendChild(practiceCell);
            }
        } else {
            // Default: All 6 cells are gray trace cells (회색 음영 따라쓰기)
            for (let i = 0; i < 6; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = 'hangeul-char-cell hangeul-trace-box';
                traceCell.innerHTML = `<span>${item.char}</span>`;
                row.appendChild(traceCell);
            }
        }

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

