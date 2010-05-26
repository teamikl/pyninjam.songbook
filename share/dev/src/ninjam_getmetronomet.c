/*
 * @author tea
 * @date 2010/04/27
 */
 
#include <stdio.h>
#include <windows.h>
#include "ninjam_common.h"

int main(void)
{
  HWND parent, child = NULL;
  char text[64]; /* BPI and BPM text will never be so long */
  int length;
  int index;
  
  parent = FindWindow(NINJAM_HWND_CLASS, NULL);
  if (!parent) return 1;

  for (index = 0; index < 10; ++index)
    child = FindWindowEx(parent, child, "Static", 0);
  
  if (child) {
    length = SendMessage(child, WM_GETTEXTLENGTH, 0, 0);
    SendMessage(child, WM_GETTEXT, length+1, (LPARAM)text);
    printf("%s\n", text);
  }

  return 0;
}
