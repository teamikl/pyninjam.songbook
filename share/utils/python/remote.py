
# Remote NINJAM (for win32)

from contextlib import contextmanager
import functools
import win32api
import win32gui
import win32con
import win32process
import ctypes

from richedit import *

byref = ctypes.byref
user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32


# TODO: separate the abstract remote HWND object


@contextmanager
def _in_process(hwnd):
    flags = win32con.PROCESS_VM_OPERATION | win32con.PROCESS_VM_READ | win32con.PROCESS_VM_WRITE
    theadId,processId = win32process.GetWindowThreadProcessId(hwnd)
    hProcess = win32api.OpenProcess(flags, False, processId)
    try:
        yield hProcess.handle
    finally:
        win32api.CloseHandle(hProcess)

@contextmanager
def _virtual(hProcess, data, size):
    # XXX: 
    flags = win32con.MEM_RESERVE | win32con.MEM_COMMIT
    v = kernel32.VirtualAllocEx(hProcess, 0, size, flags, win32con.PAGE_READWRITE)
    try:
        print hProcess, v, data, size
        kernel32.WriteProcessMemory(hProcess, v, data, size, 0)
        yield v
    finally:
        kernel32.VirtualFreeEx(hProcess, v, 0, win32con.MEM_RELEASE)

@contextmanager
def in_target_process(hwnd, data, size):
    with _in_process(hwnd) as hProc:
        with _virtual(hProc, data, size) as v:
            yield v


def RGB(red, green, blue):
    # RGB(r,g,b) -> COLORREF
    assert 0xff >= red >= 0
    assert 0xff >= green >= 0
    assert 0xff >= blue >= 0
    return (red & 0xff) | ((green & 0xff) << 8) | ((blue & 0xff) << 16)


class RemoteNinjam(object):

    dynamic = True

    def __init__(self):
        self.hwnd = 0
        self.textarea = 0
        self.textinput = 0
        
        if not self.dynamic:
            self.initialize()


    # protected

    def getHWND(self):
        return win32gui.FindWindow('NINJAMwnd', None)

    def getRichEdit(self, parent, child=0):
        return win32gui.FindWindowEx(parent, child, 'RichEdit20A', None)

    # private

    def initialize(self):
        hwnd = self.getHWND()
        if hwnd == self.hwnd: # not updated
            return
        elif hwnd == 0:
            raise RuntimeError, 'NINJAM is not running'
        self.hwnd = hwnd
        self.textarea = self.getRichEdit(hwnd, 0)
        self.textinput = self.getRichEdit(hwnd, self.textarea)

    def api(func):
        @functools.wraps(func)
        def wrapped(self, *argv, **kwargv):
            if self.dynamic:
                self.initialize()
            return func(self, *argv, **kwargv)
        return wrapped

    @contextmanager
    def handle(self, hwnd):
        if hwnd:
            yield hwnd
        # XXX: ERROR if generator does not yield

    @contextmanager
    def transaction(self):
        save_dynamic = self.dynamic
        self.dynamic = False
        try:
            self.initialize()
            yield self
        finally:
            self.dynamic = save_dynamic

    # public

    @api
    def show(self):
        with self.handle(self.hwnd) as hwnd:
            if win32gui.IsIconic(hwnd):
                user32.OpenIcon(hwnd)
            else:
                win32gui.SetForegroundWindow(hwnd)

    @api
    def say(self, line):
        with self.handle(self.textinput) as hwnd:
            win32gui.SendMessage(hwnd, win32con.WM_SETTEXT, 0, line)
            win32gui.SendMessage(hwnd, win32con.WM_CHAR, win32con.VK_RETURN, 0)
            print "say", line

    @api
    def setChatBackgroundColor(self, color):
        with self.handle(self.textarea) as hwnd:
            win32gui.SendMessage(hwnd, EM_SETBKGNDCOLOR, 0, color)

    @api
    def setChatTextFormat(self, format):
        data = ctypes.addressof(format)
        size = size_of_charformat
        
        with self.handle(self.textarea) as hwnd:
            with in_target_process(hwnd, data, size) as param:
                win32gui.SendMessage(hwnd, EM_SETCHARFORMAT, 4, param)
