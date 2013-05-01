/**
 * @depends /share/js/common.js   BPM use range()
 */

// Init list of BPM and BPI
var BPM = range(40, 200, 10)
var BPI = range(4, 64, 4)

// default client 0 "NINJAM" or 1 "ReaNINJAM"
var default_client = 0

// Set your locale ("en", "ja", or null)
var user_locale = "ja"

// Enable Advanced options mode.
var advanced_mode = true

// user dir
var log_dir = "./user/log/"
var tmp_dir = './user/tmp/'

// Song data file
var songlist_js = "./user/data/songlist.js"

// File extension for chat log files
var chatlog_ext = ".log"

// default values for submit_on_change, confirm_on_change and clear_on_save
var default_submit_on_change_checked = true
var default_confirm_on_submit_checked = true
var default_clear_on_save_checked = true
var default_topmost = true // Always on Top

var default_bpm = 120
var default_bpi = 16

// transparency window alpha range(0..255)
var use_transparency = false
var transparent_alpha = 120

// Customize chat field.
var chat_customize = false // or true
var chat_fontsize = 20
var chat_fontface = "Meiryo" // "MS P Gothic" and so on
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
var window_width = 640
var window_height = 300

// If you want set another title.
var window_title = null


// Path to ninjam.exe / reaper.exe
var ninjam_exe = 'c:\\Program Files\\NINJAM\\ninjam.exe'
var reaper_exe = 'c:\\Program Files\\Reaper\\reaper.exe'


// Path to ninjam command line utilities. (no need to edit here)
var chat_command = 'bin\\ninjam_chat.exe'
var active_command = 'bin\\ninjam_active.exe'
var connect_command = 'bin\\ninjam_connect.exe'
var getchatlog_command = 'bin\\ninjam_getchatlog.exe'
var getmetronome_command = 'bin\\ninjam_getmetronome.exe'
var setcharformat_command = 'bin\\ninjam_setcharformat.exe'
var topmost_command = 'bin\\topmost.exe'
var setalpha_command = 'bin\\setalpha.exe'

var debug_mode = false
var develop_mode = true

