
function hide_all_fields(all_fields) {
  foreach(all_fields, function(x){
    x.className = "collapsed"
  })
}

function toggle_fieldset(all_fields, target)
{
  var state = target.className == "collapsed" ? "" : "collapsed"

  hide_all_fields(all_fields)

  target.className = state
}

function togglable(all_fields, fieldset, legend)
{
  register_event(legend, "onclick", function(e){
    toggle_fieldset(all_fields, fieldset)
    if (e){ e.cancelBubble = true }
  })

  register_event(fieldset, "onclick", function(e){
    if (fieldset.className == "collapsed") {
      toggle_fieldset(all_fields, fieldset)
    }
  })
}

function collapsable(fieldset, legend)
{
  register_event(legend, "onclick", function(e){
    if (fieldset.className == "collapsed") {
      fieldset.className = ""
    } else {
      fieldset.className = "collapsed"
    }
    if (e){ e.cancelBubble = true }
  })

  register_event(fieldset, "onclick",  function(e){
    if (fieldset.className == "collapsed") {
      fieldset.className = ""
    }
  })
}