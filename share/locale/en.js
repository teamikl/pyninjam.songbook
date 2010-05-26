// English locale does nothing, so this can be template

var en_sites = [
    ['http://example.com/', 'Example.Com'],
]

// Translate
var en_locale = {
  'vote_legend': 'Vote BPM/BPI',
  'vote': '!vote',
  'sync': 'sync',
  
  'song_legend': 'Select a song',
  'setup': 'Setup',
  'chords': 'Chords',
  'song_label': 'Song: ',
  
  'misc_legend': 'Misc',
  'theme_label': 'Theme: ',
  'random': 'Random',
  'clear': 'Clear',
  'clipboard': 'Clipboard',
  'save': 'Save',
  'reset': 'Reset',
  
  'option_legend': 'Options',
  'submit_on_change_label': 'Submit on Change',   
  'confirm_on_change_label': 'Confirm on Submit',   
  'lock_controls_label': 'Lock controls'  
}

var en_locale2 = {

  'view_anchor': 'View',
  'edit_anchor': 'Edit',
  'server_anchor': 'Server',
  'develop_anchor': 'Develop',

  't_title': 'Title',
  't_chords': 'Chords',

  'meter_label': 'Meter: ',

  'view-desc': 'Double-Click: Open Edit Song, Right-Click: Delete song',
  'manual-desc-01': 'TAB key to move next field.',
  'manual-desc-02': 'Shift + TAB to back previous field.',

  'save':'Save',
  'reset':'Reset',
  'share':'Share',
  'status': 'Check Status',
  'stop':'Stop'
}

// init for toolbox.hta
function locale_init_toolbox()
{
  append_sites(en_sites)
  install_locale(document, en_locale)
}

// init for songbook.hta
function locale_init_songbook()
{
  install_locale(document, en_locale2)
}
