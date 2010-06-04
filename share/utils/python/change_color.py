
from remote import RemoteNinjam, RGB

if __name__ == '__main__':
    with RemoteNinjam().transaction() as ninjam:
        ninjam.setChatBackgroundColor(RGB(0xEE, 0xEE, 0xFF))
        ninjam.show()
        

