
import os

def walk_filer_by_extensions(dirpath, ext=None):
    for dirname,dirs,files in os.walk(dirpath):
        for filename in files:
            if (not ext) or os.path.splitext(filename)[-1] in ext:
                filepath = os.path.join(dirname, filename)
                yield filepath

toolpath = os.path.dirname(__file__)
rootpath = os.path.join(toolpath, '../../../')
