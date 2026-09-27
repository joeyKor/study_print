/**
 * Custom Text Writing (맞춤 문장/단어 쓰기) Worksheet Generator
 */

const CUSTOM_TEXT_PRESETS = {
    family: "우리 가족은 서로 사랑하고 항상 배려해요.\n함께 웃는 매일이 참 행복합니다.",
    spring: "봄비가 조용히 내려와 새싹들이 활짝 웃어요.\n따뜻한 햇살 아래 노란 개나리가 피어납니다.",
    habit: "아침에 일어나면 부모님께 먼저 인사해요.\n외출 후에는 손과 발을 깨끗이 씻습니다.",
    school: "선생님의 말씀을 바른 자세로 귀담아들어요.\n친구들과 사이좋게 양보하며 즐겁게 놀아요.",
    words: "대한민국\n아름다운\n푸른하늘\n우리학교\n지혜와용기"
};

function createCustomTextSection(subType, inputText, guideStyle) {
    const container = document.createElement('div');
    container.className = 'custom-text-worksheet';

    const textToUse = (inputText && inputText.trim().length > 0) 
        ? inputText.trim() 
        : CUSTOM_TEXT_PRESETS.family;

    // Save to localStorage
    try {
        localStorage.setItem('custom_study_text', textToUse);
    } catch (e) {}

    // Instruction Header
    const desc = document.createElement('div');
    desc.className = 'sheet-instruction';
    if (subType === 'word') {
        desc.innerHTML = '<i class="fas fa-pen-nib"></i> 단어를 소리 내어 읽으며 바른 글씨로 네모 칸 중앙에 써보세요.';
    } else {
        desc.innerHTML = '<i class="fas fa-pencil-alt"></i> 문장을 바른 자세로 소리 내어 읽고 깍두기 공책 규격에 맞춰 또박또박 써보세요.';
    }
    container.appendChild(desc);

    const lines = textToUse.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    if (subType === 'word') {
        container.appendChild(createCustomWordsLayout(lines, guideStyle));
    } else {
        // Sentence mode: 10-box manuscript style (초등 깍두기 공책)
        container.appendChild(createCustomSentencesLayout(lines, guideStyle));
    }

    return container;
}

/**
 * Sentence Layout: 10 boxes per row (standard Korean elementary school notebook)
 * For each sentence line, renders:
 * 1. Model row (Dark crisp font)
 * 2. Tracing row (Light grey guide font)
 * 3. Practice row (Empty grid for self writing)
 */
function createCustomSentencesLayout(lines, guideStyle) {
    const wrap = document.createElement('div');
    wrap.className = 'custom-sentences-wrap';

    const maxCharsPerRow = 10;
    // Limit to reasonable number of rows to fit A4 neatly
    const limitedLines = lines.slice(0, 3); // 3 sentences = 9 rows total, perfect for A4

    limitedLines.forEach((line, lineIdx) => {
        const sentenceBlock = document.createElement('div');
        sentenceBlock.className = 'custom-sentence-block';

        // Split line into chunks of 10 characters
        const chunks = [];
        for (let i = 0; i < line.length; i += maxCharsPerRow) {
            chunks.push(line.substring(i, i + maxCharsPerRow));
        }

        chunks.forEach((chunk) => {
            // Row 1: Model Row
            const modelRow = createBoxRow(chunk, maxCharsPerRow, 'model', guideStyle);
            sentenceBlock.appendChild(modelRow);

            // Row 2: Tracing Row
            const traceRow = createBoxRow(chunk, maxCharsPerRow, 'trace', guideStyle);
            sentenceBlock.appendChild(traceRow);

            // Row 3: Practice Blank Row
            const blankRow = createBoxRow(chunk, maxCharsPerRow, 'blank', guideStyle);
            sentenceBlock.appendChild(blankRow);
        });

        wrap.appendChild(sentenceBlock);
    });

    return wrap;
}

/**
 * Word Layout: Left label word + Tracing cells + Blank practice cells
 */
function createCustomWordsLayout(lines, guideStyle) {
    const wrap = document.createElement('div');
    wrap.className = 'custom-words-wrap';

    // Extract individual words
    const words = [];
    lines.forEach(l => {
        const parts = l.split(/\s+/).filter(w => w.length > 0);
        words.push(...parts);
    });

    const displayWords = words.slice(0, 6); // Up to 6 words fit comfortably on A4

    displayWords.forEach((word) => {
        const row = document.createElement('div');
        row.className = 'custom-word-row';

        const label = document.createElement('div');
        label.className = 'custom-word-label';
        label.innerText = word;
        row.appendChild(label);

        const boxesWrap = document.createElement('div');
        boxesWrap.className = 'custom-word-boxes';

        // 1 Model / Trace set for each character in word
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            const box = createSingleBox(ch, 'trace', guideStyle);
            boxesWrap.appendChild(box);
        }

        // Add 2 sets of blank boxes for the whole word
        for (let repeat = 0; repeat < 2; repeat++) {
            // Divider space
            const spacer = document.createElement('div');
            spacer.className = 'custom-box-spacer';
            boxesWrap.appendChild(spacer);

            for (let i = 0; i < word.length; i++) {
                const box = createSingleBox('', 'blank', guideStyle);
                boxesWrap.appendChild(box);
            }
        }

        row.appendChild(boxesWrap);
        wrap.appendChild(row);
    });

    return wrap;
}

/**
 * Create a row of 10 squared boxes
 */
function createBoxRow(text, totalBoxes, mode, guideStyle) {
    const row = document.createElement('div');
    row.className = `custom-box-row mode-${mode}`;

    for (let i = 0; i < totalBoxes; i++) {
        const char = i < text.length ? text[i] : '';
        const box = createSingleBox(char, mode, guideStyle);
        row.appendChild(box);
    }

    return row;
}

/**
 * Create a single Korean primary square box with crosshairs
 */
function createSingleBox(char, mode, guideStyle) {
    const box = document.createElement('div');
    box.className = `manuscript-box ${guideStyle === 'cross' ? 'with-crosshair' : ''}`;

    // Crosshair guidelines (horizontal & vertical dashed lines)
    if (guideStyle === 'cross') {
        const crossH = document.createElement('div');
        crossH.className = 'crosshair-h';
        const crossV = document.createElement('div');
        crossV.className = 'crosshair-v';
        box.appendChild(crossH);
        box.appendChild(crossV);
    }

    if (mode !== 'blank' && char) {
        const textSpan = document.createElement('span');
        textSpan.className = `box-char ${mode === 'trace' ? 'trace-char' : 'model-char'}`;
        textSpan.innerText = char;
        box.appendChild(textSpan);
    }

    return box;
}
