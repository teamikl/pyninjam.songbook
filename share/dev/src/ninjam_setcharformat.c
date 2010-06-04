/**
 * @author tea
 * @date 2010/06/04
 */

#include <stdio.h>
#include <windows.h>

#include "ninjam_common.h"

#define EM_SETSEL        0x00B1
#define EM_SETBKGNDCOLOR 0x0443
#define EM_SETCHARFORMAT 0x0444
#define LF_FACESIZE      32
#define SCF_ALL          0x0004

typedef struct _charformat {
  UINT  cbSize;
  DWORD dwMask;
  DWORD dwEffects;
  LONG  yHeight;
  LONG  yOffset;
  COLORREF  crTextColor;
  BYTE  bCharSet;
  BYTE  bPitchAndFamily;
  TCHAR szFaceName[LF_FACESIZE];
} CHARFORMAT;


char tohex8(char c)
{
  // ASCII code only.
  if (57 >= c && c >= 48)
    return c - 48;
  if (102 >= c && c >= 97)
    return c - 97 + 10;
  if (70 >= c && c >= 65)
    return c - 65 + 10;
  return 0;
}

#define tohex16(x) ((tohex8((x)[1]) << 4) | tohex8((x)[0]))

COLORREF str2color(char *x)
{
  if (strlen(x) != 7)
    return 0;
  return RGB(tohex16(&x[1]), tohex16(&x[3]), tohex16(&x[5]));
}

#define toColor(x) (((x)[0] == '#') ? str2color(x) : atoi(x))


int main(int argc, char **argv)
{
  HWND parent;
  HWND child;
  CHARFORMAT cf;
  CHARFORMAT *vcf;
  DWORD dwProcessId = 0;
  HANDLE hProcess;
  
  DWORD dwMask = 0;
  LONG yHeight = 0;
  COLORREF crTextColor = 0;
  COLORREF crBackgroundColor = RGB(0xFF,0xFF,0xFF);
  char *facename = NULL;


  if (argc != 5)
  {
    fprintf(stderr, "usage: %s fgcolor bgcolor font-size font-face\n", argv[0]);
    return 1;
  }

  parent = FindWindow(NINJAM_HWND_CLASS, 0);
  if (! parent) return 1;
  child = FindWindowEx(parent, 0, NINJAM_EDIT_CLASS, 0);
  if (! child) return 1;

  crTextColor = (COLORREF)toColor(argv[1]);
  crBackgroundColor = (COLORREF)toColor(argv[2]);
  yHeight = (LONG)atoi(argv[3]);
  facename = argv[4];

  if (yHeight > 0) // *argv[3]
    dwMask |= 0x80000000;
  if (*argv[1])
    dwMask |= 0x40000000;
  if (*argv[4])
    dwMask |= 0x20000000;

  memset(&cf, 0, sizeof(cf));
  cf.cbSize = sizeof(cf);
  cf.dwMask = dwMask;
  cf.crTextColor = crTextColor;
  cf.yHeight = yHeight * 20;
  strcpy(cf.szFaceName, facename);
  
  GetWindowThreadProcessId(child, &dwProcessId);
  hProcess = OpenProcess(PROCESS_VM_OPERATION|PROCESS_VM_WRITE, FALSE, dwProcessId);
  if (hProcess) {
    vcf = (CHARFORMAT *)VirtualAllocEx(hProcess, NULL, sizeof(cf), MEM_RESERVE|MEM_COMMIT, PAGE_READWRITE);
    WriteProcessMemory(hProcess, vcf, &cf, sizeof(cf), NULL);
    
    SendMessage(child, EM_SETCHARFORMAT, SCF_ALL, (LPARAM)vcf);
    
    VirtualFreeEx(hProcess, vcf, 0, MEM_RELEASE);
    CloseHandle(hProcess);
  }
  
  if (*argv[2]) {
    SendMessage(child, EM_SETBKGNDCOLOR, 0, crBackgroundColor);
  }

  return 0;
}
