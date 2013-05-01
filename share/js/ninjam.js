/**
 * @author   tea
 * @date     2010/04/22
 * @depends  /share/js/common.js    run_program() function
 * @depends  /conf/settings.js      path to commands, debug flag
 */
function ninjam_chat(target, msg)
{
  if (debug_mode)
    return alert(msg)

  msg = msg.replace(/\"/g, '\\"')
  if (msg)
    return run_program(chat_command + ' ' + target + ' "' + msg + '"')
}

function ninjam_savechatlog(target, savefile)
{
  // NOTE: %ComSpec% /c for redirect
  return run_program("%ComSpec% /c " +
                getchatlog_command +
                ' ' + target +
                ' > ' + savefile.replace(/\//g,'\\'))
}

function ninjam_getmetronome(target)
{
  return WSH.Exec(getmetronome_command + ' ' + target).StdOut.ReadAll().replace(/\n/m, '')
}

function ninjam_setcharformat(target, fgcolor, bgcolor, fontsize, fontface)
{
  var argv = map(function(x){ return '"'+x+'"' }, [target, fgcolor, bgcolor, fontsize, fontface])
  return run_program(setcharformat_command + ' ' + argv.join(' '))
}

function ninjam_active(target)
{
  // First Run does not OpenIcon from minimized state.
  // So I called it twice with different parameters.

  var state = WSH.Run(active_command + ' ' + target, 7, true)

  if (state == 1)
    return WSH.Exec((target == "REAPER") ? reaper_exe : ninjam_exe)
  else
    return WSH.Exec(active_command + ' ' + target)
}


function ninjam_connect(target, server)
{
  return WSH.Exec(connect_command + ' ' + target + ' ' + server)
}
