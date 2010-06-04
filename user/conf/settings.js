/**
 * @depends /share/js/common.js   BPM use range()
 */

// Init list of BPM and BPI
var BPM = range(40, 200, 10)
var BPI = range(4, 64, 4)


// Set your locale ("en", "ja", or null)
var user_locale = null

// Enable Advanced options mode.
var advanced_mode = true

// user dir
var log_dir = "./user/log/"
var tmp_dir = './user/tmp/'

// Song data file
var songlist_js = "./user/data/songlist.js"

// File extension for chat log files
var chatlog_ext = ".log"

// Clear chat log on save the chat log
var clear_on_save = true

// default values for submit_on_change and confirm_on_change
var default_submit_on_change_checked = true
var default_confirm_on_submit_checked = true

var default_bpm = 120
var default_bpi = 16

// Customize chat field.
var chat_customize = false // or true
var chat_fontsize = 20
var chat_fontface = "Arial" // "MS P Gothic" and so on
var chat_bgcolor = RGB(0xEE, 0xEE, 0xFF) // or "#FFFFFF"
var chat_fgcolor = RGB(0x77, 0x77, 0xFF) // or "#000000"

// status check interval
var status_check_interval_min = 3

// Alert when update version exists
var alert_update = true

// When this is false, HTA open Internet explorer for url link.
var use_your_default_browser = true

// The bottom links
var show_useful_site_links = true

// Show the link on top of page
var show_links_on_top = true

// Enable Twitter tab (state: testing)
var use_twitter = false

// Enable theme feature
var use_theme = true

// List of themes
var theme_list = [
  'default', 'ninbot',
]

// Order of misc buttons
var misc_buttons_order = [
  'random', 'clipboard', 'save', 'clear', 'reset', 'ninjam'
]

// Intiali window position and size.
// Set window_x or window_y negative for centering.
var window_x = -1
var window_y = -1
var window_width = 580
var window_height = 260

// If you want set another title.
var window_title = null


// Path to ninjam.exe
var ninjam_exe = 'c:\\Program Files\\NINJAM\\ninjam.exe'


// Path to ninjam command line utilities. (no need to edit here)
var chat_command = 'bin\\ninjam_chat.exe'
var active_command = 'bin\\ninjam_active.exe'
var connect_command = 'bin\\ninjam_connect.exe'
var getchatlog_command = 'bin\\ninjam_getchatlog.exe'
var getmetronome_command = 'bin\\ninjam_getmetronome.exe'
var setcharformat_command = 'bin\\ninjam_setcharformat.exe'

var debug_mode = false
var develop_mode = true

