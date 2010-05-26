#!/usr/bin/env python

# source-count

import re
from common import rootpath, walk_filer_by_extensions
from settings import SRC_EXTENSIONS

def normpath(x):
    return x.split('..')[-1].replace('\\','/')

funcRE = re.compile(r'function (\w+)')

def src_count(filepath):
    funcs = 0
    lines = 0
    funcname = None
    funcline = None
    
    print "%-24s:" % normpath(filepath)
    for line in open(filepath, "rb"):
        if line.startswith('function'):
            m = funcRE.match(line)
            funcname = m.group(1)
            funcline = 1
        elif funcname and line.startswith('}'):
            print "    %-20s: %6d" % (funcname, funcline)
            funcs += 1
            lines += funcline
            funcname = None
            funcline = None
        elif funcname:
            funcline += 1
        else:
            pass
    print
    
    return funcs,lines


def main(dirpath, ext=None):
    total = [0, 0, 0]
    nfiles = 0

    for filepath in walk_filer_by_extensions(dirpath, ext):
        total = map(lambda (x,y): x+y, zip(total, src_count(filepath)))
        nfiles += 1
    
    funcs,lines = total
    average = lines/funcs
    
    print
    print "%6d Files / %6d Funcs / %6d Lines / Avg %6d Lines" % (nfiles, funcs, lines, average)
    

if __name__ == '__main__':
    main(rootpath, ('.js',))
