/**
 * @author tea
 * @date 2010/04/30
 */


var default_song_title = 'Input a song title here'
var default_song_title_color = '#aaaaaa'
var active_song_title_color = 'black'


function show_status(xhr)
{
  var db = {}
  var doc = xhr.responseXML
  var status = $('server_status')
  var users = nodelist_to_array(doc.getElementsByTagName('user'))
  var get_text = function(xs,x){ return xs.getElementsByTagName(x)[0].text }
  
  foreach(users, function(node){
    var ip = get_text(node, 'ip') + '.x'
    var name = get_text(node,'name').split('@')[0]
    var city = get_text(node,'city')
    var country = get_text(node,'country')
    var server = get_text(node, 'server')
    var channel = get_text(node, 'channel')
    var key = server + ":" + channel
    
    if (channel != "xxxx") {
      if (! db[key])
        db[key] = []
      db[key].push('[' + country  + '] ' + name)
    }
  })
  
  foreach(db, function(xs,server){
    add_status($('server_status'), server, xs)
  })
}

var _tid = null
function on_status(e)
{
  _on_status()
  if (! _tid) {
    _tid = setInterval(_on_status, status_check_interval_min*60*1000)
    
    $('stop').disabled = ''
  }
}

function on_stop(e)
{
  if (_tid) {
    clearInterval(_tid)
    _tid = null
    
    $('stop').disabled = 'disabled'
  }
}

function _on_status(e)
{
  $('server_status').innerHTML = ''
  
  check_site(ninbot_status_url, show_status)
  // XXX: This is a temporary code, should be plugable.
  if (user_locale == 'ja') {
    check_site(crasher_orz_hm_jamfarm_url, function(xhr){
      var doc = xhr.responseText
      var users = []
      doc.replace(/<li>(.*?)<\/li>/g, function(m){
        var name = m.replace('<li>','').replace('</li>','').split('@')[0]
        users.push(name)
      })
      add_status($('server_status'), 'crasher.orz.hm:8888', users)
    })
  }
}


function on_toolbox(e)
{
  // XXX: This will open IE and ask Exec or Save
  // XXX: can't do > mshtta.exe [htapath]
  location.href = toolbox_hta
}

function on_delete_song(title)
{
  if (confirm('Delete ' + title + ' ?')) {
    var db = filter(function(x){ return x[0] != title }, SONG)
    store_song_db(db)
  }
}

function on_focus_songtitle(e) {
  var title = $('song-title')
  if (title.style.color == default_song_title_color) {
    title.value = ''
    title.style.color = active_song_title_color
  }
}

function on_blur_songtitle(e) {
  var title = $('song-title')
  if (title.value == '') {
    title.value = default_song_title
    title.style.color = default_song_title_color
  }
}

function on_bpi_changed(e)
{
  var meter = $('meter').value
  var bpi = $('bpi').value
  var bar = bpi/meter
  
  if (bar > 16)
    return alert('Sorry, no support over 16 bars')
  if (bpi % meter)
    return alert('Choose correct BPI for the meter')
  
  foreach(range(1,16,1), function(idx){
    var obj = $('chord'+idx)
    var flg = (idx > bar)
    obj.disabled = flg
    obj.className = flg ? 'disabled' : ''
  })

}

function on_reset(e) {
  $('song-title').value = default_song_title
  $('song-title').style.color = default_song_title_color

  set_select_option($('bpm'), default_bpm)
  set_select_option($('bpi'), default_bpi)
  $('key').value = ''
  
  foreach(range(1,16,1), function(idx){
    $('chord'+idx).value = ''
  })
  
  on_bpi_changed()
}

function on_save(e) {
  var title = $('song-title').value
  var meter = $('meter').value
  var bpm = $('bpm').value
  var bpi = $('bpi').value
  var key = $('key').value
  
  //////////////////////////////////////////////////////////////
  if ($('song-title').style.color == default_song_title_color || title.length == 0) {
    return alert('Input a song title')
  }
  if (! bpi) {
    return alert('Select BPI')
  }
  if (! key.match(/[ABCDEFG][b#]?m?/)) {
    return alert('Invalid Key')
  }
  
  //////////////////////////////////////////////////////////////
  var bar = bpi / meter
  var chords = []
  
  foreach(range(1,bar,1), function(idx){
  chords.push($("chord"+idx).value.replace(/["']/g,''))
  if (idx > 0 && idx % 4 == 0)
    chords.push('\n')
  })
  
  
  var song = new Song()
  song.chords = chords
  song.original_key = key
  
  var row = [title, bpm, bpi, song]
  var idx = function(title){
    var flag = -1
    foreach(SONG,function(x,i){
      if (x[0] == title)
        flag = i
    })
    return flag
  }(title)
  
  if (idx != -1)
    SONG[idx] = row
  else
    SONG.push(row)
  
  var decoded = decode_song(row)
  
  if (confirm('Save:\n\n' + decoded)) {
    store_song_db(SONG)
  }
}

function check_twitter()
{
  twitter_search('atom', 'ninjam', function(list){
    
    var ul = document.createElement('ul')
    
    foreach(list, function(entry){
      var li = document.createElement('li')
      var date = entry.updated.replace(/[TZ]/g, ' ')
      li.innerHTML = entry.title + '<br />' + '<span>' +  date + ' ' + entry.name + '</span>'
      ul.appendChild(li)
    })
    
    $('twitter').innerHTML = ''
    $('twitter').appendChild(ul)
    
  })
}

function check_update()
{
  var current_ver = $('hta_app').version
  var update_available = false
  var download_atom = "http://code.google.com/feeds/p/pyninjam/downloads/basic"
  
  feed_check(download_atom, feed_atom_parser, function(list){
  
    var ul = document.createElement('ul')
    foreach(list, function(x){
      var link = x['id'].split('/').pop()
      if (link.indexOf('songbook') == -1) return
      
      if (alert_update && !update_available) {
        update_available = (link.match(/v([0-9.]+)\.zip$/)[1] > current_ver)
      }
      
      var a = document.createElement('a')
      a.href = x.link // hook_link (./share/js/toolbox.js)
      a.onclick = hook_link(x.link)
      a.innerText = link // 'Download'
      
      var li = document.createElement('li')
      li.innerText = x['updated'].replace(/[TZ]/g, ' ')
      li.appendChild(a)
      ul.appendChild(li)
    })
    
    var h2 = document.createElement('h2')
    h2.innerText = 'Download Feed'
    
    var url = 'http://code.google.com/p/pyninjam/wiki/SongBookUtil'
    var a = document.createElement('a')
    a.href = url
    a.onclick = hook_link(url)
    a.innerText = 'NinjamSongBook Wiki page'
    var p = document.createElement('p')
    p.innerText = 'Check latest information '
    p.appendChild(a)
    
    var panel = $('develop')
    panel.appendChild(h2)
    panel.appendChild(document.createElement('hr'))
    panel.appendChild(ul)
    panel.appendChild(document.createElement('hr'))
    panel.appendChild(p)
  })
  
  if (alert_update && update_available) {
    if (confirm('Update version available')) {
      $('develop_label').firstChild.click()
    }
  }
}

function open_editsong(title, bpm, bpi, key, song_chords)
{
  var chords = filter(function(x){ return x != '\n'}, song_chords)
  $('bpm').value = bpm
  $('bpi').value = bpi
  $('key').value = key
  $('song-title').value = title
  $('meter').value = (bpi / chords.length)
  on_bpi_changed()
  
  foreach(range(1,16,1), function(idx){
    $('chord'+idx).value = (idx <= chords.length) ? chords[idx-1] : ''
  })
  
  $('song-title').style.color = active_song_title_color
  $('edit_label').firstChild.click()
}

function on_init(e){
  document.title = $('hta_app').applicationname

  var table = $('table_body')
  foreach(SONG, function(row){
    var title = row[0]
    var bpm = row[1]
    var bpi = row[2]
    var song = row[3]
  
    var tr = table.insertRow()
    var cellA = tr.insertCell(0)
    var cellB = tr.insertCell(1)
    var cellC = tr.insertCell(2)
    var cellD = tr.insertCell(3)
  
    cellA.innerText = row[0]
    cellB.innerText = bpm + ' / ' + bpi
    cellC.innerText = (song ? (song.original_key ? song.original_key : ' ') : ' ')
    cellD.innerText = (song ? (song.format ? song.format(song.chords, 10) : song) : ' ')
  
    tr.ondblclick = function(){
      /*
      if (confirm('Setup for ' + title)) {
        if (bpm) ninjam_chat('!vote bpm ' + bpm)
        if (bpi) ninjam_chat('!vote bpi ' + bpi)
        if (song) ninjam_chat([title, song].join('\n'))
      }
      */
      if (song.chords)
        open_editsong(title, bpm, bpi, song.original_key, song.chords)
    }
    
    tr.onmouseover = function(){
      tr.className = 'mouseover'
    }
    tr.onmouseout = function(){
      tr.className = 'mousout'
    }
    tr.oncontextmenu = function(){
      on_delete_song(row[0])
    }
  
    tr.appendChild(cellA)
    tr.appendChild(cellB)
    tr.appendChild(cellC)
    tr.appendChild(cellD)
    table.appendChild(tr)
  })
  
  
  tabs($('tab_menu'))
  
  
  function set_focus_css(obj) {
    obj.onfocus = function(){ obj.className = 'focus' }
    obj.onblur = function(){ obj.className = 'blur' }
  }
  
  foreach(range(1,16,1), function(idx){
    set_focus_css($('chord'+idx))
  })
  set_focus_css($('key'))
  
  
  var bpm_select = $('bpm')
  var bpi_select = $('bpi')
  var meter_select = $('meter')
  
  add_option(bpm_select, 0, '')
  add_option(meter_select, 4, '4/4')
  add_option(meter_select, 3, '3/4')
  add_option(meter_select, 2, '2/4')
  
  foreach(BPM, function(num){ add_option(bpm_select, num, num) })
  foreach(BPI, function(num){ add_option(bpi_select, num, num) })
  
  register_event($('bpi'), 'onchange', on_bpi_changed)
  register_event($('meter'), 'onchange', on_bpi_changed)
  register_event($('save'), 'onclick', on_save)
  register_event($('reset'), 'onclick', on_reset)
  register_event($('song-title'), 'onfocus', on_focus_songtitle)
  register_event($('song-title'), 'onblur', on_blur_songtitle)
  register_event($('status'), 'onclick', on_status)
  register_event($('stop'), 'onclick', on_stop)
  // register_event($('toolbox'), 'onclick', on_toolbox)
  
  $('stop').disabled = 'disabled'
  
  // Set user locale
  if (user_locale) {
    load_js(locale_dir + user_locale + '.js', 'locale')
    locale_init_songbook()
  }
  
  // Init Twitter Tab
  if (use_twitter) {
    check_twitter()
  }
  else {
    $('twitter_label').style.display = 'none'
    $('twitter').style.display = 'none'
  }
  
  // Init Develop Tab
  if (develop_mode) {
    check_update()
  }
  else {
    $('develop_label').style.display = 'none'
    $('develop').style.display = 'none'
  }
  
  on_reset()
}
