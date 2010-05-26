#!/usr/bin/env python

from common import rootpath, walk_filer_by_extensions
from settings import SRC_EXTENSIONS

def word_count(filepath):
    lines = 0
    words = 0
    chars = 0
    for line in open(filepath, "rb"):
        lines += 1
        words += len(line.split()) # No support Japanese.
        chars += len(line)
    return lines,words,chars


def main(dirpath, ext=None):
    total = [0, 0, 0]
    nfiles = 0

    for filepath in walk_filer_by_extensions(dirpath, ext):
        total = map(lambda (x,y): x+y, zip(total, word_count(filepath)))
        nfiles += 1

    print "%6d Files / %6d Lines / %6d Words / %6d Bytes" % tuple([nfiles] + total)


if __name__ == '__main__':
    main(rootpath, SRC_EXTENSIONS)
