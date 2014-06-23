/**
 * @author tea
 * @date   2010/04/22
 * @depends /js/common.js
 * @depends /js/events.js
 * @depends /js/domutils.js
 * @depends /conf/settings.js
 */

function reset_form()
{
  $('submit_on_change').checked = false
  on_song()

  // Set up default values (see /user/conf/settings.js)
  $('submit_on_change').checked = default_submit_on_change_checked
  $('confirm_on_submit').checked = default_confirm_on_submit_checked
  $('clear_on_save').checked = default_clear_on_save_checked
  $('lock_controls').checked = false
  $('topmost').checked = default_topmost
  $('song').selectedIndex = 0
  $('theme').selectedIndex = 0
  set_select_option($('bpm'), default_bpm)
  set_select_option($('bpi'), default_bpi)
  $('chords_to_clipboard').checked = default_chords_to_clipboard

  var misc = $('misc_field')
  var prev = $('theme')
  foreach (misc_buttons_order, function (id){
    var e = $(id)
    misc.insertBefore(e, prev.nextSibling)
    // XXX: e.style.display = 'block'
    prev = e
  })

  var form = $('form')
  prev = null
  foreach (fieldset_order, function (id){
    var e = $(id)
    if (prev)
      form.insertBefore(e, prev.nextSibling)
    else
      form.appendChild(e)
    prev = e
  })

  $('vote').disabled = false
  $('setup').disabled = false
}

function init()
{
  // Set window title
  document.title = window_title ? window_title : $('hta_app').applicationname

  var form = $('form')
  var bpm_select = $('bpm')
  var bpi_select = $('bpi')
  var key_select = $('key')
  var song_select = $('song')
  var theme_select = $('theme')

  // Load options data BPM/BPI and SONG
  foreach(BPM, function(num){ add_option(bpm_select, num, num) })
  foreach(BPI, function(num){ add_option(bpi_select, num, num) })
  foreach(SONG, function(song, idx){
    add_option(song_select, idx, song[0])
  })
  foreach(KEYS, function(key, idx){
    add_option(key_select, idx, key)
  })
  foreach(theme_list, function(theme, idx){
    add_option(theme_select, theme, theme)
  })

  // XXX: Refresh select box layout by update css
  /*
  bpm_select.style.display = 'inline'
  bpi_select.style.display = 'inline'
  song_select.style.display = 'inline'
  theme_select.style.display = 'inline'
  */

  // Set default values for form controls.
  reset_form()

  // Register events
  register_event($('bpm'), 'onchange', on_bpm)
  register_event($('bpi'), 'onchange', on_bpi)
  register_event($('key'), 'onchange', on_key)
  register_event($('song'), 'onchange', on_song)
  register_event($('vote'), 'onclick', on_vote)
  register_event($('sync'), 'onclick', on_sync)
  register_event($('setup'), 'onclick', on_setup)
  register_event($('chords'), 'onclick', on_chords)
  register_event($('edit'), 'onclick', on_edit)
  register_event($('theme'), 'onchange', on_theme)
  register_event($('save'), 'onclick', on_save)
  register_event($('clear'), 'onclick', on_clear)
  register_event($('random'), 'onclick', on_random)
  register_event($('clipboard'), 'onclick', on_clipboard)
  register_event($('reset'), 'onclick', on_reset)
  register_event($('ninjam'), 'onclick', on_ninjam)
  register_event($('lock_controls'), 'onclick', on_lock_controls)
  register_event($('topmost'), 'onclick', on_topmost_checked)
  register_event($('client'), 'onchange', on_client_changed)
  register_event(form, 'onsubmit', on_submit)
  register_event(form, 'onreset', on_reset)

  var all_fields = map($, ['vote_field', 'song_field', 'misc_field', 'option_field', 'chat_field'])
  switch (fieldset_fold) {
  case "toggle":
    togglable(all_fields, $('vote_field'), $('vote_legend'))
    togglable(all_fields, $('song_field'), $('song_legend'))
    togglable(all_fields, $('misc_field'), $('misc_legend'))
    togglable(all_fields, $('option_field'), $('option_legend'))
    togglable(all_fields, $('chat_field'), $('chat_legend'))
    hide_all_fields(all_fields)
    break
  case "collapse":
    collapsable($('vote_field'), $('vote_legend'))
    collapsable($('song_field'), $('song_legend'))
    collapsable($('misc_field'), $('misc_legend'))
    collapsable($('option_field'), $('option_legend'))
    collapsable($('chat_field'), $('chat_legend'))
    hide_all_fields(all_fields)
    foreach(fieldset_default_opened,function(x){
      $(x).className = ""
    })
    break
  }

  // Initialize theme selection
  if (use_theme) {
    on_theme()
  }
  else {
    $('theme').style.display = 'none'
    $('theme_label').style.display = 'none'
  }

  // Advanced mode
  if (! advanced_mode) {
    var padding = 5
    var offsetH = ($('misc_field').offsetHeight)

    foreach ([$('misc_field'), $('option_field')], function(obj){
      obj.style.display = 'none'
    })
    window.resizeBy(0, -1*(offsetH*2)+padding)
  }

  // How show the links
  if (show_useful_site_links) {
    if (show_links_on_top) {
      document.body.insertBefore($('links'), form)
    }
  }
  else {
    document.body.removeChild($('links'))
  }

  // Set user locale, and locale specific contents
  // TODO const.js locale_dir
  if (user_locale) {
    load_js(locale_dir + user_locale + '.js', 'locale')
    locale_init_toolbox()
  }

  // Call user custom initialization
  user_init()


  // Hook for links
  // HTA open url by Internet Explorer by default.
  // this should be called at the tail
  // user_init() may add some links.
  if (use_your_default_browser) {
    foreach (document.links, function(link){
      if (link.href && link.href.search(/^https?\:\/\//) != -1)
        register_event(link, 'onclick', hook_link(link.href))
    })
  }


  $('client').selectedIndex = default_client
  on_client_changed()

  if (chat_customize) {
    ninjam_setcharformat($('client').value, chat_fgcolor, chat_bgcolor, chat_fontsize, chat_fontface)
  }

  var _loaded = function() {
    if (use_transparency) {
      run_program(setalpha_command + " " + transparent_alpha)
    }
    on_topmost_checked()
  }

  setTimeout(_loaded, loaded_event_interval);
}


// Bootstrap initialize code. this function is called immeditately.
(function()
{
  // Initialize HTA application window pos/size
  if (window_width && window_height) {
    if (window_x < 0 || window_y < 0) {
      window_x = screen.width/2 - window_width/2
      window_y = screen.height/2 - window_height/2
    }
    window.moveTo(window_x, window_y)
    window.resizeTo(window_width, window_height)
  }

  // register the init event
  register_event(window, 'onload', init)
})()
