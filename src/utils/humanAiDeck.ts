export interface HumanBotProfile {
  name: string;
  avatar: string;
  accuracyTier: 'accurate' | 'balanced' | 'wild';
}

export const HUMAN_BOT_PROFILES: HumanBotProfile[] = [
  { name: '小哲', avatar: '👦', accuracyTier: 'balanced' },
  { name: '咪咪', avatar: '👧', accuracyTier: 'accurate' },
  { name: '阿傑', avatar: '👨', accuracyTier: 'balanced' },
  { name: '圓圓', avatar: '👩', accuracyTier: 'wild' },
  { name: '亮亮', avatar: '🧑', accuracyTier: 'accurate' },
  { name: '小羽', avatar: '👧', accuracyTier: 'wild' }
];

export const HUMAN_BOT_QUESTIONS = [
  { title: '猜猜我剛打完 2 小時傳說對決手機剩幾 % 電？', battery: 32, exp: '打了四局大戰，電量狂掉！' },
  { title: '剛吃完大份滿漢大餐牛肉麵的滿意電量？', battery: 94, exp: '湯頭濃郁肉超大塊，滿意度爆表！' },
  { title: '昨天夜唱到早上 6 點回家躺平時的體能幾 %？', battery: 8, exp: '喉嚨沙啞全身無力，幾近斷電。' },
  { title: '到超商取貨突然發現忘記帶證件的心情電量？', battery: 12, exp: '白跑一趟無奈離去。' },
  { title: '夏天下課走進 18 度冷氣房瞬間的爽快電量？', battery: 100, exp: '通體舒暢瞬間充滿！' },
  { title: '戴全罩安全帽騎車等紅燈的帥氣值電量？', battery: 88, exp: '神祕氣場加持。' },
  { title: '剛洗完澡發現毛巾忘在客廳的心酸電量？', battery: 15, exp: '濕答答不敢走出來。' },
  { title: '週五下午 5:59 收拾包包準備下班的心情電量？', battery: 100, exp: '週末自由時光開啟！' },
  { title: '剛泡好的熱珍奶第一口把珍珠全吸光的心情電量？', battery: 22, exp: '後續只剩奶茶沒有珍珠可嚼。' },
  { title: '踩到家裡貓咪吐在毯子上的毛球震驚電量？', battery: 4, exp: '觸感難以言喻。' },
  { title: '考試前 1 分鐘發現答案卡劃錯一格的絕望電量？', battery: 0, exp: '系統崩潰歸零！' },
  { title: '吹著冷氣蓋厚棉被睡覺的無敵幸福電量？', battery: 100, exp: '極致舒適被窩溫感！' }
];

// Generate bot guess with realistic human-like variance
export function generateHumanBotGuess(targetBattery: number, tier: 'accurate' | 'balanced' | 'wild'): number {
  let maxError = 12;
  if (tier === 'accurate') maxError = 6;
  if (tier === 'wild') maxError = 22;

  const error = Math.floor(Math.random() * maxError);
  const sign = Math.random() > 0.5 ? 1 : -1;
  const guess = targetBattery + sign * error;

  return Math.min(100, Math.max(0, guess));
}
