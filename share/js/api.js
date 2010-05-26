/**
 * @author
 * @date 2010/04/23
 */

function install_locale(doc, locale)
{
  var getElement = doc.getElementById
  foreach(locale, function(text,id){
    var e = getElement(id)
    if (e && text)
      e.innerText = text
    else
      alert('ERRPR: id does not exists ' + id)
  })
}

function append_sites(sites)
{
  foreach(sites, function(site){
    var link = document.createElement('a')
    link.href = 'http://crasher.orz.hm/ninjam'
    link.innerText = 'crasher.orz.hm:8888'
    $('links').appendChild(document.createTextNode('| '))
    $('links').appendChild(link)
  })
}
