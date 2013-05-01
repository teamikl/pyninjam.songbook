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
  var links = $('links');
  if (!links) return;

  foreach(sites, function(site){
    var anchor = document.createElement('a')
    anchor.href = site[0]
    anchor.innerText = site[1]
    links.appendChild(document.createTextNode('| '))
    links.appendChild(anchor)
  })
}
