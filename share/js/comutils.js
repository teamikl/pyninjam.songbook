/**
 * @author tea
 * @date 2010/04/28
 */

function newXHR()
{
  if (window.XMLHttpRequest)
    return new XMLHttpRequest
  else if (window.ActiveXObject)
    return new ActiveXObject("Microsoft.XMLHTTP")
  else
    return null
}

function newDOM()
{
  return new ActiveXObject("Microsoft.XMLDOM")
}

var WSH = new ActiveXObject("WScript.Shell")
var FSO = new ActiveXObject("Scripting.FileSystemObject")


/**
 * run_program(cmdline)
 */
function run_program(cmdline)
{
  // 7 mean Run a command as minimam mode. that will not raise DOS prompt.
  return WSH.Run(cmdline, 7)
}

/**
 * open_url(url)
 */
function open_url(url)
{
  // 5 mean active the window
  return WSH.Run(url, 5)  
}
