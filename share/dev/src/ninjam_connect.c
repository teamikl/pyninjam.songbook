/*
 * @author tea
 * @date 2010/04/29
 *
 *
 * TODO: send auto greeting message (2nd argument)
 */

#include <stdio.h>
#include <windows.h>

#include "ninjam_common.h"

int main(int argc, char **argv)
{
  HWND parent, child;
  char *server;
  DWORD pid, tid, cur;
  
  char buf[64];

  if (argc != 2) {
    fprintf(stderr, "usage: server\n");
    return 1;  
  }

  server = argv[1];

  parent = FindWindow(NINJAM_HWND_CLASS, 0);
  if (! parent) {
    fprintf(stderr, "NINJAM not running.\n");
    return 1;
  }
  
  if (IsIconic(parent))
    OpenIcon(parent);
  else
    SetForegroundWindow(parent);
  
  PostMessage(parent, WM_COMMAND, NINJAM_ID_FILE_CONNECT, 0);
  sleep(500);
  
  cur = GetCurrentThreadId();
  tid = GetWindowThreadProcessId(parent, &tid);
  
  if (AttachThreadInput(cur, tid, TRUE)) {
    child = GetFocus();
  
    if (child) {
      SendMessage(child, WM_SETTEXT, 0, (LPARAM)server);
    }
  
    AttachThreadInput(cur, tid, FALSE);
  }

  return 0;
}
