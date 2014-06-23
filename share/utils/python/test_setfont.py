
import win32api
import win32gui
import win32process
from win32con import *
from ctypes import *
from ctypes.wintypes import *



kernel32 = windll.kernel32
VirtualAllocEx = kernel32.VirtualAllocEx
VirtualFreeEx = kernel32.VirtualFreeEx
WriteProcessMemory = kernel32.WriteProcessMemory

if 0:
    # NO NEED ?
    def ErrorIfZero(handle):
        if handle == 0:
            raise WinError() # GetLastError
        return handle
    VirtualAllocEx.argtypes = [c_uint, c_void_p, c_void_p, c_uint, c_uint]
    VirtualAllocEx.restype = ErrorIfZero
    VirtualFreeEx.argtypes = [c_uint, c_void_p, c_uint, c_uint]
    VirtualFreeEx.restype = ErrorIfZero
    WriteProcessMemory.argtypes = [c_uint, c_uint, c_void_p, c_uint, c_void_p]
    WriteProcessMemory.restype = ErrorIfZero

TCHAR = c_char
LF_FACESIZE = 32

class CHARFORMAT(Structure):
    _fields_ = (
        ('cdSize', UINT),
        ('dwMask', DWORD),
        ('dwEffects', DWORD),
        ('yHeight', LONG),
        ('yOffset', LONG),
        ('crTextColor', COLORREF),
        ('bCharSet', BYTE),
        ('bPitchAndFamily', BYTE),
        ('szFaceName', TCHAR * LF_FACESIZE),
    )

assert sizeof(CHARFORMAT) == 60


def main():

    ninjam = win32gui.FindWindow("NINJAMwnd", None)
    edit = win32gui.FindWindowEx(ninjam, None, "RichEdit20A", None)

    cf = CHARFORMAT()
    memset(addressof(cf), 0, sizeof(cf))
    cf.cbSize = sizeof(cf)
    cf.dwMask = CFM_COLOR |CFM_SIZE
    cf.crTextColor = RGB(0xFF,0x00,0x00)
    cf.yHeight = 18 * 20

    tid,pid = win32process.GetWindowThreadProcessId(edit)
    flags = PROCESS_VM_OPERATION|PROCESS_VM_READ|PROCESS_VM_WRITE
    hProc = win32api.OpenProcess(flags, False, pid)
    try:
        flags = MEM_RESERVE|MEM_COMMIT
        v = VirtualAllocEx(hProc.handle, 0, sizeof(cf), flags, PAGE_READWRITE)
        try:
            WriteProcessMemory(hProc.handle, v, addressof(cf), sizeof(cf), 0)

            # XXX: not work ... :(
            # win32gui.SendMessage(edit, 0x0444, 0x0004, v)
        finally:
            VirtualFreeEx(hProc.handle, v, 0, MEM_RELEASE)
    finally:
        win32api.CloseHandle(hProc)


if __name__ == "__main__":
    main()
