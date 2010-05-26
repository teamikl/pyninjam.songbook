
#include <windows.h>
#include "ninjam_common.h"

int main(void)
{
  HWND parent;

  parent = FindWindow(NINJAM_HWND_CLASS, NULL);
  if (!parent) return 1;

  if (IsIconic(parent)) {
    OpenIcon(parent);
  }
  else {
    SetForegroundWindow(parent);
  }
  
  // TODO: SetFocus to chat input.
  
  return 0;
}
