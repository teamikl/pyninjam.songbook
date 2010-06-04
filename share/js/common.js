/**
 * @author tea
 * @date   2010/04/22
 * @description common functional utility functions
 */


/**
 * Alias to document.getElementById(id)
 */
var $ = document.getElementById

/**
 * range(start, stop, step)
 *
 * Generate array start .. stop (contains 'stop' value)
 *
 */
function range(start, stop, step)
{
  var result = new Array()
  for (var idx = start; idx <= stop; idx += step) {
    result.push(idx)
  }
  return result
}

/**
 * map(callback, xs)
 */
function map(callback, xs)
{
  var list = []
  foreach (xs, function(x){
    list.push(callback(x))
  })
  return list
}

/**
 * filter(callback, xs)
 */
function filter(callback, xs)
{
  var list = []
  foreach(xs, function(x){
    if (callback(x))
      list.push(x)
  })
  return list
}

/**
 * indexOf(xs, x)
 */
function indexOf(xs, x)
{
  for (var i in xs) {
    if (xs[i] == x)
      return i  
  }
  return -1
}

/**
 *
 */
function max(xs, key)
{
  var m = null
  foreach(xs, function(x){
    if (x > m)
      m = x
  })
  return m
}
 

/**
 * foreach (list, callback)
 *
 * Iterate list elements and apply callback
 */
function foreach(xs, callback)
{
  for (var idx in xs) {
    callback(xs[idx], idx)
  }
}

/**
 * randint(min, max)
 */
function randint(min, max)
{
  return Math.floor((max - min - 1) * Math.random() + min)  
}

/**
 * Use default browser to open url
 *
 *   a_element.onclick = hook_link(url)
 */
function hook_link(url)
{
  return function(e) {
    open_url(url)
    return false
  }
}


/**
 * RGB(red,green,blue) -> COLORREF
 */
function RGB(red, green, blue)
{
  return (red & 0xff) | ((green & 0xff) << 8) | ((blue & 0xff) << 16)
}
