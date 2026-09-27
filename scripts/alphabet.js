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

function createAlphabetSection(subType) {
    const container = document.createElement('div');
    container.className = 'alphabet-section';

    let lettersToUse = [];

    // Map subType to letter range
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
    } else if (subType === 'mixed_nz') {
        lettersToUse = ALPHABET_MIXED_NZ;
    } else {
        lettersToUse = ALPHABET_UPPER_AM.map(c => ({ display: c, trace: c, ref: c })); // Fallback
    }

    // Render all 13 letters in order on a single page
    const selectedLetters = lettersToUse;

    selectedLetters.forEach(item => {
        const row = document.createElement('div');
        row.className = 'alphabet-row';

        // 1. Info block (bold, highlights the letter)
        const infoCell = document.createElement('div');
        infoCell.className = 'alphabet-char-cell info-box';
        infoCell.innerHTML = `<span>${item.display}</span>`;
        row.appendChild(infoCell);

        // 2. Three Tracing cells (light grey guidelines with tracing character)
        for (let i = 0; i < 3; i++) {
            const traceCell = document.createElement('div');
            traceCell.className = 'alphabet-char-cell';
            traceCell.innerHTML = `<span>${item.trace}</span>`;
            row.appendChild(traceCell);
        }

        // 3. Three Practice cells (empty notebooks lines)
        for (let i = 0; i < 3; i++) {
            const practiceCell = document.createElement('div');
            practiceCell.className = 'alphabet-char-cell practice-box';
            practiceCell.innerHTML = `<span>${item.trace}</span>`;
            row.appendChild(practiceCell);
        }

        // 4. One Reference/Finish cell at the end
        const refCell = document.createElement('div');
        refCell.className = 'alphabet-char-cell ref-box';
        refCell.innerHTML = `<span>${item.ref}</span>`;
        row.appendChild(refCell);

        container.appendChild(row);
    });

    return container;
}
