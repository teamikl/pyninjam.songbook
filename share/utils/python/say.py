
import sys
from remote import RemoteNinjam

if __name__ == '__main__':
    if len(sys.argv) == 2:
        ninjam = RemoteNinjam()
        ninjam.say(sys.argv[1])
