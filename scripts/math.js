/**
 * Math Worksheet Generator
 */
function createMathSection(op, lv) {
    const container = document.createElement('div');
    container.className = 'math-grid';
    
    const opSymbols = { add: '+', sub: '-', mul: '×', div: '÷' };
    
    for (let i = 0; i < 9; i++) {
        let num1, num2, currentOp = op;
        
        if (op === 'mixed') {
            const ops = ['add', 'sub', 'mul', 'div'];
            currentOp = ops[Math.floor(Math.random() * ops.length)];
        }
        
        const item = document.createElement('div');
        item.className = 'math-item';

        if (op === 'fraction') {
            const denom = Math.floor(Math.random() * 7) + 2;
            const n1 = Math.floor(Math.random() * (denom - 1)) + 1;
            const n2 = Math.floor(Math.random() * (denom - n1)) + 1; // Ensure sum < 1 for simplicity
            
            item.innerHTML = `
                <div style="display:flex; align-items:center; justify-content: flex-end; gap: 10px; font-size: 1.8rem;">
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div style="border-bottom: 2px solid #333; padding: 0 5px;">${n1}</div>
                        <div>${denom}</div>
                    </div>
                    <span>+</span>
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div style="border-bottom: 2px solid #333; padding: 0 5px;">${n2}</div>
                        <div>${denom}</div>
                    </div>
                    <span>=</span>
                </div>
                <div class="math-answer-space" style="height: 40px;"></div>
            `;
        } else if (currentOp === 'add' || currentOp === 'sub') {
            if (lv === 1) {
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
            } else if (lv === 2) {
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 90) + 10;
            } else {
                num1 = Math.floor(Math.random() * 900) + 100;
                num2 = Math.floor(Math.random() * 900) + 100;
            }
            if (currentOp === 'sub' && num1 < num2) [num1, num2] = [num2, num1];
            
            item.innerHTML = `
                <div>${num1}</div>
                <div><span class="op">${opSymbols[currentOp]}</span>${num2}</div>
                <div class="math-line"></div>
                <div class="math-answer-space"></div>
            `;
        } else if (currentOp === 'mul') {
            if (lv === 1) {
                num1 = Math.floor(Math.random() * 8) + 2;
                num2 = Math.floor(Math.random() * 8) + 2;
            } else if (lv === 2) {
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 8) + 2;
            } else {
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 90) + 10;
            }
            
            item.innerHTML = `
                <div>${num1}</div>
                <div><span class="op">${opSymbols[currentOp]}</span>${num2}</div>
                <div class="math-line"></div>
                <div class="math-answer-space"></div>
            `;
        } else if (currentOp === 'div') {
            if (lv === 1) {
                num2 = Math.floor(Math.random() * 8) + 2;
                num1 = num2 * (Math.floor(Math.random() * 8) + 2);
            } else if (lv === 2) {
                num2 = Math.floor(Math.random() * 8) + 2;
                num1 = Math.floor(Math.random() * 90) + 10;
            } else {
                num2 = Math.floor(Math.random() * 90) + 10;
                num1 = Math.floor(Math.random() * 900) + 100;
            }
            
            if (lv > 1) {
                item.innerHTML = `
                    <div style="font-size: 1.8rem; margin-top: 20px; text-align: left; width: 100%;">
                        ${num1} ÷ ${num2} = 
                    </div>
                    <div class="math-answer-space"></div>
                `;
            } else {
                item.innerHTML = `
                    <div>${num1}</div>
                    <div><span class="op">${opSymbols[currentOp]}</span>${num2}</div>
                    <div class="math-line"></div>
                    <div class="math-answer-space"></div>
                `;
            }
        }
        
        container.appendChild(item);
    }
    return container;
}
