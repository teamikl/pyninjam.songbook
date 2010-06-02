
# Remote NINJAM (for win32)

from contextlib import contextmanager
import functools
import win32gui
import win32con
import ctypes

from richedit import *

user32 = ctypes.windll.user32


# TODO: separate the abstract remote HWND object


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
        # XXX: not work
        with self.handle(self.textarea) as hwnd:
            win32gui.SendMessage(hwnd, EM_SETCHARFORMAT, 0, format)
            