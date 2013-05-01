/*
 * @author tea
 * @date 2010/04/21
 */

#ifndef _NINJAM_COMMON_H_
#define _NINJAM_COMMON_H_

#include <string.h>
#include <windows.h>

#define NINJAM_HWND_CLASS "NINJAMwnd"
#define NINJAM_EDIT_CLASS "RichEdit20A"
#define REAPER_HWND_CLASS "REAPERwnd"
#define REAPER_EDIT_CLASS "RichEditChild"

#define IsReaper(x) (strcmp(x,"REAPER") == 0)

#define getNinjam(target) \
    FindWindow( \
        IsReaper(target) ? REAPER_HWND_CLASS : NINJAM_HWND_CLASS, \
        NULL)

#define getEdit(target,parent,child) \
    FindWindowEx( \
        parent, child, \
        IsReaper(target) ? REAPER_EDIT_CLASS : NINJAM_EDIT_CLASS, \
        NULL)

#define NINJAM_ID_FILE_CONNECT 40001

#endif /* _NINJAM_COMMON_H_ */
