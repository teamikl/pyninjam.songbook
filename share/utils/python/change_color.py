
from richedit import *
from remote import RemoteNinjam, RGB

if __name__ == '__main__':
    with RemoteNinjam().transaction() as ninjam:
        # fg color (not work yet)
        if 0:
            format = CHARFORMAT()
            format.cbSize = size_of_charformat
            format.dwMask = CFM_COLOR |CFM_SIZE
            format.crTextColor = RGB(0xFF,0x00,0x00)
            format.yHeight = 20

            ninjam.setChatTextFormat(format)

        # bg-color
        ninjam.setChatBackgroundColor(RGB(0xEE, 0xEE, 0xFF))
        ninjam.show()

