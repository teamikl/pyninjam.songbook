
#include "ninjam_common.h"

int main(int argc, char **argv)
{
  HWND parent;

  if (argc != 2) return 1;

  parent = getNinjam(argv[1]);
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
