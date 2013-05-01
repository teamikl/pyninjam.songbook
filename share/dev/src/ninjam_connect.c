/*
 * @author tea
 * @date 2010/04/29
 *
 *
 * TODO: send auto greeting message (2nd argument)
 */

#include <stdio.h>
#include "ninjam_common.h"

int main(int argc, char **argv)
{
  char *target;
  char *server;
  HWND parent, child;
  DWORD pid, tid, cur;

  char buf[64];

  if (argc != 3) return 1;
  target = argv[1];
  server = argv[2];

  if (IsReaper(target)) return 1;

  parent = getNinjam(target);
  if (! parent) return 1;

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
