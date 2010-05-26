/**
 * @author tea
 * @date 2010/04/29
 */


function check_site(url, callback)
{
  var XHR = newXHR()
  XHR.open('GET', url, true)
  XHR.onreadystatechange = function(e){
    if ((XHR.readyState == 4) && (XHR.status == 200)) {
      callback(XHR)
    }
  }
  XHR.setRequestHeader('User-Agent', user_agent)
  XHR.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
  XHR.send(null)
}

function add_status(container, server, users)
{
  var div = document.createElement('div')
  var h4 = document.createElement('h4')
  var ul = document.createElement('ul')

  h4.innerText = server
  foreach(users, function(user){
    var li = document.createElement('li')
    li.innerText = user
    ul.appendChild(li)
  })
  
  h4.ondblclick = function(e){ return ninjam_connect(server) }
  
  div.appendChild(h4)
  div.appendChild(ul)
  container.appendChild(div)

}
