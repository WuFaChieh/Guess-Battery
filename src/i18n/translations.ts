// Flat translation dictionary for the app's two supported UI languages.
// `en` is typed as `Record<TranslationKey, string>` against `zh`'s own key
// set, so adding a key to `zh` without a matching `en` entry is a compile
// error instead of a silent runtime fallback.
//
// Interpolation: a value may contain `{name}`-style placeholders, filled in
// by `t(key, { name: value })` — see `src/i18n/LanguageContext.tsx`. Plain
// string lookups (no placeholders) just pass no second argument.
//
// This file has zero React dependency on purpose — pure utility functions
// (gameLogic.ts, aiBots.ts, matchmaking.ts, share.ts) import `translations`
// directly and take an explicit `lang` parameter, instead of depending on
// the React context that only components can use.

export type Language = 'zh' | 'en';

const zh = {
  // ---------------------------------------------------------------------
  // Shared / cross-component
  // ---------------------------------------------------------------------
  mode_single_5: '經典速刷',
  mode_daily: '每日挑戰',
  mode_party: '同屏派對',
  mode_custom: '自訂題庫',
  mode_mutual_pk: '1v1 互考 PK',
  custom_deck_trial: '自訂題庫試玩',
  battery_guess_label: '你猜的電量',
  loading_default: '載入中...',
  share_idle: '分享成績戰報',
  share_copied: '成績已複製到剪貼簿！',
  share_shared: '已開啟分享！',
  cancel: '取消',
  slogan_tagline: '萬物皆有電量，你猜得準嗎？',

  // ---------------------------------------------------------------------
  // App.tsx
  // ---------------------------------------------------------------------
  app_footer_tagline: '猜電量 Guess the Battery — 萬物皆有電量，你猜得準嗎？',
  app_footer_no_cards: '無卡牌 · 無機制 · 只有硬核直覺與精算揭曉',
  app_footer_author_label: '遊戲作者：',

  // ---------------------------------------------------------------------
  // Navbar.tsx / BottomNav.tsx
  // ---------------------------------------------------------------------
  nav_volume_settings: '音量設定',
  nav_mute: '靜音',
  nav_unmute: '取消靜音',
  nav_volume: '音量',
  nav_menu: '選單',
  nav_select_mode: '選擇遊戲模式',
  nav_streak_days: '{n} 天',
  nav_coming_soon: '待更新',
  bottomnav_aria_label: '遊戲模式導覽',
  bottomnav_single: '猜電量',
  bottomnav_pk: '1v1對決',
  bottomnav_party: '同屏派對',
  bottomnav_custom: '自訂題庫',

  // ---------------------------------------------------------------------
  // StartCover.tsx
  // ---------------------------------------------------------------------
  startcover_author_prefix: '遊戲作者：',
  startcover_mascot_face: '( ✧ω✧ 電量滿載！ )',
  startcover_footer_author: '· 作者：冷月仙',

  // ---------------------------------------------------------------------
  // SplashLoader.tsx
  // ---------------------------------------------------------------------
  splash_stage_boot: '開機充能中...',
  splash_stage_charging: '熱量與直覺蓄積中...',
  splash_stage_full: '能量滿載！',
  splash_stage_done: '萬物皆有電量！',

  // ---------------------------------------------------------------------
  // DailyChallengeBanner.tsx
  // ---------------------------------------------------------------------
  dailybanner_done: '今日挑戰已完成！',
  dailybanner_not_done: '今日挑戰尚未完成',
  dailybanner_streak: '連續 {n} 天',
  dailybanner_come_back: '明天再回來延續紀錄！',
  dailybanner_daily_info: '每天 5 題，固定題目全球同題！',

  // ---------------------------------------------------------------------
  // LoadingState.tsx / loading labels passed as props
  // ---------------------------------------------------------------------
  loading_daily: '載入每日題目中...',
  loading_pool: '載入題庫中...',

  // ---------------------------------------------------------------------
  // QuestionCard.tsx
  // ---------------------------------------------------------------------
  questioncard_progress: '第 {current} / {total} 題',
  questioncard_combo: '連擊中 x{n}（+{bonus} 加成）',
  questioncard_subtitle: '憑直覺猜出 0～100% 的電量數字！',
  questioncard_fallback_category: '硬核數學',

  // ---------------------------------------------------------------------
  // SliderInput.tsx
  // ---------------------------------------------------------------------
  slider_submit_default: '鎖定答案並揭曉！',
  slider_aria_label: '你猜的電量百分比',
  slider_ready_caption: '準備好了就鎖定吧！',

  // ---------------------------------------------------------------------
  // RevealScreen.tsx
  // ---------------------------------------------------------------------
  reveal_badge: '揭曉答案',
  reveal_your_guess: '你的猜測',
  reveal_official_answer: '官方答案',
  reveal_distance: '差距：',
  reveal_score: '得分：',
  reveal_combo: '連擊 x{n}！額外 +{bonus} 分！',
  reveal_explanation_label: '官方電量解說：',
  reveal_finish: '進入總結算',
  reveal_next: '下一題',

  // ---------------------------------------------------------------------
  // GameOverModal.tsx
  // ---------------------------------------------------------------------
  gameover_charging: '成果充電進行中...',
  gameover_charged: '成果充電完成！',
  face_charging: '( 充能精準度... )',
  face_90: '( 神級精準大師！ )',
  face_70: '( 高電量充滿！ )',
  face_40: '( 滿意充電完成 )',
  face_low: '( 需再接再厲！ )',
  gameover_calculating: '正在累積計算您的直覺精準度電量...',
  gameover_title: '遊戲成果大結算',
  gameover_mode_label: '模式：{name}',
  gameover_badge_label: '獲得榮譽稱號',
  gameover_total_score: '總得分',
  gameover_avg_accuracy: '平均精準度',
  gameover_combo_bonus: '本局連擊加成：+{n} 分！',
  gameover_breakdown: '每題數據紀錄',
  gameover_guess_vs_answer: '猜 {guess}% / 答 {answer}%',
  gameover_restart: '再玩一局！',
  share_gameover_text: '🔋【猜電量 Guess the Battery】\n我在《{mode}》中獲得了 {total} 分{comboLine}（平均精準度 {avg}%）！\n獲得榮譽稱號：{badgeTitle} {badgeEmoji}\n\n「萬物皆有電量，你猜得準嗎？」快來挑戰你的直覺！',
  share_gameover_combo_line: '（含連擊加成 +{n}）',

  // ---------------------------------------------------------------------
  // Commentary tiers (gameLogic.ts getCommentary)
  // ---------------------------------------------------------------------
  commentary_0: '完美命中！你是不是偷看了出題者的腦袋？！',
  commentary_3: '神級直覺！幾乎與官方答案完全重合！',
  commentary_8: '超級精準！你的計算與直覺洞察力極高！',
  commentary_15: '非常接近！直覺相當可靠喔！',
  commentary_25: '還算靠譜！雖然有點差距但方向是對的。',
  commentary_40: '稍微偏了！你的估算可能跟出題者不大一樣？',
  commentary_60: '離譜落差！這已經是另一個平行宇宙的電量了！',
  commentary_far: '差距驚人！這道題可能得回去重算一次！',

  // ---------------------------------------------------------------------
  // Title badges (gameLogic.ts TITLE_BADGES)
  // ---------------------------------------------------------------------
  badge_psychic_title: '電量靈媒 (Battery Psychic)',
  badge_psychic_desc: '你的直覺已經超越人類極限，萬物的電量在你眼裡一覽無遺！',
  badge_oracle_title: '滿格神算 (Battery Oracle)',
  badge_oracle_desc: '抓得超級準！無論多硬核的題目都難不倒你的直覺！',
  badge_charger_title: '直覺充沛 (Intuitive Charger)',
  badge_charger_desc: '電量感知能力極強，玩派對遊戲的絕對主力！',
  badge_balanced_title: '穩定中規中矩 (Balanced User)',
  badge_balanced_desc: '猜得四規八矩，偶爾神來一筆，偶爾大翻車！',
  badge_leaky_title: '嚴重漏電 (Leaky Battery)',
  badge_leaky_desc: '你的電量直覺似乎有點受潮，建議重新開機！',
  badge_potato_title: '馬鈴薯同路人 (Potato Soulmate)',
  badge_potato_desc: '完全無法用常人邏輯思考！但這樣的反差正是遊戲的核心樂趣！',

  // ---------------------------------------------------------------------
  // Daily share text (gameLogic.ts getDailyShareText)
  // ---------------------------------------------------------------------
  share_daily_text: '🔋猜電量 每日挑戰 {date}\n{grid}  平均 {avg}%{streakLine}\n萬物皆有電量，你猜得準嗎？快來試試！',
  share_daily_streak_line: '\n🔥 連續挑戰 {days} 天！',

  // ---------------------------------------------------------------------
  // DailyGame.tsx
  // ---------------------------------------------------------------------
  daily_streak_banner: '連續挑戰 {n} 天！',
  daily_best_streak: '（最佳 {n} 天）',
  daily_share_button: '分享今日戰績方格',
  daily_share_copied: '已複製戰績方格！',
  daily_mode_name: '每日挑戰 ({date})',
  daily_limited_questions: '每日限定題目 (日期：{date})',
  daily_guess_label: '今日猜測',

  // ---------------------------------------------------------------------
  // CustomCreator.tsx
  // ---------------------------------------------------------------------
  custom_header_title: '自訂題目與社區投稿',
  custom_header_subtitle: '出題考朋友！亦可投稿至雲端資料庫，讓冷月仙納入官方題庫！',
  custom_play_button: '開玩自訂題 ({n})',
  custom_new_question: '新建題目',
  custom_list_heading: '目前已建立的題目 ({n})',
  custom_list_hint: '可一鍵投稿到雲端資料庫',
  custom_empty_state: '還沒有建立任何自訂題目喔！點擊右上角「新建題目」發揮創意！',
  custom_answer_label: '答案：',
  custom_submitted: '已投稿',
  custom_submitting: '投稿中...',
  custom_submit_review: '投稿審核',
  custom_submit_title_attr: '投稿至官方審核資料庫',
  custom_delete_title_attr: '刪除題目',
  custom_share_import_heading: '題庫分享與匯入',
  custom_export_copied: '題庫 JSON 已複製！',
  custom_export_button: '匯出自訂題庫 JSON',
  custom_import_placeholder: '貼上題庫 JSON 代碼...',
  custom_import_button: '匯入',
  custom_modal_title: '建立新的電量題目',
  custom_category_label: '題目分類',
  custom_title_label: '題目名稱 (例如：「這道微積分題還剩多少電？」)',
  custom_title_placeholder: '輸入題目...',
  custom_battery_label: '設定正確答案電量 (0% ~ 100%)',
  custom_battery_gauge_label: '答案電量',
  custom_explanation_label: '官方解說 (說明理由)',
  custom_explanation_placeholder: '說明為什麼是這個數字...',
  custom_emoji_label: '代表圖示 Emoji',
  custom_confirm_create: '確認建立',
  custom_default_explanation: '出題者的直覺答案！',
  custom_alert_import_success: '成功匯入 {n} 道自訂題目！',
  custom_alert_import_invalid: '無效的 JSON 題庫格式！',
  custom_alert_import_parse_fail: '解析 JSON 失敗，請檢查格式！',
  custom_alert_no_webhook: '題目投稿功能尚未設定雲端資料庫連結，請聯絡開發者！',
  custom_alert_submit_success: '題目「{title}」投稿成功！已提交至官方審核資料庫，通過後將加入題庫！',
  custom_alert_submit_fail: '題目「{title}」投稿失敗，請檢查網路連線後再試一次！',

  // ---------------------------------------------------------------------
  // PartyModeGame.tsx
  // ---------------------------------------------------------------------
  party_player_name_default: '玩家 {n}',
  party_setup_title: '同螢幕派對模式',
  party_setup_subtitle: '2 ~ 4 人共用同一台手機/電腦秘密輪流猜電量！',
  party_choose_count: '選擇玩家人數',
  party_count_option: '{n} 人對決',
  party_enter_names: '輸入玩家暱稱',
  party_start_button: '開始派對對決',
  party_turn_badge: '輪到玩家下注',
  party_pass_device: '請把螢幕遞給 {name}！請其他玩家不要偷看喔！',
  party_ready_button: '我準備好了，秘密輸入電量',
  party_entering_secretly: '正在秘密輸入中：{avatar} {name}',
  party_guess_label: '{name} 的猜測',
  party_lock_button: '鎖定 {name} 的答案',
  party_reveal_badge: '本題公開揭曉',
  party_official_answer_label: '官方正確答案',
  party_guess_distance: '猜 {guess}% (差 {distance}%)',
  party_round_score: '本題得分',
  party_final_stats_button: '派對總冠軍統計',
  party_next_round_button: '進入下一題',
  party_final_badge: '同螢幕派對總決算',
  party_tie_title: '勢均力敵 · 並列總冠軍！',
  party_champion_title: '派對電量總冠軍登場！',
  party_final_subtitle: '經歷了 5 題極致硬核電量考驗',
  party_tied_top_score: '並列最高總得分：',
  party_top_score: '總得分：',
  party_score_points: '{n} 分',
  party_leaderboard_heading: '派對玩家總排名 (Leaderboard)',
  party_rank_co_champion: '並列冠軍',
  party_rank_runner_up: '亞軍',
  party_rank_third: '季軍',
  party_avg_accuracy: '平均精準度 {n}%',
  party_share_button: '分享冠軍戰績',
  party_restart_button: '重新開一局派對',
  share_party_text: '🎉【猜電量 Guess the Battery】同螢幕派對模式\n{result}！最高總得分 {maxScore} 分！\n\n「萬物皆有電量，你猜得準嗎？」快找朋友一起來挑戰直覺！',
  share_party_champions: '冠軍：{names}',
  share_party_tie: '並列冠軍：{names}',

  // ---------------------------------------------------------------------
  // MutualPkGame.tsx
  // ---------------------------------------------------------------------
  pk_guest_name_default: '玩家{n}',
  pk_mystery_opponent: '神秘對手',
  pk_real_opponent_explanation: '由對手即時出題，一起揭曉才知道答案！',
  pk_lobby_badge: '即時連線一戰定勝負',
  pk_lobby_title: '1v1 互相出題 PK 戰',
  pk_lobby_subtitle: '即時搜尋線上玩家對決！雙方互相編寫一道題目考對方，儀式感揭曉一戰定勝負！',
  pk_start_matchmaking: '開始配對 PK (MATCH)',
  pk_matching_title: '正在尋找線上玩家...',
  pk_matching_subtitle: '大腦波段匹配中，準備即時連線對決...',
  pk_matched_badge: '電量生死對決 · 即時配對成功！',
  pk_you: '你',
  pk_matched_success: '配對成功',
  pk_matched_ready: '準備進入互相出題對決...',
  pk_opponent_label: '對手：{name}',
  pk_opponent_writing: '對手正在認真思考並撰寫題目中...',
  pk_opponent_written: '對手已完成題目輸入！',
  pk_step1_heading: '第一步：請寫下考倒 {name} 的題目',
  pk_question_title_label: '題目名稱',
  pk_question_title_placeholder: '例如：猜猜我手機剛打完遊戲剩幾 % 電？',
  pk_question_battery_label: '題目官方答案電量',
  pk_use_real_battery: '使用當前實體手機真實電量 ({n}%)',
  pk_confirm_question: '出題完畢！開始猜對手電量',
  pk_alert_no_title: '請輸入考對手的題目名稱！',
  pk_question_sent: '你的題目已送出，等待 {name} 出題...',
  pk_opponent_writing_named: '{name} 正在認真思考並撰寫題目中...',
  pk_question_incoming: '題目一到就馬上讓你猜！',
  pk_step2_heading: '第二步：請猜 {name} 出的題目電量 %',
  pk_your_estimate_opponent: '你估算的對手電量',
  pk_opponent_question_label: '{name} 出的題目：',
  pk_your_estimate_answer: '你估算的答案電量',
  pk_opponent_calculating: '{name} 正在連線計算題目電量中...',
  pk_both_estimated: '雙方估算完成，即將一同累計揭曉對決成績！',
  pk_charging_both: '雙方電池一同電量累計中...',
  pk_win_title: '一戰成名 · 猜電量獲勝！',
  pk_lose_title: '一戰結束 · 殘念惜敗！',
  pk_smallest_gap_wins: '差距最小者勝出！',
  pk_win_badge: '獲勝',
  pk_lose_badge: '敗北',
  pk_score_points: '得分：{n} 分',
  pk_your_guess_gap: '你猜 {guess}% (差距 {gap}%)',
  pk_opponent_guess_gap: '對手猜 {guess}% (差距 {gap}%)',
  pk_share_button: '分享對戰結果',
  pk_restart_button: '再配對對決一局！',
  share_pk_text: '⚔️【猜電量 Guess the Battery】1v1 PK 對決\n我{result}！得分 {score} 分（差距 {gap}%）vs 對手 {opponentName} {opponentScore} 分！\n\n「萬物皆有電量，你猜得準嗎？」快來挑戰你的直覺！',
  share_pk_win: '獲勝了',
  share_pk_lose: '惜敗了'
} as const;

export type TranslationKey = keyof typeof zh;

const en: Record<TranslationKey, string> = {
  // ---------------------------------------------------------------------
  // Shared / cross-component
  // ---------------------------------------------------------------------
  mode_single_5: 'Classic Speedrun',
  mode_daily: 'Daily Challenge',
  mode_party: 'Party Mode',
  mode_custom: 'Custom Deck',
  mode_mutual_pk: '1v1 PK Battle',
  custom_deck_trial: 'Custom Deck Trial',
  battery_guess_label: 'Your Guess',
  loading_default: 'Loading...',
  share_idle: 'Share Results',
  share_copied: 'Copied to clipboard!',
  share_shared: 'Share sheet opened!',
  cancel: 'Cancel',
  slogan_tagline: 'Everything has a battery level. Can you guess it?',

  // ---------------------------------------------------------------------
  // App.tsx
  // ---------------------------------------------------------------------
  app_footer_tagline: 'Guess the Battery — Everything has a battery level. Can you guess it?',
  app_footer_no_cards: 'No cards · No gimmicks · Just hardcore intuition and precise reveals',
  app_footer_author_label: 'Made by: ',

  // ---------------------------------------------------------------------
  // Navbar.tsx / BottomNav.tsx
  // ---------------------------------------------------------------------
  nav_volume_settings: 'Volume Settings',
  nav_mute: 'Mute',
  nav_unmute: 'Unmute',
  nav_volume: 'Volume',
  nav_menu: 'Menu',
  nav_select_mode: 'Select Game Mode',
  nav_streak_days: '{n}d',
  nav_coming_soon: 'Coming Soon',
  bottomnav_aria_label: 'Game mode navigation',
  bottomnav_single: 'Guess',
  bottomnav_pk: '1v1',
  bottomnav_party: 'Party',
  bottomnav_custom: 'Custom',

  // ---------------------------------------------------------------------
  // StartCover.tsx
  // ---------------------------------------------------------------------
  startcover_author_prefix: 'Made by: ',
  startcover_mascot_face: '( ✧ω✧ Fully Charged! )',
  startcover_footer_author: '· by 冷月仙',

  // ---------------------------------------------------------------------
  // SplashLoader.tsx
  // ---------------------------------------------------------------------
  splash_stage_boot: 'Booting up...',
  splash_stage_charging: 'Building up intuition...',
  splash_stage_full: 'Fully Charged!',
  splash_stage_done: 'Everything has a battery!',

  // ---------------------------------------------------------------------
  // DailyChallengeBanner.tsx
  // ---------------------------------------------------------------------
  dailybanner_done: "Today's Challenge Complete!",
  dailybanner_not_done: "Today's Challenge Awaits",
  dailybanner_streak: '{n}-day streak',
  dailybanner_come_back: 'Come back tomorrow to keep your streak!',
  dailybanner_daily_info: '5 questions a day, same for everyone worldwide!',

  // ---------------------------------------------------------------------
  // LoadingState.tsx / loading labels passed as props
  // ---------------------------------------------------------------------
  loading_daily: "Loading today's questions...",
  loading_pool: 'Loading question pool...',

  // ---------------------------------------------------------------------
  // QuestionCard.tsx
  // ---------------------------------------------------------------------
  questioncard_progress: 'Question {current} / {total}',
  questioncard_combo: 'Combo x{n} (+{bonus} bonus)',
  questioncard_subtitle: 'Trust your gut — guess a number from 0 to 100%!',
  questioncard_fallback_category: 'Hardcore Math',

  // ---------------------------------------------------------------------
  // SliderInput.tsx
  // ---------------------------------------------------------------------
  slider_submit_default: 'Lock In & Reveal!',
  slider_aria_label: 'Your battery percentage guess',
  slider_ready_caption: 'Ready? Lock it in!',

  // ---------------------------------------------------------------------
  // RevealScreen.tsx
  // ---------------------------------------------------------------------
  reveal_badge: 'Answer Revealed',
  reveal_your_guess: 'Your Guess',
  reveal_official_answer: 'Official Answer',
  reveal_distance: 'Gap: ',
  reveal_score: 'Score: ',
  reveal_combo: 'Combo x{n}! +{bonus} bonus points!',
  reveal_explanation_label: 'Official explanation:',
  reveal_finish: 'See Final Results',
  reveal_next: 'Next Question',

  // ---------------------------------------------------------------------
  // GameOverModal.tsx
  // ---------------------------------------------------------------------
  gameover_charging: 'Charging up your results...',
  gameover_charged: 'Results fully charged!',
  face_charging: '( Charging accuracy... )',
  face_90: '( Legendary precision! )',
  face_70: '( Fully charged! )',
  face_40: '( Satisfactory charge )',
  face_low: '( Needs more practice! )',
  gameover_calculating: "Calculating your intuition's accuracy...",
  gameover_title: 'Final Results',
  gameover_mode_label: 'Mode: {name}',
  gameover_badge_label: 'Title Earned',
  gameover_total_score: 'Total Score',
  gameover_avg_accuracy: 'Avg. Accuracy',
  gameover_combo_bonus: 'Combo bonus this round: +{n} pts!',
  gameover_breakdown: 'Question Breakdown',
  gameover_guess_vs_answer: 'Guessed {guess}% / Answer {answer}%',
  gameover_restart: 'Play Again!',
  share_gameover_text: '🔋【Guess the Battery】\nI scored {total} points{comboLine} in "{mode}" (avg accuracy {avg}%)!\nTitle earned: {badgeTitle} {badgeEmoji}\n\n"Everything has a battery level. Can you guess it?" Come test your intuition!',
  share_gameover_combo_line: ' (incl. +{n} combo bonus)',

  // ---------------------------------------------------------------------
  // Commentary tiers (gameLogic.ts getCommentary)
  // ---------------------------------------------------------------------
  commentary_0: 'Perfect hit! Did you peek inside the question writer\'s head?!',
  commentary_3: 'Godlike intuition! Nearly a perfect match with the official answer!',
  commentary_8: 'Super precise! Your calculation and instincts are razor-sharp!',
  commentary_15: 'Very close! Your intuition is pretty reliable!',
  commentary_25: 'Decent guess! A bit off, but the right direction.',
  commentary_40: "A bit off! Your estimate might not match the question writer's.",
  commentary_60: 'Way off! That reading is basically from a parallel universe!',
  commentary_far: 'Massive gap! You might want to recalculate that one!',

  // ---------------------------------------------------------------------
  // Title badges (gameLogic.ts TITLE_BADGES)
  // ---------------------------------------------------------------------
  badge_psychic_title: 'Battery Psychic',
  badge_psychic_desc: 'Your intuition has transcended human limits — every battery level lies bare before you!',
  badge_oracle_title: 'Battery Oracle',
  badge_oracle_desc: "Incredibly accurate! No question, however hardcore, can stump your instincts!",
  badge_charger_title: 'Intuitive Charger',
  badge_charger_desc: 'A powerful sense for battery levels — the undisputed MVP of any party game!',
  badge_balanced_title: 'Balanced User',
  badge_balanced_desc: 'Steady and consistent guesses, with the occasional flash of brilliance — or disaster!',
  badge_leaky_title: 'Leaky Battery',
  badge_leaky_desc: 'Your battery intuition seems a little waterlogged — try a reboot!',
  badge_potato_title: 'Potato Soulmate',
  badge_potato_desc: "Completely unable to reason like a normal person! But that's exactly what makes this game fun!",

  // ---------------------------------------------------------------------
  // Daily share text (gameLogic.ts getDailyShareText)
  // ---------------------------------------------------------------------
  share_daily_text: '🔋Guess the Battery — Daily Challenge {date}\n{grid}  Avg {avg}%{streakLine}\nEverything has a battery level. Can you guess it? Come try it out!',
  share_daily_streak_line: '\n🔥 {days}-day streak!',

  // ---------------------------------------------------------------------
  // DailyGame.tsx
  // ---------------------------------------------------------------------
  daily_streak_banner: '{n}-day streak!',
  daily_best_streak: '(Best: {n} days)',
  daily_share_button: 'Share Result Grid',
  daily_share_copied: 'Result grid copied!',
  daily_mode_name: 'Daily Challenge ({date})',
  daily_limited_questions: "Today's Questions (Date: {date})",
  daily_guess_label: "Today's Guess",

  // ---------------------------------------------------------------------
  // CustomCreator.tsx
  // ---------------------------------------------------------------------
  custom_header_title: 'Custom Questions & Community Submissions',
  custom_header_subtitle: 'Stump your friends! You can also submit to the cloud database for review.',
  custom_play_button: 'Play Custom Deck ({n})',
  custom_new_question: 'New Question',
  custom_list_heading: 'Your Questions ({n})',
  custom_list_hint: 'One-click submit to the cloud database',
  custom_empty_state: 'No custom questions yet! Tap "New Question" up top and get creative!',
  custom_answer_label: 'Answer: ',
  custom_submitted: 'Submitted',
  custom_submitting: 'Submitting...',
  custom_submit_review: 'Submit for Review',
  custom_submit_title_attr: 'Submit for official review',
  custom_delete_title_attr: 'Delete question',
  custom_share_import_heading: 'Share & Import Deck',
  custom_export_copied: 'Deck JSON copied!',
  custom_export_button: 'Export Deck as JSON',
  custom_import_placeholder: 'Paste deck JSON here...',
  custom_import_button: 'Import',
  custom_modal_title: 'Create a New Battery Question',
  custom_category_label: 'Category',
  custom_title_label: 'Question Text (e.g. "How much battery is left after this calculus problem?")',
  custom_title_placeholder: 'Enter your question...',
  custom_battery_label: 'Set the Correct Answer (0% ~ 100%)',
  custom_battery_gauge_label: 'Answer Battery',
  custom_explanation_label: 'Official Explanation (why this number)',
  custom_explanation_placeholder: 'Explain why the answer is this number...',
  custom_emoji_label: 'Emoji Icon',
  custom_confirm_create: 'Create',
  custom_default_explanation: "The question writer's own intuition!",
  custom_alert_import_success: 'Successfully imported {n} custom questions!',
  custom_alert_import_invalid: 'Invalid deck JSON format!',
  custom_alert_import_parse_fail: 'Failed to parse JSON — please check the format!',
  custom_alert_no_webhook: 'Question submission is not configured yet — please contact the developer!',
  custom_alert_submit_success: 'Question "{title}" submitted! It\'s in the official review queue and will be added once approved!',
  custom_alert_submit_fail: 'Failed to submit "{title}" — please check your connection and try again!',

  // ---------------------------------------------------------------------
  // PartyModeGame.tsx
  // ---------------------------------------------------------------------
  party_player_name_default: 'Player {n}',
  party_setup_title: 'Same-Screen Party Mode',
  party_setup_subtitle: '2-4 players share one phone/computer, taking secret turns to guess!',
  party_choose_count: 'Choose Player Count',
  party_count_option: '{n} Players',
  party_enter_names: 'Enter Player Nicknames',
  party_start_button: 'Start Party Battle',
  party_turn_badge: "It's Your Turn",
  party_pass_device: 'Pass the screen to {name}! Everyone else, no peeking!',
  party_ready_button: "I'm ready, enter my guess secretly",
  party_entering_secretly: 'Entering secretly: {avatar} {name}',
  party_guess_label: "{name}'s Guess",
  party_lock_button: "Lock In {name}'s Answer",
  party_reveal_badge: 'Round Reveal',
  party_official_answer_label: 'Official Answer',
  party_guess_distance: 'Guessed {guess}% (off by {distance}%)',
  party_round_score: 'Round Score',
  party_final_stats_button: 'See Final Standings',
  party_next_round_button: 'Next Question',
  party_final_badge: 'Party Final Results',
  party_tie_title: 'Neck and Neck · Tied Champions!',
  party_champion_title: 'The Party Champion Emerges!',
  party_final_subtitle: 'Survived 5 rounds of ultimate battery challenges',
  party_tied_top_score: 'Tied top score: ',
  party_top_score: 'Total Score: ',
  party_score_points: '{n} pts',
  party_leaderboard_heading: 'Final Leaderboard',
  party_rank_co_champion: 'Co-Champion',
  party_rank_runner_up: 'Runner-up',
  party_rank_third: '3rd Place',
  party_avg_accuracy: 'Avg. accuracy {n}%',
  party_share_button: 'Share Champion Results',
  party_restart_button: 'Start a New Party',
  share_party_text: '🎉【Guess the Battery】Party Mode\n{result}! Top score: {maxScore} points!\n\n"Everything has a battery level. Can you guess it?" Grab your friends and test your intuition!',
  share_party_champions: 'Champion: {names}',
  share_party_tie: 'Tied Champions: {names}',

  // ---------------------------------------------------------------------
  // MutualPkGame.tsx
  // ---------------------------------------------------------------------
  pk_guest_name_default: 'Player{n}',
  pk_mystery_opponent: 'Mystery Opponent',
  pk_real_opponent_explanation: "Written live by your opponent — you'll both find out the answer at the reveal!",
  pk_lobby_badge: 'Real-Time, One Battle Decides It All',
  pk_lobby_title: '1v1 PK Battle',
  pk_lobby_subtitle: 'Find a live opponent instantly! You each write a question for the other, then reveal together!',
  pk_start_matchmaking: 'Find a Match (PK)',
  pk_matching_title: 'Searching for an opponent...',
  pk_matching_subtitle: 'Syncing brainwaves, preparing for real-time battle...',
  pk_matched_badge: 'Battery Showdown · Matched Instantly!',
  pk_you: 'You',
  pk_matched_success: 'Matched',
  pk_matched_ready: 'Get ready to write each other questions...',
  pk_opponent_label: 'Opponent: {name}',
  pk_opponent_writing: 'Opponent is thinking hard and writing a question...',
  pk_opponent_written: 'Opponent has finished their question!',
  pk_step1_heading: 'Step 1: Write a question to stump {name}',
  pk_question_title_label: 'Question Text',
  pk_question_title_placeholder: "e.g. Guess how much battery my phone has left after a match?",
  pk_question_battery_label: "Question's Official Battery Answer",
  pk_use_real_battery: 'Use my real device battery ({n}%)',
  pk_confirm_question: "Done! Start guessing my opponent's battery",
  pk_alert_no_title: 'Please enter a question to challenge your opponent!',
  pk_question_sent: 'Your question is sent — waiting for {name} to write theirs...',
  pk_opponent_writing_named: '{name} is thinking hard and writing a question...',
  pk_question_incoming: "You'll get to guess the moment it arrives!",
  pk_step2_heading: "Step 2: Guess {name}'s question — battery %?",
  pk_your_estimate_opponent: "Your estimate of the opponent's answer",
  pk_opponent_question_label: "{name}'s question:",
  pk_your_estimate_answer: 'Your estimated answer',
  pk_opponent_calculating: "{name} is calculating the question's battery online...",
  pk_both_estimated: 'Both estimates are in — revealing the showdown result together!',
  pk_charging_both: 'Both batteries charging up together...',
  pk_win_title: 'Victory! You Won the Battle!',
  pk_lose_title: 'Battle Over · A Close Defeat!',
  pk_smallest_gap_wins: 'Smallest gap wins!',
  pk_win_badge: 'Won',
  pk_lose_badge: 'Lost',
  pk_score_points: 'Score: {n} pts',
  pk_your_guess_gap: 'You guessed {guess}% (off by {gap}%)',
  pk_opponent_guess_gap: 'Opponent guessed {guess}% (off by {gap}%)',
  pk_share_button: 'Share Battle Result',
  pk_restart_button: 'Find a New Match!',
  share_pk_text: '⚔️【Guess the Battery】1v1 PK Battle\nI {result}! Score {score} pts (gap {gap}%) vs opponent {opponentName} {opponentScore} pts!\n\n"Everything has a battery level. Can you guess it?" Come test your intuition!',
  share_pk_win: 'won',
  share_pk_lose: 'narrowly lost'
};

export const translations: Record<Language, Record<TranslationKey, string>> = { zh, en };

/** Fills `{token}`-style placeholders in a translated string. */
export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.split(`{${key}}`).join(String(value));
  }
  return result;
}

/** Plain (non-React) translation lookup — for pure utility functions that
 * take an explicit `lang` parameter instead of depending on the React
 * context (gameLogic.ts, aiBots.ts, matchmaking.ts, share.ts). */
export function translate(lang: Language, key: TranslationKey, vars?: Record<string, string | number>): string {
  return interpolate(translations[lang][key], vars);
}
