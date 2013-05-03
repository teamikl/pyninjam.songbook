/**
 * @author   tea
 * @date     2010/04/22
 * @depends /share/js/common.js
 * @depends /share/js/ninjam.js      ninjam_vote(), ninjam_chat()
 * @depends /conf/songlist.js  SONG
 */


////////////////////////////////////////////////////////////////////////////////

function send_chat(msg)
{
  // confirm
  if ($('confirm_on_submit').checked && (! confirm(msg)))
    return

  var target = $('client').value
  return ninjam_chat(target, msg)
}

function send_vote(type, num)
{
  if (type && num)
    return send_chat(['!vote', type, num].join(' '))
}

function get_key_index(original_key)
{
  var key = original_key
  foreach_options($('key'), function(option){
    foreach(option.text.split('/'), function(x){
      if (x == original_key)
        key = option.value
    })
  })
  return key
}

function transpose_chords(chords, key)
{
  if (key && chords && chords.original_key) {
    var original_key = get_key_index(chords.original_key)
    if (key != original_key)
      return chords.transpose(key)
  }
  return chords
}

function send_song(bpm, bpi, idx, key)
{
  if (idx >= SONG.length || 0 > idx)
    return

  var song = SONG[idx]
  var name = song[0]
  var chords = transpose_chords(song[3], key)

  if (bpm) send_vote('bpm', bpm)
  if (bpi) send_vote('bpi', bpi)
  if (chords) send_chat(name + "\n" + chords)
}

function send_chords(idx, key)
{
  var song = SONG[idx]
  var name = song[0]
  var chords = transpose_chords(song[3], key)

  if (chords) send_chat(name + "\n" + chords)
}

////////////////////////////////////////////////////////////////////////////////

var to_minor = function(x){ return x?x+"m":'' }
var to_major = function(x){ return x.replace('m', '') }

function _set_keys(func)
{
  foreach_options($('key'), function(option){
    option.text = map(func, option.text.split('/')).join('/')
  })
}

function set_minor_key_sets()
{
  _set_keys(to_major) /* avoid bug like 'Ammm' */
  _set_keys(to_minor)
}

function set_major_key_sets()
{
  _set_keys(to_major)
}

function is_minor_key(x)
{
  return x.indexOf('m') > 0
}

function is_major_key(x)
{
  return ! is_minor_key(x)
}

function set_key(key)
{
  foreach_options($('key'), function(option){
    if (option.text.indexOf(key) >= 0)
    foreach(option.text.split('/'), function (x) {
      if (x == key)
        option.selected = true
    })
  })
}

////////////////////////////////////////////////////////////////////////////////

function on_bpm(e)
{
  if ($('submit_on_change').checked)
    send_vote('bpm', $('bpm').value)

  $('vote').disabled = false
  $('setup').disabled = false
}

function on_bpi(e)
{
  if ($('submit_on_change').checked)
    send_vote('bpi', $('bpi').value)

  $('vote').disabled = false
  $('setup').disabled = false
}

function on_setup(e)
{
  send_song($('bpm').value, $('bpi').value, $('song').value, $('key').value)

  $('setup').disabled = true
}

function on_chords(e)
{
  send_chords($('song').value, $('key').value)
}

function on_edit(e)
{
  // Not works
  // window.open(editsong_html)
  // location.replace(editsong_html)
  // WSH.Exec(editsong_html.replace('/','\\')
}

function on_key(e)
{
  if ($('submit_on_change').checked)
    on_setup()

  $('setup').disabled = false
}

function on_song(e)
{
  var row = SONG[$('song').value]
  var bpm = row[1]
  var bpi = row[2]
  var chords = row[3]

  if (chords && chords.original_key) {
    if (is_minor_key(chords.original_key))
      set_minor_key_sets($('key'))
    else
      set_major_key_sets($('key'))
    set_key(chords.original_key)
  }
  else {
    $('key').selectedIndex = 0
  }

  set_select_option($('bpm'), bpm)
  set_select_option($('bpi'), bpi)

  if ($('submit_on_change').checked)
    send_song(bpm, bpi, $('song').value)

  $('vote').disabled = false
  $('setup').disabled = false
}

function on_vote(e)
{
  var bpm = $('bpm').value
  var bpi = $('bpi').value

  if (bpm) send_vote('bpm', bpm)
  if (bpi) send_vote('bpi', bpi)

  $('vote').disabled = true
}

function on_sync()
{
  var line = ninjam_getmetronome()
  var m = (line) ? line.match(/\d+\/(\d+) \@ (\d+) BPM/) : null
  if (m) {
    set_select_option($('bpi'), m[1])
    set_select_option($('bpm'), m[2])
  }
}


function on_clear(e)
{
  send_chat('/clear')
}

function on_clipboard(e)
{
  var txt = clipboard.get()

  if (txt.indexOf('/') == 0) // avoid ninjam command
    txt = ' '+txt

  send_chat(txt)
}

function on_random(e)
{
  var song_select = $('song')
  song_select.value = randint(0, $('song').length)
  on_song()
}

function on_reset(e)
{
  reset_form()
  return false
}

function on_submit(e)
{
  var target = $('client').value
  var msg = $('chat').value
  if (msg)
    ninjam_chat(target, msg)
  $('chat').value = ""

  // Cancel the form submit event
  return false
}

function on_save(e)
{
  var target = $('client').value
  var savefile = log_dir + getTimestamp() + chatlog_ext

  ninjam_savechatlog(target, savefile)

  if ($('clear_on_save').checked)
    on_clear()
}

function on_theme(e)
{
  var old = $('theme_css')
  if (old)
    get_head().removeChild(old)

  var theme_name = $('theme').value
  if (theme_name)
    load_css(theme_dir + theme_name + '.css', 'theme_css')
}

function on_ninjam(e)
{
  var target = $('client').value
  ninjam_active(target)
}

function on_lock_controls(e)
{
  var state = $('lock_controls').checked
  var controls = 'bpm bpi vote sync song setup chords key clear reset random clipboard save ninjam submit_on_change theme confirm_on_submit clear_on_save topmost client chat'.split(' ')
  foreach(controls, function(id) {
    $(id).disabled = state
  })
}

function on_topmost_checked(e)
{
  run_program(topmost_command + ' ' + ($('topmost').checked ? 1 : 0))
}

function on_client_changed(e)
{
  $('ninjam').value = $('client').value
}
