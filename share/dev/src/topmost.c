
#include <stdlib.h>
#include <windows.h>


int main(int argc, char **argv)
{
    HWND hwnd = NULL;
    HWND topMost = HWND_TOP;

    if (argc != 2)
        return EXIT_FAILURE;

    topMost = (atoi(argv[1]) == 1) ? HWND_TOPMOST : HWND_NOTOPMOST;

    hwnd = FindWindow(NULL, "NINJAM SongBook Utility");
    if (!hwnd)
        return EXIT_FAILURE;

    return SetWindowPos(hwnd, topMost, 0, 0, 0, 0, SWP_NOSIZE|SWP_NOMOVE)
            ? EXIT_SUCCESS : EXIT_FAILURE;
}
