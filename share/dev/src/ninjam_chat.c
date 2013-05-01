/*
 * @author tea
 * @date 2010/04/21
 */

#include <stdio.h>
#include <windows.h>

#include "ninjam_common.h"

int main(int argc, char **argv)
{
  HWND parent, child;
  char *msg;
  char *target;

  if (argc != 3) return 1;

  target = argv[1];
  msg = argv[2];

  parent = getNinjam(target);
  if (! parent) return 1;

  child = getEdit(target, parent, NULL);
  child = getEdit(target, parent, child);
  if (child) {
    SendMessage(child, WM_SETTEXT, 0, (LPARAM)msg);
    PostMessage(child, WM_CHAR, VK_RETURN, 0);
  }

  return 0;
}
