// Fallback question deck for PK mode's "opponent question" — used both for
// an actual bot match and as the real-match opponent-question timeout (see
// MutualPkGame.tsx's fabricateOpponentQuestion). Deliberately just question
// content: bot *identity* (name/avatar) comes from aiBots.ts's
// getBotProfile(), and the opponent's *guess* is always synthesized by
// aiBots.ts's getBotGuess() — this file has no say in either, so there is
// exactly one bot-identity/guessing system (aiBots.ts), not two.
//
// `titleEn`/`expEn` are shown instead of `title`/`exp` when the session is in
// English — see fabricateOpponentQuestion in MutualPkGame.tsx.
export const HUMAN_BOT_QUESTIONS = [
  { title: '猜猜我剛打完 2 小時傳說對決手機剩幾 % 電？', battery: 32, exp: '打了四局大戰，電量狂掉！', titleEn: 'Guess how much battery my phone has left after 2 hours of ranked matches?', expEn: 'Four intense rounds in a row — the battery took a beating!' },
  { title: '剛吃完大份滿漢大餐牛肉麵的滿意電量？', battery: 94, exp: '湯頭濃郁肉超大塊，滿意度爆表！', titleEn: 'How satisfied am I after a huge bowl of beef noodle soup?', expEn: 'Rich broth, giant chunks of meat — off-the-charts satisfaction!' },
  { title: '昨天夜唱到早上 6 點回家躺平時的體能幾 %？', battery: 8, exp: '喉嚉沙啞全身無力，幾近斷電。', titleEn: 'How much energy is left after karaoke until 6am and collapsing into bed?', expEn: 'Hoarse throat, no strength left — nearly out of battery.' },
  { title: '到超商取貨突然發現忘記帶證件的心情電量？', battery: 12, exp: '白跑一趟無奈離去。', titleEn: 'Mood battery after realizing you forgot your ID at the convenience store pickup?', expEn: 'A wasted trip — nothing to do but leave.' },
  { title: '夏天下課走進 18 度冷氣房瞬間的爽快電量？', battery: 100, exp: '通體舒暢瞬間充滿！', titleEn: 'The relief of walking into 18°C air conditioning after summer class?', expEn: 'Instantly refreshed from head to toe — fully charged!' },
  { title: '戴全罩安全帽騎車等紅燈的帥氣值電量？', battery: 88, exp: '神祕氣場加持。', titleEn: 'Coolness battery while waiting at a red light in a full-face helmet?', expEn: 'A mysterious aura boost.' },
  { title: '剛洗完澡發現毛巾忘在客廳的心酸電量？', battery: 15, exp: '濕答答不敢走出來。', titleEn: 'Mood battery after finishing your shower and realizing the towel is in the living room?', expEn: "Dripping wet, too afraid to step out." },
  { title: '週五下午 5:59 收拾包包準備下班的心情電量？', battery: 100, exp: '週末自由時光開啟！', titleEn: "Mood battery packing up at 5:59pm on Friday, ready to leave work?", expEn: 'Weekend freedom has officially begun!' },
  { title: '剛泡好的熱珍奶第一口把珍珠全吸光的心情電量？', battery: 22, exp: '後續只剩奶茶沒有珍珠可嚼。', titleEn: 'Mood battery after sucking up all the boba in your very first sip of milk tea?', expEn: 'Nothing left to chew on for the rest of the drink.' },
  { title: '踩到家裡貓咪吐在毯子上的毛球震驚電量？', battery: 4, exp: '觸感難以言喻。', titleEn: "Shock battery from stepping on a hairball your cat threw up on the blanket?", expEn: 'A texture that defies description.' },
  { title: '考試前 1 分鐘發現答案卡劃錯一格的絕望電量？', battery: 0, exp: '系統崩潰歸零！', titleEn: 'Despair battery after realizing, 1 minute before the exam ends, that your answer sheet is shifted by one row?', expEn: 'Total system crash — zeroed out!' },
  { title: '吹著冷氣蓋厚棉被睡覺的無敵幸福電量？', battery: 100, exp: '極致舒適被窩溫感！', titleEn: 'Unbeatable happiness battery: AC on, cozy under a thick blanket, fast asleep?', expEn: 'The ultimate cozy-blanket comfort!' }
];
