/**
 * English Word Worksheet Generator
 */

function createEnglishSection(subType) {
    const container = document.createElement('div');
    container.className = 'english-container';

    // Map subType to Data dynamically
    let baseData = [];
    const varName = 'ENGLISH_' + (subType || 'junior128').toUpperCase() + '_DATA';
    if (typeof window !== 'undefined' && window[varName]) {
        baseData = window[varName];
    } else if (typeof ENGLISH_JUNIOR128_DATA !== 'undefined') {
        baseData = ENGLISH_JUNIOR128_DATA;
    } else if (typeof ENGLISH_JUNIOR126_DATA !== 'undefined') {
        baseData = ENGLISH_JUNIOR126_DATA;
    }

    // Pick exactly 8 words to avoid cutoff at the bottom
    const count = 8;
    
    const words = [...baseData].sort(() => 0.5 - Math.random()).slice(0, count);

    words.forEach(item => {
        const card = document.createElement('div');
        card.className = 'english-card';
        
        card.innerHTML = `
            <div class="english-card-header">
                <span class="english-card-word">${item.word}</span>
                <span class="english-card-meaning">${item.meaning}</span>
            </div>
            <div class="english-card-body">
                <div class="english-card-sentence" style="font-size: 0.9em; color: #64748b; margin-bottom: 8px; font-style: italic;">
                    ${item.sentence || ''}
                </div>
                <div class="english-card-practice-row"></div>
            </div>
        `;
        
        container.appendChild(card);
    });

    return container;
}
