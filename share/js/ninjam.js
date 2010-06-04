/**
 * @author   tea
 * @date     2010/04/22
 * @depends  /share/js/common.js    run_program() function
 * @depends  /conf/settings.js      path to commands, debug flag
 */
function ninjam_chat(msg)
{
  if (debug_mode)
    return alert(msg)

  msg = msg.replace(/\"/g, '\\"')

  if (msg)
    return run_program(chat_command + ' "' + msg + '"')
}

function ninjam_savechatlog(savefile)
{
  // NOTE: %ComSpec% /c for redirect
  return run_program("%ComSpec% /c " + getchatlog_command + ' > ' + savefile.replace(/\//g,'\\'))
}

function ninjam_getmetronome()
{
  return WSH.Exec(getmetronome_command).StdOut.ReadAll().replace(/\n/m, '')
}

function ninjam_setcharformat(fgcolor, bgcolor, fontsize, fontface)
{
  var argv = map(function(x){ return '"'+x+'"' }, [fgcolor, bgcolor, fontsize, fontface])
  return run_program(setcharformat_command + ' ' + argv.join(' '))
}

function ninjam_active()
{
  // First Run does not OpenIcon from minimized state.
  // So I called it twice with different parameters.
  
  var state = WSH.Run(active_command, 7, true)
  
  if (state == 1)
    return WSH.Exec(ninjam_exe)
  else
    return WSH.Exec(active_command)
}


function ninjam_connect(server)
{
  return WSH.Exec(connect_command + ' ' + server)
}