let currentType = '';

function showDashboard() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        dashboard.style.display = 'grid';
        const worksheetContainer = document.getElementById('worksheet-container');
        if (worksheetContainer) worksheetContainer.style.display = 'none';
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) navMenu.style.display = 'none';
    } else {
        location.href = 'index.html';
    }
}

function showWorksheet() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) dashboard.style.display = 'none';
    const worksheetContainer = document.getElementById('worksheet-container');
    if (worksheetContainer) worksheetContainer.style.display = 'flex';
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.style.display = 'flex';
    window.scrollTo(0, 0);
}

let currentSubCategory = 'add'; // Default sub category for math

function openMathConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=math';
        return;
    }
    currentSubCategory = 'add';
    generateWorksheet('math');
}

function openHangeulConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=hangeul';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    currentSubCategory = urlParams.get('sub') || 'ganada';
    setSubCategory('hangeul', currentSubCategory);
}

function openHangeulWordConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=hangeul_word';
        return;
    }
    currentSubCategory = 'animals';
    generateWorksheet('hangeul_word');
}

function openHanjaConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=hanja';
        return;
    }
    currentSubCategory = 'hanja8';
    generateWorksheet('hanja');
}

function openBlankPracticeConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=blank_practice';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    currentSubCategory = urlParams.get('sub') || 'hangeul_10';
    setSubCategory('blank_practice', currentSubCategory);
}

function openHanjaPracticeConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=blank_practice&sub=hanja_table';
        return;
    }
    currentSubCategory = 'hanja_table';
    setSubCategory('blank_practice', currentSubCategory);
}

function openDrawingConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=drawing';
        return;
    }
    currentSubCategory = 'color_theme';
    generateWorksheet('drawing');
}

function openTracingConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=tracing';
        return;
    }
    currentSubCategory = 'basic';
    generateWorksheet('tracing');
}

function openEnglishConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=english';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    currentSubCategory = urlParams.get('sub') || 'junior145';
    setSubCategory('english', currentSubCategory);
}

function openAlphabetConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=alphabet';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    currentSubCategory = urlParams.get('sub') || 'upper_all';
    setSubCategory('alphabet', currentSubCategory);
}

function openNumberConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=number';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    currentSubCategory = urlParams.get('sub') || 'num_1_10';
    setSubCategory('number', currentSubCategory);
}

function openCalendarConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=calendar';
        return;
    }
    currentSubCategory = 'monthly';
    generateWorksheet('calendar');
}

function openDailyStudy() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=daily';
        return;
    }
    currentSubCategory = 'all';
    generateWorksheet('daily');
}

function openZombieStudy() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=zombie';
        return;
    }
    currentSubCategory = 'all';
    generateWorksheet('zombie');
}

function openWunStudy() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=wun';
        return;
    }
    currentSubCategory = 'all';
    generateWorksheet('wun');
}

function openClockConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=clock';
        return;
    }
    currentSubCategory = 'read_clock';
    generateWorksheet('clock');
}

function openMultiplicationConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=multiplication';
        return;
    }
    currentSubCategory = 'shuffle';
    generateWorksheet('multiplication');
}

function openMazeConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=maze';
        return;
    }
    currentSubCategory = 'easy';
    generateWorksheet('maze');
}

function openCustomTextConfig() {
    if (!document.getElementById('worksheet-container')) {
        location.href = 'study.html?type=customtext';
        return;
    }
    currentSubCategory = 'sentence';
    generateWorksheet('customtext');
}

function applyCustomPreset() {
    const presetKey = document.getElementById('custom-preset-select')?.value;
    const textArea = document.getElementById('custom-input-text');
    if (presetKey && textArea && typeof CUSTOM_TEXT_PRESETS !== 'undefined' && CUSTOM_TEXT_PRESETS[presetKey]) {
        textArea.value = CUSTOM_TEXT_PRESETS[presetKey];
        refreshContent();
    }
}


function setSubCategory(mainType, subType) {
    currentSubCategory = subType;
    
    // Update active class in sidebar
    const items = document.querySelectorAll('.sub-menu li');
    items.forEach(item => {
        const onClickAttr = item.getAttribute('onclick');
        if (onClickAttr && onClickAttr.includes(`'${subType}'`)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    generateWorksheet(mainType);
}

function generateWorksheet(type) {
    currentType = type;
    const title = document.getElementById('sheet-title');
    const content = document.getElementById('sheet-content');
    
    // Toggle Landscape Print Style
    const printStyleId = 'print-landscape-style';
    let printStyleEl = document.getElementById(printStyleId);
    if (type === 'calendar') {
        if (!printStyleEl) {
            printStyleEl = document.createElement('style');
            printStyleEl.id = printStyleId;
            printStyleEl.innerHTML = `
                @media print {
                    @page {
                        size: A4 landscape !important;
                        margin: 0 !important;
                    }
                    .paper {
                        width: 297mm !important;
                        height: 210mm !important;
                        min-height: 210mm !important;
                        max-height: 210mm !important;
                        padding: 6mm 10mm !important;
                        display: flex !important;
                        flex-direction: column !important;
                        box-sizing: border-box !important;
                    }
                    #sheet-content {
                        flex: 1 !important;
                        display: flex !important;
                        flex-direction: column !important;
                        height: 100% !important;
                    }
                }
            `;
            document.head.appendChild(printStyleEl);
        }
        document.body.classList.add('landscape-mode');
    } else {
        if (printStyleEl) {
            printStyleEl.remove();
        }
        document.body.classList.remove('landscape-mode');
    }

    // Sidebar sections
    const mathSidebar = document.getElementById('sidebar-math');
    const hangeulSidebar = document.getElementById('sidebar-hangeul');
    const hangeulWordSidebar = document.getElementById('sidebar-hangeul-word');
    const hanjaSidebar = document.getElementById('sidebar-hanja');
    const hanjaPracticeSidebar = document.getElementById('sidebar-blank-practice') || document.getElementById('sidebar-hanja-practice');
    const tracingSidebar = document.getElementById('sidebar-tracing');
    const englishSidebar = document.getElementById('sidebar-english');
    const alphabetSidebar = document.getElementById('sidebar-alphabet');
    const numberSidebar = document.getElementById('sidebar-number');
    const drawingSidebar = document.getElementById('sidebar-drawing');
    const calendarSidebar = document.getElementById('sidebar-calendar');
    const clockSidebar = document.getElementById('sidebar-clock');
    const multiplicationSidebar = document.getElementById('sidebar-multiplication');
    const mazeSidebar = document.getElementById('sidebar-maze');
    const customTextSidebar = document.getElementById('sidebar-customtext');
    
    content.innerHTML = ''; 
    
    // Show correct sidebar section
    mathSidebar.style.display = type === 'math' ? 'block' : 'none';
    hangeulSidebar.style.display = type === 'hangeul' ? 'block' : 'none';
    if (hangeulWordSidebar) hangeulWordSidebar.style.display = type === 'hangeul_word' ? 'block' : 'none';
    hanjaSidebar.style.display = type === 'hanja' ? 'block' : 'none';
    if (hanjaPracticeSidebar) hanjaPracticeSidebar.style.display = (type === 'hanja_practice' || type === 'blank_practice') ? 'block' : 'none';
    tracingSidebar.style.display = type === 'tracing' ? 'block' : 'none';
    englishSidebar.style.display = type === 'english' ? 'block' : 'none';
    if (alphabetSidebar) alphabetSidebar.style.display = type === 'alphabet' ? 'block' : 'none';
    if (numberSidebar) numberSidebar.style.display = type === 'number' ? 'block' : 'none';
    if (drawingSidebar) drawingSidebar.style.display = type === 'drawing' ? 'block' : 'none';
    if (calendarSidebar) calendarSidebar.style.display = type === 'calendar' ? 'block' : 'none';
    if (clockSidebar) clockSidebar.style.display = type === 'clock' ? 'block' : 'none';
    if (multiplicationSidebar) multiplicationSidebar.style.display = type === 'multiplication' ? 'block' : 'none';
    if (mazeSidebar) mazeSidebar.style.display = type === 'maze' ? 'block' : 'none';
    if (customTextSidebar) customTextSidebar.style.display = type === 'customtext' ? 'block' : 'none';
    
    // Daily Study doesn't need a specific sidebar section for now
    const dailySidebar = document.getElementById('sidebar-daily');
    if (dailySidebar) dailySidebar.style.display = type === 'daily' ? 'block' : 'none';

    const zombieSidebar = document.getElementById('sidebar-zombie');
    if (zombieSidebar) zombieSidebar.style.display = (type === 'zombie' || type === 'wun') ? 'block' : 'none';

    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter) {
        sidebarFooter.style.display = (type === 'daily' || type === 'zombie' || type === 'wun') ? 'none' : 'block';
    }


    
    // Set Date in English (e.g. Monday, May 17)
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    document.getElementById('sheet-date').innerText = now.toLocaleDateString('en-US', options);
    
    showWorksheet();

    const worksheetHeader = document.querySelector('.worksheet-header');
    if (worksheetHeader) {
        worksheetHeader.style.display = (type === 'hanja_practice' || type === 'blank_practice' || type === 'calendar') ? 'none' : 'flex';
    }

    switch(type) {
        case 'math':
            const lv = parseInt(document.getElementById('lv-select').value);
            const opNames = { add: '덧셈', sub: '뺄셈', mul: '곱셈', div: '나눗셈', mixed: '혼합 계산', fraction: '분수 기초' };
            
            title.innerText = `${opNames[currentSubCategory]} 공부 (수준 ${lv})`;
            content.appendChild(createMathSection(currentSubCategory, lv));
            break;
            
        case 'hangeul':
        case 'hanja':
        case 'writing':
            const count = 72; // Default consistent count (Medium)
            
            const subNames = { 
                ganada: '한글 쓰기 - 기본 음절 (가 - 하)',
                vowel: '한글 쓰기 - 기본 모음 (아 - 이)',
                basic: '한글 쓰기 - 기본 음절 (가 - 하)',
                word: '한글 쓰기 - 낱말 쓰기',
                sentence: '한글 쓰기 - 문장 쓰기',
                hanja8: '한자 8급', hanja7: '한자 7급', hanja6: '한자 6급', 
                hanjajun5: '한자 준5급', hanja5: '한자 5급', 
                hanjajun4: '한자 준4급', hanja4: '한자 4급', 
                hanjajun3: '한자 준3급', hanja3: '한자 3급',
                gosa: '고사성어 익히기' 
            };
            title.innerText = subNames[currentSubCategory] || '한글 쓰기 - 기본 음절 (가 - 하)';
            
            if (currentSubCategory === 'gosa') {
                createGosaSection(content);
            } else if (currentSubCategory.startsWith('hanja') && ['hanja5', 'hanjajun4', 'hanja4', 'hanjajun3', 'hanja3', 'hanja8', 'hanja7', 'hanja6', 'hanjajun5'].includes(currentSubCategory)) {
                const level = currentSubCategory.replace('hanja', '').toUpperCase();
                title.innerText = `${subNames[currentSubCategory]} 쓰기 연습`;
                
                let data = null;
                if (level === '8') data = (typeof HANJA_8_DATA !== 'undefined') ? HANJA_8_DATA : null;
                else if (level === '7') data = (typeof HANJA_7_DATA !== 'undefined') ? HANJA_7_DATA : null;
                else if (level === '6') data = (typeof HANJA_6_DATA !== 'undefined') ? HANJA_6_DATA : null;
                else if (level === 'JUN5') data = (typeof HANJA_JUN5_DATA !== 'undefined') ? HANJA_JUN5_DATA : null;
                else if (level === '5') data = (typeof HANJA_5_DATA !== 'undefined') ? HANJA_5_DATA : null;
                else if (level === 'JUN4') data = (typeof HANJA_JUN4_DATA !== 'undefined') ? HANJA_JUN4_DATA : null;
                else if (level === '4') data = (typeof HANJA_4_DATA !== 'undefined') ? HANJA_4_DATA : null;
                else if (level === 'JUN3') data = (typeof HANJA_JUN3_DATA !== 'undefined') ? HANJA_JUN3_DATA : null;
                else if (level === '3') data = (typeof HANJA_3_DATA !== 'undefined') ? HANJA_3_DATA : null;
                
                if (data) {
                    content.innerHTML = '';
                    const hanjaCount = 10;
                    createHanjaLevelSection(content, data, hanjaCount);
                } else {
                    content.innerHTML = `<p style="color:red">한자 ${level} 데이터를 불러오지 못했습니다. (HANJA_${level}_DATA undefined)<br>로컬 파일 실행 시 보안 정책 때문일 수 있으니 새로고침을 해보거나 데이터를 확인해주세요.</p>`;
                }
            } else if (type === 'hangeul') {
                title.innerText = subNames[currentSubCategory] || '한글 쓰기 - 기본 음절 (가 - 하)';
                if (currentSubCategory === 'word') {
                    content.appendChild(createHangeulWordSection('animals'));
                } else {
                    createHangeulWritingSection(content, currentSubCategory);
                }
            } else {
                content.appendChild(createWritingSection(count));
            }
            break;

        case 'hangeul_word':
            const subNamesHangeulWord = {
                animals: '한글 단어쓰기 (동물 친구들)',
                fruits: '한글 단어쓰기 (과일과 채소)',
                food: '한글 단어쓰기 (맛있는 음식)',
                vehicles: '한글 단어쓰기 (씽씽 탈것)',
                things: '한글 단어쓰기 (생활 속 사물)',
                body_family: '한글 단어쓰기 (몸과 가족)',
                nature: '한글 단어쓰기 (자연과 날씨)',
                mixed: '한글 단어쓰기 (골고루 섞어보기)'
            };
            title.innerText = subNamesHangeulWord[currentSubCategory] || '한글 단어쓰기';
            content.appendChild(createHangeulWordSection(currentSubCategory));
            break;
            
        case 'drawing':
            const subNamesDrawing = {
                color_theme: '창의력 쑥쑥 색칠 공부',
                color_number: '알록달록 번호 맞춤 색칠',
                color_math: '셈하고 색칠하기 (연산 색칠)',
                color_dots: '똑똑한 점 이어 그리기',
                draw_symmetry: '반쪽 대칭 그리기 (좌우 대칭)',
                draw_grid: '모눈종이 보고 똑같이 그리기',
                draw_step: '4단계 그림 교실 (순서대로 그리기)',
                draw_creative: '상상 스토리텔링 드로잉',
                color_word: '차근차근 낱말 쓰고 색칠하기'
            };
            title.innerText = subNamesDrawing[currentSubCategory] || '색칠하고 그리기';
            const selectedDesign = document.getElementById('drawing-select')?.value || 'cat';
            content.appendChild(createDrawingSection(currentSubCategory, selectedDesign));
            break;
            
        case 'tracing':
            const subNamesTracing = {
                basic: '기초 선긋기 (직선)',
                wave: '구불구불 선긋기 (곡선)',
                zigzag: '지그재그 선',
                matching: '서로 이어요 (짝짓기)'
            };
            title.innerText = subNamesTracing[currentSubCategory] || '선긋기 공부';
            content.appendChild(createTracingSection(currentSubCategory));
            break;
            
        case 'english':
            const jName = (currentSubCategory || 'junior145').replace('junior', 'Junior ');
            title.innerText = `필수 영단어 쓰기 연습 (${jName})`;
            content.appendChild(createEnglishSection(currentSubCategory));
            break;
            
        case 'alphabet':
            const subNamesAlphabet = {
                upper_all: '알파벳 대문자 쓰기 (A - Z 한번에)',
                lower_all: '알파벳 소문자 쓰기 (a - z 한번에)',
                mixed_all: '알파벳 대소문자 함께 쓰기 (Aa - Zz 한번에)',
                upper_am: '알파벳 대문자 쓰기 (A - M)',
                upper_nz: '알파벳 대문자 쓰기 (N - Z)',
                lower_am: '알파벳 소문자 쓰기 (a - m)',
                lower_nz: '알파벳 소문자 쓰기 (n - z)',
                mixed_am: '알파벳 대소문자 함께 쓰기 (Aa - Mm)',
                mixed_nz: '알파벳 대소문자 함께 쓰기 (Nn - Zz)'
            };
            title.innerText = subNamesAlphabet[currentSubCategory] || '알파벳 대문자 쓰기 (A - Z 한번에)';
            content.appendChild(createAlphabetSection(currentSubCategory));
            break;

        case 'number':
            const subNamesNumber = {
                num_1_10: '숫자 쓰기 - 기초 (1 - 10)',
                num_11_20: '숫자 쓰기 - 두 자리 (11 - 20)',
                num_1_20_split: '숫자 쓰기 - 1부터 20까지 (한번에)',
                num_grid_50: '숫자 쓰기 - 1부터 50까지 수 배열판',
                num_grid_100: '숫자 쓰기 - 1부터 100까지 백판'
            };
            title.innerText = subNamesNumber[currentSubCategory] || '숫자 쓰기 공부';
            content.appendChild(createNumberSection(currentSubCategory));
            break;
 
        case 'daily':
            title.innerText = '초등2 오늘의 일일학습';
            createDailyStudySection(content);
            break;
 
        case 'zombie':
            title.innerText = '유치5세 오늘의 일일학습';
            createZombieStudySection(content);
            break;

        case 'wun':
            title.innerText = '유치5세 오늘의 일일학습';
            createZombieStudySection(content);
            break;

        case 'hanja_practice':
        case 'blank_practice':
            const subNamesBlank = {
                hangeul_10: '초등 표준 10칸 깍두기 공책',
                hangeul_8: '초등 저학년 8칸 깍두기 공책',
                hangeul_line: '초등 국어 줄공책',
                english_wide: '영어 4선 쓰기 노트 (넓은 줄)',
                english_std: '영어 4선 쓰기 노트 (표준 간격)',
                english_box: '영어 낱말 칸 쓰기 연습장',
                hanja_table: '漢字(한자) 쓰기 연습장',
                hanja_grid: '한자 십자격자 쓰기 연습장',
                hanja_mi: '한자 米자격자 쓰기 연습장',
                math_grid: '방안 모눈종이 (1cm)'
            };
            title.innerText = subNamesBlank[currentSubCategory] || '빈 쓰기 연습장';
            if (typeof createBlankPracticeSection === 'function') {
                content.appendChild(createBlankPracticeSection(currentSubCategory));
            } else if (typeof createHanjaPracticeBlankSection !== 'undefined') {
                createHanjaPracticeBlankSection(content);
            }
            break;

        case 'calendar':
            title.innerText = '달력 만들기';
            if (typeof initCalendarPage !== 'undefined') {
                initCalendarPage(content);
            }
            break;

        case 'clock':
            const clockSubNames = {
                read_clock: '시계 읽기 (시/분 적기)',
                draw_hands: '시계바늘 그리기',
                mixed: '시계 공부 (혼합 퀴즈)'
            };
            title.innerText = clockSubNames[currentSubCategory] || '시계 보기 공부';
            const clockDiff = document.getElementById('clock-diff-select')?.value || 'half';
            if (typeof createClockSection !== 'undefined') {
                content.appendChild(createClockSection(currentSubCategory, clockDiff));
            }
            break;

        case 'multiplication':
            const multiSubNames = {
                shuffle: '구구단 셔플 퀴즈',
                blank: '구구단 빈칸 채우기',
                dan_practice: '구구단 순서 외우기',
                table: '곱셈구구 완성표'
            };
            title.innerText = multiSubNames[currentSubCategory] || '구구단 연습';
            const danOpt = document.getElementById('multi-dan-select')?.value || 'all';
            if (typeof createMultiplicationSection !== 'undefined') {
                content.appendChild(createMultiplicationSection(currentSubCategory, danOpt));
            }
            break;

        case 'maze':
            const mazeSubNames = {
                easy: '재미있는 미로 찾기 (쉬움)',
                medium: '두뇌 쏙쏙 미로 찾기 (보통)',
                hard: '도전! 탐험 미로 찾기 (어려움)'
            };
            title.innerText = mazeSubNames[currentSubCategory] || '미로 찾기';
            const mazeTheme = document.getElementById('maze-theme-select')?.value || 'puppy';
            if (typeof createMazeSection !== 'undefined') {
                content.appendChild(createMazeSection(currentSubCategory, mazeTheme));
            }
            break;

        case 'customtext':
            const customSubNames = {
                sentence: '바른 글씨 10칸 깍두기 문장 쓰기',
                word: '바른 글씨 낱말 쓰기 연습'
            };
            title.innerText = customSubNames[currentSubCategory] || '맞춤 문장 쓰기';
            const customText = document.getElementById('custom-input-text')?.value || '';
            const guideStyle = document.getElementById('custom-guide-style')?.value || 'cross';
            if (typeof createCustomTextSection !== 'undefined') {
                content.appendChild(createCustomTextSection(currentSubCategory, customText, guideStyle));
            }
            break;
    }
}

function refreshContent() {
    if (currentType) generateWorksheet(currentType);
}

// Generators are now in scripts/ directory
// ==========================================================================
// Study Settings Management (Fonts & Tracing Styles)
// ==========================================================================
const DEFAULT_STUDY_SETTINGS = {
    hangeulFont: 'NanumBarunpen',
    englishFont: 'ABeeZee',
    traceStyle: 'solid'
};

const FONT_MAP_HANGEUL = {
    'NanumBarunpen': "'NanumBarunpen', 'Gowun Dodum', sans-serif",
    'GowunBatang': "'Gowun Batang', serif",
    'GowunDodum': "'Gowun Dodum', sans-serif",
    'Gaegu': "'Gaegu', cursive, sans-serif",
    'NanumGothic': "'Nanum Gothic', sans-serif"
};

const FONT_MAP_ENGLISH = {
    'ABeeZee': "'ABeeZee', 'Comic Neue', sans-serif",
    'Schoolbell': "'Schoolbell', cursive, sans-serif",
    'ComicNeue': "'Comic Neue', cursive, sans-serif",
    'Inter': "'Inter', sans-serif"
};

function getStudySettings() {
    try {
        const saved = localStorage.getItem('study_user_settings');
        if (saved) {
            return Object.assign({}, DEFAULT_STUDY_SETTINGS, JSON.parse(saved));
        }
    } catch (e) {}
    return Object.assign({}, DEFAULT_STUDY_SETTINGS);
}

function saveStudySettings(settings) {
    try {
        localStorage.setItem('study_user_settings', JSON.stringify(settings));
    } catch (e) {}
    applyStudySettings(settings);
}

function applyStudySettings(settings) {
    if (!settings) settings = getStudySettings();
    
    // Apply CSS variables
    const hFont = FONT_MAP_HANGEUL[settings.hangeulFont] || FONT_MAP_HANGEUL['NanumBarunpen'];
    const eFont = FONT_MAP_ENGLISH[settings.englishFont] || FONT_MAP_ENGLISH['ABeeZee'];
    
    document.documentElement.style.setProperty('--font-hangeul-trace', hFont);
    document.documentElement.style.setProperty('--font-english-trace', eFont);
    
    // Apply trace mode class to body
    document.body.classList.remove('trace-mode-solid', 'trace-mode-outline', 'trace-mode-pattern');
    document.body.classList.add('trace-mode-' + (settings.traceStyle || 'solid'));
    
    // Sync sidebar dropdowns if present
    const sbKor = document.getElementById('select-sidebar-kor-font');
    if (sbKor) sbKor.value = settings.hangeulFont;
    const sbEng = document.getElementById('select-sidebar-eng-font');
    if (sbEng) sbEng.value = settings.englishFont;
    const sbAlpha = document.getElementById('select-sidebar-alpha-font');
    if (sbAlpha) sbAlpha.value = settings.englishFont;
    const sbZombieKor = document.getElementById('select-sidebar-zombie-kor-font');
    if (sbZombieKor) sbZombieKor.value = settings.hangeulFont;
    const sbZombieEng = document.getElementById('select-sidebar-zombie-eng-font');
    if (sbZombieEng) sbZombieEng.value = settings.englishFont;
}

// Apply immediately on load
applyStudySettings();

function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    
    const settings = getStudySettings();
    
    // Set radio buttons
    const hRadio = modal.querySelector(`input[name="setting-hangeul-font"][value="${settings.hangeulFont}"]`);
    if (hRadio) hRadio.checked = true;
    
    const eRadio = modal.querySelector(`input[name="setting-english-font"][value="${settings.englishFont}"]`);
    if (eRadio) eRadio.checked = true;
    
    const sRadio = modal.querySelector(`input[name="setting-trace-style"][value="${settings.traceStyle}"]`);
    if (sRadio) sRadio.checked = true;
    
    updateSettingsPreview();
    modal.style.display = 'flex';
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.style.display = 'none';
}

function updateSettingsPreview() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    
    const hFontKey = modal.querySelector('input[name="setting-hangeul-font"]:checked')?.value || 'NanumBarunpen';
    const eFontKey = modal.querySelector('input[name="setting-english-font"]:checked')?.value || 'ABeeZee';
    const traceStyle = modal.querySelector('input[name="setting-trace-style"]:checked')?.value || 'solid';
    
    const prevH = document.getElementById('preview-hangeul');
    const prevE = document.getElementById('preview-english');
    const statusText = document.getElementById('preview-status-text');
    
    if (prevH) {
        prevH.style.fontFamily = FONT_MAP_HANGEUL[hFontKey] || 'inherit';
        applyTraceStyleToPreview(prevH, traceStyle);
    }
    if (prevE) {
        prevE.style.fontFamily = FONT_MAP_ENGLISH[eFontKey] || 'inherit';
        applyTraceStyleToPreview(prevE, traceStyle);
    }
    if (statusText) {
        const styleNames = { solid: '연한 회색 실선', outline: '속 빈 외곽선', pattern: '패턴 가이드' };
        statusText.innerText = `${hFontKey} / ${eFontKey} (${styleNames[traceStyle]})`;
    }
}

function applyTraceStyleToPreview(elem, style) {
    if (style === 'outline') {
        elem.style.color = 'transparent';
        elem.style.webkitTextStroke = '1.5px #94a3b8';
        elem.style.background = 'none';
        elem.style.webkitBackgroundClip = 'unset';
    } else if (style === 'pattern') {
        elem.style.color = 'transparent';
        elem.style.background = 'repeating-linear-gradient(45deg, #94a3b8 0, #94a3b8 2px, transparent 2px, transparent 4px)';
        elem.style.webkitBackgroundClip = 'text';
        elem.style.webkitTextStroke = '0.5px #cbd5e1';
    } else {
        elem.style.color = '#cbd5e1';
        elem.style.webkitTextStroke = 'none';
        elem.style.background = 'none';
        elem.style.webkitBackgroundClip = 'unset';
    }
}

function submitStudySettings() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    
    const hFontKey = modal.querySelector('input[name="setting-hangeul-font"]:checked')?.value || 'NanumBarunpen';
    const eFontKey = modal.querySelector('input[name="setting-english-font"]:checked')?.value || 'ABeeZee';
    const traceStyle = modal.querySelector('input[name="setting-trace-style"]:checked')?.value || 'solid';
    
    const newSettings = {
        hangeulFont: hFontKey,
        englishFont: eFontKey,
        traceStyle: traceStyle
    };
    
    saveStudySettings(newSettings);
    closeSettingsModal();
    showSettingsToast('글꼴 및 따라쓰기 설정이 저장되었습니다!');
    
    if (typeof refreshContent === 'function') {
        refreshContent();
    }
}

function resetStudySettings() {
    saveStudySettings(DEFAULT_STUDY_SETTINGS);
    openSettingsModal(); // Refresh modal UI
    showSettingsToast('기본 설정으로 복원되었습니다.');
    if (typeof refreshContent === 'function') {
        refreshContent();
    }
}

function showSettingsToast(msg) {
    let toast = document.getElementById('settings-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'settings-toast';
        toast.className = 'settings-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #4ade80;"></i> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

function onSidebarKorFontChange(fontKey) {
    const settings = getStudySettings();
    settings.hangeulFont = fontKey;
    saveStudySettings(settings);
    showSettingsToast('한글 글꼴이 변경되었습니다.');
    if (typeof refreshContent === 'function') refreshContent();
}

function onSidebarEngFontChange(fontKey) {
    const settings = getStudySettings();
    settings.englishFont = fontKey;
    saveStudySettings(settings);
    showSettingsToast('영어 글꼴이 변경되었습니다.');
    if (typeof refreshContent === 'function') refreshContent();
}

// Initial State
window.onload = () => {
    applyStudySettings();
    const isStudyPage = !!document.getElementById('worksheet-container');
    if (isStudyPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type') || 'math';
        
        switch (type) {
            case 'math': openMathConfig(); break;
            case 'hangeul': openHangeulConfig(); break;
            case 'hangeul_word': openHangeulWordConfig(); break;
            case 'hanja': openHanjaConfig(); break;
            case 'hanja_practice': openHanjaPracticeConfig(); break;
            case 'blank_practice': openBlankPracticeConfig(); break;
            case 'drawing': openDrawingConfig(); break;
            case 'tracing': openTracingConfig(); break;
            case 'english': openEnglishConfig(); break;
            case 'alphabet': openAlphabetConfig(); break;
            case 'number': openNumberConfig(); break;
            case 'calendar': openCalendarConfig(); break;
            case 'clock': openClockConfig(); break;
            case 'multiplication': openMultiplicationConfig(); break;
            case 'maze': openMazeConfig(); break;
            case 'customtext': openCustomTextConfig(); break;
            case 'daily': openDailyStudy(); break;
            case 'zombie': openZombieStudy(); break;
            case 'wun': openWunStudy(); break;
            default: openMathConfig(); break;
        }
    } else {
        showDashboard();
    }
};
/**
 * Combined Daily Study Section
 */
function createDailyStudySection(container) {
    container.innerHTML = '';
    
    // 1. Hanja Section (4 random from checked levels)
    let allHanjaData = [];
    if (document.getElementById('daily-hanja-8')?.checked && typeof HANJA_8_DATA !== 'undefined') allHanjaData.push(...HANJA_8_DATA);
    if (document.getElementById('daily-hanja-7')?.checked && typeof HANJA_7_DATA !== 'undefined') allHanjaData.push(...HANJA_7_DATA);
    if (document.getElementById('daily-hanja-6')?.checked && typeof HANJA_6_DATA !== 'undefined') allHanjaData.push(...HANJA_6_DATA);
    if (document.getElementById('daily-hanja-jun5')?.checked && typeof HANJA_JUN5_DATA !== 'undefined') allHanjaData.push(...HANJA_JUN5_DATA);
    if (document.getElementById('daily-hanja-5')?.checked && typeof HANJA_5_DATA !== 'undefined') allHanjaData.push(...HANJA_5_DATA);
    if (document.getElementById('daily-hanja-jun4')?.checked && typeof HANJA_JUN4_DATA !== 'undefined') allHanjaData.push(...HANJA_JUN4_DATA);
    if (document.getElementById('daily-hanja-4')?.checked && typeof HANJA_4_DATA !== 'undefined') allHanjaData.push(...HANJA_4_DATA);
    if (document.getElementById('daily-hanja-jun3')?.checked && typeof HANJA_JUN3_DATA !== 'undefined') allHanjaData.push(...HANJA_JUN3_DATA);
    if (document.getElementById('daily-hanja-3')?.checked && typeof HANJA_3_DATA !== 'undefined') allHanjaData.push(...HANJA_3_DATA);

    // Fallback if none checked
    if (allHanjaData.length === 0) {
        allHanjaData = [...(typeof HANJA_8_DATA !== 'undefined' ? HANJA_8_DATA : [])];
    }
    
    const randomHanja = allHanjaData.sort(() => 0.5 - Math.random()).slice(0, 4);
    createHanjaLevelSection(container, randomHanja, 4);

    // 2. Sajaseongeo Section (1 idiom)
    let allGosaData = [];
    if (document.getElementById('daily-gosa-jun4')?.checked && typeof GOSA_JUN4_DATA !== 'undefined') allGosaData.push(...GOSA_JUN4_DATA);
    if (document.getElementById('daily-gosa-4')?.checked && typeof GOSA_4_DATA !== 'undefined') allGosaData.push(...GOSA_4_DATA);

    if (allGosaData.length === 0) {
        if (typeof GOSA_JUN4_DATA !== 'undefined') allGosaData.push(...GOSA_JUN4_DATA);
        else if (typeof GOSA_4_DATA !== 'undefined') allGosaData.push(...GOSA_4_DATA);
        else if (typeof GOSA_DATA !== 'undefined') allGosaData.push(...GOSA_DATA);
    }

    const gosaItem = allGosaData[Math.floor(Math.random() * allGosaData.length)];
    if (gosaItem && gosaItem.hanja) {
        const card = document.createElement('div');
        card.className = 'daily-gosa-card';
        card.style.marginTop = '8px';
        
        const info = document.createElement('div');
        info.className = 'daily-gosa-info';
        info.innerHTML = `
            <div class="daily-gosa-header">
                <span class="daily-gosa-hanja">${gosaItem.hanja}</span>
                <span class="daily-gosa-korean">(${gosaItem.korean})</span>
            </div>
            <div class="daily-gosa-meaning">${gosaItem.meaning}</div>
        `;
        card.appendChild(info);

        const boxesWrap = document.createElement('div');
        boxesWrap.className = 'daily-gosa-boxes-wrap';

        // Trace group (4 cells)
        const traceGroup = document.createElement('div');
        traceGroup.className = 'daily-gosa-box-group';

        for (let i = 0; i < 4; i++) {
            const ch = gosaItem.hanja[i] || '';
            const cell = document.createElement('div');
            cell.className = 'daily-gosa-cell stroke-guide';
            cell.innerHTML = `<span>${ch}</span>`;
            traceGroup.appendChild(cell);
        }
        boxesWrap.appendChild(traceGroup);

        // Divider icon
        const divider = document.createElement('div');
        divider.className = 'daily-gosa-divider';
        divider.innerHTML = '<i class="fas fa-arrow-right"></i>';
        boxesWrap.appendChild(divider);

        // Practice group (4 blank cells)
        const blankGroup = document.createElement('div');
        blankGroup.className = 'daily-gosa-box-group';

        for (let i = 0; i < 4; i++) {
            const cell = document.createElement('div');
            cell.className = 'daily-gosa-cell blank';
            blankGroup.appendChild(cell);
        }
        boxesWrap.appendChild(blankGroup);

        card.appendChild(boxesWrap);
        container.appendChild(card);
    }

    // 3. English Section (4 random from all Junior files)
    let allEnglishData = [];
    for (let i = 123; i <= 145; i++) {
        const chk = document.getElementById(`daily-eng-${i}`);
        const dataVar = window[`ENGLISH_JUNIOR${i}_DATA`];
        if (chk?.checked && Array.isArray(dataVar)) {
            allEnglishData.push(...dataVar);
        }
    }

    // Fallback if none checked
    if (allEnglishData.length === 0) {
        for (let i = 123; i <= 145; i++) {
            const dataVar = window[`ENGLISH_JUNIOR${i}_DATA`];
            if (Array.isArray(dataVar) && dataVar.length > 0) {
                allEnglishData.push(...dataVar);
            }
        }
    }
    
    const randomEnglish = allEnglishData.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Create a mini English container for the daily section
    const engContainer = document.createElement('div');
    engContainer.className = 'english-container';
    engContainer.style.marginTop = '5px';
    engContainer.style.gap = '10px 15px'; // tighter gap for daily study
    
    randomEnglish.forEach(item => {
        const card = document.createElement('div');
        card.className = 'english-card';
        card.style.padding = '10px 15px'; // more compact for daily
        card.style.gap = '8px'; // reduce gap between elements inside card
        
        card.innerHTML = `
            <div class="english-card-header" style="padding-bottom: 5px; margin-bottom: -5px;">
                <span class="english-card-word" style="font-size: 1.15rem;">${item.word}</span>
                <span class="english-card-meaning" style="font-size: 0.85rem;">${item.meaning}</span>
            </div>
            <div class="english-card-body">
                <div class="english-card-sentence" style="font-size: 0.8rem; color: #64748b; margin-bottom: 2px; font-style: italic;">
                    ${item.sentence || ''}
                </div>
                <div class="english-card-practice-row" style="height: 35px; background-size: 100% 8.75px; background-position: 0 0, 0 8.75px, 0 17.5px, 0 26.25px;"></div>
            </div>
        `;
        engContainer.appendChild(card);
    });
    container.appendChild(engContainer);

    // 3. Brain Math Section (Operator Fill-in)
    createBrainMathSection(container);
}

function toggleAllDailyEng(selectAll) {
    for (let i = 123; i <= 145; i++) {
        const chk = document.getElementById(`daily-eng-${i}`);
        if (chk) chk.checked = selectAll;
    }
    refreshContent();
}

function buildMathTree(numLeaves) {
    if (numLeaves === 1) {
        let val = Math.floor(Math.random() * 20) + 2;
        return { type: 'val', value: val, html: `<span style="width: 45px; text-align: center; display: inline-block;">${val}</span>`, answerStr: val.toString() };
    }
    
    let leftLeaves = Math.floor(Math.random() * (numLeaves - 1)) + 1;
    let rightLeaves = numLeaves - leftLeaves;
    
    let left = buildMathTree(leftLeaves);
    let right = buildMathTree(rightLeaves);
    
    if (!left || !right) return null;
    
    let validOps = [];
    if (left.value + right.value > 0 && left.value + right.value <= 200) validOps.push('+');
    if (left.value - right.value > 0) validOps.push('-');
    if (left.value * right.value > 0 && left.value * right.value <= 200) validOps.push('×');
    if (right.value !== 0 && left.value % right.value === 0) validOps.push('÷');
    
    if (validOps.length === 0) return null;
    
    let op = validOps[Math.floor(Math.random() * validOps.length)];
    
    let val = 0;
    if (op === '+') val = left.value + right.value;
    if (op === '-') val = left.value - right.value;
    if (op === '×') val = left.value * right.value;
    if (op === '÷') val = left.value / right.value;
    
    let leftHtml = left.html;
    let rightHtml = right.html;
    let leftAns = left.answerStr;
    let rightAns = right.answerStr;
    
    let wrapLeft = (op === '×' || op === '÷') && (left.op === '+' || left.op === '-');
    let wrapRight = (op === '×' || op === '÷' || op === '-') && (right.op === '+' || right.op === '-');
    if (op === '÷' && (right.op === '×' || right.op === '÷')) wrapRight = true;
    
    if (wrapLeft) {
        leftAns = `(${leftAns})`;
    }
    if (wrapRight) {
        rightAns = `(${rightAns})`;
    }
    
    let circleHtml = `<span style="display: inline-block; width: 35px; height: 35px; border: 3px solid #cbd5e1; border-radius: 50%; margin: 0 10px; background: white; vertical-align: middle;"></span>`;
    
    return {
        type: 'op',
        op: op,
        value: val,
        html: `${leftHtml}${circleHtml}${rightHtml}`,
        answerStr: `${leftAns} ${op} ${rightAns}`,
        left: left,
        right: right
    };
}

function getMathOps(tree) {
    if (tree.type === 'val') return [];
    return [tree.op, ...getMathOps(tree.left), ...getMathOps(tree.right)];
}

/**
 * Brain Math Section for Daily Study
 */
function createBrainMathSection(container) {
    const problemsContainer = document.createElement('div');
    problemsContainer.style.display = 'flex';
    problemsContainer.style.flexDirection = 'column';
    problemsContainer.style.gap = '10px';
    problemsContainer.style.padding = '12px 20px';
    problemsContainer.style.marginTop = '10px';
    problemsContainer.style.backgroundColor = '#f8fafc';
    problemsContainer.style.borderRadius = '10px';
    problemsContainer.style.border = '2px dashed #cbd5e1';

    let puzzle = null;
    let attempts = 0;
    while (!puzzle && attempts < 2000) {
        attempts++;
        let tree = buildMathTree(4); // 4 numbers
        if (tree && tree.value > 0 && tree.value <= 150) {
            let opSet = new Set(getMathOps(tree));
            // Ensure complexity: must use at least 2 different operators, one of them being × or ÷
            if (opSet.size >= 2 && (opSet.has('×') || opSet.has('÷'))) {
                puzzle = {
                    html: tree.html,
                    result: tree.value,
                    answerStr: tree.answerStr
                };
            }
        }
    }

    if (!puzzle) {
        puzzle = {
            html: `<span style="width: 45px; text-align: center; display: inline-block;">10</span><span style="display: inline-block; width: 35px; height: 35px; border: 3px solid #cbd5e1; border-radius: 50%; margin: 0 10px; background: white; vertical-align: middle;"></span><span style="width: 45px; text-align: center; display: inline-block;">2</span><span style="display: inline-block; width: 35px; height: 35px; border: 3px solid #cbd5e1; border-radius: 50%; margin: 0 10px; background: white; vertical-align: middle;"></span><span style="width: 45px; text-align: center; display: inline-block;">5</span>`,
            result: 25,
            answerStr: "10 ÷ 2 × 5"
        };
    }

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'center';
    row.style.fontSize = '1.8rem';
    row.style.fontWeight = 'bold';
    row.style.color = '#334155';
    row.style.letterSpacing = '1px';
    
    row.innerHTML = `
        ${puzzle.html}
        <span style="margin: 0 15px;">=</span>
        <span style="width: 50px; text-align: center; color: var(--accent-blue);">${puzzle.result}</span>
    `;
    
    problemsContainer.appendChild(row);
    container.appendChild(problemsContainer);
}

/**
 * Combined Jo Zombie / Jo Wun Daily Study Section (숫자쓰기, 알파벳쓰기, 한글쓰기)
 */
const CHILD_ALPHABET_PHONICS = {
    A: { word: 'Apple', emoji: '🍎' },
    B: { word: 'Bear', emoji: '🐻' },
    C: { word: 'Cat', emoji: '🐱' },
    D: { word: 'Dog', emoji: '🐶' },
    E: { word: 'Elephant', emoji: '🐘' },
    F: { word: 'Fish', emoji: '🐟' },
    G: { word: 'Grape', emoji: '🍇' },
    H: { word: 'House', emoji: '🏠' },
    I: { word: 'Ice cream', emoji: '🍦' },
    J: { word: 'Juice', emoji: '🧃' },
    K: { word: 'Kite', emoji: '🪁' },
    L: { word: 'Lion', emoji: '🦁' },
    M: { word: 'Monkey', emoji: '🐵' },
    N: { word: 'Nest', emoji: '🪺' },
    O: { word: 'Orange', emoji: '🍊' },
    P: { word: 'Penguin', emoji: '🐧' },
    Q: { word: 'Queen', emoji: '👑' },
    R: { word: 'Rabbit', emoji: '🐰' },
    S: { word: 'Sun', emoji: '☀️' },
    T: { word: 'Tree', emoji: '🌳' },
    U: { word: 'Umbrella', emoji: '☂️' },
    V: { word: 'Violin', emoji: '🎻' },
    W: { word: 'Watermelon', emoji: '🍉' },
    X: { word: 'Xylophone', emoji: '🎵' },
    Y: { word: 'Yacht', emoji: '⛵' },
    Z: { word: 'Zebra', emoji: '🦓' }
};

const CHILD_HANGEUL_WORDS = [
    // 동물 / 곤충 / 바다생물 (친근한 2글자)
    { word: '나비', emoji: '🦋' },
    { word: '토끼', emoji: '🐰' },
    { word: '사자', emoji: '🦁' },
    { word: '오리', emoji: '🦆' },
    { word: '기린', emoji: '🦒' },
    { word: '하마', emoji: '🦛' },
    { word: '악어', emoji: '🐊' },
    { word: '고래', emoji: '🐳' },
    { word: '상어', emoji: '🦈' },
    { word: '사슴', emoji: '🦌' },
    { word: '돼지', emoji: '🐷' },
    { word: '개미', emoji: '🐜' },
    { word: '꿀벌', emoji: '🐝' },
    { word: '거북', emoji: '🐢' },
    { word: '여우', emoji: '🦊' },
    { word: '팬더', emoji: '🐼' },
    { word: '늑대', emoji: '🐺' },
    { word: '펭귄', emoji: '🐧' },
    { word: '참새', emoji: '🐦' },
    { word: '제비', emoji: '🐦' },
    { word: '까치', emoji: '🐧' },
    { word: '부엉', emoji: '🦉' },
    { word: '젖소', emoji: '🐄' },
    { word: '백조', emoji: '🦢' },
    { word: '표범', emoji: '🐆' },
    { word: '치타', emoji: '🐆' },
    { word: '낙타', emoji: '🐪' },
    { word: '수달', emoji: '🦦' },
    { word: '물범', emoji: '🦭' },
    { word: '문어', emoji: '🐙' },
    { word: '꽃게', emoji: '🦀' },
    { word: '조개', emoji: '🐚' },
    { word: '소라', emoji: '🐚' },
    { word: '붕어', emoji: '🐟' },
    { word: '잉어', emoji: '🎏' },

    // 과일 / 채소 (맛있고 친근한 2글자)
    { word: '사과', emoji: '🍎' },
    { word: '포도', emoji: '🍇' },
    { word: '수박', emoji: '🍉' },
    { word: '딸기', emoji: '🍓' },
    { word: '오이', emoji: '🥒' },
    { word: '당근', emoji: '🥕' },
    { word: '감자', emoji: '🥔' },
    { word: '양파', emoji: '🧅' },
    { word: '버섯', emoji: '🍄' },
    { word: '호박', emoji: '🎃' },
    { word: '가지', emoji: '🍆' },
    { word: '배추', emoji: '🥬' },
    { word: '마늘', emoji: '🧄' },
    { word: '피망', emoji: '🫑' },
    { word: '레몬', emoji: '🍋' },
    { word: '자두', emoji: '🍑' },
    { word: '체리', emoji: '🍒' },
    { word: '참외', emoji: '🍈' },
    { word: '멜론', emoji: '🍈' },
    { word: '알밤', emoji: '🌰' },
    { word: '감귤', emoji: '🍊' },
    { word: '살구', emoji: '🍑' },
    { word: '고추', emoji: '🌶️' },
    { word: '대파', emoji: '🥬' },

    // 음식 / 간식
    { word: '우유', emoji: '🥛' },
    { word: '치즈', emoji: '🧀' },
    { word: '김밥', emoji: '🍙' },
    { word: '라면', emoji: '🍜' },
    { word: '사탕', emoji: '🍬' },
    { word: '초코', emoji: '🍫' },
    { word: '과자', emoji: '🍪' },
    { word: '젤리', emoji: '🍮' },
    { word: '푸딩', emoji: '🍮' },
    { word: '주스', emoji: '🧃' },
    { word: '피자', emoji: '🍕' },
    { word: '와플', emoji: '🧇' },
    { word: '도넛', emoji: '🍩' },
    { word: '만두', emoji: '🥟' },
    { word: '식빵', emoji: '🍞' },
    { word: '꿀떡', emoji: '🍡' },
    { word: '떡국', emoji: '🍲' },
    { word: '계란', emoji: '🥚' },

    // 탈것 / 교통
    { word: '기차', emoji: '🚂' },
    { word: '버스', emoji: '🚌' },
    { word: '트럭', emoji: '🚚' },
    { word: '택시', emoji: '🚕' },
    { word: '전철', emoji: '🚇' },
    { word: '보트', emoji: '🚤' },
    { word: '요트', emoji: '⛵' },
    { word: '헬기', emoji: '🚁' },
    { word: '로켓', emoji: '🚀' },
    { word: '썰매', emoji: '🛷' },
    { word: '마차', emoji: '🐎' },

    // 자연 / 날씨 / 계절
    { word: '바다', emoji: '🌊' },
    { word: '하늘', emoji: '☁️' },
    { word: '구름', emoji: '☁️' },
    { word: '햇님', emoji: '☀️' },
    { word: '달님', emoji: '🌙' },
    { word: '별빛', emoji: '⭐' },
    { word: '나무', emoji: '🌳' },
    { word: '꽃밭', emoji: '🌸' },
    { word: '바람', emoji: '💨' },
    { word: '새싹', emoji: '🌱' },
    { word: '단풍', emoji: '🍁' },
    { word: '잔디', emoji: '🌿' },
    { word: '숲속', emoji: '🌲' },
    { word: '모래', emoji: '🏖️' },
    { word: '파도', emoji: '🌊' },
    { word: '호수', emoji: '🏞️' },
    { word: '연못', emoji: '🪵' },
    { word: '이슬', emoji: '💧' },
    { word: '노을', emoji: '🌅' },

    // 물건 / 놀이 / 가족 / 마음
    { word: '모자', emoji: '🧢' },
    { word: '신발', emoji: '👟' },
    { word: '가방', emoji: '🎒' },
    { word: '안경', emoji: '👓' },
    { word: '시계', emoji: '⏰' },
    { word: '연필', emoji: '✏️' },
    { word: '공책', emoji: '📓' },
    { word: '우산', emoji: '☂️' },
    { word: '풍선', emoji: '🎈' },
    { word: '비누', emoji: '🧼' },
    { word: '치약', emoji: '🪥' },
    { word: '칫솔', emoji: '🪥' },
    { word: '수건', emoji: '🧼' },
    { word: '장갑', emoji: '🧤' },
    { word: '양말', emoji: '🧦' },
    { word: '바지', emoji: '👖' },
    { word: '치마', emoji: '👗' },
    { word: '단추', emoji: '🔘' },
    { word: '침대', emoji: '🛏️' },
    { word: '책상', emoji: '🛋️' },
    { word: '의자', emoji: '🪑' },
    { word: '거울', emoji: '🪞' },
    { word: '인형', emoji: '🧸' },
    { word: '로봇', emoji: '🤖' },
    { word: '블록', emoji: '🧱' },
    { word: '축구', emoji: '⚽' },
    { word: '야구', emoji: '⚾' },
    { word: '농구', emoji: '🏀' },
    { word: '선물', emoji: '🎁' },
    { word: '노래', emoji: '🎵' },
    { word: '피리', emoji: '🪈' },
    { word: '큰북', emoji: '🥁' },
    { word: '엄마', emoji: '👩' },
    { word: '아빠', emoji: '👨' },
    { word: '아기', emoji: '👶' },
    { word: '친구', emoji: '👫' },
    { word: '사랑', emoji: '❤️' },
    { word: '미소', emoji: '😊' },
    { word: '행복', emoji: '🥰' }
];

function createZombieStudySection(container) {
    container.innerHTML = '';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'child-study-wrapper';
    
    // ==========================================
    // 1. 숫자 쓰기 (Number 1~10 Tracing)
    // ==========================================
    const numRange = document.getElementById('zombie-number-range')?.value || '1_10';
    const is20 = (numRange === '1_20');

    const numTitle = document.createElement('div');
    numTitle.className = 'child-section-title title-num';
    numTitle.innerHTML = `<i class="fas fa-sort-numeric-up" style="color: #3b82f6;"></i> 오늘의 숫자 쓰기 (${is20 ? '1~20까지' : '1~10까지'} 따라 쓰기)`;
    wrapper.appendChild(numTitle);

    const numGrid = document.createElement('div');
    numGrid.className = 'child-number-grid';

    // 1~10 모드인 경우 1부터 10까지 2번 따라 쓰기 (총 2줄 20칸)
    // 1~20 모드인 경우 1부터 20까지 순서대로 따라 쓰기 (1줄 1~10, 2줄 11~20)
    const numbersToRender = is20
        ? Array.from({ length: 20 }, (_, i) => i + 1)
        : [...Array.from({ length: 10 }, (_, i) => i + 1), ...Array.from({ length: 10 }, (_, i) => i + 1)];

    numbersToRender.forEach(num => {
        const cell = document.createElement('div');
        cell.className = 'child-number-cell has-crosshair';
        cell.innerHTML = `<span>${num}</span>`;
        numGrid.appendChild(cell);
    });

    wrapper.appendChild(numGrid);
    
    // ==========================================
    // 2. 알파벳 쓰기 (Alphabet A~Z / a~z)
    // ==========================================
    const alphaMode = document.getElementById('zombie-alphabet-mode')?.value || 'upper';
    
    let titleDetail = 'A~Z 대문자 따라 쓰기';
    if (alphaMode === 'lower') {
        titleDetail = 'a~z 소문자 따라 쓰기';
    } else if (alphaMode === 'mixed') {
        titleDetail = 'Aa~Zz 대소문자 따라 쓰기';
    }

    const alphaTitle = document.createElement('div');
    alphaTitle.className = 'child-section-title title-alpha';
    alphaTitle.innerHTML = `<i class="fas fa-font" style="color: #8b5cf6;"></i> 오늘의 알파벳 쓰기 (${titleDetail})`;
    wrapper.appendChild(alphaTitle);
    
    const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const alphaGrid = document.createElement('div');
    alphaGrid.className = 'child-alpha-grid';
    
    alphabetLetters.forEach(letter => {
        const cell = document.createElement('div');
        cell.className = 'child-alpha-cell has-ruling';
        
        let charText = letter;
        if (alphaMode === 'lower') {
            charText = letter.toLowerCase();
        } else if (alphaMode === 'mixed') {
            charText = `${letter}${letter.toLowerCase()}`;
            cell.classList.add('is-mixed');
        }
        
        cell.innerHTML = `<span>${charText}</span>`;
        alphaGrid.appendChild(cell);
    });
    
    // 27th cell: Praise / Stamp box for 3 full rows (9 x 3 = 27)
    const praiseCell = document.createElement('div');
    praiseCell.className = 'child-alpha-cell praise-cell';
    praiseCell.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.1;">
            <span style="font-size: 1.35rem;">⭐</span>
            <span style="font-size: 0.65rem; font-weight: 800; color: #b45309; margin-top: 2px;">참 잘했어요!</span>
        </div>
    `;
    alphaGrid.appendChild(praiseCell);
    
    wrapper.appendChild(alphaGrid);
    
    // ==========================================
    // 3. 시계 보기 & 연산 (Clock & Math)
    // ==========================================
    const clockType = document.getElementById('zombie-clock-type')?.value || 'hour';
    const isDrawMode = (clockType === 'draw');
    
    const clockTitle = document.createElement('div');
    clockTitle.className = 'child-section-title title-clock';
    clockTitle.innerHTML = '<i class="fas fa-shapes" style="color: #f59e0b;"></i> 오늘의 시계 & 셈하기 (시계 보기, 더하기와 빼기)';
    wrapper.appendChild(clockTitle);
    
    const clockGrid = document.createElement('div');
    clockGrid.className = 'child-clock-grid';
    
    // --- Card 1: Clock Problem (Left) ---
    const h = Math.floor(Math.random() * 12) + 1;
    let m = 0;
    if (clockType === 'half') {
        m = Math.random() < 0.5 ? 30 : 0;
    }
    
    const clockCard = document.createElement('div');
    clockCard.className = 'child-clock-card';
    
    const qnum1 = document.createElement('div');
    qnum1.className = 'child-clock-qnum';
    qnum1.innerText = '1';
    clockCard.appendChild(qnum1);
    
    const svgWrap = document.createElement('div');
    svgWrap.className = 'child-clock-svg-wrap';
    if (typeof generateClockSVG === 'function') {
        svgWrap.innerHTML = generateClockSVG(h, m, !isDrawMode);
    }
    clockCard.appendChild(svgWrap);
    
    const ans = document.createElement('div');
    ans.className = 'child-clock-answer';
    if (isDrawMode) {
        ans.innerHTML = `<span class="child-clock-target">${h}시 정각</span>`;
    } else if (clockType === 'half') {
        ans.innerHTML = `
            <span class="child-clock-box"></span>
            <span class="child-clock-unit">시</span>
            ${m === 30 ? '<span class="child-clock-box"></span><span class="child-clock-unit">분</span>' : ''}
        `;
    } else {
        ans.innerHTML = `
            <span class="child-clock-box"></span>
            <span class="child-clock-unit">시</span>
        `;
    }
    clockCard.appendChild(ans);
    clockGrid.appendChild(clockCard);
    
    // --- Card 2: Addition Problems (Middle) ---
    const addCard = document.createElement('div');
    addCard.className = 'child-math-card';
    
    const qnum2 = document.createElement('div');
    qnum2.className = 'child-clock-qnum';
    qnum2.innerText = '2';
    addCard.appendChild(qnum2);
    
    const addHeader = document.createElement('div');
    addHeader.className = 'child-math-header';
    addHeader.innerHTML = `<span class="child-math-badge add"><i class="fas fa-plus"></i> 더하기</span>`;
    addCard.appendChild(addHeader);
    
    // Generate 2 addition problems (sum <= 9 for age 5)
    const addPairs = [];
    while (addPairs.length < 2) {
        const a = Math.floor(Math.random() * 5) + 1; // 1 ~ 5
        const b = Math.floor(Math.random() * 4) + 1; // 1 ~ 4
        if (a + b <= 9 && !addPairs.some(p => p[0] === a && p[1] === b)) {
            addPairs.push([a, b]);
        }
    }
    
    addPairs.forEach(([a, b]) => {
        const item = document.createElement('div');
        item.className = 'child-math-item';
        
        let dotsA = '';
        for (let i = 0; i < a; i++) dotsA += '<span class="math-dot dot-blue"></span>';
        let dotsB = '';
        for (let i = 0; i < b; i++) dotsB += '<span class="math-dot dot-orange"></span>';
        
        item.innerHTML = `
            <div class="math-dot-row">
                <span class="math-dot-group">${dotsA}</span>
                <span class="math-dot-op">+</span>
                <span class="math-dot-group">${dotsB}</span>
            </div>
            <div class="math-expr-row">
                <span>${a}</span>
                <span>+</span>
                <span>${b}</span>
                <span>=</span>
                <span class="child-math-ans-box"></span>
            </div>
        `;
        addCard.appendChild(item);
    });
    clockGrid.appendChild(addCard);
    
    // --- Card 3: Subtraction Problems (Right) ---
    const subCard = document.createElement('div');
    subCard.className = 'child-math-card';
    
    const qnum3 = document.createElement('div');
    qnum3.className = 'child-clock-qnum';
    qnum3.innerText = '3';
    subCard.appendChild(qnum3);
    
    const subHeader = document.createElement('div');
    subHeader.className = 'child-math-header';
    subHeader.innerHTML = `<span class="child-math-badge sub"><i class="fas fa-minus"></i> 빼기</span>`;
    subCard.appendChild(subHeader);
    
    // Generate 2 subtraction problems (minuend 3~8, subtrahend 1~(minuend-1))
    const subPairs = [];
    while (subPairs.length < 2) {
        const a = Math.floor(Math.random() * 6) + 3; // 3 ~ 8
        const b = Math.floor(Math.random() * (a - 1)) + 1; // 1 ~ a-1
        if (!subPairs.some(p => p[0] === a && p[1] === b)) {
            subPairs.push([a, b]);
        }
    }
    
    subPairs.forEach(([a, b]) => {
        const item = document.createElement('div');
        item.className = 'child-math-item';
        
        let dotsRemain = '';
        for (let i = 0; i < (a - b); i++) dotsRemain += '<span class="math-dot dot-red"></span>';
        let dotsCut = '';
        for (let i = 0; i < b; i++) dotsCut += '<span class="math-dot dot-cut">✕</span>';
        
        item.innerHTML = `
            <div class="math-dot-row">
                <span class="math-dot-group">${dotsRemain}${dotsCut}</span>
            </div>
            <div class="math-expr-row">
                <span>${a}</span>
                <span>-</span>
                <span>${b}</span>
                <span>=</span>
                <span class="child-math-ans-box"></span>
            </div>
        `;
        subCard.appendChild(item);
    });
    clockGrid.appendChild(subCard);
    
    wrapper.appendChild(clockGrid);
    
    // ==========================================
    // 4. 한글 단어 쓰기 (Hangeul Word Writing)
    // ==========================================
    const hangeulTitle = document.createElement('div');
    hangeulTitle.className = 'child-section-title title-hangeul';
    hangeulTitle.innerHTML = '<i class="fas fa-pencil-alt" style="color: #ec4899;"></i> 오늘의 한글 단어 쓰기 (그림을 보고 낱말 따라 쓰기)';
    wrapper.appendChild(hangeulTitle);
    
    const hangeulCategory = document.getElementById('zombie-hangeul-type')?.value || 'all';
    
    // Filter word pool
    let wordPool = CHILD_HANGEUL_WORDS;
    if (hangeulCategory === 'animals') {
        wordPool = CHILD_HANGEUL_WORDS.filter(w => ['사자','호랑','토끼','기린','판다','여우','사슴','하마','곰','말','소','돼지','양','염소','오리','병아','나비','꿀벌','개미','문어','꽃게'].includes(w.word));
    } else if (hangeulCategory === 'fruits') {
        wordPool = CHILD_HANGEUL_WORDS.filter(w => ['사과','포도','수박','딸기','오이','당근','감자','양파','버섯','호박','가지','레몬','자두','체리','우유','치즈','김밥','사탕','초코','과자','젤리','주스','피자','도넛','만두','식빵'].includes(w.word));
    } else if (hangeulCategory === 'things') {
        wordPool = CHILD_HANGEUL_WORDS.filter(w => ['기차','버스','트럭','택시','전철','보트','로켓','모자','신발','가방','안경','시계','연필','공책','우산','풍선','비누','양말','바지','인형','로봇'].includes(w.word));
    } else if (hangeulCategory === 'nature') {
        wordPool = CHILD_HANGEUL_WORDS.filter(w => ['바다','하늘','구름','햇님','달님','별빛','나무','꽃밭','바람','새싹','단풍','잔디','숲속','모래','엄마','아빠','아기','친구','사랑','행복'].includes(w.word));
    }
    if (!wordPool || wordPool.length < 2) wordPool = CHILD_HANGEUL_WORDS;
    
    const selectedWords = [];
    while (selectedWords.length < 2) {
        const item = wordPool[Math.floor(Math.random() * wordPool.length)];
        if (!selectedWords.some(w => w.word === item.word)) {
            selectedWords.push(item);
        }
    }
    
    selectedWords.forEach(item => {
        const row = document.createElement('div');
        row.className = 'child-study-row child-hangeul-row';
        
        // 1. Info Cell
        const info = document.createElement('div');
        info.className = 'child-info-cell';
        info.innerHTML = `
            <div style="font-size: 2.1rem; line-height: 1;">${item.emoji}</div>
            <div style="font-size: 0.82rem; font-weight: 800; color: #be185d; margin-top: 3px;">${item.word}</div>
        `;
        row.appendChild(info);
        
        const chars = item.word.split('');
        if (chars.length === 2) {
            // 2 Model Cells (보기)
            for (let i = 0; i < 2; i++) {
                const model = document.createElement('div');
                model.className = 'child-model-cell has-crosshair';
                model.innerHTML = `<span>${chars[i]}</span>`;
                row.appendChild(model);
            }
            // 2 Trace Cells (따라쓰기)
            for (let i = 0; i < 2; i++) {
                const trace = document.createElement('div');
                trace.className = 'child-trace-cell has-crosshair';
                trace.innerHTML = `<span>${chars[i]}</span>`;
                row.appendChild(trace);
            }
            // 2 Blank Cells (직접쓰기)
            for (let i = 0; i < 2; i++) {
                const blank = document.createElement('div');
                blank.className = 'child-blank-cell has-crosshair';
                row.appendChild(blank);
            }
        } else {
            // For other lengths
            for (let i = 0; i < chars.length; i++) {
                const model = document.createElement('div');
                model.className = 'child-model-cell has-crosshair';
                model.innerHTML = `<span>${chars[i]}</span>`;
                row.appendChild(model);
            }
            for (let i = 0; i < chars.length; i++) {
                const trace = document.createElement('div');
                trace.className = 'child-trace-cell has-crosshair';
                trace.innerHTML = `<span>${chars[i]}</span>`;
                row.appendChild(trace);
            }
            const rem = Math.max(0, 6 - chars.length * 2);
            for (let i = 0; i < rem; i++) {
                const blank = document.createElement('div');
                blank.className = 'child-blank-cell has-crosshair';
                row.appendChild(blank);
            }
        }
        
        wrapper.appendChild(row);
    });
    
    container.appendChild(wrapper);
}
