/**
 * @author tea
 * @date 2010/04/22
 */

/**
 * register_event(obj, event, func)
 *
 */
function register_event(obj, event_type, callback)
{
  if (obj.attachEvent)
    obj.attachEvent(event_type, callback)
}

function get_head()
{
  return document.getElementsByTagName('head')[0]
}

function nodelist_to_array(xs)
{
  var list = []
  var len = xs.length
  for (var i = 0; i < len; ++i)
    list.push(xs.item(i))
  return list
}

function add_option(select, value, label)
{
  var option = document.createElement('option')
  option.value = value
  option.innerText = label
  select.appendChild(option)
}

function foreach_options(select, callback)
{
  // NOTE: for (var option in select.options) deos not work.
  // so i needed manual for loop.
  
  for (var idx = 0; idx < select.options.length; ++idx) {
    var option = select.options[idx]
    callback(option, idx)
  }
}

function set_select_option(select, value)
{
  for (var idx = 0; idx < select.options.length; ++idx) {
    var option = select.options[idx]
    if (value == option.text) {
      if (option.selected != undefined)
        option.selected = true
      break
    }
  }
}

function load_js(src, id, charset)
{
  var head = get_head()
  var script = document.createElement('script')
  if (id) script.id = id
  script.src = src
  script.type = 'text/javascript'
  if (charset)
    script.charset= charset
  head.appendChild(script)
}

function load_css(href, id)
{
  var head = get_head()
  var link = document.createElement('link')
  if (id) link.id = id
  link.href = href
  link.type = 'text/css'
  link.rel = 'stylesheet'
  head.appendChild(link)
}

