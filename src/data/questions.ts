import { Question } from '../types/game';

export const INITIAL_QUESTIONS: Question[] = [
  // 🤓 硬核數學與微分方程 (Hardcore Math & Differential Equations) - 40 題
  {
    id: 'qm_1',
    title: '微分方程 dy/dx + 3y = 6 (已知 y(0)=0)，當 x→∞ 時 y 的穩態值轉為百分比是多少電量 %？',
    officialBattery: 100,
    explanation: '解出 y(x) = 2(1 - e^(-3x))，當 x→∞ 時 y 趨近於 2！定義極限 2 為 100% 滿格電量！',
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
    title: '計算定積分 ∫[0 to 1] x³ dx 的結果轉化為百分比是多少電量 %？',
    officialBattery: 25,
    explanation: '積分公式 [x⁴/4] 從 0 到 1 等於 1/4 = 0.25，正是 25% 電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_4',
    title: '計算定積分 ∫[0 to π] sin(x) dx 放大十倍後轉化為電量是多少 %？',
    officialBattery: 20,
    explanation: '[-cos x] 從 0 到 π 等於 1 - (-1) = 2！放大 10 倍為 20% 電量！',
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
    title: '歐拉公式 e^(iπ) + 1 = 0，將 |e^(iπ)| 的模長轉為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: '歐拉恆等式！|e^(iπ)| = |-1| = 1，完美 100% 滿格能量！',
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
    title: '二階微分方程 y\'\' - 5y\' + 6y = 0 的較大特徵根放大十倍後是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵方程 r² - 5r + 6 = 0 解得 r = 2 與 3！較大特徵根 3 放大十倍為 30%！',
    category: 'math',
    emoji: '🔍'
  },
  {
    id: 'qm_9',
    title: '矩陣 A = [[4, 1], [2, 3]] 的行列式 det(A) 放大十倍後是多少電量 %？',
    officialBattery: 100,
    explanation: 'det(A) = 4×3 - 2×1 = 10！放大十倍為 100% 滿格電量！',
    category: 'math',
    emoji: '🔲'
  },
  {
    id: 'qm_10',
    title: '計算瑕積分 ∫[0 to ∞] e^(-x) dx 的結果轉化為滿格電量是幾 %？',
    officialBattery: 100,
    explanation: '[-e^(-x)] 從 0 到 ∞ 等於 0 - (-1) = 1，即 100% 滿格能量！',
    category: 'math',
    emoji: '⚡'
  },
  {
    id: 'qm_11',
    title: '求極限 lim(x→0) (1 - cos x)/x² 轉化為百分比是多少電量 %？',
    officialBattery: 50,
    explanation: '洛必達法則或泰勒展開結果為 1/2 = 0.50，恰好是 50% 半滿電量！',
    category: 'math',
    emoji: '⚖️'
  },
  {
    id: 'qm_12',
    title: '複數 z = 3 + 4i 的模長 |z| 放大十倍後是多少電量 %？',
    officialBattery: 50,
    explanation: '勾股定理模長 |z| = √(3² + 4²) = 5！放大 10 倍為 50% 電量！',
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
    title: '曲線 y = 1/x 從 x = 1 到 x = e 的曲邊梯形面積轉化為滿格電量是幾 %？',
    officialBattery: 100,
    explanation: '∫[1 to e] 1/x dx = ln(e) - ln(1) = 1，完美 100% 能量！',
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
    title: '計算定積分 ∫[0 to π/4] sec²(x) dx 的結果轉化為滿格電量是幾 %？',
    officialBattery: 100,
    explanation: '[tan x] 從 0 到 π/4 等於 tan(π/4) - 0 = 1，滿格 100%！',
    category: 'math',
    emoji: '✨'
  },
  {
    id: 'qm_19',
    title: '求極限 lim(x→0) (x - sin x)/x³ 的結果轉化為百分比（取整數）是多少 %？',
    officialBattery: 16,
    explanation: '泰勒展開 x - sin x ≈ x³/6，極限為 1/6 ≈ 16.66%，取整數 16%！',
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
    title: '對數方程 log₁₀(x) = 2 的解 x 轉化為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: 'x = 10² = 100！剛好是 100% 滿格電量！',
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
    title: '計算定積分 ∫[0 to 2] 3x² dx 放大十倍轉化為電量是多少 %？',
    officialBattery: 80,
    explanation: '[x³] 從 0 到 2 等於 8，放大十倍為 80% 電量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_26',
    title: '二階常微分方程 y\'\' + 16y = 0 的固有角頻率 ω 放大十倍後是多少電量 %？',
    officialBattery: 40,
    explanation: '角頻率 ω = √16 = 4，放大十倍正是 40% 電量！',
    category: 'math',
    emoji: '📈'
  },
  {
    id: 'qm_27',
    title: '計算極限 lim(x→0) tan(x)/x 轉化為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: '經典三角函數極限等於 1，即 100% 滿格能量！',
    category: 'math',
    emoji: '🎯'
  },
  {
    id: 'qm_28',
    title: '泰勒級數 cos(x) 當 x = 0 時的第一項係數數值轉化為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: 'cos(0) = 1，完美 100% 電量！',
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
    title: '微分方程 dy/dx = 4x (已知 y(0)=0)，求 x = 5 時 y(5) 轉化為百分比是多少電量 %？',
    officialBattery: 50,
    explanation: 'y(x) = 2x²，y(5) = 2 × 25 = 50，恰好是 50% 半滿電量！',
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
    title: '計算定積分 ∫[0 to 1] 4x³ dx 的結果轉化為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: '[x⁴] 從 0 到 1 等於 1，完美 100% 滿格能量！',
    category: 'math',
    emoji: '∫'
  },
  {
    id: 'qm_35',
    title: '二階微分方程 y\'\' - 9y = 0 的正特徵根放大十倍後是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵方程 r² - 9 = 0 解得 r = 3，放大十倍為 30% 電量！',
    category: 'math',
    emoji: '🔍'
  },
  {
    id: 'qm_36',
    title: '對角矩陣 B = [[2, 0], [0, 4]] 的特徵值之和放大十倍後是多少電量 %？',
    officialBattery: 60,
    explanation: '特徵值為 2 與 4，和為 6，放大十倍為 60% 電量！',
    category: 'math',
    emoji: '🔲'
  },
  {
    id: 'qm_37',
    title: '無窮等比級數 1/2 + 1/4 + 1/8 + ... 的級數和轉化為滿格電量是多少 %？',
    officialBattery: 100,
    explanation: '收斂級數和 a/(1-r) = (1/2)/(1/2) = 1，滿格 100% 電量！',
    category: 'math',
    emoji: '♾️'
  },
  {
    id: 'qm_38',
    title: '平面向量 (3, 4) 的模長乘以十放大後是多少電量 %？',
    officialBattery: 50,
    explanation: '√(3² + 4²) = 5，放大十倍為 50% 電量！',
    category: 'math',
    emoji: '↗️'
  },
  {
    id: 'qm_39',
    title: '阻尼振動微分方程 y\'\' + 4y\' + 13y = 0 的固有衰減角頻率 ω 放大十倍後是多少電量 %？',
    officialBattery: 30,
    explanation: '特徵根 r = -2 ± 3i，虛部角頻率 ω = 3，放大十倍為 30%！',
    category: 'math',
    emoji: '〰️'
  },
  {
    id: 'qm_40',
    title: '連續型均勻分佈 U(0, 1) 的期望值 E[X] 轉化為百分比是多少電量 %？',
    officialBattery: 50,
    explanation: 'E[X] = (0 + 1)/2 = 0.50，恰好是 50% 半滿電量！',
    category: 'math',
    emoji: '⚖️'
  },

  // 🥔 荒謬萬物與日常 (Absurd & Daily Life) - 40 題
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
  }
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  all: { label: '全部題目', icon: '🎲' },
  math: { label: '硬核數學', icon: '🤓' },
  absurd: { label: '荒謬萬物', icon: '🥔' },
  custom: { label: '自訂題庫', icon: '✏️' }
};
