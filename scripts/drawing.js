/**
 * Advanced Drawing & Coloring Worksheet Generator
 * Provides 9 Comprehensive Creative Drawing & Coloring Modes:
 * 1. Theme Coloring (창의력 쑥쑥 색칠 공부 - 미니 가이드 및 선 굵기 조절)
 * 2. Color by Number (번호 맞춤 색칠)
 * 3. Math Color by Code (더하기·빼기 연산 색칠 - 신규!)
 * 4. Connect the Dots (점 이어 그리기)
 * 5. Symmetry Drawing (반쪽 대칭 그리기 - 신규!)
 * 6. Grid Copy Drawing (모눈종이 보고 똑같이 그리기 - 신규!)
 * 7. Step-by-Step Drawing (4단계 그리기 교실 - 신규!)
 * 8. Creative Storytelling Drawing (상상 스토리텔링 드로잉 - 신규!)
 * 9. Word-Association Coloring (낱말 쓰고 색칠하기)
 */

// Master Drawing Designs Database (25+ rich designs across Animals, Dinos, Vehicles, Desserts/Nature)
const DRAWING_DESIGNS = {
    // ==================== ANIMALS ====================
    cat: {
        title: "귀여운 고양이 (Cat)",
        wordKo: "고양이",
        wordEn: "CAT",
        category: "animals",
        prompt: "고양이 주변에 맛있는 생선과 재미있는 털실 방울을 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#fed7aa" : "none";
            const earFill = isColored ? "#f472b6" : "none";
            const noseFill = isColored ? "#fb7185" : "#1e293b";
            let overlay = "";
            if (mode === "number") {
                overlay = `
                    <text x="200" y="140" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                    <text x="200" y="270" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                    <text x="145" y="65" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>
                    <text x="255" y="65" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>
                    <text x="270" y="260" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">4</text>
                `;
            } else if (mode === "math") {
                overlay = `
                    <text x="200" y="135" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                    <text x="200" y="270" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                    <text x="145" y="65" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>
                    <text x="255" y="65" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>
                    <text x="270" y="260" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">5-1</text>
                `;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#eff6ff' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Head & Ears -->
                    <path d="M 140,110 L 115,40 L 175,85" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}" stroke-linejoin="round"/>
                    <path d="M 260,110 L 285,40 L 225,85" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}" stroke-linejoin="round"/>
                    <path d="M 130,160 C 130,90 270,90 270,160 C 270,210 130,210 130,160 Z" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <!-- Inner ears -->
                    <path d="M 143,100 L 127,55 L 165,84" stroke="#e11d48" stroke-width="2" fill="${earFill}"/>
                    <path d="M 257,100 L 273,55 L 235,84" stroke="#e11d48" stroke-width="2" fill="${earFill}"/>
                    <!-- Face Details -->
                    <circle cx="175" cy="145" r="8" fill="#1e293b"/>
                    <circle cx="225" cy="145" r="8" fill="#1e293b"/>
                    <circle cx="178" cy="142" r="2.5" fill="#ffffff"/>
                    <circle cx="228" cy="142" r="2.5" fill="#ffffff"/>
                    <polygon points="195,160 205,160 200,165" fill="${noseFill}"/>
                    <path d="M 200,165 Q 195,173 188,170" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <path d="M 200,165 Q 205,173 212,170" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Whiskers -->
                    <path d="M 125,165 L 90,160 M 125,173 L 95,175 M 125,181 L 92,190" stroke="#475569" stroke-width="2"/>
                    <path d="M 275,165 L 310,160 M 275,173 L 305,175 M 275,181 L 308,190" stroke="#475569" stroke-width="2"/>
                    <!-- Body & Paws -->
                    <path d="M 155,200 C 130,260 140,320 155,340 L 245,340 C 260,320 270,260 245,200" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <path d="M 180,340 C 180,310 195,300 195,340" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <path d="M 220,340 C 220,310 205,300 205,340" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Tail -->
                    <path d="M 245,310 C 290,320 320,280 300,230 C 290,210 275,220 285,240 C 295,260 275,290 240,295" stroke="#1e293b" stroke-width="${sw}" fill="${isColored ? '#f97316' : 'none'}"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 140, y: 110 }, { x: 115, y: 40 }, { x: 175, y: 85 },
            { x: 225, y: 85 }, { x: 285, y: 40 }, { x: 260, y: 110 },
            { x: 270, y: 160 }, { x: 255, y: 195 }, { x: 245, y: 200 },
            { x: 260, y: 260 }, { x: 245, y: 340 }, { x: 220, y: 340 },
            { x: 205, y: 300 }, { x: 195, y: 300 }, { x: 180, y: 340 },
            { x: 155, y: 340 }, { x: 140, y: 260 }, { x: 155, y: 200 },
            { x: 145, y: 195 }, { x: 130, y: 160 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="100" rx="60" ry="48" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="110" rx="55" ry="44" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 60,80 L 45,35 L 85,65" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 140,80 L 155,35 L 115,65" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="110" rx="55" ry="44" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 60,80 L 45,35 L 85,65 M 140,80 L 155,35 L 115,65" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="80" cy="105" r="5" fill="#1e293b"/><circle cx="120" cy="105" r="5" fill="#1e293b"/><polygon points="96,115 104,115 100,120" fill="#1e293b"/><path d="M 100,120 Q 95,126 90,123 M 100,120 Q 105,126 110,123" stroke="#1e293b" stroke-width="2" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="100" cy="110" rx="55" ry="44" stroke="#1e293b" stroke-width="3" fill="#fed7aa"/><path d="M 60,80 L 45,35 L 85,65 M 140,80 L 155,35 L 115,65" stroke="#1e293b" stroke-width="3" fill="#fed7aa"/><circle cx="80" cy="105" r="5" fill="#1e293b"/><circle cx="120" cy="105" r="5" fill="#1e293b"/><polygon points="96,115 104,115 100,120" fill="#fb7185"/><path d="M 60,115 L 35,110 M 60,122 L 40,124 M 140,115 L 165,110 M 140,122 L 160,124" stroke="#475569" stroke-width="2"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <!-- Left Half (Model) -->
                <path d="M 200,85 C 130,85 130,160 130,160 C 130,210 200,210 200,210" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 140,110 L 115,40 L 175,85" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 143,100 L 127,55 L 165,84" stroke="#64748b" stroke-width="2" fill="none"/>
                <circle cx="170" cy="145" r="7" fill="#1e293b"/>
                <circle cx="173" cy="142" r="2" fill="#fff"/>
                <path d="M 200,165 Q 195,173 188,170" stroke="#1e293b" stroke-width="2" fill="none"/>
                <path d="M 125,165 L 90,160 M 125,173 L 95,175" stroke="#475569" stroke-width="2"/>
                <path d="M 155,200 C 130,260 140,320 155,340 L 200,340" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 180,340 C 180,310 195,300 195,340" stroke="#1e293b" stroke-width="2" fill="none"/>
            </svg>
        `
    },

    dog: {
        title: "귀여운 강아지 (Dog)",
        wordKo: "강아지",
        wordEn: "DOG",
        category: "animals",
        prompt: "강아지에게 줄 맛있는 뼈다귀와 예쁜 집을 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#fde047" : "none";
            const earFill = isColored ? "#ca8a04" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="150" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="200" y="270" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="110" y="140" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>
                           <text x="290" y="140" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="150" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="200" y="270" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">2+0</text>
                           <text x="110" y="140" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">1+2</text>
                           <text x="290" y="140" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">4-1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#fefce8' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Droopy Ears -->
                    <path d="M 140,110 C 90,110 80,190 110,210 C 130,220 150,180 145,130" stroke="#1e293b" stroke-width="${sw}" fill="${earFill}"/>
                    <path d="M 260,110 C 310,110 320,190 290,210 C 270,220 250,180 255,130" stroke="#1e293b" stroke-width="${sw}" fill="${earFill}"/>
                    <!-- Head -->
                    <circle cx="200" cy="150" r="65" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <!-- Eyes -->
                    <circle cx="175" cy="140" r="7" fill="#1e293b"/><circle cx="225" cy="140" r="7" fill="#1e293b"/>
                    <circle cx="178" cy="137" r="2.5" fill="#fff"/><circle cx="228" cy="137" r="2.5" fill="#fff"/>
                    <!-- Snout & Nose -->
                    <ellipse cx="200" cy="165" rx="22" ry="16" stroke="#1e293b" stroke-width="2" fill="${isColored ? '#fff' : 'none'}"/>
                    <ellipse cx="200" cy="160" rx="10" ry="7" fill="#1e293b"/>
                    <path d="M 200,167 L 200,174 Q 192,180 185,175 M 200,174 Q 208,180 215,175" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Tongue -->
                    <path d="M 195,176 C 195,190 205,190 205,176" stroke="#1e293b" stroke-width="2" fill="${isColored ? '#f43f5e' : 'none'}"/>
                    <!-- Body & Tail -->
                    <path d="M 160,210 C 140,260 145,330 160,340 L 240,340 C 255,330 260,260 240,210" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <path d="M 245,290 C 285,280 295,240 280,230" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                    <!-- Paws -->
                    <ellipse cx="175" cy="340" rx="16" ry="10" stroke="#1e293b" stroke-width="2.5" fill="${bodyFill}"/>
                    <ellipse cx="225" cy="340" rx="16" ry="10" stroke="#1e293b" stroke-width="2.5" fill="${bodyFill}"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 200, y: 85 }, { x: 245, y: 105 }, { x: 310, y: 150 },
            { x: 290, y: 210 }, { x: 255, y: 190 }, { x: 240, y: 230 },
            { x: 285, y: 240 }, { x: 250, y: 300 }, { x: 240, y: 340 },
            { x: 200, y: 340 }, { x: 160, y: 340 }, { x: 150, y: 300 },
            { x: 145, y: 190 }, { x: 110, y: 210 }, { x: 90, y: 150 },
            { x: 155, y: 105 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="45" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="45" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 60,85 C 35,90 30,135 50,145 C 60,150 70,125 65,95 M 140,85 C 165,90 170,135 150,145 C 140,150 130,125 135,95" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="45" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="85" cy="95" r="5" fill="#1e293b"/><circle cx="115" cy="95" r="5" fill="#1e293b"/><ellipse cx="100" cy="112" rx="14" ry="10" stroke="#1e293b" stroke-width="2" fill="none"/><ellipse cx="100" cy="108" rx="6" ry="4" fill="#1e293b"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="45" stroke="#1e293b" stroke-width="3" fill="#fde047"/><path d="M 60,85 C 35,90 30,135 50,145 C 60,150 70,125 65,95 M 140,85 C 165,90 170,135 150,145 C 140,150 130,125 135,95" stroke="#1e293b" stroke-width="3" fill="#ca8a04"/><circle cx="85" cy="95" r="5" fill="#1e293b"/><circle cx="115" cy="95" r="5" fill="#1e293b"/><ellipse cx="100" cy="108" rx="6" ry="4" fill="#1e293b"/><path d="M 97,118 C 97,126 103,126 103,118" stroke="#1e293b" stroke-width="1.5" fill="#f43f5e"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,85 C 160,85 135,115 135,150 C 135,185 160,215 200,215" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 140,110 C 90,110 80,190 110,210 C 130,220 150,180 145,130" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="175" cy="140" r="7" fill="#1e293b"/>
                <ellipse cx="200" cy="165" rx="22" ry="16" stroke="#1e293b" stroke-width="2" fill="none"/>
                <path d="M 160,210 C 140,260 145,330 160,340 L 200,340" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <ellipse cx="175" cy="340" rx="16" ry="10" stroke="#1e293b" stroke-width="2" fill="none"/>
            </svg>
        `
    },

    lion: {
        title: "멋진 사자 (Lion)",
        wordKo: "사자",
        wordEn: "LION",
        category: "animals",
        prompt: "사자의 얼굴 주변에 바람에 날리는 풍성한 갈기 머리를 멋지게 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const maneFill = isColored ? "#b45309" : "none";
            const faceFill = isColored ? "#fde047" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="100" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="200" y="195" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="200" y="315" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="100" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="200" y="195" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="200" y="315" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#fffbeb' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Mane (Big outer scallop circle) -->
                    <circle cx="200" cy="180" r="110" stroke="#1e293b" stroke-width="${sw}" fill="${maneFill}" stroke-dasharray="20 5"/>
                    <!-- Face -->
                    <circle cx="200" cy="180" r="70" stroke="#1e293b" stroke-width="${sw}" fill="${faceFill}"/>
                    <!-- Ears -->
                    <circle cx="140" cy="120" r="18" stroke="#1e293b" stroke-width="${sw}" fill="${faceFill}"/>
                    <circle cx="260" cy="120" r="18" stroke="#1e293b" stroke-width="${sw}" fill="${faceFill}"/>
                    <!-- Eyes -->
                    <circle cx="175" cy="165" r="7" fill="#1e293b"/><circle cx="225" cy="165" r="7" fill="#1e293b"/>
                    <!-- Nose & Whiskers -->
                    <polygon points="190,185 210,185 200,195" fill="#1e293b"/>
                    <path d="M 200,195 L 200,205 Q 190,212 180,208 M 200,205 Q 210,212 220,208" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Body -->
                    <path d="M 160,280 C 145,320 150,350 160,360 L 240,360 C 250,350 255,320 240,280" stroke="#1e293b" stroke-width="${sw}" fill="${faceFill}"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 200, y: 70 }, { x: 260, y: 90 }, { x: 300, y: 140 },
            { x: 310, y: 200 }, { x: 285, y: 260 }, { x: 240, y: 285 },
            { x: 240, y: 360 }, { x: 200, y: 360 }, { x: 160, y: 360 },
            { x: 160, y: 285 }, { x: 115, y: 260 }, { x: 90, y: 200 },
            { x: 100, y: 140 }, { x: 140, y: 90 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="40" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="40" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="100" r="62" stroke="#1e293b" stroke-width="3" fill="none" stroke-dasharray="10 4"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="62" stroke="#1e293b" stroke-width="3" fill="none" stroke-dasharray="10 4"/><circle cx="100" cy="100" r="40" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="85" cy="95" r="4" fill="#1e293b"/><circle cx="115" cy="95" r="4" fill="#1e293b"/><polygon points="95,108 105,108 100,114" fill="#1e293b"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="100" r="62" stroke="#1e293b" stroke-width="3" fill="#b45309" stroke-dasharray="10 4"/><circle cx="100" cy="100" r="40" stroke="#1e293b" stroke-width="3" fill="#fde047"/><circle cx="85" cy="95" r="4" fill="#1e293b"/><circle cx="115" cy="95" r="4" fill="#1e293b"/><polygon points="95,108 105,108 100,114" fill="#1e293b"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,70 C 130,70 90,120 90,180 C 90,240 130,290 200,290" stroke="#1e293b" stroke-width="${sw}" fill="none" stroke-dasharray="15 5"/>
                <path d="M 200,110 C 160,110 130,140 130,180 C 130,220 160,250 200,250" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="140" cy="120" r="18" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="175" cy="165" r="7" fill="#1e293b"/>
                <path d="M 200,195 L 200,205 Q 190,212 180,208" stroke="#1e293b" stroke-width="2" fill="none"/>
                <path d="M 160,280 C 145,320 150,350 160,360 L 200,360" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
            </svg>
        `
    },

    rabbit: {
        title: "깡충깡충 토끼 (Rabbit)",
        wordKo: "토끼",
        wordEn: "RABBIT",
        category: "animals",
        prompt: "토끼가 좋아하는 주황색 당근과 알록달록 꽃밭을 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#ffffff" : "none";
            const earFill = isColored ? "#fbcfe8" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="180" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="160" y="70" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="240" y="70" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="200" y="290" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="180" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="160" y="70" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="240" y="70" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="200" y="290" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#fdf2f8' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Long Ears -->
                    <ellipse cx="160" cy="80" rx="20" ry="60" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <ellipse cx="240" cy="80" rx="20" ry="60" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <ellipse cx="160" cy="80" rx="10" ry="45" stroke="#f472b6" stroke-width="2" fill="${earFill}"/>
                    <ellipse cx="240" cy="80" rx="10" ry="45" stroke="#f472b6" stroke-width="2" fill="${earFill}"/>
                    <!-- Head -->
                    <circle cx="200" cy="180" r="60" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <!-- Face -->
                    <circle cx="175" cy="170" r="6" fill="#1e293b"/><circle cx="225" cy="170" r="6" fill="#1e293b"/>
                    <ellipse cx="200" cy="190" rx="7" ry="5" fill="#f43f5e"/>
                    <path d="M 200,195 Q 192,203 185,198 M 200,195 Q 208,203 215,198" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Cheeks -->
                    <circle cx="160" cy="185" r="9" fill="${isColored ? '#fbcfe8' : 'none'}" stroke="#fbcfe8" stroke-width="1.5"/>
                    <circle cx="240" cy="185" r="9" fill="${isColored ? '#fbcfe8' : 'none'}" stroke="#fbcfe8" stroke-width="1.5"/>
                    <!-- Body -->
                    <path d="M 160,230 C 130,270 140,330 160,340 L 240,340 C 260,330 270,270 240,230" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <ellipse cx="160" cy="340" rx="20" ry="12" stroke="#1e293b" stroke-width="2" fill="${bodyFill}"/>
                    <ellipse cx="240" cy="340" rx="20" ry="12" stroke="#1e293b" stroke-width="2" fill="${bodyFill}"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 160, y: 20 }, { x: 180, y: 70 }, { x: 200, y: 120 },
            { x: 220, y: 70 }, { x: 240, y: 20 }, { x: 260, y: 80 },
            { x: 260, y: 180 }, { x: 260, y: 270 }, { x: 240, y: 340 },
            { x: 200, y: 340 }, { x: 160, y: 340 }, { x: 140, y: 270 },
            { x: 140, y: 180 }, { x: 140, y: 80 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="110" r="40" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="115" r="40" stroke="#1e293b" stroke-width="3" fill="none"/><ellipse cx="80" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="none"/><ellipse cx="120" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="80" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="none"/><ellipse cx="120" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="115" r="40" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="85" cy="110" r="4" fill="#1e293b"/><circle cx="115" cy="110" r="4" fill="#1e293b"/><ellipse cx="100" cy="120" rx="5" ry="3" fill="#f43f5e"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><ellipse cx="80" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="#fff"/><ellipse cx="120" cy="50" rx="14" ry="40" stroke="#1e293b" stroke-width="3" fill="#fff"/><ellipse cx="80" cy="50" rx="7" ry="28" fill="#fbcfe8"/><ellipse cx="120" cy="50" rx="7" ry="28" fill="#fbcfe8"/><circle cx="100" cy="115" r="40" stroke="#1e293b" stroke-width="3" fill="#fff"/><circle cx="85" cy="110" r="4" fill="#1e293b"/><circle cx="115" cy="110" r="4" fill="#1e293b"/><circle cx="75" cy="122" r="6" fill="#fbcfe8"/><circle cx="125" cy="122" r="6" fill="#fbcfe8"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <ellipse cx="160" cy="80" rx="20" ry="60" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <ellipse cx="160" cy="80" rx="10" ry="45" stroke="#f472b6" stroke-width="2" fill="none"/>
                <path d="M 200,120 C 160,120 140,150 140,180 C 140,210 160,240 200,240" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="175" cy="170" r="6" fill="#1e293b"/>
                <circle cx="160" cy="185" r="9" stroke="#fbcfe8" stroke-width="1.5" fill="none"/>
                <path d="M 160,230 C 130,270 140,330 160,340 L 200,340" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <ellipse cx="160" cy="340" rx="20" ry="12" stroke="#1e293b" stroke-width="2" fill="none"/>
            </svg>
        `
    },

    // ==================== DINOSAURS ====================
    dino: {
        title: "아기 공룡 (Dinosaur)",
        wordKo: "공룡",
        wordEn: "DINO",
        category: "dinos",
        prompt: "아기 공룡이 사는 쥐라기 화산과 커다란 야자나무를 함께 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#86efac" : "none";
            const spikeFill = isColored ? "#f59e0b" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="210" y="160" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="140" y="240" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="135" y="90" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="210" y="160" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="140" y="240" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="135" y="90" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#f0fdf4' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Main Body & Head -->
                    <path d="M 180,100 C 270,100 290,130 280,180 C 275,205 240,215 240,240 C 240,270 280,290 330,290 C 350,290 320,340 270,340 C 220,340 180,330 160,300 C 145,280 135,220 135,180 C 135,130 150,100 180,100 Z" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}" stroke-linejoin="round"/>
                    <!-- Spikes -->
                    <path d="M 160,115 L 140,110 L 150,135" stroke="#1e293b" stroke-width="2.5" fill="${spikeFill}"/>
                    <path d="M 145,145 L 122,145 L 138,170" stroke="#1e293b" stroke-width="2.5" fill="${spikeFill}"/>
                    <path d="M 135,185 L 110,195 L 135,210" stroke="#1e293b" stroke-width="2.5" fill="${spikeFill}"/>
                    <path d="M 138,230 L 115,245 L 143,260" stroke="#1e293b" stroke-width="2.5" fill="${spikeFill}"/>
                    <!-- Eye & Smile -->
                    <circle cx="230" cy="140" r="7" fill="#1e293b"/><circle cx="232" cy="138" r="2.5" fill="#fff"/>
                    <path d="M 255,165 Q 245,175 235,168" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Legs & Arm -->
                    <path d="M 180,335 L 180,360 L 205,360 M 230,338 L 230,360 L 255,360" stroke="#1e293b" stroke-width="3" fill="none"/>
                    <path d="M 245,215 Q 265,220 260,228 Q 255,232 245,225" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 180, y: 100 }, { x: 230, y: 100 }, { x: 270, y: 110 },
            { x: 285, y: 140 }, { x: 280, y: 180 }, { x: 255, y: 205 },
            { x: 240, y: 225 }, { x: 240, y: 250 }, { x: 275, y: 280 },
            { x: 330, y: 290 }, { x: 300, y: 320 }, { x: 270, y: 340 },
            { x: 230, y: 340 }, { x: 195, y: 335 }, { x: 160, y: 300 },
            { x: 145, y: 260 }, { x: 135, y: 210 }, { x: 135, y: 160 }, { x: 148, y: 120 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><circle cx="100" cy="80" r="30" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 100,60 C 130,60 140,80 135,110 C 130,125 110,130 110,145 C 110,160 130,170 160,170 C 150,185 130,185 100,185 C 70,185 60,150 60,110 Z" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 100,60 C 130,60 140,80 135,110 C 130,125 110,130 110,145 C 110,160 130,170 160,170 C 150,185 130,185 100,185 C 70,185 60,150 60,110 Z" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="120" cy="85" r="4" fill="#1e293b"/><path d="M 70,80 L 58,75 L 65,90 M 60,105 L 50,108 L 60,120" stroke="#1e293b" stroke-width="2" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%" height="100%"><path d="M 100,60 C 130,60 140,80 135,110 C 130,125 110,130 110,145 C 110,160 130,170 160,170 C 150,185 130,185 100,185 C 70,185 60,150 60,110 Z" stroke="#1e293b" stroke-width="3" fill="#86efac"/><circle cx="120" cy="85" r="4" fill="#1e293b"/><path d="M 70,80 L 58,75 L 65,90 M 60,105 L 50,108 L 60,120" stroke="#1e293b" stroke-width="2" fill="#f59e0b"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,100 C 150,100 135,130 135,180 C 135,220 145,280 160,300 C 180,330 200,340 200,340" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 160,115 L 140,110 L 150,135 M 145,145 L 122,145 L 138,170 M 135,185 L 110,195 L 135,210" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                <path d="M 180,335 L 180,360 L 200,360" stroke="#1e293b" stroke-width="3" fill="none"/>
            </svg>
        `
    },

    // ==================== VEHICLES ====================
    rocket: {
        title: "우주 로켓 (Rocket)",
        wordKo: "로켓",
        wordEn: "ROCKET",
        category: "vehicles",
        prompt: "우주 로켓 주위에 반짝이는 별들과 아름다운 행성들을 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#ffffff" : "none";
            const noseFill = isColored ? "#ef4444" : "none";
            const finFill = isColored ? "#3b82f6" : "none";
            const flameFill = isColored ? "#f97316" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="90" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="200" y="220" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="135" y="275" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>
                           <text x="265" y="275" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>
                           <text x="200" y="325" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">4</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="90" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="200" y="220" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="135" y="275" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>
                           <text x="265" y="275" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>
                           <text x="200" y="325" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">5-1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#0f172a' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Fins -->
                    <path d="M 160,220 L 120,290 Q 140,290 160,270 Z" stroke="#1e293b" stroke-width="${sw}" fill="${finFill}"/>
                    <path d="M 240,220 L 280,290 Q 260,290 240,270 Z" stroke="#1e293b" stroke-width="${sw}" fill="${finFill}"/>
                    <!-- Body & Nose Cone -->
                    <path d="M 160,140 Q 200,30 240,140 Z" stroke="#1e293b" stroke-width="${sw}" fill="${noseFill}"/>
                    <path d="M 160,140 L 160,270 L 240,270 L 240,140 Z" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <!-- Window -->
                    <circle cx="200" cy="185" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${isColored ? '#38bdf8' : 'none'}"/>
                    <circle cx="200" cy="185" r="16" stroke="#475569" stroke-width="1.5" fill="none"/>
                    <!-- Flames -->
                    <path d="M 175,270 C 175,320 200,360 200,360 C 200,360 225,320 225,270 Z" stroke="#1e293b" stroke-width="${sw}" fill="${flameFill}"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 200, y: 30 }, { x: 220, y: 85 }, { x: 240, y: 140 },
            { x: 240, y: 220 }, { x: 280, y: 290 }, { x: 260, y: 290 },
            { x: 240, y: 270 }, { x: 225, y: 270 }, { x: 200, y: 360 },
            { x: 175, y: 270 }, { x: 160, y: 270 }, { x: 140, y: 290 },
            { x: 120, y: 290 }, { x: 160, y: 220 }, { x: 160, y: 140 }, { x: 180, y: 85 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%"><rect x="80" y="80" width="40" height="70" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="80" y="80" width="40" height="70" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 80,80 Q 100,25 120,80 Z" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="80" y="80" width="40" height="70" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 80,80 Q 100,25 120,80 Z" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 80,120 L 55,160 Q 68,160 80,150 M 120,120 L 145,160 Q 132,160 120,150" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="80" y="80" width="40" height="70" stroke="#1e293b" stroke-width="3" fill="#fff"/><path d="M 80,80 Q 100,25 120,80 Z" stroke="#1e293b" stroke-width="3" fill="#ef4444"/><circle cx="100" cy="105" r="10" stroke="#1e293b" stroke-width="2" fill="#38bdf8"/><path d="M 88,150 C 88,180 100,195 100,195 C 100,195 112,180 112,150 Z" fill="#f97316"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,30 Q 160,85 160,140 L 160,270 L 200,270" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 160,220 L 120,290 Q 140,290 160,270" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 200,163 A 22,22 0 0,0 200,207" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 175,270 C 175,320 200,360 200,360" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
            </svg>
        `
    },

    car: {
        title: "부릉부릉 자동차 (Car)",
        wordKo: "자동차",
        wordEn: "CAR",
        category: "vehicles",
        prompt: "자동차가 신나게 달릴 수 있는 도로와 신호등, 푸른 나무를 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const bodyFill = isColored ? "#3b82f6" : "none";
            const tireFill = isColored ? "#334155" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="210" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="140" y="295" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="260" y="295" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="200" y="160" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="210" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="140" y="295" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="260" y="295" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="200" y="160" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#eff6ff' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Car Body Roof -->
                    <path d="M 120,200 L 150,130 L 250,130 L 280,200 Z" stroke="#1e293b" stroke-width="${sw}" fill="${isColored ? '#bae6fd' : 'none'}"/>
                    <!-- Windows Divider -->
                    <path d="M 200,130 L 200,200" stroke="#1e293b" stroke-width="2"/>
                    <!-- Main Body -->
                    <path d="M 70,230 L 110,230 C 115,200 165,200 170,230 L 230,230 C 235,200 285,200 290,230 L 330,230 C 340,230 345,240 345,250 L 340,280 L 60,280 L 55,250 C 55,240 60,230 70,230 Z" stroke="#1e293b" stroke-width="${sw}" fill="${bodyFill}"/>
                    <!-- Headlights -->
                    <circle cx="65" cy="245" r="7" stroke="#1e293b" stroke-width="2" fill="${isColored ? '#fef08a' : 'none'}"/>
                    <circle cx="335" cy="245" r="7" stroke="#1e293b" stroke-width="2" fill="${isColored ? '#f87171' : 'none'}"/>
                    <!-- Wheels -->
                    <circle cx="140" cy="280" r="28" stroke="#1e293b" stroke-width="${sw}" fill="${tireFill}"/>
                    <circle cx="140" cy="280" r="12" stroke="#cbd5e1" stroke-width="2" fill="#fff"/>
                    <circle cx="260" cy="280" r="28" stroke="#1e293b" stroke-width="${sw}" fill="${tireFill}"/>
                    <circle cx="260" cy="280" r="12" stroke="#cbd5e1" stroke-width="2" fill="#fff"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 150, y: 130 }, { x: 250, y: 130 }, { x: 280, y: 200 },
            { x: 330, y: 230 }, { x: 345, y: 250 }, { x: 340, y: 280 },
            { x: 290, y: 280 }, { x: 230, y: 280 }, { x: 170, y: 280 },
            { x: 110, y: 280 }, { x: 60, y: 280 }, { x: 55, y: 250 },
            { x: 70, y: 230 }, { x: 120, y: 200 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%"><rect x="40" y="110" width="120" height="35" rx="6" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="40" y="110" width="120" height="35" rx="6" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 65,110 L 80,75 L 125,75 L 140,110 Z" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="40" y="110" width="120" height="35" rx="6" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 65,110 L 80,75 L 125,75 L 140,110 Z" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="70" cy="145" r="14" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="130" cy="145" r="14" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><rect x="40" y="110" width="120" height="35" rx="6" stroke="#1e293b" stroke-width="3" fill="#3b82f6"/><path d="M 65,110 L 80,75 L 125,75 L 140,110 Z" stroke="#1e293b" stroke-width="3" fill="#bae6fd"/><circle cx="70" cy="145" r="14" stroke="#1e293b" stroke-width="3" fill="#334155"/><circle cx="130" cy="145" r="14" stroke="#1e293b" stroke-width="3" fill="#334155"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,130 L 150,130 L 120,200 L 70,230 C 60,230 55,240 55,250 L 60,280 L 110,280" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="140" cy="280" r="28" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="140" cy="280" r="12" stroke="#1e293b" stroke-width="2" fill="none"/>
                <path d="M 170,280 L 200,280" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
            </svg>
        `
    },

    // ==================== NATURE / DESSERT ====================
    flower: {
        title: "예쁜 해바라기 (Flower)",
        wordKo: "해바라기",
        wordEn: "FLOWER",
        category: "nature",
        prompt: "해바라기 주변에 꿀을 모으는 귀여운 꿀벌과 나비를 그려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const petalFill = isColored ? "#fbbf24" : "none";
            const centerFill = isColored ? "#78350f" : "none";
            const stemFill = isColored ? "#15803d" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="165" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="200" y="85" font-size="16" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="200" y="320" font-size="18" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="165" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="200" y="85" font-size="12" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="200" y="320" font-size="13" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#fefce8' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <path d="M 200,210 L 200,360" stroke="${isColored ? stemFill : '#1e293b'}" stroke-width="4" fill="none"/>
                    <path d="M 200,280 C 150,280 120,250 120,250 C 120,250 160,300 200,295" stroke="#1e293b" stroke-width="3" fill="${isColored ? '#4ade80' : 'none'}"/>
                    <path d="M 200,305 C 250,305 280,275 280,275 C 280,275 240,325 200,320" stroke="#1e293b" stroke-width="3" fill="${isColored ? '#4ade80' : 'none'}"/>
                    <!-- 10 Petals -->
                    <circle cx="200" cy="90" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="245" cy="105" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="270" cy="145" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="270" cy="195" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="245" cy="235" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="200" cy="250" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="155" cy="235" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="130" cy="195" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="130" cy="145" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <circle cx="155" cy="105" r="22" stroke="#1e293b" stroke-width="${sw}" fill="${petalFill}"/>
                    <!-- Center Core -->
                    <circle cx="200" cy="170" r="48" stroke="#1e293b" stroke-width="${sw}" fill="${centerFill}"/>
                    <circle cx="200" cy="170" r="38" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 200, y: 68 }, { x: 245, y: 83 }, { x: 292, y: 123 },
            { x: 292, y: 195 }, { x: 245, y: 257 }, { x: 200, y: 272 },
            { x: 155, y: 257 }, { x: 108, y: 195 }, { x: 108, y: 123 },
            { x: 155, y: 83 }, { x: 200, y: 360 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%"><circle cx="100" cy="90" r="26" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><circle cx="100" cy="90" r="26" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="50" r="14" stroke="#1e293b" stroke-width="2" fill="none"/><circle cx="135" cy="70" r="14" stroke="#1e293b" stroke-width="2" fill="none"/><circle cx="140" cy="105" r="14" stroke="#1e293b" stroke-width="2" fill="none"/><circle cx="65" cy="70" r="14" stroke="#1e293b" stroke-width="2" fill="none"/><circle cx="60" cy="105" r="14" stroke="#1e293b" stroke-width="2" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><circle cx="100" cy="90" r="26" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 100,116 L 100,185" stroke="#1e293b" stroke-width="3" fill="none"/><path d="M 100,145 Q 70,135 65,150 Q 85,160 100,152 M 100,155 Q 130,145 135,160 Q 115,170 100,162" stroke="#1e293b" stroke-width="2" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><circle cx="100" cy="50" r="14" fill="#fbbf24"/><circle cx="135" cy="70" r="14" fill="#fbbf24"/><circle cx="140" cy="105" r="14" fill="#fbbf24"/><circle cx="65" cy="70" r="14" fill="#fbbf24"/><circle cx="60" cy="105" r="14" fill="#fbbf24"/><circle cx="100" cy="90" r="26" stroke="#1e293b" stroke-width="3" fill="#78350f"/><path d="M 100,116 L 100,185" stroke="#15803d" stroke-width="4" fill="none"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,122 C 160,122 152,145 152,170 C 152,195 160,218 200,218" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="200" cy="90" r="22" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="155" cy="105" r="22" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="130" cy="145" r="22" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="130" cy="195" r="22" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <circle cx="155" cy="235" r="22" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 200,218 L 200,360" stroke="#1e293b" stroke-width="4" fill="none"/>
                <path d="M 200,280 C 150,280 120,250 120,250 C 120,250 160,300 200,295" stroke="#1e293b" stroke-width="3" fill="none"/>
            </svg>
        `
    },

    icecream: {
        title: "달콤 아이스크림 (Ice Cream)",
        wordKo: "아이스크림",
        wordEn: "ICE CREAM",
        category: "nature",
        prompt: "아이스크림 위에 초콜릿 시럽과 알록달록 무지개 스프링클을 듬뿍 뿌려주세요!",
        getSvg: (mode, sw = 3, isColored = false) => {
            const scoop1 = isColored ? "#fb7185" : "none";
            const scoop2 = isColored ? "#38bdf8" : "none";
            const coneFill = isColored ? "#f59e0b" : "none";
            let overlay = "";
            if (mode === "number") {
                overlay = `<text x="200" y="110" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">1</text>
                           <text x="200" y="180" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">2</text>
                           <text x="200" y="280" font-size="20" font-weight="900" fill="#94a3b8" text-anchor="middle">3</text>`;
            } else if (mode === "math") {
                overlay = `<text x="200" y="110" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+0</text>
                           <text x="200" y="180" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">1+1</text>
                           <text x="200" y="280" font-size="14" font-weight="900" fill="#64748b" text-anchor="middle">2+1</text>`;
            }
            return `
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <circle cx="200" cy="200" r="185" fill="${isColored ? '#fff1f2' : 'none'}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="6 6"/>
                    <!-- Cherry on top -->
                    <circle cx="200" cy="65" r="14" stroke="#1e293b" stroke-width="${sw}" fill="${isColored ? '#e11d48' : 'none'}"/>
                    <path d="M 200,51 Q 215,35 225,40" stroke="#1e293b" stroke-width="2.5" fill="none"/>
                    <!-- Top Scoop -->
                    <circle cx="200" cy="115" r="45" stroke="#1e293b" stroke-width="${sw}" fill="${scoop1}"/>
                    <!-- Bottom Scoop -->
                    <path d="M 140,190 C 140,140 260,140 260,190 C 260,205 140,205 140,190 Z" stroke="#1e293b" stroke-width="${sw}" fill="${scoop2}"/>
                    <!-- Cone -->
                    <polygon points="145,205 255,205 200,360" stroke="#1e293b" stroke-width="${sw}" fill="${coneFill}" stroke-linejoin="round"/>
                    <!-- Cone Cross Hatch -->
                    <line x1="165" y1="205" x2="215" y2="320" stroke="#78350f" stroke-width="1.5"/>
                    <line x1="185" y1="205" x2="230" y2="280" stroke="#78350f" stroke-width="1.5"/>
                    <line x1="235" y1="205" x2="185" y2="320" stroke="#78350f" stroke-width="1.5"/>
                    <line x1="215" y1="205" x2="170" y2="280" stroke="#78350f" stroke-width="1.5"/>
                    ${overlay}
                </svg>
            `;
        },
        dots: [
            { x: 200, y: 51 }, { x: 220, y: 75 }, { x: 245, y: 115 },
            { x: 260, y: 170 }, { x: 255, y: 205 }, { x: 200, y: 360 },
            { x: 145, y: 205 }, { x: 140, y: 170 }, { x: 155, y: 115 }, { x: 180, y: 75 }
        ],
        stepSvgs: [
            `<svg viewBox="0 0 200 200" width="100%"><polygon points="70,110 130,110 100,185" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><polygon points="70,110 130,110 100,185" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="95" r="28" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><polygon points="70,110 130,110 100,185" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="95" r="28" stroke="#1e293b" stroke-width="3" fill="none"/><circle cx="100" cy="55" r="24" stroke="#1e293b" stroke-width="3" fill="none"/></svg>`,
            `<svg viewBox="0 0 200 200" width="100%"><polygon points="70,110 130,110 100,185" stroke="#1e293b" stroke-width="3" fill="#f59e0b"/><circle cx="100" cy="95" r="28" stroke="#1e293b" stroke-width="3" fill="#38bdf8"/><circle cx="100" cy="55" r="24" stroke="#1e293b" stroke-width="3" fill="#fb7185"/><circle cx="100" cy="25" r="8" fill="#e11d48"/></svg>`
        ],
        symmetrySvg: (sw = 3) => `
            <svg viewBox="0 0 400 400" width="100%" height="100%">
                <path d="M 200,51 A 14,14 0 0,0 200,79" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 200,70 C 175,70 155,90 155,115 C 155,140 175,160 200,160" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <path d="M 200,150 C 160,150 140,170 140,195 C 140,205 170,205 200,205" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
                <polygon points="145,205 200,205 200,360" stroke="#1e293b" stroke-width="${sw}" fill="none"/>
            </svg>
        `
    }
};

/**
 * Main Switchboard for Drawing Worksheet
 */
function createDrawingSection(subType, designKey) {
    const design = DRAWING_DESIGNS[designKey] || DRAWING_DESIGNS.cat;
    const strokeWidth = parseInt(document.getElementById('drawing-stroke')?.value || '3', 10);
    const showGuide = (document.getElementById('drawing-guide')?.value || 'yes') === 'yes';

    switch (subType) {
        case 'color_number':
            return createColorByNumber(design, strokeWidth, showGuide);
        case 'color_math':
            return createMathColorByCode(design, strokeWidth, showGuide);
        case 'color_dots':
            return createConnectTheDots(design, strokeWidth);
        case 'draw_symmetry':
            return createSymmetryDrawing(design, strokeWidth);
        case 'draw_grid':
            return createGridCopyDrawing(design);
        case 'draw_step':
            return createStepByStepDrawing(design);
        case 'draw_creative':
            return createCreativeDrawing(design, strokeWidth);
        case 'color_word':
            return createWordColoring(design, strokeWidth, showGuide);
        case 'color_theme':
        default:
            return createThemeColoring(design, strokeWidth, showGuide);
    }
}

/**
 * Mode 1: Theme Coloring (창의력 쑥쑥 색칠 공부)
 */
function createThemeColoring(design, strokeWidth = 3, showGuide = true) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    // Header with optional Mini Guide
    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>🎨 예쁘게 색칠해 보아요!</h2>
            <p>외곽선을 따라 마음에 드는 색깔로 정성스럽게 칠해 보세요.</p>
        </div>
        ${showGuide ? `
            <div class="drawing-mini-guide" title="완성 예시 견본">
                <span class="guide-tag">완성 견본</span>
                <div class="guide-svg-box">${design.getSvg('theme', 2, true)}</div>
            </div>
        ` : ''}
    `;
    container.appendChild(header);

    // Canvas
    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box';
    canvasDiv.innerHTML = design.getSvg('theme', strokeWidth, false);
    container.appendChild(canvasDiv);

    // Color Palette suggestion
    const palette = document.createElement('div');
    palette.className = 'drawing-palette-bar';
    const colors = ['#ef4444', '#f97316', '#fbbf24', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#78350f'];
    let paletteHtml = `<span class="palette-label">추천 크레용 색상:</span><div class="palette-chips">`;
    colors.forEach(c => {
        paletteHtml += `<span class="color-chip" style="background-color: ${c};"></span>`;
    });
    paletteHtml += `</div>`;
    palette.innerHTML = paletteHtml;
    container.appendChild(palette);

    return container;
}

/**
 * Mode 2: Color by Number (번호 맞춤 색칠)
 */
function createColorByNumber(design, strokeWidth = 3, showGuide = true) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>🔢 번호대로 알록달록 색칠하기</h2>
            <p>각 구역에 적힌 번호와 아래 번호표의 색깔을 맞추어 색칠해 보세요!</p>
        </div>
        ${showGuide ? `
            <div class="drawing-mini-guide" title="완성 예시 견본">
                <span class="guide-tag">완성 견본</span>
                <div class="guide-svg-box">${design.getSvg('theme', 2, true)}</div>
            </div>
        ` : ''}
    `;
    container.appendChild(header);

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box';
    canvasDiv.innerHTML = design.getSvg('number', strokeWidth, false);
    container.appendChild(canvasDiv);

    // Number Legends
    const legend = document.createElement('div');
    legend.className = 'drawing-legend-bar';
    const colorLegends = [
        { num: 1, name: "빨강 (Red)", color: "#ef4444" },
        { num: 2, name: "노랑 (Yellow)", color: "#eab308" },
        { num: 3, name: "파랑 (Blue)", color: "#3b82f6" },
        { num: 4, name: "초록 (Green)", color: "#22c55e" }
    ];
    colorLegends.forEach(item => {
        legend.innerHTML += `
            <div class="legend-item">
                <span class="legend-badge" style="background-color: ${item.color};">${item.num}</span>
                <span class="legend-name">${item.name}</span>
            </div>
        `;
    });
    container.appendChild(legend);

    return container;
}

/**
 * Mode 3: Math Color by Code (더하기·빼기 연산 색칠 - 신규!)
 */
function createMathColorByCode(design, strokeWidth = 3, showGuide = true) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>🧮 셈하고 색칠하기 (연산 색칠 공부)</h2>
            <p>문제를 풀어 나온 정답 숫자의 색깔을 찾아 멋진 그림을 완성하세요!</p>
        </div>
        ${showGuide ? `
            <div class="drawing-mini-guide" title="완성 예시 견본">
                <span class="guide-tag">완성 견본</span>
                <div class="guide-svg-box">${design.getSvg('theme', 2, true)}</div>
            </div>
        ` : ''}
    `;
    container.appendChild(header);

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box';
    canvasDiv.innerHTML = design.getSvg('math', strokeWidth, false);
    container.appendChild(canvasDiv);

    // Math Legend: 정답 숫자와 색상
    const legend = document.createElement('div');
    legend.className = 'drawing-legend-bar math-legend';
    const mathLegends = [
        { ans: 1, text: "정답 1", name: "빨강", color: "#ef4444" },
        { ans: 2, text: "정답 2", name: "노랑", color: "#eab308" },
        { ans: 3, text: "정답 3", name: "파랑", color: "#3b82f6" },
        { ans: 4, text: "정답 4", name: "초록", color: "#22c55e" }
    ];
    mathLegends.forEach(item => {
        legend.innerHTML += `
            <div class="legend-item">
                <span class="legend-badge" style="background-color: ${item.color}; width: 34px;">${item.ans}</span>
                <span class="legend-name">${item.name}</span>
            </div>
        `;
    });
    container.appendChild(legend);

    return container;
}

/**
 * Mode 4: Connect the Dots (점 이어 그리기)
 */
function createConnectTheDots(design, strokeWidth = 3) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>✏️ 1부터 순서대로 점 잇기</h2>
            <p>1번 점부터 차례대로 선을 이어 완성된 그림을 예쁘게 색칠해 봐요!</p>
        </div>
    `;
    container.appendChild(header);

    let dotsSvg = `
        <svg viewBox="0 0 400 400" width="100%" height="100%">
            <g opacity="0.12">${design.getSvg('theme', 2)}</g>
    `;
    design.dots.forEach((dot, index) => {
        const num = index + 1;
        dotsSvg += `<circle cx="${dot.x}" cy="${dot.y}" r="4.5" fill="#0f172a" />`;
        let offsetX = (dot.x > 200) ? -16 : 12;
        let offsetY = (dot.y > 200) ? 12 : -6;
        dotsSvg += `
            <text x="${dot.x + offsetX}" y="${dot.y + offsetY}" font-size="12" font-weight="900" fill="#2563eb" text-anchor="middle">
                ${num}
            </text>
        `;
    });
    dotsSvg += `</svg>`;

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box';
    canvasDiv.innerHTML = dotsSvg;
    container.appendChild(canvasDiv);

    return container;
}

/**
 * Mode 5: Symmetry Drawing (반쪽 대칭 그리기 - 신규!)
 */
function createSymmetryDrawing(design, strokeWidth = 3) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>🪞 반쪽 대칭 완성하기</h2>
            <p>가운데 중심 점선을 기준으로 오른쪽 반쪽을 똑같이 그려서 완성해 보세요!</p>
        </div>
    `;
    container.appendChild(header);

    // Side-by-side symmetry canvas with center grid ruling
    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box symmetry-canvas';
    
    // Base SVG with left half model + center axis + right grid guide
    const symSvg = design.symmetrySvg ? design.symmetrySvg(strokeWidth) : design.getSvg('theme', strokeWidth);
    canvasDiv.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%;">
            <!-- Symmetry Center Dashed Line -->
            <div style="position: absolute; left: 50%; top: 5%; bottom: 5%; border-left: 2.5px dashed #3b82f6; z-index: 5; pointer-events: none;"></div>
            <!-- Right Half Grid Helper Lines -->
            <div style="position: absolute; left: 50%; width: 50%; top: 5%; bottom: 5%; background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px); background-size: 20px 20px; z-index: 1; pointer-events: none; opacity: 0.5;"></div>
            ${symSvg}
        </div>
    `;
    container.appendChild(canvasDiv);

    const hint = document.createElement('div');
    hint.className = 'drawing-palette-bar';
    hint.innerHTML = `<span style="font-size: 0.95rem; color: #475569; font-weight: 700;">💡 힌트: 중심선에서 왼쪽으로 몇 칸 떨어져 있는지 세어가며 오른쪽에도 똑같이 점을 찍어 이어보세요!</span>`;
    container.appendChild(hint);

    return container;
}

/**
 * Mode 6: Grid Copy Drawing (모눈종이 보고 똑같이 그리기 - 신규!)
 */
function createGridCopyDrawing(design) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>📐 모눈종이 보고 똑같이 그리기</h2>
            <p>왼쪽 모눈 칸에 그려진 그림을 관찰하며, 오른쪽 빈 모눈에 똑같이 따라 그려보세요.</p>
        </div>
    `;
    container.appendChild(header);

    // Two Columns: Left (Model with 8x8 Grid), Right (Blank 8x8 Grid)
    const gridWrap = document.createElement('div');
    gridWrap.className = 'drawing-grid-copy-wrap';

    // Left Box (Model)
    const leftBox = document.createElement('div');
    leftBox.className = 'grid-copy-col';
    leftBox.innerHTML = `
        <div class="grid-copy-tag model">보기 그림</div>
        <div class="grid-copy-canvas has-grid-bg">
            <div class="grid-content-overlay">${design.getSvg('theme', 2.5, false)}</div>
        </div>
    `;
    gridWrap.appendChild(leftBox);

    // Right Box (Student Canvas)
    const rightBox = document.createElement('div');
    rightBox.className = 'grid-copy-col';
    rightBox.innerHTML = `
        <div class="grid-copy-tag practice">내가 그리기</div>
        <div class="grid-copy-canvas has-grid-bg student-grid">
            <div class="grid-center-dot"></div>
        </div>
    `;
    gridWrap.appendChild(rightBox);

    container.appendChild(gridWrap);
    return container;
}

/**
 * Mode 7: Step-by-Step Drawing (4단계 그리기 교실 - 신규!)
 */
function createStepByStepDrawing(design) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>🪜 4단계 그림 교실: ${design.title} 그리기</h2>
            <p>1단계부터 4단계까지 순서대로 따라 그리면 누구나 멋진 그림을 그릴 수 있어요!</p>
        </div>
    `;
    container.appendChild(header);

    // 4 Step Cards Grid (2x2)
    const stepGrid = document.createElement('div');
    stepGrid.className = 'drawing-step-grid';

    const stepTitles = [
        "1단계: 기본 뼈대 그리기",
        "2단계: 형태와 외곽선 잡기",
        "3단계: 눈코입과 세부 묘사",
        "4단계: 완성하고 예쁘게 색칠하기"
    ];

    const svgs = design.stepSvgs || [
        design.getSvg('theme', 2), design.getSvg('theme', 2),
        design.getSvg('theme', 2), design.getSvg('theme', 2, true)
    ];

    svgs.forEach((svgContent, idx) => {
        const card = document.createElement('div');
        card.className = 'drawing-step-card';
        card.innerHTML = `
            <div class="step-badge">${idx + 1}단계</div>
            <div class="step-title">${stepTitles[idx]}</div>
            <div class="step-svg-box">${svgContent}</div>
        `;
        stepGrid.appendChild(card);
    });

    container.appendChild(stepGrid);
    return container;
}

/**
 * Mode 8: Creative Storytelling Drawing (상상 스토리텔링 드로잉 - 신규!)
 */
function createCreativeDrawing(design, strokeWidth = 3) {
    const container = document.createElement('div');
    container.className = 'drawing-sheet-container';

    const header = document.createElement('div');
    header.className = 'drawing-header-wrap';
    header.innerHTML = `
        <div class="drawing-header-text">
            <h2>💡 상상력 쑥쑥 창의 드로잉</h2>
            <p style="color: #2563eb; font-weight: 700;">${design.prompt || '그림 주변을 상상하여 나만의 멋진 이야기를 그려보세요!'}</p>
        </div>
    `;
    container.appendChild(header);

    const canvasDiv = document.createElement('div');
    canvasDiv.className = 'drawing-canvas-box creative-canvas';
    canvasDiv.innerHTML = design.getSvg('theme', strokeWidth, false);
    container.appendChild(canvasDiv);

    return container;
}

/**
 * Mode 9: Word-Association Coloring (낱말 쓰고 색칠하기)
 */
function createWordColoring(design, strokeWidth = 3, showGuide = true) {
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = '1.1fr 0.9fr';
    grid.style.gap = '20px';
    grid.style.width = '100%';
    grid.style.marginTop = '10px';
    grid.style.alignItems = 'center';

    // Left Column: Writing Practice
    const writingCol = document.createElement('div');
    writingCol.style.display = 'flex';
    writingCol.style.flexDirection = 'column';
    writingCol.style.gap = '16px';
    writingCol.style.padding = '10px';

    const header = document.createElement('div');
    header.innerHTML = `
        <h2 style="font-size: 1.5rem; color: var(--accent-pink); margin-bottom: 5px;">📝 단어 쓰고 색칠하기</h2>
        <p style="font-size: 0.95rem; color: var(--text-muted); font-weight: 500;">낱말을 예쁘게 따라 쓰고 그림을 색칠해요.</p>
    `;
    writingCol.appendChild(header);

    // Korean Word Row
    const koBox = document.createElement('div');
    koBox.style.display = 'flex';
    koBox.style.flexDirection = 'column';
    koBox.style.gap = '8px';
    koBox.innerHTML = `
        <div style="font-size: 1rem; font-weight: 800; color: #1e293b;">한글 낱말 쓰기</div>
        <div style="display: flex; gap: 8px;">
            <div style="width: 72px; height: 72px; border: 2px solid #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; background-color: #f1f5f9;">
                ${design.wordKo}
            </div>
            <div style="width: 72px; height: 72px; border: 1.5px dashed #94a3b8; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: #94a3b8; position: relative;">
                <span>${design.wordKo}</span>
            </div>
            <div style="width: 72px; height: 72px; border: 2px solid #334155; border-radius: 8px;"></div>
            <div style="width: 72px; height: 72px; border: 2px solid #334155; border-radius: 8px;"></div>
        </div>
    `;
    writingCol.appendChild(koBox);

    // English Word Row
    const enBox = document.createElement('div');
    enBox.style.display = 'flex';
    enBox.style.flexDirection = 'column';
    enBox.style.gap = '8px';
    enBox.innerHTML = `
        <div style="font-size: 1rem; font-weight: 800; color: #1e293b;">영어 낱말 쓰기</div>
        <div style="display: flex; gap: 8px;">
            <div style="min-width: 72px; padding: 0 10px; height: 72px; border: 2px solid #cbd5e1; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; background-color: #f1f5f9;">
                ${design.wordEn}
            </div>
            <div style="flex: 1; height: 72px; border: 2px solid #cbd5e1; border-radius: 8px; position: relative; background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(#fecaca 1.5px, transparent 1.5px), linear-gradient(#cbd5e1 1px, transparent 1px); background-size: 100% 18px; background-position: 0 0, 0 18px, 0 36px, 0 54px; background-repeat: repeat-x;">
                <div style="position: absolute; top: 50%; left: 15px; transform: translateY(-50%); font-family: 'Inter', sans-serif; font-size: 2rem; font-weight: 700; color: #cbd5e1; letter-spacing: 4px;">
                    ${design.wordEn}
                </div>
            </div>
        </div>
    `;
    writingCol.appendChild(enBox);
    grid.appendChild(writingCol);

    // Right Column: Drawing Canvas
    const canvasDiv = document.createElement('div');
    canvasDiv.style.width = '350px';
    canvasDiv.style.height = '350px';
    canvasDiv.style.border = '2.5px dashed #cbd5e1';
    canvasDiv.style.borderRadius = '16px';
    canvasDiv.style.padding = '10px';
    canvasDiv.style.backgroundColor = '#ffffff';
    canvasDiv.innerHTML = design.getSvg('theme', strokeWidth, false);
    grid.appendChild(canvasDiv);

    return grid;
}
