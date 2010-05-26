
function tabs(ul)
{
  var panels = []

  ul.className = 'tab-menu'
  
  var hide_all_panels = function(){
    foreach(panels,function(p){ $(p).className = 'tab-hide' })
    foreach(ul.childNodes,function(node){
      if (typeof(node) == "object") {
        node.className = 'tab-menu-unselected'
      }
    })
  }

  foreach(ul.childNodes, function(node){
    if (typeof(node) == "object") {
      var anchor = node.firstChild
      var panel_id = anchor.href.split('#')[1]
      
      panels.push(panel_id)
      
      anchor.onclick = function(){
        hide_all_panels()
        anchor.parentNode.className = 'tab-menu-selected'
        $(panel_id).className = 'tab-panel'
        return false
      }
    }
  })
  
  hide_all_panels()
  ul.firstChild.className = 'tab-menu-selected'
  $(panels[0]).className = 'tab-panel'
}
