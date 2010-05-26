/**
 * @author tea
 * @depends ./share/js/common.js XHR
 */


function feed_atom_parser(res)
{
  /**
   * feed
   * updated
   *   entry
   *     id
   *     link
   *     title
   *     author
   *     contents
   */
  var list = []
  
  // IE does not set responseXML, for non text/xml mime type
  // and overrideMimeType method did not work IE7
  var doc = newDOM()
  doc.async = false
  doc.loadXML(res.responseText)
  
  var entries = doc.getElementsByTagName('entry')

  foreach(nodelist_to_array(entries), function(entry){
    var id = entry.getElementsByTagName('id')[0].text
    var link = entry.getElementsByTagName('link')[0].getAttributeNode('href').text
    var name = entry.getElementsByTagName('name')[0].text
    var title = entry.getElementsByTagName('title')[0].text
    var updated = entry.getElementsByTagName('updated')[0].text
    var content = entry.getElementsByTagName('content')[0].text
    
    var item = {
      id: id,
      link: link,
      name: name,
      title: title,
      updated: updated,
      content: content
    }
    
    list.push(item)
  })

  return list
}

// Share code with ./share/js/status.js check_status
function feed_check(url, parser, callback)
{
  var XHR = newXHR()
  XHR.open('GET', url, true)
  XHR.onreadystatechange = function(e){
    if ((XHR.readyState == 4) && (XHR.status == 200)) {
      callback(parser(XHR))
    }
  }
  XHR.setRequestHeader('User-Agent', user_agent)
  // XHR.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
  XHR.send(null)
}
