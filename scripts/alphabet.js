/**
 * Alphabet Writing Worksheet Generator
 */

const ALPHABET_UPPER_AM = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const ALPHABET_UPPER_NZ = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const ALPHABET_LOWER_AM = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
const ALPHABET_LOWER_NZ = ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const ALPHABET_MIXED_AM = [
    { display: "Aa", trace: "Aa", ref: "Aa" },
    { display: "Bb", trace: "Bb", ref: "Bb" },
    { display: "Cc", trace: "Cc", ref: "Cc" },
    { display: "Dd", trace: "Dd", ref: "Dd" },
    { display: "Ee", trace: "Ee", ref: "Ee" },
    { display: "Ff", trace: "Ff", ref: "Ff" },
    { display: "Gg", trace: "Gg", ref: "Gg" },
    { display: "Hh", trace: "Hh", ref: "Hh" },
    { display: "Ii", trace: "Ii", ref: "Ii" },
    { display: "Jj", trace: "Jj", ref: "Jj" },
    { display: "Kk", trace: "Kk", ref: "Kk" },
    { display: "Ll", trace: "Ll", ref: "Ll" },
    { display: "Mm", trace: "Mm", ref: "Mm" }
];

const ALPHABET_MIXED_NZ = [
    { display: "Nn", trace: "Nn", ref: "Nn" },
    { display: "Oo", trace: "Oo", ref: "Oo" },
    { display: "Pp", trace: "Pp", ref: "Pp" },
    { display: "Qq", trace: "Qq", ref: "Qq" },
    { display: "Rr", trace: "Rr", ref: "Rr" },
    { display: "Ss", trace: "Ss", ref: "Ss" },
    { display: "Tt", trace: "Tt", ref: "Tt" },
    { display: "Uu", trace: "Uu", ref: "Uu" },
    { display: "Vv", trace: "Vv", ref: "Vv" },
    { display: "Ww", trace: "Ww", ref: "Ww" },
    { display: "Xx", trace: "Xx", ref: "Xx" },
    { display: "Yy", trace: "Yy", ref: "Yy" },
    { display: "Zz", trace: "Zz", ref: "Zz" }
];

/**
 * Create a single alphabet row
 * @param {Object} item - { display, trace, ref }
 * @param {boolean} isSplit - true for 2-column split (A-Z layout)
 * @param {boolean} isMixed - true for mixed case (Aa)
 * @param {string} traceMode - 'all_trace' (회색 음영 채우기) or 'with_practice' (빈칸 포함)
 */
function createAlphabetRow(item, isSplit = false, isMixed = false, traceMode = 'all_trace') {
    const row = document.createElement('div');
    row.className = 'alphabet-row';
    
    const mixedClass = isMixed ? ' is-mixed' : '';

    // 1. Info block (bold, highlights the letter)
    const infoCell = document.createElement('div');
    infoCell.className = `alphabet-char-cell info-box has-ruling${mixedClass}`;
    infoCell.innerHTML = `<span>${item.display}</span>`;
    row.appendChild(infoCell);

    if (isSplit) {
        // 2-Column Split View: 4 cells total [Info 1] + [3 cells] (맨 오른쪽 칸 줄임)
        if (traceMode === 'with_practice') {
            // 2 trace cells + 1 blank practice cell
            for (let i = 0; i < 2; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = `alphabet-char-cell has-ruling${mixedClass}`;
                traceCell.innerHTML = `<span>${item.trace}</span>`;
                row.appendChild(traceCell);
            }
            const practiceCell = document.createElement('div');
            practiceCell.className = `alphabet-char-cell practice-box has-ruling${mixedClass}`;
            practiceCell.innerHTML = `<span>${item.trace}</span>`;
            row.appendChild(practiceCell);
        } else {
            // Default: All 3 cells are gray trace cells (모두 회색 음영 따라쓰기 3칸)
            for (let i = 0; i < 3; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = `alphabet-char-cell has-ruling${mixedClass}`;
                traceCell.innerHTML = `<span>${item.trace}</span>`;
                row.appendChild(traceCell);
            }
        }
    } else {
        // 1-Column Single View: 8 cells total [Info 1] + [7 cells]
        if (traceMode === 'all_trace') {
            // All 7 cells are gray trace cells
            for (let i = 0; i < 7; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = `alphabet-char-cell has-ruling${mixedClass}`;
                traceCell.innerHTML = `<span>${item.trace}</span>`;
                row.appendChild(traceCell);
            }
        } else {
            // Traditional: 3 trace + 3 practice + 1 ref
            for (let i = 0; i < 3; i++) {
                const traceCell = document.createElement('div');
                traceCell.className = `alphabet-char-cell has-ruling${mixedClass}`;
                traceCell.innerHTML = `<span>${item.trace}</span>`;
                row.appendChild(traceCell);
            }

            for (let i = 0; i < 3; i++) {
                const practiceCell = document.createElement('div');
                practiceCell.className = `alphabet-char-cell practice-box has-ruling${mixedClass}`;
                practiceCell.innerHTML = `<span>${item.trace}</span>`;
                row.appendChild(practiceCell);
            }

            const refCell = document.createElement('div');
            refCell.className = `alphabet-char-cell ref-box has-ruling${mixedClass}`;
            refCell.innerHTML = `<span>${item.ref}</span>`;
            row.appendChild(refCell);
        }
    }

    return row;
}

/**
 * Generate alphabet worksheet section
 * Supports full A-Z split (left A-M, right N-Z) on a single page, or partial 1-col subsets.
 */
function createAlphabetSection(subType = 'upper_all') {
    const container = document.createElement('div');

    // Default trace mode: 'all_trace' (모두 회색 음영)
    const traceMode = document.getElementById('select-alphabet-trace-type')?.value || 'all_trace';

    // Default to split view if upper_all, lower_all, mixed_all or invalid
    const isSplit = !subType || subType === 'upper_all' || subType === 'lower_all' || subType === 'mixed_all';

    if (isSplit) {
        container.className = 'alphabet-section alphabet-split-view';

        let leftItems = [];
        let rightItems = [];
        let isMixed = false;
        let leftLabel = 'A - M';
        let rightLabel = 'N - Z';

        if (subType === 'lower_all') {
            leftItems = ALPHABET_LOWER_AM.map(c => ({ display: c, trace: c, ref: c }));
            rightItems = ALPHABET_LOWER_NZ.map(c => ({ display: c, trace: c, ref: c }));
            leftLabel = 'a - m';
            rightLabel = 'n - z';
        } else if (subType === 'mixed_all') {
            leftItems = ALPHABET_MIXED_AM;
            rightItems = ALPHABET_MIXED_NZ;
            isMixed = true;
            leftLabel = 'Aa - Mm';
            rightLabel = 'Nn - Zz';
        } else {
            // Default: upper_all
            leftItems = ALPHABET_UPPER_AM.map(c => ({ display: c, trace: c, ref: c }));
            rightItems = ALPHABET_UPPER_NZ.map(c => ({ display: c, trace: c, ref: c }));
            leftLabel = 'A - M';
            rightLabel = 'N - Z';
        }

        // Left Column (A - M)
        const leftCol = document.createElement('div');
        leftCol.className = 'alphabet-col alphabet-col-left';

        const leftHeader = document.createElement('div');
        leftHeader.className = 'alphabet-col-badge';
        leftHeader.innerHTML = `<span><i class="fas fa-arrow-down"></i> ${leftLabel}</span>`;
        leftCol.appendChild(leftHeader);

        leftItems.forEach(item => {
            leftCol.appendChild(createAlphabetRow(item, true, isMixed, traceMode));
        });

        // Vertical Divider Line
        const divider = document.createElement('div');
        divider.className = 'alphabet-divider';

        // Right Column (N - Z)
        const rightCol = document.createElement('div');
        rightCol.className = 'alphabet-col alphabet-col-right';

        const rightHeader = document.createElement('div');
        rightHeader.className = 'alphabet-col-badge';
        rightHeader.innerHTML = `<span><i class="fas fa-arrow-down"></i> ${rightLabel}</span>`;
        rightCol.appendChild(rightHeader);

        rightItems.forEach(item => {
            rightCol.appendChild(createAlphabetRow(item, true, isMixed, traceMode));
        });

        container.appendChild(leftCol);
        container.appendChild(divider);
        container.appendChild(rightCol);

    } else {
        // Traditional 1-column layout for partial sets (13 letters per page)
        container.className = 'alphabet-section';
        let lettersToUse = [];
        let isMixed = false;

        if (subType === 'upper_am') {
            lettersToUse = ALPHABET_UPPER_AM.map(c => ({ display: c, trace: c, ref: c }));
        } else if (subType === 'upper_nz') {
            lettersToUse = ALPHABET_UPPER_NZ.map(c => ({ display: c, trace: c, ref: c }));
        } else if (subType === 'lower_am') {
            lettersToUse = ALPHABET_LOWER_AM.map(c => ({ display: c, trace: c, ref: c }));
        } else if (subType === 'lower_nz') {
            lettersToUse = ALPHABET_LOWER_NZ.map(c => ({ display: c, trace: c, ref: c }));
        } else if (subType === 'mixed_am') {
            lettersToUse = ALPHABET_MIXED_AM;
            isMixed = true;
        } else if (subType === 'mixed_nz') {
            lettersToUse = ALPHABET_MIXED_NZ;
            isMixed = true;
        } else {
            lettersToUse = ALPHABET_UPPER_AM.map(c => ({ display: c, trace: c, ref: c }));
        }

        lettersToUse.forEach(item => {
            container.appendChild(createAlphabetRow(item, false, isMixed, traceMode));
        });
    }

    return container;
}
