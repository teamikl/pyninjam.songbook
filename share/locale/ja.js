/**
 *
 */

// Add NINJAM Japan site
var ja_sites = [
    ['http://crasher.orz.hm/ninjam','crasher.orz.hm'],
]

var crasher_orz_hm_jamfarm_url = "http://crasher.orz.hm/ninjam/jamfarm_php4.php"



// 翻訳
var ja_locale = {
  'vote_legend': 'BPM/BPIの設定',
  'vote': '投票',
  'sync': '同期',

  'song_legend': '曲選択',
  'setup': '設定',
  'chords': 'コード',
  'song_label': '曲: ',
  'chords_to_clipboard_label': 'クリップボードへコピー',

  'misc_legend': 'その他',
  'theme_label': 'テーマ: ',
  'random': 'ランダム',
  'clear': '消去',
  'clipboard': 'クリップボード',
  'save': '保存',
  'reset': '初期化',

  'option_legend': 'オプション',
  'submit_on_change_label': '変更時に送信',
  'confirm_on_change_label': '送信前に確認',
  'clear_on_save_label': '保存時に消去',
  'lock_controls_label': 'ロック',
  'topmost_label': '前面に表示',
  'client_label': 'クライアント',

  'chat_legend': 'チャット'
}

var ja_locale2 = {

  'view_anchor': '曲一覧',
  'edit_anchor': '編集',
  'server_anchor': 'サーバ状態',
  'develop_anchor': '開発サイト',

  't_title': 'タイトル',
  't_chords': 'コード',

  'meter_label': '拍子: ',

  'view-desc': 'ダブルクリックで編集画面を開く。右クリックで削除。',
  'manual-desc-01': 'TAB で次の入力欄に進みます',
  'manual-desc-02': 'Shift + TAB で前の入力欄に戻ります',

  'save':'保存',
  'reset':'消去',
  'share':'共有',
  'status':'状態チェック',
  'stop':'停止'
}

function locale_init_toolbox()
{
  append_sites(ja_sites)
  install_locale(document, ja_locale)
}

function locale_init_songbook()
{
  install_locale(document, ja_locale2)
}


