import { Question } from '../types/game';

export const INITIAL_QUESTIONS: Question[] = [
  // ∫ 微積分 (Calculus) - 28 題
  {
    id: 'qm_1',
    title: '微分方程 dy/dx + 3y = 300 (已知 y(0)=0)，當 x→∞ 時 y 的穩態值是多少電量 %？',
    titleEn: "For the differential equation dy/dx + 3y = 300 (with y(0)=0), what is the steady-state value of y as x→∞, as a battery %?",
    officialBattery: 100,
    explanation: '解出 y(x) = 100(1 - e^(-3x))，當 x→∞ 時 y 趨近於 100！剛好是 100% 滿格電量！',
    explanationEn: "Solving gives y(x) = 100(1 - e^(-3x)); as x→∞, y approaches 100 — exactly a full 100% battery!",
    category: 'calculus',
    emoji: '📐'
  },
  {
    id: 'qm_2',
    title: '微分方程 dy/dx = y (已知 y(0)=1)，求 x = 1 時 y(1) 的數值小數點後前兩位是多少電量 %？',
    titleEn: "For the differential equation dy/dx = y (with y(0)=1), take y(1) and read its first two decimal digits — what battery % is that?",
    officialBattery: 71,
    explanation: '解出 y(1) = e ≈ 2.71828... 小數點後前兩位正是 71%！',
    explanationEn: "Solving gives y(1) = e ≈ 2.71828... — the first two decimal digits are exactly 71%!",
    category: 'calculus',
    emoji: '📈'
  },
  {
    id: 'qm_3',
    title: '計算定積分 ∫[0 to 1] 100x³ dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 1] 100x³ dx, as a battery %?",
    officialBattery: 25,
    explanation: '積分公式 [25x⁴] 從 0 到 1 等於 25，直接就是 25% 電量！',
    explanationEn: "The antiderivative [25x⁴] evaluated from 0 to 1 equals 25 — directly 25% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_4',
    title: '計算定積分 ∫[0 to π] 10sin(x) dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to π] 10sin(x) dx, as a battery %?",
    officialBattery: 20,
    explanation: '[-10cos x] 從 0 到 π 等於 10 - (-10) = 20，直接就是 20% 電量！',
    explanationEn: "[-10cos x] evaluated from 0 to π equals 10 - (-10) = 20 — directly 20% battery!",
    category: 'calculus',
    emoji: '🌊'
  },
  {
    id: 'qm_7',
    title: '求極限 lim(x→∞) (1 + 1/x)^x 取小數點後前兩位是多少電量 %？',
    titleEn: "Take the limit lim(x→∞) (1 + 1/x)^x and read its first two decimal digits — what battery %?",
    officialBattery: 71,
    explanation: '經典自然對數底數極限結果為 e ≈ 2.71828... 小數點後前兩位是 71%！',
    explanationEn: "This classic limit evaluates to e ≈ 2.71828... — the first two decimal digits are 71%!",
    category: 'calculus',
    emoji: '🎯'
  },
  {
    id: 'qm_8',
    title: '二階微分方程 y\'\' - 33y\' + 90y = 0 的較大特徵根是多少電量 %？',
    titleEn: "For the 2nd-order ODE y'' - 33y' + 90y = 0, what is the larger characteristic root, as a battery %?",
    officialBattery: 30,
    explanation: '特徵方程 r² - 33r + 90 = 0 解得 r = 3 與 30！較大特徵根直接就是 30% 電量！',
    explanationEn: "The characteristic equation r² - 33r + 90 = 0 gives r = 3 and 30 — the larger root is directly 30% battery!",
    category: 'calculus',
    emoji: '🔍'
  },
  {
    id: 'qm_10',
    title: '計算瑕積分 ∫[0 to ∞] 100e^(-x) dx 的結果是多少電量 %？',
    titleEn: "What is the improper integral ∫[0 to ∞] 100e^(-x) dx, as a battery %?",
    officialBattery: 100,
    explanation: '[-100e^(-x)] 從 0 到 ∞ 等於 0 - (-100) = 100，直接就是 100% 滿格電量！',
    explanationEn: "[-100e^(-x)] evaluated from 0 to ∞ equals 0 - (-100) = 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '⚡'
  },
  {
    id: 'qm_11',
    title: '求極限 lim(x→0) 100(1 - cos x)/x² 的結果是多少電量 %？',
    titleEn: "What is lim(x→0) 100(1 - cos x)/x², as a battery %?",
    officialBattery: 50,
    explanation: '洛必達法則或泰勒展開，原極限為 1/2，乘以 100 後結果為 50，直接就是 50% 電量！',
    explanationEn: "By L'Hôpital's rule or a Taylor expansion, the underlying limit is 1/2; times 100 gives 50 — directly 50% battery!",
    category: 'calculus',
    emoji: '⚖️'
  },
  {
    id: 'qm_13',
    title: '求二階常微分方程 y\'\' + y = 0 的通解週期 T (T = 2π) 小數點後前兩位是多少電量 %？',
    titleEn: "The general solution to the 2nd-order ODE y'' + y = 0 has period T = 2π — what are its first two decimal digits, as a battery %?",
    officialBattery: 28,
    explanation: '簡諧運動週期 2π ≈ 6.28318... 小數點後前兩位正是 28%！',
    explanationEn: "The simple-harmonic-motion period 2π ≈ 6.28318... — the first two decimal digits are exactly 28%!",
    category: 'calculus',
    emoji: '🔄'
  },
  {
    id: 'qm_16',
    title: '曲線 y = 100/x 從 x = 1 到 x = e 的曲邊梯形面積是多少電量 %？',
    titleEn: "What is the area under the curve y = 100/x from x = 1 to x = e, as a battery %?",
    officialBattery: 100,
    explanation: '∫[1 to e] 100/x dx = 100(ln(e) - ln(1)) = 100，直接就是 100% 滿格電量！',
    explanationEn: "∫[1 to e] 100/x dx = 100(ln(e) - ln(1)) = 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '📉'
  },
  {
    id: 'qm_18',
    title: '計算定積分 ∫[0 to π/4] 100sec²(x) dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to π/4] 100sec²(x) dx, as a battery %?",
    officialBattery: 100,
    explanation: '[100tan x] 從 0 到 π/4 等於 100tan(π/4) - 0 = 100，直接就是 100% 電量！',
    explanationEn: "[100tan x] evaluated from 0 to π/4 equals 100tan(π/4) - 0 = 100 — directly 100% battery!",
    category: 'calculus',
    emoji: '✨'
  },
  {
    id: 'qm_19',
    title: '求極限 lim(x→0) 100(x - sin x)/x³ 的結果（取整數）是多少電量 %？',
    titleEn: "What is lim(x→0) 100(x - sin x)/x³ rounded to an integer, as a battery %?",
    officialBattery: 16,
    explanation: '泰勒展開 x - sin x ≈ x³/6，乘以 100 後極限為 100/6 ≈ 16.66，取整數 16% 電量！',
    explanationEn: "By the Taylor expansion x - sin x ≈ x³/6, the limit times 100 is 100/6 ≈ 16.66 — rounded to 16% battery!",
    category: 'calculus',
    emoji: '🔬'
  },
  {
    id: 'qm_23',
    title: '微分方程 dy/dx = -2y (已知 y(0)=100)，當 x = 1 時 y(1) 的數值取整數是多少 %？',
    titleEn: "For the differential equation dy/dx = -2y (with y(0)=100), what is y(1) rounded to an integer, as a battery %?",
    officialBattery: 13,
    explanation: 'y(1) = 100 × e^(-2) ≈ 100 × 0.1353 = 13.53%，取整數 13%！',
    explanationEn: "y(1) = 100 × e^(-2) ≈ 100 × 0.1353 = 13.53% — rounded to 13%!",
    category: 'calculus',
    emoji: '📉'
  },
  {
    id: 'qm_24',
    title: '熱傳導微分方程 ∂u/∂t = α ∇²u 在無限長時間熱平衡後，閉合系統的熱分配電量是幾 %？',
    titleEn: "For the heat equation ∂u/∂t = α∇²u, after infinite time reaches thermal equilibrium, what battery % does a closed system settle at?",
    officialBattery: 50,
    explanation: '熱力學第二定律！閉合系統最終收斂於 50% 完美熱半滿狀態！',
    explanationEn: "The Second Law of Thermodynamics! A closed system converges to a perfectly even 50% thermal state!",
    category: 'calculus',
    emoji: '🔥'
  },
  {
    id: 'qm_25',
    title: '計算定積分 ∫[0 to 2] 30x² dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 2] 30x² dx, as a battery %?",
    officialBattery: 80,
    explanation: '[10x³] 從 0 到 2 等於 10×8 = 80，直接就是 80% 電量！',
    explanationEn: "[10x³] evaluated from 0 to 2 equals 10×8 = 80 — directly 80% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_26',
    title: '二階常微分方程 y\'\' + 1600y = 0 的固有角頻率 ω 是多少電量 %？',
    titleEn: "For the 2nd-order ODE y'' + 1600y = 0, what is the natural angular frequency ω, as a battery %?",
    officialBattery: 40,
    explanation: '角頻率 ω = √1600 = 40，直接就是 40% 電量！',
    explanationEn: "The angular frequency ω = √1600 = 40 — directly 40% battery!",
    category: 'calculus',
    emoji: '📈'
  },
  {
    id: 'qm_27',
    title: '計算極限 lim(x→0) 100·tan(x)/x 是多少電量 %？',
    titleEn: "What is lim(x→0) 100·tan(x)/x, as a battery %?",
    officialBattery: 100,
    explanation: '經典三角函數極限 tan(x)/x → 1，乘以 100 後為 100，直接滿格 100% 能量！',
    explanationEn: "This classic trig limit tan(x)/x → 1; times 100 gives 100 — directly a full 100% charge!",
    category: 'calculus',
    emoji: '🎯'
  },
  {
    id: 'qm_32',
    title: '微分方程 dy/dx = 4x (已知 y(0)=0)，求 x = 5 時 y(5) 是多少電量 %？',
    titleEn: "For the differential equation dy/dx = 4x (with y(0)=0), what is y(5), as a battery %?",
    officialBattery: 50,
    explanation: 'y(x) = 2x²，y(5) = 2 × 25 = 50，直接就是 50% 電量！',
    explanationEn: "y(x) = 2x², so y(5) = 2 × 25 = 50 — directly 50% battery!",
    category: 'calculus',
    emoji: '📊'
  },
  {
    id: 'qm_34',
    title: '計算定積分 ∫[0 to 1] 400x³ dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 1] 400x³ dx, as a battery %?",
    officialBattery: 100,
    explanation: '[100x⁴] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    explanationEn: "[100x⁴] evaluated from 0 to 1 equals 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_35',
    title: '二階微分方程 y\'\' - 900y = 0 的正特徵根是多少電量 %？',
    titleEn: "For the 2nd-order ODE y'' - 900y = 0, what is the positive characteristic root, as a battery %?",
    officialBattery: 30,
    explanation: '特徵方程 r² - 900 = 0 解得 r = 30（正根），直接就是 30% 電量！',
    explanationEn: "The characteristic equation r² - 900 = 0 gives r = 30 (positive root) — directly 30% battery!",
    category: 'calculus',
    emoji: '🔍'
  },
  {
    id: 'qm_39',
    title: '阻尼振動微分方程 y\'\' + 40y\' + 1300y = 0 的固有衰減角頻率 ω 是多少電量 %？',
    titleEn: "For the damped oscillation ODE y'' + 40y' + 1300y = 0, what is the natural damped angular frequency ω, as a battery %?",
    officialBattery: 30,
    explanation: '特徵根 r = -20 ± 30i，虛部角頻率 ω = 30，直接就是 30% 電量！',
    explanationEn: "The characteristic roots are r = -20 ± 30i; the imaginary part ω = 30 — directly 30% battery!",
    category: 'calculus',
    emoji: '〰️'
  },
  {
    id: 'qm_49',
    title: '計算定積分 ∫[0 to 1] 200x dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 1] 200x dx, as a battery %?",
    officialBattery: 100,
    explanation: '[100x²] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    explanationEn: "[100x²] evaluated from 0 to 1 equals 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_50',
    title: '求極限 lim(x→0) 100·sin(x)/x 是多少電量 %？',
    titleEn: "What is lim(x→0) 100·sin(x)/x, as a battery %?",
    officialBattery: 100,
    explanation: '經典重要極限 sin(x)/x → 1，乘以 100 後為 100，直接滿格 100% 能量！',
    explanationEn: "This classic important limit sin(x)/x → 1; times 100 gives 100 — directly a full 100% charge!",
    category: 'calculus',
    emoji: '🎯'
  },
  {
    id: 'qm_59',
    title: '計算定積分 ∫[0 to 2] 25x dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 2] 25x dx, as a battery %?",
    officialBattery: 50,
    explanation: '[12.5x²] 從 0 到 2 等於 12.5×4 = 50，直接就是 50% 電量！',
    explanationEn: "[12.5x²] evaluated from 0 to 2 equals 12.5×4 = 50 — directly 50% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_63',
    title: '計算定積分 ∫[0 to 1] 300x² dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to 1] 300x² dx, as a battery %?",
    officialBattery: 100,
    explanation: '[100x³] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    explanationEn: "[100x³] evaluated from 0 to 1 equals 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '∫'
  },
  {
    id: 'qm_65',
    title: '拋物線 y = 10x² 在 x=3 處的切線斜率 dy/dx 是多少電量 %？',
    titleEn: "For the parabola y = 10x², what is the tangent slope dy/dx at x=3, as a battery %?",
    officialBattery: 60,
    explanation: 'dy/dx = 20x，在 x=3 時斜率為 20×3 = 60，直接就是 60% 電量！',
    explanationEn: "dy/dx = 20x; at x=3 the slope is 20×3 = 60 — directly 60% battery!",
    category: 'calculus',
    emoji: '📈'
  },
  {
    id: 'qm_68',
    title: '計算定積分 ∫[0 to π/2] 100cos(x) dx 的結果是多少電量 %？',
    titleEn: "What is the definite integral ∫[0 to π/2] 100cos(x) dx, as a battery %?",
    officialBattery: 100,
    explanation: '[100sin x] 從 0 到 π/2 等於 100 - 0 = 100，直接就是 100% 滿格電量！',
    explanationEn: "[100sin x] evaluated from 0 to π/2 equals 100 - 0 = 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '🌊'
  },
  {
    id: 'qm_69',
    title: '求極限 lim(x→∞) 100(x² + 1)/(x² + 5) 是多少電量 %？',
    titleEn: "What is lim(x→∞) 100(x² + 1)/(x² + 5), as a battery %?",
    officialBattery: 100,
    explanation: '最高次項係數比為 1/1 = 1，乘以 100 後為 100，直接滿格 100% 電量！',
    explanationEn: "The ratio of leading coefficients is 1/1 = 1; times 100 gives 100 — directly a full 100% battery!",
    category: 'calculus',
    emoji: '🎯'
  },

  // 📐 幾何與向量 (Geometry & Vectors) - 20 題
  {
    id: 'qm_5',
    title: '黃金分割率 φ = (1+√5)/2，取小數點後前兩位是多少電量 %？',
    titleEn: "The golden ratio φ = (1+√5)/2 — what are its first two decimal digits, as a battery %?",
    officialBattery: 61,
    explanation: '黃金比例 φ ≈ 1.618033... 小數點後前兩位正是 61% 電量！',
    explanationEn: "The golden ratio φ ≈ 1.618033... — the first two decimal digits are exactly 61% battery!",
    category: 'geometry',
    emoji: '🌀'
  },
  {
    id: 'qm_6',
    title: '複數 100e^(iπ) 的模長 |100e^(iπ)| 是多少電量 %？',
    titleEn: "What is the modulus |100e^(iπ)| of the complex number 100e^(iπ), as a battery %?",
    officialBattery: 100,
    explanation: '歐拉恆等式 e^(iπ) = -1，所以 100e^(iπ) = -100，其模長 |-100| = 100，直接滿格 100% 能量！',
    explanationEn: "By Euler's identity e^(iπ) = -1, so 100e^(iπ) = -100, and |-100| = 100 — directly a full 100% charge!",
    category: 'geometry',
    emoji: '🧮'
  },
  {
    id: 'qm_12',
    title: '複數 z = 30 + 40i 的模長 |z| 是多少電量 %？',
    titleEn: "What is the modulus |z| of the complex number z = 30 + 40i, as a battery %?",
    officialBattery: 50,
    explanation: '勾股定理模長 |z| = √(30² + 40²) = √2500 = 50，直接就是 50% 電量！',
    explanationEn: "By the Pythagorean theorem, |z| = √(30² + 40²) = √2500 = 50 — directly 50% battery!",
    category: 'geometry',
    emoji: '📐'
  },
  {
    id: 'qm_14',
    title: '單位圓 x² + y² ≤ 1 的面積小數點後前兩位是多少電量 %？',
    titleEn: "The unit circle x² + y² ≤ 1 has what area — read its first two decimal digits, as a battery %?",
    officialBattery: 14,
    explanation: '單位圓面積 A = π ≈ 3.14159... 小數點後前兩位正是 14%！',
    explanationEn: "The unit circle's area A = π ≈ 3.14159... — the first two decimal digits are exactly 14%!",
    category: 'geometry',
    emoji: '⚪'
  },
  {
    id: 'qm_17',
    title: '正五邊形的每一個內角角度佔平角 (180°) 的百分比是多少 %？',
    titleEn: "What percentage of a straight angle (180°) is each interior angle of a regular pentagon?",
    officialBattery: 60,
    explanation: '正五邊形內角為 108°，108 / 180 = 0.60，即 60% 電量！',
    explanationEn: "A regular pentagon's interior angle is 108°; 108 / 180 = 0.60 — that's 60% battery!",
    category: 'geometry',
    emoji: '⬟'
  },
  {
    id: 'qm_20',
    title: '單位球體 x² + y² + z² ≤ 1 的體積 V = 4π/3，其小數點後前兩位是多少電量 %？',
    titleEn: "The unit sphere x² + y² + z² ≤ 1 has volume V = 4π/3 — what are its first two decimal digits, as a battery %?",
    officialBattery: 18,
    explanation: 'V = 4π/3 ≈ 4.18879... 小數點後前兩位正是 18%！',
    explanationEn: "V = 4π/3 ≈ 4.18879... — the first two decimal digits are exactly 18%!",
    category: 'geometry',
    emoji: '🔮'
  },
  {
    id: 'qm_28',
    title: '函數 100cos(x) 當 x = 0 時的數值是多少電量 %？',
    titleEn: "What is 100cos(x) at x = 0, as a battery %?",
    officialBattery: 100,
    explanation: '100cos(0) = 100×1 = 100，直接就是 100% 電量！',
    explanationEn: "100cos(0) = 100×1 = 100 — directly 100% battery!",
    category: 'geometry',
    emoji: '📐'
  },
  {
    id: 'qm_29',
    title: '單位正方形的對角線長度 √2 取小數點後前兩位是多少電量 %？',
    titleEn: "A unit square's diagonal length √2 — what are its first two decimal digits, as a battery %?",
    officialBattery: 41,
    explanation: '√2 ≈ 1.41421... 小數點後前兩位正是 41%！',
    explanationEn: "√2 ≈ 1.41421... — the first two decimal digits are exactly 41%!",
    category: 'geometry',
    emoji: '🔳'
  },
  {
    id: 'qm_30',
    title: '圓周率 π 的數值小數點後前兩位是多少電量 %？',
    titleEn: "Pi (π) — what are its first two decimal digits, as a battery %?",
    officialBattery: 14,
    explanation: 'π ≈ 3.14159... 小數點後前兩位正是 14%！',
    explanationEn: "π ≈ 3.14159... — the first two decimal digits are exactly 14%!",
    category: 'geometry',
    emoji: '🥧'
  },
  {
    id: 'qm_33',
    title: '正三角形的內角角度 (60°) 佔直角 (90°) 的百分比（取整數）是多少 %？',
    titleEn: "What percentage of a right angle (90°) is an equilateral triangle's interior angle (60°), rounded to an integer?",
    officialBattery: 66,
    explanation: '60 / 90 = 2/3 ≈ 66.66%，取整數 66%！',
    explanationEn: "60 / 90 = 2/3 ≈ 66.66% — rounded to 66%!",
    category: 'geometry',
    emoji: '🔺'
  },
  {
    id: 'qm_38',
    title: '平面向量 (30, 40) 的模長是多少電量 %？',
    titleEn: "What is the magnitude of the plane vector (30, 40), as a battery %?",
    officialBattery: 50,
    explanation: '√(30² + 40²) = √2500 = 50，直接就是 50% 電量！',
    explanationEn: "√(30² + 40²) = √2500 = 50 — directly 50% battery!",
    category: 'geometry',
    emoji: '↗️'
  },
  {
    id: 'qm_42',
    title: '圓周率 π = 3.14159... 取小數點後前兩位是多少電量 %？',
    titleEn: "Pi (π = 3.14159...) — what are its first two decimal digits, as a battery %?",
    officialBattery: 14,
    explanation: 'π ≈ 3.14... 小數點後前兩位正是 14% 電量！',
    explanationEn: "π ≈ 3.14... — the first two decimal digits are exactly 14% battery!",
    category: 'geometry',
    emoji: '🥧'
  },
  {
    id: 'qm_43',
    title: '半徑 r = 5 的圓面積 A = πr² (取 π ≈ 3.14) 的數值小數點前兩位是多少電量 %？',
    titleEn: "A circle of radius r = 5 has area A = πr² (using π ≈ 3.14) — what are the first two digits, as a battery %?",
    officialBattery: 78,
    explanation: 'A = 3.14 × 25 = 78.5，取前兩位整數正是 78% 電量！',
    explanationEn: "A = 3.14 × 25 = 78.5 — the first two integer digits are exactly 78% battery!",
    category: 'geometry',
    emoji: '⚪'
  },
  {
    id: 'qm_44',
    title: '三維空間中向量 100û（û 為單位向量）的模長 |100û| 是多少電量 %？',
    titleEn: "In 3D space, what is the magnitude |100û| of the vector 100û (where û is a unit vector), as a battery %?",
    officialBattery: 100,
    explanation: '單位向量模長為 1，所以 |100û| = 100×1 = 100，直接就是 100% 滿格電量！',
    explanationEn: "A unit vector has magnitude 1, so |100û| = 100×1 = 100 — directly a full 100% battery!",
    category: 'geometry',
    emoji: '📐'
  },
  {
    id: 'qm_47',
    title: '三角函數 100·sin(30°) 的數值是多少電量 %？',
    titleEn: "What is 100·sin(30°), as a battery %?",
    officialBattery: 50,
    explanation: '100 × sin(30°) = 100 × 0.5 = 50，直接就是 50% 電量！',
    explanationEn: "100 × sin(30°) = 100 × 0.5 = 50 — directly 50% battery!",
    category: 'geometry',
    emoji: '📐'
  },
  {
    id: 'qm_48',
    title: '三角函數 100·cos(60°) 的數值是多少電量 %？',
    titleEn: "What is 100·cos(60°), as a battery %?",
    officialBattery: 50,
    explanation: '100 × cos(60°) = 100 × 0.5 = 50，直接就是 50% 電量！',
    explanationEn: "100 × cos(60°) = 100 × 0.5 = 50 — directly 50% battery!",
    category: 'geometry',
    emoji: '📐'
  },
  {
    id: 'qm_57',
    title: '雙曲線 x² - y² = 1 的漸近線斜率絕對值為 |m|，數值 100|m| 是多少電量 %？',
    titleEn: "The hyperbola x² - y² = 1 has asymptote slope magnitude |m| — what is 100|m|, as a battery %?",
    officialBattery: 100,
    explanation: '漸近線 y = ±x，斜率絕對值為 1，100 × 1 = 100，直接就是 100% 滿格電量！',
    explanationEn: "The asymptotes are y = ±x, so |m| = 1; 100 × 1 = 100 — directly a full 100% battery!",
    category: 'geometry',
    emoji: '📈'
  },
  {
    id: 'qm_60',
    title: '一元二次方程 x² - 100x + 2500 = 0 的重根 x 是多少電量 %？',
    titleEn: "The quadratic x² - 100x + 2500 = 0 has a repeated root x — what battery % is it?",
    officialBattery: 50,
    explanation: '(x-50)² = 0 解得重根 x = 50，直接就是 50% 電量！',
    explanationEn: "(x-50)² = 0 gives the repeated root x = 50 — directly 50% battery!",
    category: 'geometry',
    emoji: '🔍'
  },
  {
    id: 'qm_61',
    title: '圓的周長與直徑之比取小數點後前兩位是多少電量 %？',
    titleEn: "A circle's circumference-to-diameter ratio — what are its first two decimal digits, as a battery %?",
    officialBattery: 14,
    explanation: '周長比直徑即為圓周率 π ≈ 3.14... 小數點後前兩位是 14%！',
    explanationEn: "Circumference divided by diameter is just π ≈ 3.14... — the first two decimal digits are 14%!",
    category: 'geometry',
    emoji: '⭕'
  },
  {
    id: 'qm_62',
    title: '正交向量 a=(3,4) 與 b=(4,-3) 的點積 a·b 加上滿格電量是多少 %？',
    titleEn: "The orthogonal vectors a=(3,4) and b=(4,-3) have dot product a·b — add a full charge to it, what's the result as a battery %?",
    officialBattery: 100,
    explanation: '3×4 + 4×(-3) = 0（正交），0 + 100 = 100% 滿格電量！',
    explanationEn: "3×4 + 4×(-3) = 0 (orthogonal, as expected); 0 + 100 = 100% — a full battery!",
    category: 'geometry',
    emoji: '🏹'
  },

  // 🎲 代數與機率 (Algebra & Probability) - 22 題
  {
    id: 'qm_9',
    title: '矩陣 A = [[40, 10], [2, 3]] 的行列式 det(A) 是多少電量 %？',
    titleEn: "What is the determinant det(A) of the matrix A = [[40, 10], [2, 3]], as a battery %?",
    officialBattery: 100,
    explanation: 'det(A) = 40×3 - 2×10 = 120 - 20 = 100，直接就是 100% 滿格電量！',
    explanationEn: "det(A) = 40×3 - 2×10 = 120 - 20 = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '🔲'
  },
  {
    id: 'qm_15',
    title: '投擲兩顆公正骰子，點數之和等於 7 的概率轉為百分比（取整數）是多少 %？',
    titleEn: "Rolling two fair dice, what's the probability their sum equals 7, as a percentage rounded to an integer?",
    officialBattery: 16,
    explanation: '組合為 (1,6),(2,5),(3,4)... 共 6/36 = 1/6 ≈ 16.66%，取整數 16%！',
    explanationEn: "The combinations are (1,6),(2,5),(3,4)... totaling 6/36 = 1/6 ≈ 16.66% — rounded to 16%!",
    category: 'algebra',
    emoji: '🎲'
  },
  {
    id: 'qm_21',
    title: '對數方程 log₁₀(x) = 2 的解 x 是多少電量 %？',
    titleEn: "The logarithmic equation log₁₀(x) = 2 has solution x — what battery % is it?",
    officialBattery: 100,
    explanation: 'x = 10² = 100，直接就是 100% 滿格電量！',
    explanationEn: "x = 10² = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '🔢'
  },
  {
    id: 'qm_22',
    title: '黎曼 Zeta 函數 ζ(2) = π²/6，其小數點後前兩位是多少電量 %？',
    titleEn: "The Riemann zeta function ζ(2) = π²/6 — what are its first two decimal digits, as a battery %?",
    officialBattery: 64,
    explanation: '巴塞爾問題解答 π²/6 ≈ 1.64493... 小數點後前兩位正是 64%！',
    explanationEn: "The Basel problem's answer π²/6 ≈ 1.64493... — the first two decimal digits are exactly 64%!",
    category: 'algebra',
    emoji: '🌌'
  },
  {
    id: 'qm_31',
    title: '自然對數底數 e 的數值小數點後前兩位是多少電量 %？',
    titleEn: "Euler's number e — what are its first two decimal digits, as a battery %?",
    officialBattery: 71,
    explanation: 'e ≈ 2.71828... 小數點後前兩位正是 71%！',
    explanationEn: "e ≈ 2.71828... — the first two decimal digits are exactly 71%!",
    category: 'algebra',
    emoji: '🌲'
  },
  {
    id: 'qm_36',
    title: '對角矩陣 B = [[20, 0], [0, 40]] 的特徵值之和是多少電量 %？',
    titleEn: "What is the sum of the eigenvalues of the diagonal matrix B = [[20, 0], [0, 40]], as a battery %?",
    officialBattery: 60,
    explanation: '特徵值為 20 與 40，和為 60，直接就是 60% 電量！',
    explanationEn: "The eigenvalues are 20 and 40, summing to 60 — directly 60% battery!",
    category: 'algebra',
    emoji: '🔲'
  },
  {
    id: 'qm_37',
    title: '無窮等比級數 50 + 25 + 12.5 + ... 的級數和是多少電量 %？',
    titleEn: "What is the sum of the infinite geometric series 50 + 25 + 12.5 + ..., as a battery %?",
    officialBattery: 100,
    explanation: '收斂級數和 a/(1-r) = 50/(1-1/2) = 100，直接就是 100% 滿格電量！',
    explanationEn: "The convergent sum a/(1-r) = 50/(1-1/2) = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '♾️'
  },
  {
    id: 'qm_40',
    title: '連續型均勻分佈 U(0, 100) 的期望值 E[X] 是多少電量 %？',
    titleEn: "What is the expected value E[X] of the continuous uniform distribution U(0, 100), as a battery %?",
    officialBattery: 50,
    explanation: 'E[X] = (0 + 100)/2 = 50，直接就是 50% 電量！',
    explanationEn: "E[X] = (0 + 100)/2 = 50 — directly 50% battery!",
    category: 'algebra',
    emoji: '⚖️'
  },
  {
    id: 'qm_41',
    title: '一階線性函數 100x 在 x = 0.5 時的值是多少電量 %？',
    titleEn: "What is the linear function 100x evaluated at x = 0.5, as a battery %?",
    officialBattery: 50,
    explanation: '100 × 0.5 = 50，直接就是 50% 電量！',
    explanationEn: "100 × 0.5 = 50 — directly 50% battery!",
    category: 'algebra',
    emoji: '📈'
  },
  {
    id: 'qm_45',
    title: '正態分佈 (Normal Distribution) 在 [-σ, +σ] 區間內的概率取整數是多少電量 %？',
    titleEn: "For a normal distribution, what's the probability within [-σ, +σ], rounded to an integer, as a battery %?",
    officialBattery: 68,
    explanation: '經驗法則 (68-95-99.7 Rule)，一倍標準差區間涵蓋 68.27% ≈ 68% 概率！',
    explanationEn: "By the empirical rule (68-95-99.7 Rule), one standard deviation covers 68.27% ≈ 68% probability!",
    category: 'algebra',
    emoji: '📊'
  },
  {
    id: 'qm_46',
    title: '正態分佈在 [-2σ, +2σ] 區間內的概率取整數是多少電量 %？',
    titleEn: "For a normal distribution, what's the probability within [-2σ, +2σ], rounded to an integer, as a battery %?",
    officialBattery: 95,
    explanation: '兩倍標準差區間涵蓋 95.45% ≈ 95% 概率！',
    explanationEn: "Two standard deviations cover 95.45% ≈ 95% probability!",
    category: 'algebra',
    emoji: '📈'
  },
  {
    id: 'qm_51',
    title: '對角矩陣 50I₂ = [[50, 0], [0, 50]] 的跡 tr(50I₂) 是多少電量 %？',
    titleEn: "What is the trace tr(50I₂) of the diagonal matrix 50I₂ = [[50, 0], [0, 50]], as a battery %?",
    officialBattery: 100,
    explanation: 'tr(50I₂) = 50 + 50 = 100，直接就是 100% 滿格電量！',
    explanationEn: "tr(50I₂) = 50 + 50 = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '🔲'
  },
  {
    id: 'qm_52',
    title: '虛數運算 100i² 的絕對值 |100i²| 是多少電量 %？',
    titleEn: "What is the absolute value |100i²|, as a battery %?",
    officialBattery: 100,
    explanation: 'i² = -1，所以 100i² = -100，絕對值 |-100| = 100，直接就是 100% 滿格電量！',
    explanationEn: "i² = -1, so 100i² = -100, and |-100| = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '🧮'
  },
  {
    id: 'qm_53',
    title: '計算 2^10 = 1024 取百位與十位數組合是多少電量 %？',
    titleEn: "2^10 = 1024 — take its hundreds and tens digits together, what battery %?",
    officialBattery: 24,
    explanation: '1024 的最後兩位數字正是 24% 電量！',
    explanationEn: "1024's last two digits are exactly 24% battery!",
    category: 'algebra',
    emoji: '🔢'
  },
  {
    id: 'qm_54',
    title: '費氏數列 (Fibonacci) 第 10 項的數值是多少電量 %？',
    titleEn: "What is the 10th term of the Fibonacci sequence, as a battery %?",
    officialBattery: 55,
    explanation: '數列: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55！第 10 項正是 55% 電量！',
    explanationEn: "The sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55! The 10th term is exactly 55% battery!",
    category: 'algebra',
    emoji: '🌀'
  },
  {
    id: 'qm_55',
    title: '計算 10 × C(5, 2) 是多少電量 %？',
    titleEn: "What is 10 × C(5, 2), as a battery %?",
    officialBattery: 100,
    explanation: 'C(5, 2) = (5×4)/2 = 10，10 × 10 = 100，直接就是 100% 滿格電量！',
    explanationEn: "C(5, 2) = (5×4)/2 = 10, so 10 × 10 = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '🎲'
  },
  {
    id: 'qm_56',
    title: '計算 5 × P(4, 2) 是多少電量 %？',
    titleEn: "What is 5 × P(4, 2), as a battery %?",
    officialBattery: 60,
    explanation: 'P(4, 2) = 4×3 = 12，5 × 12 = 60，直接就是 60% 電量！',
    explanationEn: "P(4, 2) = 4×3 = 12, so 5 × 12 = 60 — directly 60% battery!",
    category: 'algebra',
    emoji: '🔀'
  },
  {
    id: 'qm_58',
    title: '計算 50 × log₁₀(100) 是多少電量 %？',
    titleEn: "What is 50 × log₁₀(100), as a battery %?",
    officialBattery: 100,
    explanation: 'log₁₀(100) = 2，50 × 2 = 100，直接就是 100% 滿格電量！',
    explanationEn: "log₁₀(100) = 2, so 50 × 2 = 100 — directly a full 100% battery!",
    category: 'algebra',
    emoji: '📐'
  },
  {
    id: 'qm_64',
    title: '無窮等比級數 40 + 20 + 10 + 5 + ... 的和是多少電量 %？',
    titleEn: "What is the sum of the infinite geometric series 40 + 20 + 10 + 5 + ..., as a battery %?",
    officialBattery: 80,
    explanation: '級數和 S = 40/(1 - 1/2) = 80，直接就是 80% 電量！',
    explanationEn: "The sum S = 40/(1 - 1/2) = 80 — directly 80% battery!",
    category: 'algebra',
    emoji: '♾️'
  },
  {
    id: 'qm_66',
    title: '投擲一次均勻六面骰子，出現點數 ≤ 3 的概率百分比是多少 %？',
    titleEn: "Rolling a fair six-sided die once, what's the probability of rolling ≤ 3, as a percentage?",
    officialBattery: 50,
    explanation: '點數 1, 2, 3 共 3 種可能，3/6 = 50% 電量！',
    explanationEn: "There are 3 favorable outcomes (1, 2, 3); 3/6 = 50% battery!",
    category: 'algebra',
    emoji: '🎲'
  },
  {
    id: 'qm_67',
    title: '連續投擲硬幣兩次，結果皆為正面的概率百分比是多少 %？',
    titleEn: "Flipping a coin twice in a row, what's the probability both land heads, as a percentage?",
    officialBattery: 25,
    explanation: '(1/2) × (1/2) = 1/4 = 25% 電量！',
    explanationEn: "(1/2) × (1/2) = 1/4 = 25% battery!",
    category: 'algebra',
    emoji: '🪙'
  },
  {
    id: 'qm_70',
    title: '自然對數底數 e 減去 2 之後取小數點後前兩位是多少電量 %？',
    titleEn: "Take Euler's number e, subtract 2, then read the first two decimal digits — what battery %?",
    officialBattery: 71,
    explanation: 'e ≈ 2.71828... 減 2 等於 0.718... 小數點後前兩位是 71%！',
    explanationEn: "e ≈ 2.71828... minus 2 is 0.718... — the first two decimal digits are 71%!",
    category: 'algebra',
    emoji: '🧮'
  },

  // ⚙️ 五大力學 (Classical Mechanics) - 24 題
  {
    id: 'qk_1',
    title: '以初速度 30 m/s、仰角 45° 拋出物體（取 g = 10 m/s²），水平射程是多少公尺，對應多少電量 %？',
    titleEn: "An object is launched at 30 m/s at a 45° angle (g = 10 m/s²) — what's its horizontal range in meters, as a battery %?",
    officialBattery: 90,
    explanation: '45° 是射程最大角，R = v²sin(2θ)/g = v²/g = 30²/10 = 90，直接就是 90% 電量！',
    explanationEn: "45° gives the maximum range: R = v²sin(2θ)/g = v²/g = 30²/10 = 90 — directly 90% battery!",
    category: 'mechanics',
    emoji: '🚀'
  },
  {
    id: 'qk_2',
    title: '物體從靜止自由落下 4 秒（取 g = 10 m/s²），下落高度是多少公尺，對應多少電量 %？',
    titleEn: "An object falls from rest for 4 seconds (g = 10 m/s²) — how far does it fall in meters, as a battery %?",
    officialBattery: 80,
    explanation: 'h = ½gt² = ½×10×4² = 80，直接就是 80% 電量！',
    explanationEn: "h = ½gt² = ½×10×4² = 80 — directly 80% battery!",
    category: 'mechanics',
    emoji: '🪂'
  },
  {
    id: 'qk_3',
    title: '質量 2 kg 的物體以 8 m/s 運動，其動能是多少焦耳，對應多少電量 %？',
    titleEn: "A 2 kg object moves at 8 m/s — what's its kinetic energy in joules, as a battery %?",
    officialBattery: 64,
    explanation: 'KE = ½mv² = ½×2×8² = 64，直接就是 64% 電量！',
    explanationEn: "KE = ½mv² = ½×2×8² = 64 — directly 64% battery!",
    category: 'mechanics',
    emoji: '⚙️'
  },
  {
    id: 'qk_4',
    title: '質量 3 kg、速度 10 m/s 的物體與靜止的 2 kg 物體發生完全非彈性碰撞，碰撞後共同速度是多少 m/s，對應多少電量 %？',
    titleEn: "A 3 kg object at 10 m/s collides perfectly inelastically with a stationary 2 kg object — what's their combined velocity in m/s, as a battery %?",
    officialBattery: 6,
    explanation: '動量守恆：v = (m₁v₁+m₂v₂)/(m₁+m₂) = (3×10+0)/5 = 6，直接就是 6% 電量！',
    explanationEn: "By momentum conservation: v = (m₁v₁+m₂v₂)/(m₁+m₂) = (3×10+0)/5 = 6 — directly 6% battery!",
    category: 'mechanics',
    emoji: '💥'
  },
  {
    id: 'qk_5',
    title: '彈簧常數 k = 50 N/m 的彈簧被壓縮 2 m，儲存的彈性位能是多少焦耳，對應多少電量 %？',
    titleEn: "A spring with k = 50 N/m is compressed 2 m — how much elastic PE is stored in joules, as a battery %?",
    officialBattery: 100,
    explanation: 'PE = ½kx² = ½×50×2² = 100，直接就是 100% 滿格電量！',
    explanationEn: "PE = ½kx² = ½×50×2² = 100 — directly a full 100% battery!",
    category: 'mechanics',
    emoji: '🌀'
  },
  {
    id: 'qk_6',
    title: '物體以 10 m/s 沿半徑 2 m 的圓周運動，向心加速度是多少 m/s²，對應多少電量 %？',
    titleEn: "An object moves at 10 m/s in a circle of radius 2 m — what's its centripetal acceleration in m/s², as a battery %?",
    officialBattery: 50,
    explanation: 'a = v²/r = 10²/2 = 50，直接就是 50% 電量！',
    explanationEn: "a = v²/r = 10²/2 = 50 — directly 50% battery!",
    category: 'mechanics',
    emoji: '🔄'
  },
  {
    id: 'qk_7',
    title: '施力 15 N 垂直作用在轉軸 4 m 處，產生的力矩是多少 N·m，對應多少電量 %？',
    titleEn: "A 15 N force acts perpendicular to a 4 m lever arm — what torque results in N·m, as a battery %?",
    officialBattery: 60,
    explanation: 'τ = F×r = 15×4 = 60，直接就是 60% 電量！',
    explanationEn: "τ = F×r = 15×4 = 60 — directly 60% battery!",
    category: 'mechanics',
    emoji: '🔧'
  },
  {
    id: 'qk_8',
    title: '施力 13 N 使物體沿力的方向移動 5 m，做的功是多少焦耳，對應多少電量 %？',
    titleEn: "A 13 N force moves an object 5 m in its own direction — how much work is done in joules, as a battery %?",
    officialBattery: 65,
    explanation: 'W = F×d = 13×5 = 65，直接就是 65% 電量！',
    explanationEn: "W = F×d = 13×5 = 65 — directly 65% battery!",
    category: 'mechanics',
    emoji: '🏋️'
  },
  {
    id: 'qk_9',
    title: '在 4 秒內完成 280 焦耳的功，平均功率是多少瓦特，對應多少電量 %？',
    titleEn: "280 joules of work is done in 4 seconds — what's the average power in watts, as a battery %?",
    officialBattery: 70,
    explanation: 'P = W/t = 280/4 = 70，直接就是 70% 電量！',
    explanationEn: "P = W/t = 280/4 = 70 — directly 70% battery!",
    category: 'mechanics',
    emoji: '⚡'
  },
  {
    id: 'qk_10',
    title: '質量 2 kg 的物體以 5 m/s 沿半徑 4 m 的圓周運動，角動量是多少 kg·m²/s，對應多少電量 %？',
    titleEn: "A 2 kg object moves at 5 m/s in a circle of radius 4 m — what's its angular momentum in kg·m²/s, as a battery %?",
    officialBattery: 40,
    explanation: 'L = mvr = 2×5×4 = 40，直接就是 40% 電量！',
    explanationEn: "L = mvr = 2×5×4 = 40 — directly 40% battery!",
    category: 'mechanics',
    emoji: '🪐'
  },
  {
    id: 'qk_11',
    title: '質量 2 kg、半徑 6 m 的均勻圓盤對中心軸的轉動慣量是多少 kg·m²，對應多少電量 %？',
    titleEn: "A uniform disk of mass 2 kg and radius 6 m — what's its moment of inertia about the center axis in kg·m², as a battery %?",
    officialBattery: 36,
    explanation: '圓盤 I = ½MR² = ½×2×6² = 36，直接就是 36% 電量！',
    explanationEn: "For a disk, I = ½MR² = ½×2×6² = 36 — directly 36% battery!",
    category: 'mechanics',
    emoji: '💿'
  },
  {
    id: 'qk_12',
    title: '彈簧常數 k = 100 N/m、質量 1 kg 的簡諧振盪系統，角頻率 ω 是多少 rad/s，對應多少電量 %？',
    titleEn: "A spring-mass system with k = 100 N/m and m = 1 kg — what's its angular frequency ω in rad/s, as a battery %?",
    officialBattery: 10,
    explanation: 'ω = √(k/m) = √(100/1) = 10，直接就是 10% 電量！',
    explanationEn: "ω = √(k/m) = √(100/1) = 10 — directly 10% battery!",
    category: 'mechanics',
    emoji: '📳'
  },
  {
    id: 'qk_13',
    title: '質量 3 kg 的物體被舉高 3 m（取 g = 10 m/s²），重力位能是多少焦耳，對應多少電量 %？',
    titleEn: "A 3 kg object is lifted 3 m (g = 10 m/s²) — what's its gravitational PE in joules, as a battery %?",
    officialBattery: 90,
    explanation: 'U = mgh = 3×10×3 = 90，直接就是 90% 電量！',
    explanationEn: "U = mgh = 3×10×3 = 90 — directly 90% battery!",
    category: 'mechanics',
    emoji: '🏔️'
  },
  {
    id: 'qk_14',
    title: '速度 45 m/s 的撞球正面撞上等質量的靜止撞球（完全彈性碰撞），撞後被撞球獲得的速度是多少 m/s，對應多少電量 %？',
    titleEn: "A billiard ball at 45 m/s hits an identical stationary ball head-on (perfectly elastic) — what velocity does the struck ball get in m/s, as a battery %?",
    officialBattery: 45,
    explanation: '等質量彈性碰撞會完整交換速度，被撞球獲得全部 45 m/s，直接就是 45% 電量！',
    explanationEn: "Equal-mass elastic collisions fully exchange velocity — the struck ball gets all 45 m/s — directly 45% battery!",
    category: 'mechanics',
    emoji: '🎱'
  },
  {
    id: 'qk_15',
    title: '施力 17 N 作用 3 秒，產生的衝量是多少 N·s，對應多少電量 %？',
    titleEn: "A 17 N force is applied for 3 seconds — what impulse results in N·s, as a battery %?",
    officialBattery: 51,
    explanation: 'J = FΔt = 17×3 = 51，直接就是 51% 電量！',
    explanationEn: "J = FΔt = 17×3 = 51 — directly 51% battery!",
    category: 'mechanics',
    emoji: '🥊'
  },
  {
    id: 'qk_16',
    title: '質量 5 kg、半徑 6 m 的均勻實心球對中心軸的轉動慣量是多少 kg·m²，對應多少電量 %？',
    titleEn: "A uniform solid sphere of mass 5 kg and radius 6 m — what's its moment of inertia about the center axis in kg·m², as a battery %?",
    officialBattery: 72,
    explanation: '實心球 I = (2/5)MR² = (2/5)×5×6² = 72，直接就是 72% 電量！',
    explanationEn: "For a solid sphere, I = (2/5)MR² = (2/5)×5×6² = 72 — directly 72% battery!",
    category: 'mechanics',
    emoji: '🌍'
  },
  {
    id: 'qk_17',
    title: '轉動慣量 2 kg·m²、角速度 7 rad/s 的物體，轉動動能是多少焦耳，對應多少電量 %？',
    titleEn: "An object with moment of inertia 2 kg·m² and angular velocity 7 rad/s — what's its rotational KE in joules, as a battery %?",
    officialBattery: 49,
    explanation: 'KE = ½Iω² = ½×2×7² = 49，直接就是 49% 電量！',
    explanationEn: "KE = ½Iω² = ½×2×7² = 49 — directly 49% battery!",
    category: 'mechanics',
    emoji: '🎡'
  },
  {
    id: 'qk_18',
    title: '依克卜勒第三定律（取比例常數為 1），公轉半徑 r = 4 的天體，週期 T 是多少，對應多少電量 %？',
    titleEn: "By Kepler's third law (with proportionality constant 1), an orbit of radius r = 4 has what period T, as a battery %?",
    officialBattery: 8,
    explanation: 'T² = r³ = 4³ = 64，T = √64 = 8，直接就是 8% 電量！',
    explanationEn: "T² = r³ = 4³ = 64, so T = √64 = 8 — directly 8% battery!",
    category: 'mechanics',
    emoji: '🛰️'
  },
  {
    id: 'qk_19',
    title: '質量 6 kg 的物體獲得 9 m/s² 的加速度，需要多少牛頓的力，對應多少電量 %？',
    titleEn: "A 6 kg object accelerates at 9 m/s² — how many newtons of force are needed, as a battery %?",
    officialBattery: 54,
    explanation: 'F = ma = 6×9 = 54，直接就是 54% 電量！',
    explanationEn: "F = ma = 6×9 = 54 — directly 54% battery!",
    category: 'mechanics',
    emoji: '🚂'
  },
  {
    id: 'qk_20',
    title: '摩擦係數 μ = 0.3，正向力 250 N，摩擦力是多少牛頓，對應多少電量 %？',
    titleEn: "With friction coefficient μ = 0.3 and normal force 250 N — what's the friction force in newtons, as a battery %?",
    officialBattery: 75,
    explanation: 'f = μN = 0.3×250 = 75，直接就是 75% 電量！',
    explanationEn: "f = μN = 0.3×250 = 75 — directly 75% battery!",
    category: 'mechanics',
    emoji: '🛹'
  },
  {
    id: 'qk_21',
    title: '質量 2 kg 的物體從光滑斜面滑下 3 m 高度（取 g = 10 m/s²），依功能定理其在底部的動能是多少焦耳，對應多少電量 %？',
    titleEn: "A 2 kg object slides down a frictionless incline from 3 m high (g = 10 m/s²) — by the work-energy theorem, what's its KE at the bottom in joules, as a battery %?",
    officialBattery: 60,
    explanation: '無摩擦下 KE = mgh = 2×10×3 = 60，直接就是 60% 電量！',
    explanationEn: "With no friction, KE = mgh = 2×10×3 = 60 — directly 60% battery!",
    category: 'mechanics',
    emoji: '⛷️'
  },
  {
    id: 'qk_22',
    title: '角加速度 7 rad/s²，從靜止開始轉動 9 秒後，角速度是多少 rad/s，對應多少電量 %？',
    titleEn: "With angular acceleration 7 rad/s², starting from rest, what's the angular velocity after 9 seconds in rad/s, as a battery %?",
    officialBattery: 63,
    explanation: 'ω = αt = 7×9 = 63，直接就是 63% 電量！',
    explanationEn: "ω = αt = 7×9 = 63 — directly 63% battery!",
    category: 'mechanics',
    emoji: '🌪️'
  },
  {
    id: 'qk_23',
    title: '質量 6 kg 與 3 kg 的兩物體構成雙體系統，其約化質量是多少 kg，對應多少電量 %？',
    titleEn: "A two-body system consists of 6 kg and 3 kg masses — what's the reduced mass in kg, as a battery %?",
    officialBattery: 2,
    explanation: 'μ = m₁m₂/(m₁+m₂) = (6×3)/9 = 2，直接就是 2% 電量！',
    explanationEn: "μ = m₁m₂/(m₁+m₂) = (6×3)/9 = 2 — directly 2% battery!",
    category: 'mechanics',
    emoji: '⚛️'
  },
  {
    id: 'qk_24',
    title: '小球從 100 m 高處落下彈跳，回彈高度為 9 m，其碰撞恢復係數 e 乘以 100 是多少，對應多少電量 %？',
    titleEn: "A ball dropped from 100 m bounces back up to 9 m — what's its coefficient of restitution e times 100, as a battery %?",
    officialBattery: 30,
    explanation: 'e = √(h₂/h₁) = √(9/100) = 0.3，×100 = 30，直接就是 30% 電量！',
    explanationEn: "e = √(h₂/h₁) = √(9/100) = 0.3; ×100 = 30 — directly 30% battery!",
    category: 'mechanics',
    emoji: '🏀'
  },

  // 📊 經濟學 (Economics) - 23 題
  {
    id: 'qe_1',
    title: '需求函數 P = 20 − Q，市場均衡價格為 10，消費者剩餘（三角形面積）是多少，對應多少電量 %？',
    titleEn: "Demand is P = 20 − Q and the market equilibrium price is 10 — what's the consumer surplus (triangle area), as a battery %?",
    officialBattery: 50,
    explanation: '均衡數量 Q = 10，CS = ½×(20−10)×10 = 50，直接就是 50% 電量！',
    explanationEn: "The equilibrium quantity Q = 10, so CS = ½×(20−10)×10 = 50 — directly 50% battery!",
    category: 'economics',
    emoji: '📊'
  },
  {
    id: 'qe_2',
    title: '供給函數 Q = 2P，市場均衡價格為 10，生產者剩餘是多少，對應多少電量 %？',
    titleEn: "Supply is Q = 2P and the market equilibrium price is 10 — what's the producer surplus, as a battery %?",
    officialBattery: 100,
    explanation: '均衡數量 Q = 20，PS = ½×20×10 = 100，直接就是 100% 滿格電量！',
    explanationEn: "The equilibrium quantity Q = 20, so PS = ½×20×10 = 100 — directly a full 100% battery!",
    category: 'economics',
    emoji: '📈'
  },
  {
    id: 'qe_3',
    title: '獨占廠商面對需求 P = 100 − 2Q，邊際成本 MC = 20，依 MR = MC 利潤最大化的訂價是多少，對應多少電量 %？',
    titleEn: "A monopolist faces demand P = 100 − 2Q with marginal cost MC = 20 — what's the profit-maximizing price (where MR = MC), as a battery %?",
    officialBattery: 60,
    explanation: 'MR = 100−4Q，令 MR=MC 得 Q=20，P = 100−2×20 = 60，直接就是 60% 電量！',
    explanationEn: "MR = 100−4Q; setting MR=MC gives Q=20, so P = 100−2×20 = 60 — directly 60% battery!",
    category: 'economics',
    emoji: '🏛️'
  },
  {
    id: 'qe_4',
    title: '需求 P = 30 − Q、邊際成本 MC = 10，獨占市場相對完全競爭下的無謂損失（死重損失）三角形面積是多少，對應多少電量 %？',
    titleEn: "With demand P = 30 − Q and MC = 10, what's the deadweight loss triangle of monopoly versus perfect competition, as a battery %?",
    officialBattery: 50,
    explanation: '獨占 Q=10、完全競爭 Q=20，DWL = ½×(20−10)×(20−10) = 50，直接就是 50% 電量！',
    explanationEn: "Monopoly output is Q=10, competitive output is Q=20; DWL = ½×(20−10)×(20−10) = 50 — directly 50% battery!",
    category: 'economics',
    emoji: '⚖️'
  },
  {
    id: 'qe_5',
    title: '若經濟成長率為每年 7%，依 70 法則（Rule of 70），GDP 翻倍大約需要幾年，對應多少電量 %？',
    titleEn: "If GDP grows 7% a year, by the Rule of 70, roughly how many years until it doubles, as a battery %?",
    officialBattery: 10,
    explanation: '70 ÷ 7 = 10，直接就是 10% 電量！',
    explanationEn: "70 ÷ 7 = 10 — directly 10% battery!",
    category: 'economics',
    emoji: '📈'
  },
  {
    id: 'qe_6',
    title: '邊際消費傾向 MPC = 0.8，政府支出增加 15 億元，依乘數效果（k = 1/(1−MPC)）總產出增加多少億元，對應多少電量 %？',
    titleEn: "With MPC = 0.8 and a $1.5B increase in government spending, by the multiplier k = 1/(1−MPC), how much does total output rise (in $100M), as a battery %?",
    officialBattery: 75,
    explanation: 'k = 1/(1−0.8) = 5，ΔY = 15×5 = 75，直接就是 75% 電量！',
    explanationEn: "k = 1/(1−0.8) = 5, so ΔY = 15×5 = 75 — directly 75% battery!",
    category: 'economics',
    emoji: '💹'
  },
  {
    id: 'qe_7',
    title: '一項永續年金每年支付 8 萬元，折現率 10%，其現值是多少萬元，對應多少電量 %？',
    titleEn: "A perpetuity pays $80K a year at a 10% discount rate — what's its present value (in $10K), as a battery %?",
    officialBattery: 80,
    explanation: 'PV = C/r = 8/0.1 = 80，直接就是 80% 電量！',
    explanationEn: "PV = C/r = 8/0.1 = 80 — directly 80% battery!",
    category: 'economics',
    emoji: '🏦'
  },
  {
    id: 'qe_8',
    title: '固定成本 800 萬元、每單位售價 50 萬元、變動成本 10 萬元，損益兩平銷售量是多少單位，對應多少電量 %？',
    titleEn: "With fixed costs of $8M, a per-unit price of $500K, and variable cost of $100K — what's the break-even quantity, as a battery %?",
    officialBattery: 20,
    explanation: 'Q = FC/(P−VC) = 800/(50−10) = 20，直接就是 20% 電量！',
    explanationEn: "Q = FC/(P−VC) = 800/(50−10) = 20 — directly 20% battery!",
    category: 'economics',
    emoji: '🧾'
  },
  {
    id: 'qe_9',
    title: '稅收函數 T(t) = t(100−t)，t 為稅率 %，拉弗曲線（Laffer Curve）稅收最大化的稅率是多少 %，對應多少電量 %？',
    titleEn: "Given the tax revenue function T(t) = t(100−t) where t is the tax rate %, what tax rate maximizes revenue on the Laffer Curve, as a battery %?",
    officialBattery: 50,
    explanation: '對 t 微分並令其為 0：100−2t=0，t=50，直接就是 50% 電量！',
    explanationEn: "Differentiating with respect to t and setting it to 0: 100−2t=0, so t=50 — directly 50% battery!",
    category: 'economics',
    emoji: '💰'
  },
  {
    id: 'qe_10',
    title: '消費者效用函數為 Cobb-Douglas 型 U = x^0.4 y^0.6，所得 M = 100，Px = Py = 1，效用最大化下 x 的消費量是多少，對應多少電量 %？',
    titleEn: "A consumer's Cobb-Douglas utility is U = x^0.4 y^0.6, with income M = 100 and Px = Py = 1 — at the utility-maximizing bundle, how much x is consumed, as a battery %?",
    officialBattery: 40,
    explanation: 'Cobb-Douglas 最適解 x* = αM/Px = 0.4×100 = 40，直接就是 40% 電量！',
    explanationEn: "The Cobb-Douglas optimum x* = αM/Px = 0.4×100 = 40 — directly 40% battery!",
    category: 'economics',
    emoji: '🛒'
  },
  {
    id: 'qe_11',
    title: '依購買力平價說（PPP），本國物價指數為 120、外國為 100，本國貨幣理論上應貶值多少 %，對應多少電量 %？',
    titleEn: "By purchasing power parity (PPP), with a domestic price index of 120 and a foreign index of 100, how much should the domestic currency theoretically depreciate, as a battery %?",
    officialBattery: 20,
    explanation: '(120/100 − 1)×100% = 20%，直接就是 20% 電量！',
    explanationEn: "(120/100 − 1)×100% = 20% — directly 20% battery!",
    category: 'economics',
    emoji: '💱'
  },
  {
    id: 'qe_12',
    title: '需求 Qd = 100 − P、供給 Qs = 2P − 40，政府設定價格上限為 30，會產生多少單位短缺，對應多少電量 %？',
    titleEn: "With demand Qd = 100 − P and supply Qs = 2P − 40, a price ceiling of 30 is set — how many units of shortage result, as a battery %?",
    officialBattery: 50,
    explanation: 'Qd=100−30=70，Qs=2×30−40=20，短缺=70−20=50，直接就是 50% 電量！',
    explanationEn: "Qd=100−30=70, Qs=2×30−40=20, shortage=70−20=50 — directly 50% battery!",
    category: 'economics',
    emoji: '🚧'
  },
  {
    id: 'qe_13',
    title: '課徵關稅後進口量為 40 單位，每單位關稅 2 元，關稅收入是多少元，對應多少電量 %？',
    titleEn: "After a tariff, imports total 40 units at $2 per unit — what's the tariff revenue in dollars, as a battery %?",
    officialBattery: 80,
    explanation: 'Revenue = 40×2 = 80，直接就是 80% 電量！',
    explanationEn: "Revenue = 40×2 = 80 — directly 80% battery!",
    category: 'economics',
    emoji: '🛃'
  },
  {
    id: 'qe_14',
    title: '依支出法計算 GDP：C=50、I=20、G=15、X=10、M=5，GDP 是多少，對應多少電量 %？',
    titleEn: "Using the expenditure approach: C=50, I=20, G=15, X=10, M=5 — what's GDP, as a battery %?",
    officialBattery: 90,
    explanation: 'Y = C+I+G+(X−M) = 50+20+15+5 = 90，直接就是 90% 電量！',
    explanationEn: "Y = C+I+G+(X−M) = 50+20+15+5 = 90 — directly 90% battery!",
    category: 'economics',
    emoji: '🏭'
  },
  {
    id: 'qe_15',
    title: '勞動力 200 萬人，失業人數 16 萬人，失業率是多少 %，對應多少電量 %？',
    titleEn: "With a labor force of 2M and 160K unemployed, what's the unemployment rate, as a battery %?",
    officialBattery: 8,
    explanation: 'u = 16/200×100% = 8%，直接就是 8% 電量！',
    explanationEn: "u = 16/200×100% = 8% — directly 8% battery!",
    category: 'economics',
    emoji: '📉'
  },
  {
    id: 'qe_16',
    title: '去年 CPI 為 110，今年為 121，通貨膨脹率是多少 %，對應多少電量 %？',
    titleEn: "Last year's CPI was 110, this year's is 121 — what's the inflation rate, as a battery %?",
    officialBattery: 10,
    explanation: '(121−110)/110×100% = 10%，直接就是 10% 電量！',
    explanationEn: "(121−110)/110×100% = 10% — directly 10% battery!",
    category: 'economics',
    emoji: '🧮'
  },
  {
    id: 'qe_17',
    title: '兩家廠商古諾（Cournot）雙占，需求 P = 90 − Q₁ − Q₂，邊際成本為 0，均衡下各廠商產量是多少，對應多少電量 %？',
    titleEn: "Two firms in Cournot duopoly face demand P = 90 − Q₁ − Q₂ with zero marginal cost — what's each firm's equilibrium output, as a battery %?",
    officialBattery: 30,
    explanation: '對稱均衡下每家產量 q* = a/3 = 90/3 = 30，直接就是 30% 電量！',
    explanationEn: "At the symmetric equilibrium, each firm's output q* = a/3 = 90/3 = 30 — directly 30% battery!",
    category: 'economics',
    emoji: '🏢'
  },
  {
    id: 'qe_18',
    title: '名目 GDP 為 88 億元，GDP 平減指數為 110，實質 GDP 是多少億元，對應多少電量 %？',
    titleEn: "Nominal GDP is $8.8B and the GDP deflator is 110 — what's real GDP (in $100M), as a battery %?",
    officialBattery: 80,
    explanation: 'Real GDP = Nominal/Deflator×100 = 88/1.1 = 80，直接就是 80% 電量！',
    explanationEn: "Real GDP = Nominal/Deflator×100 = 88/1.1 = 80 — directly 80% battery!",
    category: 'economics',
    emoji: '📐'
  },
  {
    id: 'qe_19',
    title: '效用函數 U = x^0.5 y^0.5，在消費組合 (x, y) = (2, 70) 下，邊際替代率 MRS(= y/x) 是多少，對應多少電量 %？',
    titleEn: "With utility U = x^0.5 y^0.5, at the bundle (x, y) = (2, 70), what's the marginal rate of substitution MRS (= y/x), as a battery %?",
    officialBattery: 35,
    explanation: '等權重 Cobb-Douglas 下 MRS = y/x = 70/2 = 35，直接就是 35% 電量！',
    explanationEn: "For equal-weight Cobb-Douglas, MRS = y/x = 70/2 = 35 — directly 35% battery!",
    category: 'economics',
    emoji: '🔁'
  },
  {
    id: 'qe_20',
    title: '一項賭局有 50% 機率贏得 100 元、50% 機率贏得 20 元，期望值是多少元，對應多少電量 %？',
    titleEn: "A gamble pays $100 with 50% probability and $20 with 50% probability — what's the expected value in dollars, as a battery %?",
    officialBattery: 60,
    explanation: 'EV = 0.5×100+0.5×20 = 60，直接就是 60% 電量！',
    explanationEn: "EV = 0.5×100+0.5×20 = 60 — directly 60% battery!",
    category: 'economics',
    emoji: '🎰'
  },
  {
    id: 'qe_21',
    title: '名目利率 8%、通膨率 3%，依費雪方程式（近似）實質利率約為多少 %，對應多少電量 %？',
    titleEn: "With a nominal interest rate of 8% and inflation of 3%, by the (approximate) Fisher equation, what's the real interest rate, as a battery %?",
    officialBattery: 5,
    explanation: 'r ≈ i − π = 8 − 3 = 5，直接就是 5% 電量！',
    explanationEn: "r ≈ i − π = 8 − 3 = 5 — directly 5% battery!",
    category: 'economics',
    emoji: '🏷️'
  },
  {
    id: 'qe_22',
    title: '生產可能疆界（PPF）顯示：全力生產 A 可得 100 單位，全力生產 B 可得 25 單位，每多生產 1 單位 A 的機會成本是多少單位 B（乘以 100 表示），對應多少電量 %？',
    titleEn: "A production possibility frontier (PPF) shows: max output of A is 100 units, max output of B is 25 units — what's the opportunity cost of 1 unit of A in units of B (×100), as a battery %?",
    officialBattery: 25,
    explanation: '機會成本 = 25/100 = 0.25，×100 = 25，直接就是 25% 電量！',
    explanationEn: "Opportunity cost = 25/100 = 0.25; ×100 = 25 — directly 25% battery!",
    category: 'economics',
    emoji: '🔀'
  },
  {
    id: 'qe_23',
    title: '某產業年初產值 10 億元，每年成長率 100%（即每年翻倍），3 年後產值是多少億元，對應多少電量 %？',
    titleEn: "An industry starts the year worth $1B, growing 100% a year (doubling annually) — what's its value after 3 years (in $100M), as a battery %?",
    officialBattery: 80,
    explanation: 'Y = 10×2³ = 80，直接就是 80% 電量！',
    explanationEn: "Y = 10×2³ = 80 — directly 80% battery!",
    category: 'economics',
    emoji: '🚀'
  },

  // 💰 財務數學 (Financial Mathematics) - 23 題
  {
    id: 'qf_1',
    title: '本金 6 萬元，若每年報酬率 100%（即每年翻倍），複利成長 4 年後本利和是多少萬元，對應多少電量 %？',
    titleEn: "A $60K principal grows at 100% annual return (doubling every year) — what's it worth after 4 years compounding (in $10K), as a battery %?",
    officialBattery: 96,
    explanation: 'FV = 6×2⁴ = 6×16 = 96，直接就是 96% 電量！',
    explanationEn: "FV = 6×2⁴ = 6×16 = 96 — directly 96% battery!",
    category: 'finance',
    emoji: '💰'
  },
  {
    id: 'qf_2',
    title: '2 年後可獲得 80 萬元，折現率為每年 100%（即每期折半），其現值是多少萬元，對應多少電量 %？',
    titleEn: "You'll receive $800K in 2 years, discounted at 100% a year (halving each period) — what's its present value (in $10K), as a battery %?",
    officialBattery: 20,
    explanation: 'PV = 80/(1+1)² = 80/4 = 20，直接就是 20% 電量！',
    explanationEn: "PV = 80/(1+1)² = 80/4 = 20 — directly 20% battery!",
    category: 'finance',
    emoji: '🏦'
  },
  {
    id: 'qf_3',
    title: '股利成長模型（Gordon Growth）：明年股利 D₁ = 6 元，折現率 10%，股利成長率 4%，股票理論價值是多少元，對應多少電量 %？',
    titleEn: "Gordon Growth Model: next year's dividend D₁ = $6, discount rate 10%, dividend growth 4% — what's the theoretical stock value in dollars, as a battery %?",
    officialBattery: 100,
    explanation: 'P = D₁/(r−g) = 6/(0.1−0.04) = 100，直接就是 100% 滿格電量！',
    explanationEn: "P = D₁/(r−g) = 6/(0.1−0.04) = 100 — directly a full 100% battery!",
    category: 'finance',
    emoji: '📈'
  },
  {
    id: 'qf_4',
    title: '投資初始成本 50 萬元，一年後現金流入 99 萬元，折現率 10%，此投資的淨現值（NPV）是多少萬元，對應多少電量 %？',
    titleEn: "An investment costs $500K upfront and returns $990K in one year, discounted at 10% — what's its NPV (in $10K), as a battery %?",
    officialBattery: 40,
    explanation: 'NPV = 99/1.1 − 50 = 90 − 50 = 40，直接就是 40% 電量！',
    explanationEn: "NPV = 99/1.1 − 50 = 90 − 50 = 40 — directly 40% battery!",
    category: 'finance',
    emoji: '💵'
  },
  {
    id: 'qf_5',
    title: '零息債券面額 64 萬元，3 年後到期，折現率為每年 100%，其發行時的合理價格是多少萬元，對應多少電量 %？',
    titleEn: "A zero-coupon bond with $640K face value matures in 3 years, discounted at 100% a year — what's its fair issue price (in $10K), as a battery %?",
    officialBattery: 8,
    explanation: 'P = 64/(1+1)³ = 64/8 = 8，直接就是 8% 電量！',
    explanationEn: "P = 64/(1+1)³ = 64/8 = 8 — directly 8% battery!",
    category: 'finance',
    emoji: '🪙'
  },
  {
    id: 'qf_6',
    title: '債券票面利率 8%、面額 100 元、到期一年，若市場折現率也是 8%（平價債券），該債券的合理價格是多少元，對應多少電量 %？',
    titleEn: "A bond has an 8% coupon, $100 face value, matures in 1 year, and the market rate is also 8% (a par bond) — what's its fair price in dollars, as a battery %?",
    officialBattery: 100,
    explanation: '平價債券：P = (8+100)/1.08 = 100，直接就是 100% 滿格電量！',
    explanationEn: "A par bond: P = (8+100)/1.08 = 100 — directly a full 100% battery!",
    category: 'finance',
    emoji: '💎'
  },
  {
    id: 'qf_7',
    title: '若年利率為 8%，依 72 法則（Rule of 72），本金翻倍大約需要多少年，對應多少電量 %？',
    titleEn: "At an 8% annual interest rate, by the Rule of 72, roughly how many years until your money doubles, as a battery %?",
    officialBattery: 9,
    explanation: '72 ÷ 8 = 9，直接就是 9% 電量！',
    explanationEn: "72 ÷ 8 = 9 — directly 9% battery!",
    category: 'finance',
    emoji: '⏳'
  },
  {
    id: 'qf_8',
    title: '名目年利率 20%、每半年複利一次，實際年利率（EAR）是多少 %，對應多少電量 %？',
    titleEn: "A nominal annual rate of 20%, compounded semi-annually — what's the effective annual rate (EAR), as a battery %?",
    officialBattery: 21,
    explanation: 'EAR = (1+0.1)²−1 = 0.21，×100 = 21，直接就是 21% 電量！',
    explanationEn: "EAR = (1+0.1)²−1 = 0.21; ×100 = 21 — directly 21% battery!",
    category: 'finance',
    emoji: '📆'
  },
  {
    id: 'qf_9',
    title: '依資本資產定價模型（CAPM），無風險利率 4%、β係數 1.6、市場風險溢酬（Rm−Rf）為 35%，此資產的預期報酬率是多少 %，對應多少電量 %？',
    titleEn: "By CAPM, with a risk-free rate of 4%, beta of 1.6, and market risk premium of 35% — what's the asset's expected return, as a battery %?",
    officialBattery: 60,
    explanation: 'E(R) = 4+1.6×35 = 60，直接就是 60% 電量！',
    explanationEn: "E(R) = 4+1.6×35 = 60 — directly 60% battery!",
    category: 'finance',
    emoji: '📉'
  },
  {
    id: 'qf_10',
    title: '公司權益佔比 60%、權益成本 15%；負債佔比 40%、負債成本 10%，稅率 25%，其加權平均資金成本（WACC）是多少 %，對應多少電量 %？',
    titleEn: "A company is 60% equity (cost 15%) and 40% debt (cost 10%), with a 25% tax rate — what's its WACC, as a battery %?",
    officialBattery: 12,
    explanation: 'WACC = 0.6×15+0.4×10×(1−0.25) = 9+3 = 12，直接就是 12% 電量！',
    explanationEn: "WACC = 0.6×15+0.4×10×(1−0.25) = 9+3 = 12 — directly 12% battery!",
    category: 'finance',
    emoji: '🏗️'
  },
  {
    id: 'qf_11',
    title: '公司資產報酬率（ROA）為 10%，負債/權益比為 1，負債利率 6%（不考慮稅），依財務槓桿公式，權益報酬率（ROE）是多少 %，對應多少電量 %？',
    titleEn: "A company has ROA of 10%, a debt/equity ratio of 1, and 6% debt cost (ignoring tax) — by the leverage formula, what's the ROE, as a battery %?",
    officialBattery: 14,
    explanation: 'ROE = ROA+(D/E)×(ROA−Rd) = 10+1×(10−6) = 14，直接就是 14% 電量！',
    explanationEn: "ROE = ROA+(D/E)×(ROA−Rd) = 10+1×(10−6) = 14 — directly 14% battery!",
    category: 'finance',
    emoji: '⚡'
  },
  {
    id: 'qf_12',
    title: '本金 10 萬元，採連續複利，年利率 100%，經過 2 年，本利和的整數部分是多少萬元，對應多少電量 %？',
    titleEn: "A $100K principal compounds continuously at 100% annual rate — after 2 years, what's the integer part of its value (in $10K), as a battery %?",
    officialBattery: 73,
    explanation: 'FV = 10×e² ≈ 10×7.389 = 73.89，取整數部分 73，直接就是 73% 電量！',
    explanationEn: "FV = 10×e² ≈ 10×7.389 = 73.89 — the integer part is 73, directly 73% battery!",
    category: 'finance',
    emoji: '🔥'
  },
  {
    id: 'qf_13',
    title: '為了在 3 年後累積 90 萬元償債基金（不考慮利息），每年應提撥多少萬元，對應多少電量 %？',
    titleEn: "To accumulate a $900K sinking fund in 3 years (ignoring interest), how much should be set aside each year (in $10K), as a battery %?",
    officialBattery: 30,
    explanation: 'A = 90÷3 = 30，直接就是 30% 電量！',
    explanationEn: "A = 90÷3 = 30 — directly 30% battery!",
    category: 'finance',
    emoji: '🗄️'
  },
  {
    id: 'qf_14',
    title: '名目利率 32%、通膨率 10%，依精確費雪方程式 (1+r)=(1+i)/(1+π)，實質利率是多少 %，對應多少電量 %？',
    titleEn: "With a nominal rate of 32% and inflation of 10%, by the exact Fisher equation (1+r)=(1+i)/(1+π), what's the real interest rate, as a battery %?",
    officialBattery: 20,
    explanation: '(1.32/1.10−1)×100% = 20%，直接就是 20% 電量！',
    explanationEn: "(1.32/1.10−1)×100% = 20% — directly 20% battery!",
    category: 'finance',
    emoji: '🏷️'
  },
  {
    id: 'qf_15',
    title: '普通年金終值為 64 萬元，利率 25%，改為期初給付的年金到期（Annuity Due）終值是多少萬元，對應多少電量 %？',
    titleEn: "An ordinary annuity's future value is $640K at 25% interest — what's the future value as an annuity due (paid at period start), in $10K, as a battery %?",
    officialBattery: 80,
    explanation: 'FV_due = FV_ordinary×(1+r) = 64×1.25 = 80，直接就是 80% 電量！',
    explanationEn: "FV_due = FV_ordinary×(1+r) = 64×1.25 = 80 — directly 80% battery!",
    category: 'finance',
    emoji: '🧮'
  },
  {
    id: 'qf_16',
    title: '名目金額 124 萬元，該期間累積通膨率 55%，其實質購買力相當於多少萬元，對應多少電量 %？',
    titleEn: "A nominal amount of $1.24M, with 55% cumulative inflation over the period — what's its real purchasing power (in $10K), as a battery %?",
    officialBattery: 80,
    explanation: 'Real = 124/1.55 = 80，直接就是 80% 電量！',
    explanationEn: "Real = 124/1.55 = 80 — directly 80% battery!",
    category: 'finance',
    emoji: '📊'
  },
  {
    id: 'qf_17',
    title: '投資組合 60% 配置於報酬率 12% 的資產 A、40% 配置於報酬率 7% 的資產 B，投資組合的預期報酬率是多少 %，對應多少電量 %？',
    titleEn: "A portfolio is 60% in asset A (12% return) and 40% in asset B (7% return) — what's the portfolio's expected return, as a battery %?",
    officialBattery: 10,
    explanation: 'Rp = 0.6×12+0.4×7 = 10，直接就是 10% 電量！',
    explanationEn: "Rp = 0.6×12+0.4×7 = 10 — directly 10% battery!",
    category: 'finance',
    emoji: '📁'
  },
  {
    id: 'qf_18',
    title: '買入一口買權（Call Option），履約價 70 元、權利金 15 元，此買權的損益兩平點（股價）是多少元，對應多少電量 %？',
    titleEn: "You buy a call option with a $70 strike price and $15 premium — what's its breakeven stock price in dollars, as a battery %?",
    officialBattery: 85,
    explanation: 'Breakeven = Strike+Premium = 70+15 = 85，直接就是 85% 電量！',
    explanationEn: "Breakeven = Strike+Premium = 70+15 = 85 — directly 85% battery!",
    category: 'finance',
    emoji: '📈'
  },
  {
    id: 'qf_19',
    title: '買入一口賣權（Put Option），履約價 90 元、標的現價 55 元，該賣權的內含價值（Intrinsic Value）是多少元，對應多少電量 %？',
    titleEn: "You buy a put option with a $90 strike price when the stock trades at $55 — what's its intrinsic value in dollars, as a battery %?",
    officialBattery: 35,
    explanation: 'Intrinsic = Strike−Spot = 90−55 = 35，直接就是 35% 電量！',
    explanationEn: "Intrinsic = Strike−Spot = 90−55 = 35 — directly 35% battery!",
    category: 'finance',
    emoji: '📉'
  },
  {
    id: 'qf_20',
    title: '公司總資產 100 億元、負債 35 億元，負債比率（Debt-to-Asset Ratio）是多少 %，對應多少電量 %？',
    titleEn: "A company has $10B in total assets and $3.5B in debt — what's its debt-to-asset ratio, as a battery %?",
    officialBattery: 35,
    explanation: 'Debt Ratio = 35/100×100% = 35%，直接就是 35% 電量！',
    explanationEn: "Debt Ratio = 35/100×100% = 35% — directly 35% battery!",
    category: 'finance',
    emoji: '⚖️'
  },
  {
    id: 'qf_21',
    title: '每年年底存入 5 萬元、年利率 100%，存 4 年後依年金終值公式，本利和是多少萬元，對應多少電量 %？',
    titleEn: "You deposit $50K at the end of each year at 100% interest — by the annuity future-value formula, what's the total after 4 years (in $10K), as a battery %?",
    officialBattery: 75,
    explanation: 'FV = 5×((1+1)⁴−1)/1 = 5×15 = 75，直接就是 75% 電量！',
    explanationEn: "FV = 5×((1+1)⁴−1)/1 = 5×15 = 75 — directly 75% battery!",
    category: 'finance',
    emoji: '🏦'
  },
  {
    id: 'qf_22',
    title: '若通膨率為每年 7%，依 70 法則，貨幣購買力減半大約需要多少年，對應多少電量 %？',
    titleEn: "At 7% inflation a year, by the Rule of 70, roughly how many years until money's purchasing power halves, as a battery %?",
    officialBattery: 10,
    explanation: '70 ÷ 7 = 10，直接就是 10% 電量！',
    explanationEn: "70 ÷ 7 = 10 — directly 10% battery!",
    category: 'finance',
    emoji: '💸'
  },
  {
    id: 'qf_23',
    title: '一年期國庫券面額 100 萬元，目前價格 80 萬元，其到期殖利率是多少 %，對應多少電量 %？',
    titleEn: "A 1-year T-bill has a $1M face value and currently trades at $800K — what's its yield to maturity, as a battery %?",
    officialBattery: 25,
    explanation: 'Yield = (100−80)/80×100% = 25%，直接就是 25% 電量！',
    explanationEn: "Yield = (100−80)/80×100% = 25% — directly 25% battery!",
    category: 'finance',
    emoji: '🧾'
  },

  // 🖥️ 資工／程式 (CS / Programming) - 20 題
  {
    id: 'qc_1',
    title: '執行以下 Python 程式後，x 是多少電量 %？',
    titleEn: "After running this Python code, what is x, as a battery %?",
    code: `x = 0
for i in range(1, 11):
    x += i
print(x)`,
    officialBattery: 55,
    explanation: '迴圈把 1 累加到 10，x = 1+2+...+10 = 55，直接就是 55% 電量！',
    explanationEn: "The loop sums 1 through 10: x = 1+2+...+10 = 55 — directly 55% battery!",
    category: 'cs',
    emoji: '🖥️'
  },
  {
    id: 'qc_2',
    title: '執行以下 Python 程式後，x 是多少電量 %？',
    titleEn: "After running this Python code, what is x, as a battery %?",
    code: `x = 0
for i in range(5):
    for j in range(5):
        if i == j:
            x += (i + 1) * 4
print(x)`,
    officialBattery: 60,
    explanation: '只有 i==j（對角線）那 5 次會加總：(1+2+3+4+5)×4 = 15×4 = 60，直接就是 60% 電量！',
    explanationEn: "Only the 5 diagonal hits (i==j) add anything: (1+2+3+4+5)×4 = 15×4 = 60 — directly 60% battery!",
    category: 'cs',
    emoji: '🔁'
  },
  {
    id: 'qc_3',
    title: '執行以下 Python 遞迴程式後，x 是多少電量 %？',
    titleEn: "After running this recursive Python code, what is x, as a battery %?",
    code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

x = fib(9)
print(x)`,
    officialBattery: 34,
    explanation: '費氏數列：0,1,1,2,3,5,8,13,21,34...，fib(9) = 34，直接就是 34% 電量！',
    explanationEn: "The Fibonacci sequence goes 0,1,1,2,3,5,8,13,21,34... — fib(9) = 34, directly 34% battery!",
    category: 'cs',
    emoji: '🌀'
  },
  {
    id: 'qc_4',
    title: '在 1~100 的已排序陣列上對 target=37 做二元搜尋，執行後 steps 是多少電量 %？',
    titleEn: "Binary-searching a sorted 1–100 array for target=37 — after running, what is steps, as a battery %?",
    code: `arr = list(range(1, 101))
lo, hi, steps = 0, len(arr) - 1, 0
target = 37
while lo <= hi:
    steps += 1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        break
    elif arr[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1
print(steps)`,
    officialBattery: 3,
    explanation: '第一次 mid=50（太大），第二次 mid=24（太小），第三次 mid=37 命中，steps=3，直接就是 3% 電量！',
    explanationEn: "First mid=50 (too high), second mid=24 (too low), third mid=37 hits — steps=3, directly 3% battery!",
    category: 'cs',
    emoji: '🔍'
  },
  {
    id: 'qc_5',
    title: '執行以下後序表達式求值程式後，x 是多少電量 %？',
    titleEn: "After evaluating this postfix expression with a stack, what is x, as a battery %?",
    code: `tokens = ['3', '4', '+', '2', '*', '7', '-']
stack = []
for t in tokens:
    if t.isdigit():
        stack.append(int(t))
    else:
        b, a = stack.pop(), stack.pop()
        if t == '+': stack.append(a + b)
        elif t == '-': stack.append(a - b)
        elif t == '*': stack.append(a * b)
x = stack.pop()
print(x)`,
    officialBattery: 7,
    explanation: '堆疊逐步運算：(3+4)=7，7×2=14，14-7=7，x=7，直接就是 7% 電量！',
    explanationEn: "Working the stack: (3+4)=7, 7×2=14, 14-7=7 — x=7, directly 7% battery!",
    category: 'cs',
    emoji: '📚'
  },
  {
    id: 'qc_6',
    title: '對以下樹做 BFS（廣度優先）走訪，執行後 visited 的節點值總和是多少電量 %？',
    titleEn: "Running BFS on this tree — after it finishes, what is the sum of visited node values, as a battery %?",
    code: `from collections import deque
tree = {1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: []}
q = deque([1])
visited = 0
while q:
    node = q.popleft()
    visited += node
    for child in tree[node]:
        q.append(child)
print(visited)`,
    officialBattery: 21,
    explanation: 'BFS 依序拜訪節點 1,2,3,4,5,6，總和 = 1+2+3+4+5+6 = 21，直接就是 21% 電量！',
    explanationEn: "BFS visits nodes in order 1,2,3,4,5,6, summing to 1+2+3+4+5+6 = 21 — directly 21% battery!",
    category: 'cs',
    emoji: '🌳'
  },
  {
    id: 'qc_7',
    title: '對陣列 [5,3,8,4,2] 做氣泡排序，執行後 swaps 是多少電量 %？',
    titleEn: "Bubble-sorting the array [5,3,8,4,2] — after it finishes, what is swaps, as a battery %?",
    code: `arr = [5, 3, 8, 4, 2]
swaps = 0
for i in range(len(arr)):
    for j in range(len(arr) - 1 - i):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]
            swaps += 1
print(swaps)`,
    officialBattery: 7,
    explanation: '逐輪追蹤交換次數：[5,3,8,4,2] 排序成 [2,3,4,5,8] 總共需要 7 次相鄰交換，直接就是 7% 電量！',
    explanationEn: "Tracking every adjacent swap as [5,3,8,4,2] sorts into [2,3,4,5,8] takes 7 swaps total — directly 7% battery!",
    category: 'cs',
    emoji: '🫧'
  },
  {
    id: 'qc_8',
    title: '對已排序陣列用雙指標找 target=14 的配對數，執行後 count 是多少電量 %？',
    titleEn: "Two-pointer counting pairs summing to target=14 in a sorted array — after running, what is count, as a battery %?",
    code: `arr = [1, 2, 3, 4, 6, 8, 9, 11, 13, 15]
target = 14
lo, hi, count = 0, len(arr) - 1, 0
while lo < hi:
    s = arr[lo] + arr[hi]
    if s == target:
        count += 1
        lo += 1
        hi -= 1
    elif s < target:
        lo += 1
    else:
        hi -= 1
print(count)`,
    officialBattery: 3,
    explanation: '找到的配對是 (1,13)、(3,11)、(6,8)，count=3，直接就是 3% 電量！',
    explanationEn: "The matching pairs found are (1,13), (3,11), (6,8) — count=3, directly 3% battery!",
    category: 'cs',
    emoji: '👉'
  },
  {
    id: 'qc_9',
    title: '執行以下位元運算程式後，x 是多少電量 %？',
    titleEn: "After running this bit-manipulation code, what is x, as a battery %?",
    code: `x = sum(bin(i).count('1') for i in range(1, 21))
print(x)`,
    officialBattery: 42,
    explanation: '把 1~20 每個數字轉成二進位後數 1 的個數再全部加總，結果是 42，直接就是 42% 電量！',
    explanationEn: "Converting 1 through 20 to binary and summing every set bit gives 42 — directly 42% battery!",
    category: 'cs',
    emoji: '🔢'
  },
  {
    id: 'qc_10',
    title: '執行以下字串詞頻統計程式後，x 是多少電量 %？',
    titleEn: "After running this character-frequency count, what is x, as a battery %?",
    code: `from collections import Counter
s = "abracadabra"
c = Counter(s)
x = max(c.values()) * 10
print(x)`,
    officialBattery: 50,
    explanation: '"abracadabra" 中 "a" 出現最多次，共 5 次，5×10 = 50，直接就是 50% 電量！',
    explanationEn: '"a" is the most frequent character in "abracadabra", appearing 5 times: 5×10 = 50 — directly 50% battery!',
    category: 'cs',
    emoji: '🔤'
  },
  {
    id: 'qc_11',
    title: '執行以下串列生成式程式後，x 是多少電量 %？',
    titleEn: "After running this list comprehension, what is x, as a battery %?",
    code: `x = sum(i * i for i in range(1, 8)) % 100
print(x)`,
    officialBattery: 40,
    explanation: '1²+2²+...+7² = 140，140 % 100 = 40，直接就是 40% 電量！',
    explanationEn: "1²+2²+...+7² = 140, and 140 % 100 = 40 — directly 40% battery!",
    category: 'cs',
    emoji: '🧮'
  },
  {
    id: 'qc_12',
    title: '執行以下河內塔遞迴程式後，x（6 個盤子的最少移動步數）是多少電量 %？',
    titleEn: "After running this Tower of Hanoi recursion, what is x (minimum moves for 6 disks), as a battery %?",
    code: `def hanoi(n):
    if n == 0:
        return 0
    return 2 * hanoi(n - 1) + 1

x = hanoi(6)
print(x)`,
    officialBattery: 63,
    explanation: 'n 個盤子的河內塔最少步數是 2ⁿ-1，2⁶-1 = 63，直接就是 63% 電量！',
    explanationEn: "The minimum moves for n disks is 2ⁿ-1; 2⁶-1 = 63 — directly 63% battery!",
    category: 'cs',
    emoji: '🗼'
  },
  {
    id: 'qc_13',
    title: '執行以下動態規劃走格子程式後，x（5×5 網格的路徑數）是多少電量 %？',
    titleEn: "After running this dynamic-programming grid-path code, what is x (paths across a 5×5 grid), as a battery %?",
    code: `rows, cols = 5, 5
dp = [[1] * cols for _ in range(rows)]
for i in range(1, rows):
    for j in range(1, cols):
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
x = dp[rows - 1][cols - 1]
print(x)`,
    officialBattery: 70,
    explanation: '只能往右或往下走的路徑數是組合數 C(8,4) = 70，直接就是 70% 電量！',
    explanationEn: "The number of right/down-only paths is the combination C(8,4) = 70 — directly 70% battery!",
    category: 'cs',
    emoji: '🧩'
  },
  {
    id: 'qc_14',
    title: '在以下圖上找出 2 步以內可達的節點數，執行後 count 是多少電量 %？',
    titleEn: "Counting nodes reachable within 2 hops on this graph — after running, what is count, as a battery %?",
    code: `from collections import deque
graph = {1: [2, 3], 2: [4], 3: [4, 5], 4: [6], 5: [6], 6: []}
q = deque([(1, 0)])
seen = {1}
count = 0
while q:
    node, d = q.popleft()
    if d > 0:
        count += 1
    if d < 2:
        for nb in graph[node]:
            if nb not in seen:
                seen.add(nb)
                q.append((nb, d + 1))
print(count)`,
    officialBattery: 4,
    explanation: '從節點 1 出發 2 步內可達 2,3（第 1 步）與 4,5（第 2 步），count=4，直接就是 4% 電量！',
    explanationEn: "From node 1, within 2 hops it reaches 2,3 (hop 1) and 4,5 (hop 2) — count=4, directly 4% battery!",
    category: 'cs',
    emoji: '🕸️'
  },
  {
    id: 'qc_15',
    title: '對陣列 [9,4,7,1,3,6] 做選擇排序，執行後 comparisons 是多少電量 %？',
    titleEn: "Selection-sorting the array [9,4,7,1,3,6] — after it finishes, what is comparisons, as a battery %?",
    code: `arr = [9, 4, 7, 1, 3, 6]
comparisons = 0
n = len(arr)
for i in range(n):
    min_idx = i
    for j in range(i + 1, n):
        comparisons += 1
        if arr[j] < arr[min_idx]:
            min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
print(comparisons)`,
    officialBattery: 15,
    explanation: '每一輪內圈比較次數是 5+4+3+2+1 = 15（選擇排序的比較次數只看陣列長度，跟數值無關），直接就是 15% 電量！',
    explanationEn: "The inner-loop comparisons per pass add up to 5+4+3+2+1 = 15 (selection sort's comparison count depends only on array length) — directly 15% battery!",
    category: 'cs',
    emoji: '📊'
  },
  {
    id: 'qc_16',
    title: '執行以下埃拉托斯特尼篩法程式後，x（100 以內質數個數）是多少電量 %？',
    titleEn: "After running this Sieve of Eratosthenes, what is x (primes under 100), as a battery %?",
    code: `N = 100
sieve = [True] * (N + 1)
sieve[0] = sieve[1] = False
for i in range(2, int(N ** 0.5) + 1):
    if sieve[i]:
        for j in range(i * i, N + 1, i):
            sieve[j] = False
x = sum(sieve)
print(x)`,
    officialBattery: 25,
    explanation: '100 以內（含 100）的質數共有 25 個，直接就是 25% 電量！',
    explanationEn: "There are 25 primes at or below 100 — directly 25% battery!",
    category: 'cs',
    emoji: '🎯'
  },
  {
    id: 'qc_17',
    title: '執行以下輾轉相除法（歐幾里得演算法）程式後，x 是多少電量 %？',
    titleEn: "After running this Euclidean algorithm, what is x, as a battery %?",
    code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

x = gcd(1071, 462)
print(x)`,
    officialBattery: 21,
    explanation: '1071 和 462 的最大公因數是 21，直接就是 21% 電量！',
    explanationEn: "The greatest common divisor of 1071 and 462 is 21 — directly 21% battery!",
    category: 'cs',
    emoji: '➗'
  },
  {
    id: 'qc_18',
    title: '走訪以下用字典模擬的鏈結串列，執行後 total 是多少電量 %？',
    titleEn: "Traversing this dict-simulated linked list — after running, what is total, as a battery %?",
    code: `nodes = {1: (10, 2), 2: (20, 3), 3: (30, 4), 4: (40, None)}
cur, total = 1, 0
while cur is not None:
    val, nxt = nodes[cur]
    total += val
    cur = nxt
print(total)`,
    officialBattery: 100,
    explanation: '依序走訪節點值 10,20,30,40，total = 10+20+30+40 = 100，剛好是 100% 滿格電量！',
    explanationEn: "Walking the node values 10,20,30,40 in order: total = 10+20+30+40 = 100 — a full 100% battery!",
    category: 'cs',
    emoji: '🔗'
  },
  {
    id: 'qc_19',
    title: '執行以下矩陣主對角線加總程式後，x 是多少電量 %？',
    titleEn: "After summing this matrix's main diagonal, what is x, as a battery %?",
    code: `matrix = [[i * 5 + j + 1 for j in range(5)] for i in range(5)]
x = sum(matrix[i][i] for i in range(5))
print(x)`,
    officialBattery: 65,
    explanation: '5×5 矩陣的主對角線元素是 1,7,13,19,25，總和 = 65，直接就是 65% 電量！',
    explanationEn: "The main diagonal of the 5×5 matrix is 1,7,13,19,25, summing to 65 — directly 65% battery!",
    category: 'cs',
    emoji: '🔲'
  },
  {
    id: 'qc_20',
    title: '用貪婪演算法為 63 元找零（硬幣：25,10,5,1），執行後 count（最少硬幣數）是多少電量 %？',
    titleEn: "Greedily making change for 63 with coins [25,10,5,1] — after running, what is count (fewest coins), as a battery %?",
    code: `coins = [25, 10, 5, 1]
amount = 63
count = 0
for c in coins:
    count += amount // c
    amount %= c
print(count)`,
    officialBattery: 6,
    explanation: '63 = 2×25 + 1×10 + 0×5 + 3×1，共用了 2+1+0+3 = 6 枚硬幣，直接就是 6% 電量！',
    explanationEn: "63 = 2×25 + 1×10 + 0×5 + 3×1, using 2+1+0+3 = 6 coins total — directly 6% battery!",
    category: 'cs',
    emoji: '🪙'
  },
];

export const CATEGORY_LABELS: Record<string, { label: string; labelEn: string; icon: string }> = {
  all: { label: '全部題目', labelEn: 'All', icon: '🎲' },
  calculus: { label: '微積分', labelEn: 'Calculus', icon: '∫' },
  geometry: { label: '幾何與向量', labelEn: 'Geometry', icon: '📐' },
  algebra: { label: '代數與機率', labelEn: 'Algebra', icon: '🎲' },
  mechanics: { label: '五大力學', labelEn: 'Mechanics', icon: '⚙️' },
  economics: { label: '經濟學', labelEn: 'Economics', icon: '📊' },
  finance: { label: '財務數學', labelEn: 'Finance', icon: '💰' },
  cs: { label: '資工／程式', labelEn: 'CS / Code', icon: '🖥️' },
  custom: { label: '自訂題庫', labelEn: 'Custom', icon: '✏️' }
};
