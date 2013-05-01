
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>

#ifndef LWA_ALPHA
#define LWA_ALPHA 2
#endif

typedef BOOL (WINAPI * SLWAProc)(HWND, COLORREF, BYTE, DWORD);

int main(int argc, char **argv)
{
  int i;
  HMODULE user32 = NULL;
  SLWAProc set_layered_window_attrs = NULL;

  HWND hwnd = NULL;
  LONG style = 0L;
  BYTE alpha = 0;

  if (argc != 2)
    return EXIT_FAILURE;

  alpha = (BYTE)atoi(argv[1]);

  if (alpha < 0) alpha = 0;
  if (alpha > 255) alpha = 255;

  user32 = GetModuleHandle("USER32.DLL");
  if (!user32)
    return EXIT_FAILURE;

  set_layered_window_attrs
        = (SLWAProc)GetProcAddress(user32, "SetLayeredWindowAttributes");
  if (!set_layered_window_attrs)
    return EXIT_FAILURE;

  hwnd = FindWindow(NULL, "NINJAM SongBook Utility");
  if (!hwnd)
    return EXIT_FAILURE;

  if (256 > alpha && alpha > 0) {
    style = GetWindowLong(hwnd, GWL_EXSTYLE);
    style |= WS_EX_LAYERED;
    SetWindowLong(hwnd, GWL_EXSTYLE, style);

    // retries 10 times, sometime does not apply alpha blending.
    for (i=0; i<10; ++i) {
      set_layered_window_attrs(hwnd, (COLORREF)0, alpha, LWA_ALPHA);
      Sleep(100);
    }
  }

  return EXIT_SUCCESS;
}
