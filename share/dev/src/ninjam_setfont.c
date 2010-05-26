
#include <stdio.h>
#include <windows.h>
#include "ninjam_common.h"

#define EM_CHARFORMAT 0x043A

typedef struct _charformat {
  UINT     cbSize;
  DWORD    dwMask;
  DWORD    dwEffects;
  LONG     yHeight;
  LONG     yOffset;
  COLORREF crTextColor;
  BYTE     bCharSet;
  BYTE     bPitchAndFamily;
  TCHAR    szFaceName[LF_FACESIZE];
} CHARFORMAT;

int main(void)
{
  HWND parent, child = NULL;
  CHARFORMAT fmt;

  parent = FindWindow(NINJAM_HWND_CLASS, NULL);
  if (!parent) return 1;
  child = FindWindowEx(parent, child, NINJAM_EDIT_CLASS, NULL);
  child = FindWindowEx(parent, child, NINJAM_EDIT_CLASS, NULL);
  if (!child) return 1;

  SendMessage(child, EM_CHARFORMAT, 0, (LPARAM)&fmt);
  
  printf("cbSize: %s\n", fmt.szFaceName);

  return 0;
}
