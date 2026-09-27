/**
 * Hangeul Word Writing (한글 단어쓰기) Worksheet Generator
 * Creates image-assisted Hangeul word writing worksheets with tracing and practice grids.
 */

const HANGEUL_WORD_THEMES = {
    animals: [
        { word: '거북이', emoji: '🐢', desc: '느릿느릿 거북이' },
        { word: '뱀', emoji: '🐍', desc: '스르륵 뱀' },
        { word: '악어', emoji: '🐊', desc: '뾰족이 악어' },
        { word: '개구리', emoji: '🐸', desc: '개골개골 개구리' },
        { word: '사자', emoji: '🦁', desc: '어흥 사자' },
        { word: '호랑이', emoji: '🐯', desc: '용맹한 호랑이' },
        { word: '토끼', emoji: '🐰', desc: '깡충깡충 토끼' },
        { word: '곰', emoji: '🐻', desc: '뒤뚱뒤뚱 곰' },
        { word: '코끼리', emoji: '🐘', desc: '코가 긴 코끼리' },
        { word: '기린', emoji: '🦒', desc: '목이 긴 기린' },
        { word: '얼룩말', emoji: '🦓', desc: '줄무늬 얼룩말' },
        { word: '하마', emoji: '🦛', desc: '입이 큰 하마' },
        { word: '원숭이', emoji: '🐵', desc: '재주꾼 원숭이' },
        { word: '판다', emoji: '🐼', desc: '귀여운 판다' },
        { word: '코알라', emoji: '🐨', desc: '잠꾸러기 코알라' },
        { word: '캥거루', emoji: '🦘', desc: '폴짝폴짝 캥거루' },
        { word: '사슴', emoji: '🦌', desc: '예쁜 뿔 사슴' },
        { word: '여우', emoji: '🦊', desc: '꾀 많은 여우' },
        { word: '늑대', emoji: '🐺', desc: '용감한 늑대' },
        { word: '돼지', emoji: '🐷', desc: '꿀꿀 돼지' },
        { word: '소', emoji: '🐮', desc: '음메 착한 소' },
        { word: '말', emoji: '🐴', desc: '다그닥 말' },
        { word: '양', emoji: '🐑', desc: '복슬복슬 양' },
        { word: '염소', emoji: '🐐', desc: '수염 난 염소' },
        { word: '강아지', emoji: '🐶', desc: '멍멍 강아지' },
        { word: '고양이', emoji: '🐱', desc: '야옹 고양이' },
        { word: '다람쥐', emoji: '🐿️', desc: '도토리 다람쥐' },
        { word: '오리', emoji: '🦆', desc: '꽥꽥 오리' },
        { word: '병아리', emoji: '🐥', desc: '삐약삐약 병아리' },
        { word: '닭', emoji: '🐔', desc: '꼬꼬댁 닭' },
        { word: '참새', emoji: '🐦', desc: '짹짹 참새' },
        { word: '비둘기', emoji: '🕊️', desc: '구구 비둘기' },
        { word: '부엉이', emoji: '🦉', desc: '지혜로운 부엉이' },
        { word: '독수리', emoji: '🦅', desc: '하늘의 왕 독수리' },
        { word: '펭귄', emoji: '🐧', desc: '뒤뚱뒤뚱 펭귄' },
        { word: '물고기', emoji: '🐟', desc: '헤엄치는 물고기' },
        { word: '고래', emoji: '🐳', desc: '바다의 왕 고래' },
        { word: '상어', emoji: '🦈', desc: '날카로운 상어' },
        { word: '돌고래', emoji: '🐬', desc: '점프하는 돌고래' },
        { word: '문어', emoji: '🐙', desc: '다리 여덟 문어' },
        { word: '오징어', emoji: '🦑', desc: '먹물 뿜는 오징어' },
        { word: '꽃게', emoji: '🦀', desc: '옆으로 꽃게' },
        { word: '새우', emoji: '🦐', desc: '등 굽은 새우' },
        { word: '해파리', emoji: '🪼', desc: '둥둥 해파리' },
        { word: '나비', emoji: '🦋', desc: '팔랑팔랑 나비' },
        { word: '꿀벌', emoji: '🐝', desc: '윙윙 꿀벌' },
        { word: '무당벌레', emoji: '🐞', desc: '알록달록 무당벌레' },
        { word: '개미', emoji: '🐜', desc: '부지런한 개미' },
        { word: '달팽이', emoji: '🐌', desc: '느릿느릿 달팽이' }
    ],
    fruits: [
        { word: '사과', emoji: '🍎', desc: '새콤달콤 사과' },
        { word: '바나나', emoji: '🍌', desc: '달콤한 바나나' },
        { word: '포도', emoji: '🍇', desc: '알알이 포도' },
        { word: '수박', emoji: '🍉', desc: '시원한 수박' },
        { word: '딸기', emoji: '🍓', desc: '빨간 딸기' },
        { word: '복숭아', emoji: '🍑', desc: '향긋한 복숭아' },
        { word: '오렌지', emoji: '🍊', desc: '상큼한 오렌지' },
        { word: '레몬', emoji: '🍋', desc: '새콤한 레몬' },
        { word: '체리', emoji: '🍒', desc: '빨간 체리' },
        { word: '키위', emoji: '🥝', desc: '초록빛 키위' },
        { word: '파인애플', emoji: '🍍', desc: '달콤 파인애플' },
        { word: '망고', emoji: '🥭', desc: '달콤한 망고' },
        { word: '멜론', emoji: '🍈', desc: '달콤한 멜론' },
        { word: '배', emoji: '🍐', desc: '시원하고 단 배' },
        { word: '감', emoji: '🪵', desc: '달콤한 감' },
        { word: '당근', emoji: '🥕', desc: '아삭아삭 당근' },
        { word: '오이', emoji: '🥒', desc: '초록빛 오이' },
        { word: '토마토', emoji: '🍅', desc: '탱글탱글 토마토' },
        { word: '감자', emoji: '🥔', desc: '포슬포슬 감자' },
        { word: '고구마', emoji: '🍠', desc: '달콤한 고구마' },
        { word: '옥수수', emoji: '🌽', desc: '알록달록 옥수수' },
        { word: '가지', emoji: '🍆', desc: '보랏빛 가지' },
        { word: '호박', emoji: '🎃', desc: '둥글둥글 호박' },
        { word: '버섯', emoji: '🍄', desc: '통통한 버섯' },
        { word: '브로콜리', emoji: '🥦', desc: '초록 브로콜리' },
        { word: '고추', emoji: '🌶️', desc: '매콤한 고추' },
        { word: '파프리카', emoji: '🫑', desc: '아삭 파프리카' },
        { word: '양파', emoji: '🧅', desc: '동글동글 양파' },
        { word: '마늘', emoji: '🧄', desc: '알싸한 마늘' }
    ],
    food: [
        { word: '밥', emoji: '🍚', desc: '따뜻한 밥' },
        { word: '빵', emoji: '🍞', desc: '고소한 빵' },
        { word: '우유', emoji: '🥛', desc: '하얀 우유' },
        { word: '치즈', emoji: '🧀', desc: '노란 치즈' },
        { word: '계란', emoji: '🥚', desc: '동글동글 계란' },
        { word: '사탕', emoji: '🍬', desc: '달콤한 사탕' },
        { word: '초콜릿', emoji: '🍫', desc: '달콤 초콜릿' },
        { word: '쿠키', emoji: '🍪', desc: '바삭바삭 쿠키' },
        { word: '케이크', emoji: '🎂', desc: '생일 케이크' },
        { word: '도넛', emoji: '🍩', desc: '동그란 도넛' },
        { word: '아이스크림', emoji: '🍦', desc: '시원 아이스크림' },
        { word: '피자', emoji: '🍕', desc: '치즈 피자' },
        { word: '햄버거', emoji: '🍔', desc: '맛있는 햄버거' },
        { word: '라면', emoji: '🍜', desc: '후루룩 라면' },
        { word: '만두', emoji: '🥟', desc: '통통한 만두' },
        { word: '김밥', emoji: '🍙', desc: '돌돌 만 김밥' },
        { word: '샌드위치', emoji: '🥪', desc: '영양 샌드위치' },
        { word: '주스', emoji: '🧃', desc: '달콤한 주스' },
        { word: '팝콘', emoji: '🍿', desc: '고소한 팝콘' }
    ],
    vehicles: [
        { word: '기차', emoji: '🚂', desc: '칙칙폭폭 기차' },
        { word: '자동차', emoji: '🚗', desc: '부릉부릉 자동차' },
        { word: '비행기', emoji: '✈️', desc: '슝슝 비행기' },
        { word: '자전거', emoji: '🚲', desc: '따르릉 자전거' },
        { word: '경찰차', emoji: '🚓', desc: '삐뽀삐뽀 경찰차' },
        { word: '소방차', emoji: '🚒', desc: '출동 소방차' },
        { word: '구급차', emoji: '🚑', desc: '안전 구급차' },
        { word: '버스', emoji: '🚌', desc: '타요 버스' },
        { word: '택시', emoji: '🚕', desc: '부릉부릉 택시' },
        { word: '트럭', emoji: '🚚', desc: '힘센 씽씽 트럭' },
        { word: '배', emoji: '🚢', desc: '둥둥 떠가는 배' },
        { word: '요트', emoji: '⛵', desc: '바람 타고 요트' },
        { word: '보트', emoji: '🚤', desc: '씽씽 달리는 보트' },
        { word: '헬리콥터', emoji: '🚁', desc: '빙글빙글 헬리콥터' },
        { word: '로켓', emoji: '🚀', desc: '우주로 로켓' },
        { word: '오토바이', emoji: '🏍️', desc: '쌩쌩 오토바이' },
        { word: '킥보드', emoji: '🛴', desc: '씽씽 킥보드' },
        { word: '포크레인', emoji: '🚜', desc: '흙 파는 포크레인' }
    ],
    things: [
        { word: '시계', emoji: '⏰', desc: '똑딱똑딱 시계' },
        { word: '우산', emoji: '☂️', desc: '비 오는 날 우산' },
        { word: '모자', emoji: '🧢', desc: '멋진 모자' },
        { word: '안경', emoji: '👓', desc: '반짝반짝 안경' },
        { word: '가방', emoji: '🎒', desc: '알록달록 가방' },
        { word: '연필', emoji: '✏️', desc: '사각사각 연필' },
        { word: '가위', emoji: '✂️', desc: '싹둑싹둑 가위' },
        { word: '신발', emoji: '👟', desc: '편안한 신발' },
        { word: '양말', emoji: '🧦', desc: '따뜻한 양말' },
        { word: '옷', emoji: '👕', desc: '예쁜 옷' },
        { word: '바지', emoji: '👖', desc: '편한 바지' },
        { word: '장갑', emoji: '🧤', desc: '따뜻한 장갑' },
        { word: '책', emoji: '📖', desc: '재미있는 책' },
        { word: '텔레비전', emoji: '📺', desc: '재미난 텔레비전' },
        { word: '전화기', emoji: '☎️', desc: '따르릉 전화기' },
        { word: '컴퓨터', emoji: '💻', desc: '똑똑한 컴퓨터' },
        { word: '카메라', emoji: '📷', desc: '찰칵 카메라' },
        { word: '열쇠', emoji: '🔑', desc: '문 여는 열쇠' },
        { word: '선물', emoji: '🎁', desc: '기쁜 선물' },
        { word: '풍선', emoji: '🎈', desc: '둥실둥실 풍선' },
        { word: '컵', emoji: '🥛', desc: '깨끗한 컵' },
        { word: '숟가락', emoji: '🥄', desc: '냠냠 숟가락' },
        { word: '포크', emoji: '🍴', desc: '콕콕 포크' },
        { word: '칫솔', emoji: '🪥', desc: '치카치카 칫솔' },
        { word: '비누', emoji: '🧼', desc: '보글보글 비누' },
        { word: '거울', emoji: '🪞', desc: '반짝반짝 거울' },
        { word: '침대', emoji: '🛏️', desc: '포근한 침대' },
        { word: '의자', emoji: '🪑', desc: '편안한 의자' },
        { word: '문', emoji: '🚪', desc: '똑똑똑 문' }
    ],
    body_family: [
        { word: '눈', emoji: '👀', desc: '반짝이는 눈' },
        { word: '코', emoji: '👃', desc: '오뚝한 코' },
        { word: '입', emoji: '👄', desc: '예쁜 입' },
        { word: '귀', emoji: '👂', desc: '쫑긋한 귀' },
        { word: '손', emoji: '✋', desc: '다정한 손' },
        { word: '발', emoji: '🦶', desc: '튼튼한 발' },
        { word: '머리', emoji: '👦', desc: '소중한 머리' },
        { word: '엄마', emoji: '👩', desc: '사랑하는 엄마' },
        { word: '아빠', emoji: '👨', desc: '멋진 아빠' },
        { word: '아기', emoji: '👶', desc: '귀여운 아기' },
        { word: '할머니', emoji: '👵', desc: '인자한 할머니' },
        { word: '할아버지', emoji: '👴', desc: '자상한 할아버지' },
        { word: '선생님', emoji: '🧑‍🏫', desc: '친절한 선생님' },
        { word: '의사', emoji: '🧑‍⚕️', desc: '고마운 의사' },
        { word: '경찰관', emoji: '👮', desc: '멋진 경찰관' },
        { word: '소방관', emoji: '🧑‍🚒', desc: '용감한 소방관' },
        { word: '요리사', emoji: '🧑‍🍳', desc: '맛있는 요리사' }
    ],
    nature: [
        { word: '해', emoji: '☀️', desc: '따스한 햇님' },
        { word: '달', emoji: '🌙', desc: '밤하늘 달님' },
        { word: '별', emoji: '⭐', desc: '반짝이는 별' },
        { word: '구름', emoji: '☁️', desc: '뭉게뭉게 구름' },
        { word: '비', emoji: '🌧️', desc: '주룩주룩 비' },
        { word: '눈', emoji: '❄️', desc: '하늘에서 내리는 눈' },
        { word: '무지개', emoji: '🌈', desc: '일곱빛깔 무지개' },
        { word: '바람', emoji: '💨', desc: '살랑살랑 바람' },
        { word: '꽃', emoji: '🌸', desc: '향기로운 꽃' },
        { word: '나무', emoji: '🌳', desc: '푸른 나무' },
        { word: '풀', emoji: '🌿', desc: '파릇파릇 풀' },
        { word: '나뭇잎', emoji: '🍃', desc: '살랑이는 나뭇잎' },
        { word: '산', emoji: '⛰️', desc: '높고 푸른 산' },
        { word: '바다', emoji: '🌊', desc: '넓고 푸른 바다' },
        { word: '하늘', emoji: '🌤️', desc: '맑고 높은 하늘' },
        { word: '불', emoji: '🔥', desc: '활활 타는 불' },
        { word: '물', emoji: '💧', desc: '맑고 시원한 물' }
    ]
};

/**
 * Creates the Hangeul Word Writing worksheet
 * @param {string} theme - 'animals' | 'fruits' | 'food' | 'vehicles' | 'things' | 'body_family' | 'nature' | 'mixed'
 * @returns {HTMLElement} container
 */
function createHangeulWordSection(theme = 'animals') {
    const container = document.createElement('div');
    container.className = 'hangeul-word-container';

    // 1. Instruction Subheader
    const instruction = document.createElement('div');
    instruction.className = 'hangeul-word-instruction';
    instruction.innerHTML = `
        <span class="instruction-icon"><i class="fas fa-pencil-alt"></i></span>
        <span>단어를 소리 내어 읽으면서 바르게 따라 쓰고, 빈칸에 직접 예쁘게 써 보세요.</span>
    `;
    container.appendChild(instruction);

    // 2. Read settings from sidebar
    const wordCountSetting = parseInt(document.getElementById('hangeul-word-count')?.value || '5', 10);
    const rowCountSetting = parseInt(document.getElementById('hangeul-word-rows')?.value || '2', 10);

    // 3. Select words based on theme
    let pool = [];
    if (theme === 'mixed') {
        const keys = Object.keys(HANGEUL_WORD_THEMES);
        keys.forEach(k => {
            pool = pool.concat(HANGEUL_WORD_THEMES[k]);
        });
    } else if (HANGEUL_WORD_THEMES[theme]) {
        pool = [...HANGEUL_WORD_THEMES[theme]];
    } else {
        pool = [...HANGEUL_WORD_THEMES.animals];
    }

    // Curated initial set for first load if matching
    let selectedWords = [];
    
    // Always shuffle from the large pool to provide fresh words
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selectedWords = shuffled.slice(0, wordCountSetting);

    // 4. Render Rows (Filling horizontal & vertical space completely)
    selectedWords.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'hangeul-word-row';
        if (rowCountSetting === 3) {
            row.classList.add('has-three-rows');
        }
        if (index === selectedWords.length - 1) {
            row.classList.add('is-last');
        }

        // Left Image / Illustration Box
        const imageBox = document.createElement('div');
        imageBox.className = 'hangeul-word-image-box';
        imageBox.innerHTML = `
            <div class="hangeul-word-emoji">${item.emoji}</div>
            <div class="hangeul-word-badge">${item.word}</div>
        `;
        row.appendChild(imageBox);

        // Right Writing Grid Area
        const writeArea = document.createElement('div');
        writeArea.className = 'hangeul-word-write-area';

        const chars = item.word.split('');
        const charLen = chars.length;

        // Calculate setCount to fill the entire horizontal width (~500px):
        // 1 char -> 7 sets (e.g. 뱀 x 7)
        // 2 chars -> 4 sets (e.g. 감자 x 4 = 8 cells)
        // 3 chars -> 3 sets (e.g. 복숭아 x 3 = 9 cells)
        // 4+ chars -> 2 sets (e.g. 헬리콥터 x 2 = 8 cells)
        let setCount = 4;
        let cellClass = 'cell-standard';
        if (charLen === 1) {
            setCount = 7;
            cellClass = 'cell-single';
        } else if (charLen === 2) {
            setCount = 4;
            cellClass = 'cell-double';
        } else if (charLen === 3) {
            setCount = 3;
            cellClass = 'cell-triple';
        } else if (charLen >= 4) {
            setCount = 2;
            cellClass = 'cell-quad';
        }

        // Container for Sets
        const setsWrapper = document.createElement('div');
        setsWrapper.className = `hangeul-word-sets-wrapper ${cellClass}`;

        for (let s = 0; s < setCount; s++) {
            const setBlock = document.createElement('div');
            setBlock.className = 'hangeul-word-grid-set';

            // Row 1: Tracing cells
            const traceRow1 = document.createElement('div');
            traceRow1.className = 'hangeul-word-char-row trace-row';
            chars.forEach(ch => {
                const cell = document.createElement('div');
                cell.className = 'word-write-cell trace has-crosshair';
                cell.innerHTML = `<span>${ch}</span>`;
                traceRow1.appendChild(cell);
            });
            setBlock.appendChild(traceRow1);

            // Row 2: Either intermediate row (tracing in 3-row mode, or blank in 2-row mode)
            if (rowCountSetting === 3) {
                const traceRow2 = document.createElement('div');
                traceRow2.className = 'hangeul-word-char-row trace-row lighter';
                chars.forEach(ch => {
                    const cell = document.createElement('div');
                    cell.className = 'word-write-cell trace lighter has-crosshair';
                    cell.innerHTML = `<span>${ch}</span>`;
                    traceRow2.appendChild(cell);
                });
                setBlock.appendChild(traceRow2);
            }

            // Bottom row: Blank practice cells
            const blankRow = document.createElement('div');
            blankRow.className = 'hangeul-word-char-row blank-row';
            chars.forEach(() => {
                const cell = document.createElement('div');
                cell.className = 'word-write-cell blank has-crosshair';
                blankRow.appendChild(cell);
            });
            setBlock.appendChild(blankRow);

            setsWrapper.appendChild(setBlock);
        }

        writeArea.appendChild(setsWrapper);
        row.appendChild(writeArea);
        container.appendChild(row);
    });

    return container;
}
