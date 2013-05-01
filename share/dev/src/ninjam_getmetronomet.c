/*
 * @author tea
 * @date 2010/04/27
 */

#include <stdio.h>
#include "ninjam_common.h"

int main(int argc, char **argv)
{
  char *target;
  HWND parent, child = NULL;
  char text[64]; /* BPI and BPM text will never be so long */
  int length;
  int index;

  if (argc != 2) return 1;
  target = argv[1];

  if (IsReaper(target)) // currently no support reaper
    return 1;

  parent = getNinjam(target);
  if (!parent) return 1;

  // this code is for NINJAM
  for (index = 0; index < 10; ++index)
    child = FindWindowEx(parent, child, "Static", 0);

  if (child) {
    length = SendMessage(child, WM_GETTEXTLENGTH, 0, 0);
    SendMessage(child, WM_GETTEXT, length+1, (LPARAM)text);
    printf("%s\n", text);
  }

  return 0;
}
