
from remote import RemoteNinjam

if __name__ == '__main__':
    with RemoteNinjam().transaction() as ninjam:
        ninjam.setChatBackgroundColor(0x777777)
        ninjam.show()
        

