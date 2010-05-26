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

  if (argc != 2) {
    fprintf(stderr, "usage: message\n");
    return 1;  
  }
  
  msg = argv[1];
  
  parent = FindWindow(NINJAM_HWND_CLASS, 0);
  if (! parent) {
    fprintf(stderr, "NINJAM not running.\n");
    return 1;
  }

  child = FindWindowEx(parent, 0, NINJAM_EDIT_CLASS, 0);
  child = FindWindowEx(parent, child, NINJAM_EDIT_CLASS, 0);
  if (child) {
    SendMessage(child, WM_SETTEXT, 0, (LPARAM)msg);
    SendMessage(child, WM_CHAR, VK_RETURN, 0);
  } 

  return 0;
}
