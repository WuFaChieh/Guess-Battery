import { Question } from '../types/game';

export const INITIAL_QUESTIONS: Question[] = [
  // 🤓 硬核數學與微分方程 (Hardcore Math & Differential Equations) - 40 題
  {
    id: 'qm_1',
    title: '微分方程 dy/dx + 3y = 300 (已知 y(0)=0)，當 x→∞ 時 y 的穩態值是多少電量 %？',
    officialBattery: 100,
    explanation: '解出 y(x) = 100(1 - e^(-3x))，當 x→∞ 時 y 趨近於 100！剛好是 100% 滿格電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_2',
    title: '微分方程 dy/dx = y (已知 y(0)=1)，求 x = 1 時 y(1) 的數值小數點後前兩位是多少電量 %？',
    officialBattery: 71,
    explanation: '解出 y(1) = e ≈ 2.71828... 小數點後前兩位正是 71%！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_3',
    title: '計算定積分 ∫[0 to 1] 100x³ dx 的結果是多少電量 %？',
    officialBattery: 25,
    explanation: '積分公式 [25x⁴] 從 0 到 1 等於 25，直接就是 25% 電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_4',
    title: '計算定積分 ∫[0 to π] 10sin(x) dx 的結果是多少電量 %？',
    officialBattery: 20,
    explanation: '[-10cos x] 從 0 到 π 等於 10 - (-10) = 20，直接就是 20% 電量！',
    category: 'math',
    emoji: '🌊'
  },
  {
    id: 'qm_5',
    title: '黃金分割率 φ = (1+√5)/2，取小數點後前兩位是多少電量 %？',
    officialBattery: 61,
    explanation: '黃金比例 φ ≈ 1.618033... 小數點後前兩位正是 61% 電量！',
    category: 'math',
    emoji: '🌀'
  },
  {
    id: 'qm_6',
    title: '複數 100e^(iπ) 的模長 |100e^(iπ)| 是多少電量 %？',
    officialBattery: 100,
    explanation: '歐拉恆等式 e^(iπ) = -1，所以 100e^(iπ) = -100，其模長 |-100| = 100，直接滿格 100% 能量！',
    category: 'math',
    emoji: '🧮'
  },
  {
    id: 'qm_7',
    title: '求極限 lim(x→∞) (1 + 1/x)^x 取小數點後前兩位是多少電量 %？',
    officialBattery: 71,
    explanation: '經典自然對數底數極限結果為 e ≈ 2.71828... 小數點後前兩位是 71%！',
    category: 'math',
    emoji: '🎯'
  },
  {
    id: 'qm_8',
    title: '二階微分方程 y\'\' - 33y\' + 90y = 0 的較大特徵根是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵方程 r² - 33r + 90 = 0 解得 r = 3 與 30！較大特徵根直接就是 30% 電量！',
    category: 'math',
    emoji: '🔍'
  },
  {
    id: 'qm_9',
    title: '矩陣 A = [[40, 10], [2, 3]] 的行列式 det(A) 是多少電量 %？',
    officialBattery: 100,
    explanation: 'det(A) = 40×3 - 2×10 = 120 - 20 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🔲'
  },
  {
    id: 'qm_10',
    title: '計算瑕積分 ∫[0 to ∞] 100e^(-x) dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[-100e^(-x)] 從 0 到 ∞ 等於 0 - (-100) = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '⚡'
  },
  {
    id: 'qm_11',
    title: '求極限 lim(x→0) 100(1 - cos x)/x² 的結果是多少電量 %？',
    officialBattery: 50,
    explanation: '洛必達法則或泰勒展開，原極限為 1/2，乘以 100 後結果為 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '⚖️'
  },
  {
    id: 'qm_12',
    title: '複數 z = 30 + 40i 的模長 |z| 是多少電量 %？',
    officialBattery: 50,
    explanation: '勾股定理模長 |z| = √(30² + 40²) = √2500 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_13',
    title: '求二階常微分方程 y\'\' + y = 0 的通解週期 T (T = 2π) 小數點後前兩位是多少電量 %？',
    officialBattery: 28,
    explanation: '簡諧運動週期 2π ≈ 6.28318... 小數點後前兩位正是 28%！',
    category: 'math',
    emoji: '🔄'
  },
  {
    id: 'qm_14',
    title: '單位圓 x² + y² ≤ 1 的面積小數點後前兩位是多少電量 %？',
    officialBattery: 14,
    explanation: '單位圓面積 A = π ≈ 3.14159... 小數點後前兩位正是 14%！',
    category: 'math',
    emoji: '⚪'
  },
  {
    id: 'qm_15',
    title: '投擲兩顆公正骰子，點數之和等於 7 的概率轉為百分比（取整數）是多少 %？',
    officialBattery: 16,
    explanation: '組合為 (1,6),(2,5),(3,4)... 共 6/36 = 1/6 ≈ 16.66%，取整數 16%！',
    category: 'math',
    emoji: '🎲'
  },
  {
    id: 'qm_16',
    title: '曲線 y = 100/x 從 x = 1 到 x = e 的曲邊梯形面積是多少電量 %？',
    officialBattery: 100,
    explanation: '∫[1 to e] 100/x dx = 100(ln(e) - ln(1)) = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '📉'
  },
  {
    id: 'qm_17',
    title: '正五邊形的每一個內角角度佔平角 (180°) 的百分比是多少 %？',
    officialBattery: 60,
    explanation: '正五邊形內角為 108°，108 / 180 = 0.60，即 60% 電量！',
    category: 'math',
    emoji: '⬟'
  },
  {
    id: 'qm_18',
    title: '計算定積分 ∫[0 to π/4] 100sec²(x) dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[100tan x] 從 0 到 π/4 等於 100tan(π/4) - 0 = 100，直接就是 100% 電量！',
    category: 'math',
    emoji: '✨'
  },
  {
    id: 'qm_19',
    title: '求極限 lim(x→0) 100(x - sin x)/x³ 的結果（取整數）是多少電量 %？',
    officialBattery: 16,
    explanation: '泰勒展開 x - sin x ≈ x³/6，乘以 100 後極限為 100/6 ≈ 16.66，取整數 16% 電量！',
    category: 'math',
    emoji: '🔬'
  },
  {
    id: 'qm_20',
    title: '單位球體 x² + y² + z² ≤ 1 的體積 V = 4π/3，其小數點後前兩位是多少電量 %？',
    officialBattery: 18,
    explanation: 'V = 4π/3 ≈ 4.18879... 小數點後前兩位正是 18%！',
    category: 'math',
    emoji: '🔮'
  },
  {
    id: 'qm_21',
    title: '對數方程 log₁₀(x) = 2 的解 x 是多少電量 %？',
    officialBattery: 100,
    explanation: 'x = 10² = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🔢'
  },
  {
    id: 'qm_22',
    title: '黎曼 Zeta 函數 ζ(2) = π²/6，其小數點後前兩位是多少電量 %？',
    officialBattery: 64,
    explanation: '巴塞爾問題解答 π²/6 ≈ 1.64493... 小數點後前兩位正是 64%！',
    category: 'math',
    emoji: '🌌'
  },
  {
    id: 'qm_23',
    title: '微分方程 dy/dx = -2y (已知 y(0)=100)，當 x = 1 時 y(1) 的數值取整數是多少 %？',
    officialBattery: 13,
    explanation: 'y(1) = 100 × e^(-2) ≈ 100 × 0.1353 = 13.53%，取整數 13%！',
    category: 'math',
    emoji: '📉'
  },
  {
    id: 'qm_24',
    title: '熱傳導微分方程 ∂u/∂t = α ∇²u 在無限長時間熱平衡後，閉合系統的熱分配電量是幾 %？',
    officialBattery: 50,
    explanation: '熱力學第二定律！閉合系統最終收斂於 50% 完美熱半滿狀態！',
    category: 'math',
    emoji: '🔥'
  },
  {
    id: 'qm_25',
    title: '計算定積分 ∫[0 to 2] 30x² dx 的結果是多少電量 %？',
    officialBattery: 80,
    explanation: '[10x³] 從 0 到 2 等於 10×8 = 80，直接就是 80% 電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_26',
    title: '二階常微分方程 y\'\' + 1600y = 0 的固有角頻率 ω 是多少電量 %？',
    officialBattery: 40,
    explanation: '角頻率 ω = √1600 = 40，直接就是 40% 電量！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_27',
    title: '計算極限 lim(x→0) 100·tan(x)/x 是多少電量 %？',
    officialBattery: 100,
    explanation: '經典三角函數極限 tan(x)/x → 1，乘以 100 後為 100，直接滿格 100% 能量！',
    category: 'math',
    emoji: '🎯'
  },
  {
    id: 'qm_28',
    title: '函數 100cos(x) 當 x = 0 時的數值是多少電量 %？',
    officialBattery: 100,
    explanation: '100cos(0) = 100×1 = 100，直接就是 100% 電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_29',
    title: '單位正方形的對角線長度 √2 取小數點後前兩位是多少電量 %？',
    officialBattery: 41,
    explanation: '√2 ≈ 1.41421... 小數點後前兩位正是 41%！',
    category: 'math',
    emoji: '🔳'
  },
  {
    id: 'qm_30',
    title: '圓周率 π 的數值小數點後前兩位是多少電量 %？',
    officialBattery: 14,
    explanation: 'π ≈ 3.14159... 小數點後前兩位正是 14%！',
    category: 'math',
    emoji: '🥧'
  },
  {
    id: 'qm_31',
    title: '自然對數底數 e 的數值小數點後前兩位是多少電量 %？',
    officialBattery: 71,
    explanation: 'e ≈ 2.71828... 小數點後前兩位正是 71%！',
    category: 'math',
    emoji: '🌲'
  },
  {
    id: 'qm_32',
    title: '微分方程 dy/dx = 4x (已知 y(0)=0)，求 x = 5 時 y(5) 是多少電量 %？',
    officialBattery: 50,
    explanation: 'y(x) = 2x²，y(5) = 2 × 25 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '📊'
  },
  {
    id: 'qm_33',
    title: '正三角形的內角角度 (60°) 佔直角 (90°) 的百分比（取整數）是多少 %？',
    officialBattery: 66,
    explanation: '60 / 90 = 2/3 ≈ 66.66%，取整數 66%！',
    category: 'math',
    emoji: '🔺'
  },
  {
    id: 'qm_34',
    title: '計算定積分 ∫[0 to 1] 400x³ dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[100x⁴] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_35',
    title: '二階微分方程 y\'\' - 900y = 0 的正特徵根是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵方程 r² - 900 = 0 解得 r = 30（正根），直接就是 30% 電量！',
    category: 'math',
    emoji: '🔍'
  },
  {
    id: 'qm_36',
    title: '對角矩陣 B = [[20, 0], [0, 40]] 的特徵值之和是多少電量 %？',
    officialBattery: 60,
    explanation: '特徵值為 20 與 40，和為 60，直接就是 60% 電量！',
    category: 'math',
    emoji: '🔲'
  },
  {
    id: 'qm_37',
    title: '無窮等比級數 50 + 25 + 12.5 + ... 的級數和是多少電量 %？',
    officialBattery: 100,
    explanation: '收斂級數和 a/(1-r) = 50/(1-1/2) = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '♾️'
  },
  {
    id: 'qm_38',
    title: '平面向量 (30, 40) 的模長是多少電量 %？',
    officialBattery: 50,
    explanation: '√(30² + 40²) = √2500 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '↗️'
  },
  {
    id: 'qm_39',
    title: '阻尼振動微分方程 y\'\' + 40y\' + 1300y = 0 的固有衰減角頻率 ω 是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵根 r = -20 ± 30i，虛部角頻率 ω = 30，直接就是 30% 電量！',
    category: 'math',
    emoji: '〰️'
  },
  {
    id: 'qm_40',
    title: '連續型均勻分佈 U(0, 100) 的期望值 E[X] 是多少電量 %？',
    officialBattery: 50,
    explanation: 'E[X] = (0 + 100)/2 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '⚖️'
  },
  {
    id: 'qm_41',
    title: '一階線性函數 100x 在 x = 0.5 時的值是多少電量 %？',
    officialBattery: 50,
    explanation: '100 × 0.5 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_42',
    title: '圓周率 π = 3.14159... 取小數點後前兩位是多少電量 %？',
    officialBattery: 14,
    explanation: 'π ≈ 3.14... 小數點後前兩位正是 14% 電量！',
    category: 'math',
    emoji: '🥧'
  },
  {
    id: 'qm_43',
    title: '半徑 r = 5 的圓面積 A = πr² (取 π ≈ 3.14) 的數值小數點前兩位是多少電量 %？',
    officialBattery: 78,
    explanation: 'A = 3.14 × 25 = 78.5，取前兩位整數正是 78% 電量！',
    category: 'math',
    emoji: '⚪'
  },
  {
    id: 'qm_44',
    title: '三維空間中向量 100û（û 為單位向量）的模長 |100û| 是多少電量 %？',
    officialBattery: 100,
    explanation: '單位向量模長為 1，所以 |100û| = 100×1 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_45',
    title: '正態分佈 (Normal Distribution) 在 [-σ, +σ] 區間內的概率取整數是多少電量 %？',
    officialBattery: 68,
    explanation: '經驗法則 (68-95-99.7 Rule)，一倍標準差區間涵蓋 68.27% ≈ 68% 概率！',
    category: 'math',
    emoji: '📊'
  },
  {
    id: 'qm_46',
    title: '正態分佈在 [-2σ, +2σ] 區間內的概率取整數是多少電量 %？',
    officialBattery: 95,
    explanation: '兩倍標準差區間涵蓋 95.45% ≈ 95% 概率！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_47',
    title: '三角函數 100·sin(30°) 的數值是多少電量 %？',
    officialBattery: 50,
    explanation: '100 × sin(30°) = 100 × 0.5 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_48',
    title: '三角函數 100·cos(60°) 的數值是多少電量 %？',
    officialBattery: 50,
    explanation: '100 × cos(60°) = 100 × 0.5 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_49',
    title: '計算定積分 ∫[0 to 1] 200x dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[100x²] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_50',
    title: '求極限 lim(x→0) 100·sin(x)/x 是多少電量 %？',
    officialBattery: 100,
    explanation: '經典重要極限 sin(x)/x → 1，乘以 100 後為 100，直接滿格 100% 能量！',
    category: 'math',
    emoji: '🎯'
  },
  {
    id: 'qm_51',
    title: '對角矩陣 50I₂ = [[50, 0], [0, 50]] 的跡 tr(50I₂) 是多少電量 %？',
    officialBattery: 100,
    explanation: 'tr(50I₂) = 50 + 50 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🔲'
  },
  {
    id: 'qm_52',
    title: '虛數運算 100i² 的絕對值 |100i²| 是多少電量 %？',
    officialBattery: 100,
    explanation: 'i² = -1，所以 100i² = -100，絕對值 |-100| = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🧮'
  },
  {
    id: 'qm_53',
    title: '計算 2^10 = 1024 取百位與十位數組合是多少電量 %？',
    officialBattery: 24,
    explanation: '1024 的最後兩位數字正是 24% 電量！',
    category: 'math',
    emoji: '🔢'
  },
  {
    id: 'qm_54',
    title: '費氏數列 (Fibonacci) 第 10 項的數值是多少電量 %？',
    officialBattery: 55,
    explanation: '數列: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55！第 10 項正是 55% 電量！',
    category: 'math',
    emoji: '🌀'
  },
  {
    id: 'qm_55',
    title: '計算 10 × C(5, 2) 是多少電量 %？',
    officialBattery: 100,
    explanation: 'C(5, 2) = (5×4)/2 = 10，10 × 10 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🎲'
  },
  {
    id: 'qm_56',
    title: '計算 5 × P(4, 2) 是多少電量 %？',
    officialBattery: 60,
    explanation: 'P(4, 2) = 4×3 = 12，5 × 12 = 60，直接就是 60% 電量！',
    category: 'math',
    emoji: '🔀'
  },
  {
    id: 'qm_57',
    title: '雙曲線 x² - y² = 1 的漸近線斜率絕對值為 |m|，數值 100|m| 是多少電量 %？',
    officialBattery: 100,
    explanation: '漸近線 y = ±x，斜率絕對值為 1，100 × 1 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_58',
    title: '計算 50 × log₁₀(100) 是多少電量 %？',
    officialBattery: 100,
    explanation: 'log₁₀(100) = 2，50 × 2 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '📐'
  },
  {
    id: 'qm_59',
    title: '計算定積分 ∫[0 to 2] 25x dx 的結果是多少電量 %？',
    officialBattery: 50,
    explanation: '[12.5x²] 從 0 到 2 等於 12.5×4 = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_60',
    title: '一元二次方程 x² - 100x + 2500 = 0 的重根 x 是多少電量 %？',
    officialBattery: 50,
    explanation: '(x-50)² = 0 解得重根 x = 50，直接就是 50% 電量！',
    category: 'math',
    emoji: '🔍'
  },
  {
    id: 'qm_61',
    title: '圓的周長與直徑之比取小數點後前兩位是多少電量 %？',
    officialBattery: 14,
    explanation: '周長比直徑即為圓周率 π ≈ 3.14... 小數點後前兩位是 14%！',
    category: 'math',
    emoji: '⭕'
  },
  {
    id: 'qm_62',
    title: '正交向量 a=(3,4) 與 b=(4,-3) 的點積 a·b 加上滿格電量是多少 %？',
    officialBattery: 100,
    explanation: '3×4 + 4×(-3) = 0（正交），0 + 100 = 100% 滿格電量！',
    category: 'math',
    emoji: '🏹'
  },
  {
    id: 'qm_63',
    title: '計算定積分 ∫[0 to 1] 300x² dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[100x³] 從 0 到 1 等於 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_64',
    title: '無窮等比級數 40 + 20 + 10 + 5 + ... 的和是多少電量 %？',
    officialBattery: 80,
    explanation: '級數和 S = 40/(1 - 1/2) = 80，直接就是 80% 電量！',
    category: 'math',
    emoji: '♾️'
  },
  {
    id: 'qm_65',
    title: '拋物線 y = 10x² 在 x=3 處的切線斜率 dy/dx 是多少電量 %？',
    officialBattery: 60,
    explanation: 'dy/dx = 20x，在 x=3 時斜率為 20×3 = 60，直接就是 60% 電量！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_66',
    title: '投擲一次均勻六面骰子，出現點數 ≤ 3 的概率百分比是多少 %？',
    officialBattery: 50,
    explanation: '點數 1, 2, 3 共 3 種可能，3/6 = 50% 電量！',
    category: 'math',
    emoji: '🎲'
  },
  {
    id: 'qm_67',
    title: '連續投擲硬幣兩次，結果皆為正面的概率百分比是多少 %？',
    officialBattery: 25,
    explanation: '(1/2) × (1/2) = 1/4 = 25% 電量！',
    category: 'math',
    emoji: '🪙'
  },
  {
    id: 'qm_68',
    title: '計算定積分 ∫[0 to π/2] 100cos(x) dx 的結果是多少電量 %？',
    officialBattery: 100,
    explanation: '[100sin x] 從 0 到 π/2 等於 100 - 0 = 100，直接就是 100% 滿格電量！',
    category: 'math',
    emoji: '🌊'
  },
  {
    id: 'qm_69',
    title: '求極限 lim(x→∞) 100(x² + 1)/(x² + 5) 是多少電量 %？',
    officialBattery: 100,
    explanation: '最高次項係數比為 1/1 = 1，乘以 100 後為 100，直接滿格 100% 電量！',
    category: 'math',
    emoji: '🎯'
  },
  {
    id: 'qm_70',
    title: '自然對數底數 e 減去 2 之後取小數點後前兩位是多少電量 %？',
    officialBattery: 71,
    explanation: 'e ≈ 2.71828... 減 2 等於 0.718... 小數點後前兩位是 71%！',
    category: 'math',
    emoji: '🧮'
  },

  // 🥔 荒謬萬物與日常 (Absurd & Daily Life) - 70 題
  {
    id: 'qa_1',
    title: '如果馬鈴薯會使用 ChatGPT，它現在剩多少電？',
    officialBattery: 67,
    explanation: '馬鈴薯內部天然含鋅與銅離子，拿來算 AI 代碼剛剛好剩 67%。',
    category: 'absurd',
    emoji: '🥔'
  },
  {
    id: 'qa_2',
    title: '半夜三點盯著空白牆壁發呆的貓咪剩多少電？',
    officialBattery: 88,
    explanation: '你以為牠累了？牠正在接收外星母艦的電磁波指令，電量充足！',
    category: 'absurd',
    emoji: '🐱'
  },
  {
    id: 'qa_3',
    title: '一隻南極企鵝今天的電量是多少？',
    officialBattery: 91,
    explanation: '零下 30 度的天然冷卻讓企鵝電池完全不會過熱發燙，極度保電。',
    category: 'absurd',
    emoji: '🐧'
  },
  {
    id: 'qa_4',
    title: '一碗剛上桌熱氣騰騰的牛肉麵現在剩多少電？',
    officialBattery: 100,
    explanation: '濃郁紅燒湯頭加上大塊半筋半肉，提供 100% 熱量極致高壓電！',
    category: 'absurd',
    emoji: '🍜'
  },
  {
    id: 'qa_5',
    title: '浴室裡擺了三年的黃色橡皮鴨還剩多少電？',
    officialBattery: 50,
    explanation: '無怨無悔聽你唱歌三年，雖然外表有點積灰，但核心精神依然半滿。',
    category: 'absurd',
    emoji: '🐤'
  },
  {
    id: 'qa_6',
    title: '被塞在沙發縫隙裡的五塊錢硬幣還剩多少電？',
    officialBattery: 3,
    explanation: '長期沉睡於零食屑與灰塵中，電量幾近放電完畢，等待被搶救。',
    category: 'absurd',
    emoji: '🪙'
  },
  {
    id: 'qa_7',
    title: '一隻剛在陽台曬完太陽打瞌睡的柴犬剩多少電？',
    officialBattery: 45,
    explanation: '陽光充電完成了 45%，隨時準備好聽到開罐頭聲音時瞬間衝刺。',
    category: 'absurd',
    emoji: '🐕'
  },
  {
    id: 'qa_8',
    title: '阿嬤家客廳那台旋轉了三十年依然超涼的綠色電風扇剩多少電？',
    officialBattery: 98,
    explanation: '老牌純銅馬達永遠滴神！運轉三十年依然動力強勁滿格！',
    category: 'absurd',
    emoji: '🌬️'
  },
  {
    id: 'qa_9',
    title: '被主人剪完毛戴上伊莉莎白圈表情呆滯的柯基犬剩多少電？',
    officialBattery: 11,
    explanation: '狗生尊嚴受到嚴重的打擊，心靈電池急速損耗中。',
    category: 'absurd',
    emoji: '🐶'
  },
  {
    id: 'qa_10',
    title: '電腦桌角落放了半個月忘記倒掉的半杯水剩多少電？',
    officialBattery: 20,
    explanation: '水分子正在默默蒸發，內部的微量元素電量也在緩慢流失。',
    category: 'absurd',
    emoji: '💧'
  },
  {
    id: 'qa_11',
    title: '常年躲在廚房微波爐後面的蟑螂大哥剩多少電？',
    officialBattery: 99,
    explanation: '經過億萬年演化與微波輻射淬鍊，小強的生命電池強大無比！',
    category: 'absurd',
    emoji: '🪳'
  },
  {
    id: 'qa_12',
    title: '熱帶魚缸裡無所事事吐泡泡的金魚剩多少電？',
    officialBattery: 60,
    explanation: '記憶只有 7 秒，每 7 秒重置一次電量狀態，永遠維持在 60%！',
    category: 'absurd',
    emoji: '🐠'
  },
  {
    id: 'qa_13',
    title: '一個星期一早上 8 點的台大學生，現在還剩多少電？',
    officialBattery: 12,
    explanation: '剛看完上週未完成的作業與早八通識，電量已在早八響鈴前急遽下降。',
    category: 'absurd',
    emoji: '🎒'
  },
  {
    id: 'qa_14',
    title: '這堂三小時的經濟學課結束後，學生還剩多少電？',
    officialBattery: 4,
    explanation: '黑板上的微積分供需曲線吸光了全教室 96% 的大腦電量。',
    category: 'absurd',
    emoji: '📊'
  },
  {
    id: 'qa_15',
    title: '期末考前一天凌晨 3:30 的圖書館學生平均剩多少電？',
    officialBattery: 18,
    explanation: '靠著兩罐 RedBull 與一罐黑咖啡硬撐，處於極度超頻過熱狀態。',
    category: 'absurd',
    emoji: '📚'
  },
  {
    id: 'qa_16',
    title: '大學教室最後一排的 Wi-Fi 訊號還剩多少電？',
    officialBattery: 78,
    explanation: '雖然大家都在打手游跟刷 Reels，但後排 Wi-Fi 依然堅挺抗壓！',
    category: 'absurd',
    emoji: '📶'
  },
  {
    id: 'qa_17',
    title: '下午兩點剛吃完便當的上班族還剩多少電？',
    officialBattery: 9,
    explanation: '食物昏迷（Food Coma）引發核心電量大暴跌，急需大杯美式救援！',
    category: 'absurd',
    emoji: '🍱'
  },
  {
    id: 'qa_18',
    title: '週五下午 5:59 分準備下班的員工還剩多少電？',
    officialBattery: 99,
    explanation: '下班倒數瞬間觸發超級快充，戰鬥力瞬間滿血回復！',
    category: 'absurd',
    emoji: '🍻'
  },
  {
    id: 'qa_19',
    title: '早八剛上課就被老師點名起來回答難題的學生剩多少電？',
    officialBattery: 2,
    explanation: '大腦尚未開機就被強制執行高等算法，核心內存瞬間溢出當機！',
    category: 'absurd',
    emoji: '🙋‍♂️'
  },
  {
    id: 'qa_20',
    title: '連續上五堂課中間只有 10 分鐘下課時間的大學生剩多少電？',
    officialBattery: 7,
    explanation: '奔波於不同大樓之間，腳程與精力雙雙告急。',
    category: 'absurd',
    emoji: '🏃'
  },
  {
    id: 'qa_21',
    title: '週日晚上 11:59 分想起明天要上班/上課的靈魂剩多少電？',
    officialBattery: 1,
    explanation: '週日恐慌症集體發作，精神電量直接斷崖式清零。',
    category: 'absurd',
    emoji: '😱'
  },
  {
    id: 'qa_22',
    title: '洗澡洗到一半洗髮精洗滿頭突然沒熱水時的心情電量？',
    officialBattery: 0,
    explanation: '冰水瞬間潑下，溫暖的靈魂電池被強制冰封！',
    category: 'absurd',
    emoji: '🥶'
  },
  {
    id: 'qa_23',
    title: '剛跑完 1600 公尺體測停在終點線喘氣的大一新生剩多少電？',
    officialBattery: 6,
    explanation: '雙腿發軟，肺部像火在燒，心跳飆到 180，電量所剩無幾。',
    category: 'absurd',
    emoji: '👟'
  },
  {
    id: 'qa_24',
    title: '逛夜市吃完大雞排加珍珠奶茶後的大腦清醒電量？',
    officialBattery: 15,
    explanation: '高熱量美食帶來極致幸福感的同時，也讓大腦進入休眠狀態。',
    category: 'absurd',
    emoji: '🧋'
  },
  {
    id: 'qa_25',
    title: '擺在書桌角落積灰塵的健身房會員卡還剩多少電？',
    officialBattery: 2,
    explanation: '一年只去過兩次，卡片上的塑膠電量已經嚴重受潮！',
    category: 'absurd',
    emoji: '💳'
  },
  {
    id: 'qa_26',
    title: '剛從冰箱冷凍庫拿出來的大西瓜電量是多少？',
    officialBattery: 95,
    explanation: '極致冰涼的消暑解渴聖品，提供高達 95% 水分電量充能！',
    category: 'absurd',
    emoji: '🍉'
  },
  {
    id: 'qa_27',
    title: '排隊買爆米花時前面的客人卡在結帳時後方的怒氣電量？',
    officialBattery: 85,
    explanation: '電影快開始了前面還在猶豫，焦慮與怒火積聚成 85% 高壓！',
    category: 'absurd',
    emoji: '🍿'
  },
  {
    id: 'qa_28',
    title: '剛被自動洗車機洗完全身閃閃發光的小轎車剩多少電？',
    officialBattery: 92,
    explanation: '全身車漆煥然一新，散發著 92% 高級亮光光澤！',
    category: 'absurd',
    emoji: '🚗'
  },
  {
    id: 'qa_29',
    title: '下雨天被困在騎樓底下等雨停的流浪貓電量？',
    officialBattery: 40,
    explanation: '收起爪子躲避雨滴，安靜蓄力等待雨過天晴。',
    category: 'absurd',
    emoji: '🌧️'
  },
  {
    id: 'qa_30',
    title: '半夜兩點開著空調吃冰棒的心情電量是多少？',
    officialBattery: 100,
    explanation: '深夜的極致放縱帶來 100% 精神快充極樂感覺！',
    category: 'absurd',
    emoji: '🍦'
  },
  {
    id: 'qa_31',
    title: '快要沒電的鬧鐘在早上 7:00 努力發出弱弱響聲時的殘餘電量？',
    officialBattery: 5,
    explanation: '最後一絲電流在極限邊緣發出最後的咆哮！',
    category: 'absurd',
    emoji: '⏰'
  },
  {
    id: 'qa_32',
    title: '被踩在腳底一整天的大樹橡膠鞋底剩多少電？',
    officialBattery: 35,
    explanation: '承受了一整天的體重摩擦與走動衝擊，橡膠彈力半疲勞。',
    category: 'absurd',
    emoji: '👟'
  },
  {
    id: 'qa_33',
    title: '露營時夜晚圍繞著營火燃燒的木柴電量？',
    officialBattery: 80,
    explanation: '火焰劈啪作響，散發著溫暖舒適的 80% 熱能電量。',
    category: 'absurd',
    emoji: '🪵'
  },
  {
    id: 'qa_34',
    title: '被小主人畫滿彩色塗鴉的繪本故事書剩多少電？',
    officialBattery: 70,
    explanation: '充滿童趣與想像力的色彩線條，繪本充滿了充滿創意的能量。',
    category: 'absurd',
    emoji: '🎨'
  },
  {
    id: 'qa_35',
    title: '在陽光底下曬了一整天的純棉被褥電量？',
    officialBattery: 100,
    explanation: '吸飽了陽光的紫外線與蓬鬆香氣，充滿 100% 太陽能乾爽電量！',
    category: 'absurd',
    emoji: '☀️'
  },
  {
    id: 'qa_36',
    title: '剛泡好的熱高山烏龍茶在茶壺裡的能量電量？',
    officialBattery: 90,
    explanation: '茶香四溢，茶多酚高壓充盈，提供 90% 提神養生電量！',
    category: 'absurd',
    emoji: '🍵'
  },
  {
    id: 'qa_37',
    title: '廚房抽油煙機運轉十年的油污濾網還剩多少電？',
    officialBattery: 8,
    explanation: '重度油煙黏附，通風阻力極大，風扇核心力不從心。',
    category: 'absurd',
    emoji: '🧼'
  },
  {
    id: 'qa_38',
    title: '辦公室走廊上的自動水冷飲水機冰水電量？',
    officialBattery: 85,
    explanation: '壓縮機強力冰鎮，隨時提供 85% 清涼解渴能量！',
    category: 'absurd',
    emoji: '🚰'
  },
  {
    id: 'qa_39',
    title: '剛烤出來外酥內軟的香蒜法國麵包電量是多少？',
    officialBattery: 96,
    explanation: '濃郁奶油香蒜與酥脆外皮，提供 96% 高卡路里極致能量！',
    category: 'absurd',
    emoji: '🥖'
  },
  {
    id: 'qa_40',
    title: '陽台花盆裡剛剛冒出第一片新葉的小綠芽電量是多少？',
    officialBattery: 100,
    explanation: '破土而出的生命奇蹟，蘊含著 100% 蓬勃發芽的全新希望電量！',
    category: 'absurd',
    emoji: '🌱'
  },
  {
    id: 'qa_41',
    title: '星期五下午 5:59 準備收拾包包下班那一刻的心情電量是多少？',
    officialBattery: 100,
    explanation: '週末時光即將開啟，靈魂電量瞬間爆發至 100% 滿格狀態！',
    category: 'absurd',
    emoji: '🥳'
  },
  {
    id: 'qa_42',
    title: '星期一早上 8:59 站在公司電梯前排長隊的心情電量是多少？',
    officialBattery: 2,
    explanation: '週一症候群與遲到邊緣雙重打擊，電量幾近歸零。',
    category: 'absurd',
    emoji: '🥱'
  },
  {
    id: 'qa_43',
    title: '外送員顯示「餐點已送達」但打開門地上空無一物的心情電量？',
    officialBattery: 5,
    explanation: '肚子極度飢餓卻找不到食物，震驚與絕望雙重崩潰。',
    category: 'absurd',
    emoji: '📦'
  },
  {
    id: 'qa_44',
    title: '剛洗完熱水澡吹乾頭髮突然發現忘記拿浴室外毛巾的心情電量？',
    officialBattery: 18,
    explanation: '濕答答站在地墊上不敢走動，心智電量受到衝擊。',
    category: 'absurd',
    emoji: '🛁'
  },
  {
    id: 'qa_45',
    title: '戴著全罩式全黑安全帽騎 Gogoro 在等紅燈的帥氣值電量？',
    officialBattery: 88,
    explanation: '神祕氣場加持，極具未來看的神秘帥氣能量！',
    category: 'absurd',
    emoji: '🛵'
  },
  {
    id: 'qa_46',
    title: '超商買冰美式抽獎抽中「任選 2 件 55 折」的心情電量？',
    officialBattery: 92,
    explanation: '小確幸爆棚，一天的好心情電量瞬間充盈 92%！',
    category: 'absurd',
    emoji: '☕'
  },
  {
    id: 'qa_47',
    title: '熬夜追劇追到最關鍵倒數第 1 集突然跳出「需付費 VIP」的心情電量？',
    officialBattery: 0,
    explanation: '懸念被強制中斷，內心防線徹底崩塌，電量 0% 斷電！',
    category: 'absurd',
    emoji: '💔'
  },
  {
    id: 'qa_48',
    title: '柴犬在地板上瘋狂開甩甩頭（Zoomies 狂奔）時的體能電量？',
    officialBattery: 100,
    explanation: '柴犬核心發電機全速運轉，輸出 100% 狂暴超載能量！',
    category: 'absurd',
    emoji: '🐕'
  },
  {
    id: 'qa_49',
    title: '躺在沙發上想伸手拿遙控器但手指差 5 公分拿不到的心情電量？',
    officialBattery: 12,
    explanation: '慵懶與殘念的極致拉鋸，懶得站起來的電力消耗。',
    category: 'absurd',
    emoji: '🛋️'
  },
  {
    id: 'qa_50',
    title: '鹽酥雞剛炸好打開紙袋傳出濃郁九層塔香氣那一刻的電量？',
    officialBattery: 99,
    explanation: '台灣美食靈魂香氣，帶來 99% 極致療癒能量！',
    category: 'absurd',
    emoji: '🍗'
  },
  {
    id: 'qa_51',
    title: '手機螢幕朝下重重摔在地板上不敢撿起來看的緊張電量？',
    officialBattery: 95,
    explanation: '心跳加速至極限，交感神經高壓緊張電量爆表！',
    category: 'absurd',
    emoji: '📱'
  },
  {
    id: 'qa_52',
    title: '安靜的會議室裡肚子突然發出超大一聲「咕嚕～」的尷尬電量？',
    officialBattery: 3,
    explanation: '全場目光齊刷刷掃過來，社死現場電量直降至 3%。',
    category: 'absurd',
    emoji: '😳'
  },
  {
    id: 'qa_53',
    title: '吃到一口完全沒有骨頭又鮮嫩多汁的椒麻雞排電量？',
    officialBattery: 98,
    explanation: '外酥內嫩加上麻辣香氣，注入 98% 幸福熱量！',
    category: 'absurd',
    emoji: '🍱'
  },
  {
    id: 'qa_54',
    title: '大夏天 38 度酷暑走進冷氣開到 18 度的超商那一秒的爽快電量？',
    officialBattery: 100,
    explanation: '瞬間從地獄升到天堂，享受 100% 冰爽充電！',
    category: 'absurd',
    emoji: '❄️'
  },
  {
    id: 'qa_55',
    title: '剛買的珍珠奶茶第一口就把吸管裡的珍珠全部吸光的心情電量？',
    officialBattery: 22,
    explanation: '後續只剩奶茶沒有珍珠可嚼，口感層次大打折扣。',
    category: 'absurd',
    emoji: '🧋'
  },
  {
    id: 'qa_56',
    title: '赤腳踩到家裡貓咪吐在毛毯上的毛球那一瞬間的震驚電量？',
    officialBattery: 4,
    explanation: '觸感難以言喻，靈魂出竅只剩 4% 電量。',
    category: 'absurd',
    emoji: '🐈'
  },
  {
    id: 'qa_57',
    title: '考試結束前 1 分鐘發現答案卡劃錯一格全部順延的絕望電量？',
    officialBattery: 0,
    explanation: '腦袋瞬間一片空白，系統崩潰歸零！',
    category: 'absurd',
    emoji: '📝'
  },
  {
    id: 'qa_58',
    title: '穿剛買的新白鞋出門第一天就踩到下雨泥巴水坑的心痛電量？',
    officialBattery: 8,
    explanation: '愛鞋受損心在滴血，心情電量極度低落。',
    category: 'absurd',
    emoji: '👟'
  },
  {
    id: 'qa_59',
    title: '吃到一口剛剛好流心熔岩的半熟起司塔幸福電量？',
    officialBattery: 97,
    explanation: '濃郁奶香與香濃起司流心，提供 97% 療癒能量！',
    category: 'absurd',
    emoji: '🥧'
  },
  {
    id: 'qa_60',
    title: '聽音樂聽到最猛的高潮段落耳機突然斷連擴音出來的心碎電量？',
    officialBattery: 1,
    explanation: '公眾場合社死場面，尷尬值滿格但心情電量 1%。',
    category: 'absurd',
    emoji: '🎧'
  },
  {
    id: 'qa_61',
    title: '吹著涼爽冷氣蓋著厚棉被睡覺的無敵幸福感電量？',
    officialBattery: 100,
    explanation: '極致舒適的被窩溫感，提供 100% 滿格睡眠充電！',
    category: 'absurd',
    emoji: '🛌'
  },
  {
    id: 'qa_62',
    title: '逛夜市排隊排了 30 分鐘終於拿到剛出爐熱騰騰地瓜球的電量？',
    officialBattery: 95,
    explanation: '外酥內空心的 Q 彈口感，補滿 95% 夜市美食電力！',
    category: 'absurd',
    emoji: '🍠'
  },
  {
    id: 'qa_63',
    title: '洗衣機洗完衣服忘記晾在裡面放了一整夜的悶臭電量？',
    officialBattery: 6,
    explanation: '必須全部重新洗一遍，無奈與懊悔的低電量。',
    category: 'absurd',
    emoji: '🧺'
  },
  {
    id: 'qa_64',
    title: '騎車遇到一路連續 8 個綠燈順暢到達目的地的好運電量？',
    officialBattery: 99,
    explanation: '綠燈順暢無阻，體驗順水推舟的 99% 好運能量！',
    category: 'absurd',
    emoji: '🚦'
  },
  {
    id: 'qa_65',
    title: '剪頭髮時理髮師問「長度滿意嗎」但其實剪太短卻不敢說話的電量？',
    officialBattery: 15,
    explanation: '內心流淚表面微笑，自信電量跌至谷底。',
    category: 'absurd',
    emoji: '💈'
  },
  {
    id: 'qa_66',
    title: '夾娃娃機爪子把娃娃夾到洞口上方卻完全鬆掉掉回去的心碎電量？',
    officialBattery: 3,
    explanation: '功虧一潰，差一步就拿到娃娃的殘念低電量。',
    category: 'absurd',
    emoji: '🧸'
  },
  {
    id: 'qa_67',
    title: '微波便當拿出來打開發現中間最厚處還是冰塊的心酸電量？',
    officialBattery: 10,
    explanation: '邊緣燙手中間結冰，無奈重新微波的折騰電量。',
    category: 'absurd',
    emoji: '🍱'
  },
  {
    id: 'qa_68',
    title: '冬天泡溫泉全身浸入熱水那一瞬間毛孔舒張的放鬆電量？',
    officialBattery: 100,
    explanation: '血液循環舒暢，全身細胞獲得 100% 溫泉充電！',
    category: 'absurd',
    emoji: '♨️'
  },
  {
    id: 'qa_69',
    title: '打遊戲排位賽連敗 5 場最後一局主塔前隊友突然掛機的憤怒電量？',
    officialBattery: 0,
    explanation: '血壓標高，遊戲體驗徹底破滅，電量歸零！',
    category: 'absurd',
    emoji: '🎮'
  },
  {
    id: 'qa_70',
    title: '週末早上自然醒發現今天是星期六完全不用上班的極致安心電量？',
    officialBattery: 100,
    explanation: '沒有鬧鐘的束縛，獲得 100% 自由與放鬆電量！',
    category: 'absurd',
    emoji: '🌅'
  }
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  all: { label: '全部題目', icon: '🎲' },
  math: { label: '硬核數學', icon: '🤓' },
  absurd: { label: '荒謬萬物', icon: '🥔' },
  custom: { label: '自訂題庫', icon: '✏️' }
};
