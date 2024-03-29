/*
 * @author tea
 * @date 2010/04/27
 */

#include <stdio.h>
#include <windows.h>
#include "ninjam_common.h"

int main(int argc, char **argv)
{
  HWND parent, child;
  char *chatlog;
  char *target;
  int logsize;

  if (argc != 2) return 1;
  target = argv[1];

  parent = getNinjam(target);
  if (!parent) return 1;

  child = getEdit(target, parent, NULL);
  if (!child) return 1;

  logsize = SendMessage(child, WM_GETTEXTLENGTH, 0, 0) + 1;
  if (logsize == 0) {
    fprintf(stderr, "chat log is an empty\n");
    return 1;
  }

  chatlog = (char *)malloc(logsize + 1);
  if (! chatlog) {
    fprintf(stderr, "Failed locate memory\n");
    return 1;
  }

  SendMessage(child, WM_GETTEXT, logsize+1, (LPARAM)chatlog);

  fwrite(chatlog, sizeof(char), logsize, stdout);

  free(chatlog);

  return 0;
}
