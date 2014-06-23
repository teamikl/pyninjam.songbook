/**
 * @author tea
 * @date 2010/06/04
 */

#include <stdio.h>
#include <windows.h>

#include "ninjam_common.h"

/**
 * copy header from richedit.h
 */
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

/**
 * macro to convert nuber string or color string to COLORREF
 *
 * [0-9]*           -> atoi
 * \#[0-9a-fA-F]{6} -> str2color
 */

#if 0
inline char tohex8(char c)
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
#endif

#define tohex8(c) (( 57 >= (c) && (c) >= 48) ? ((c)-48) :    \
                   (102 >= (c) && (c) >= 97) ? ((c)-97+10) : \
                   ( 70 >= (c) && (c) >= 65) ? ((c)-65+10) : 0)
#define tohex16(x) ((tohex8((x)[0]) << 4) | tohex8((x)[1]))
#define str2color(x) (RGB(tohex16(&(x)[0]),tohex16(&(x)[2]),tohex16(&(x)[4])))
#define toColor(x) (((x)[0] == '#') ? str2color(&(x)[1]) : atoi(x))


/**
 * usage: fgcolor bgcolor font-size font-face
 */

enum {
    Target = 1,
    TextColor,
    BackColor,
    FontSize,
    FontName
};

int main(int argc, char **argv)
{
  char *target = NULL;

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

  if (argc != 6)
  {
    fprintf(stderr, "usage: %s [NINJAM|REAPER] fgcolor bgcolor font-size font-face\n", argv[0]);
    return 1;
  }

  target = argv[Target];

  parent = getNinjam(target);
  if (! parent) return 1;
  child = getEdit(target, parent, NULL);
  if (! child) return 1;

  crTextColor = (COLORREF)toColor(argv[TextColor]);
  crBackgroundColor = (COLORREF)toColor(argv[BackColor]);
  yHeight = (LONG)atoi(argv[FontSize]);
  facename = argv[FontName];

  if (yHeight > 0) // *argv[3]
    dwMask |= 0x80000000;
  if (*argv[TextColor])
    dwMask |= 0x40000000;
  if (*argv[FontName])
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

  if (*argv[BackColor]) {
    SendMessage(child, EM_SETBKGNDCOLOR, 0, crBackgroundColor);
  }

  return 0;
}
