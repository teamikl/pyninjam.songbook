
from ctypes import Structure, c_char, sizeof
from ctypes.wintypes import UINT,DWORD,LONG,COLORREF,BYTE,WCHAR

# ANSI or UNICODE ?
TCHAR = c_char

SCF_DEFAULT   = 0x0000
SCF_SELECTION = 0x0001
SCF_WORD      = 0x0002
SCF_ALL       = 0x0004

CFM_BOLD      = 0x00000001
CFM_ITALICK   = 0x00000002
CFM_UNDERLINE = 0x00000004
CFM_STRIKEOUT = 0x00000008
CFM_PROTECTED = 0x00000010
CFM_OFFSET    = 0x10000000
CFM_FACE      = 0x20000000
CFM_COLOR     = 0x40000000
CFM_SIZE      = 0x80000000

CFE_BOLD      = 0x0001
CFE_ITALIC    = 0x0002
CFE_UNDERLINE = 0x0004
CFE_STRIKEOUT = 0x0008
CFE_PROTECTED = 0x0010
CFE_DISABLED  = 0x2000
CFE_AUTOCOLOR = 0x40000000

# TODO: EM_*
EM_GETCHARFORMAT = 0x043A
EM_SETBKGNDCOLOR = 0x0443
EM_SETCHARFORMAT = 0x0444

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
    
size_of_charformat = sizeof(CHARFORMAT)


# TODO: CHARFORMAT2
