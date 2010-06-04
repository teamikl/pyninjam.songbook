# coding: utf-8

import os
import sys
from zipfile import ZipFile, ZIP_DEFLATED
from common import rootpath, walk_filer_by_extensions
from settings import ALL_EXTENSIONS, IGNORE_PATH

def main(zippath):
    basedir = './songbook'

    z = ZipFile(zippath, 'w', ZIP_DEFLATED)    

    for filepath in walk_filer_by_extensions(rootpath, ALL_EXTENSIONS):
        if IGNORE_PATH in filepath:
            continue
        arcname = filepath.replace(rootpath, '')
        arcpath = os.path.join(basedir, arcname).replace('\\', '/')
        z.write(filepath, arcname)

    z.printdir()

    z.close()

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print >>sys.stderr, "usage: %s zippath" % os.path.basename(sys.argv[0])
        sys.exit(0)

    main(sys.argv[1])
    