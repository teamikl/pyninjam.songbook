
#include <stdio.h>
#include <windows.h>



#define TEXT_BUF_SIZE (1024*64)

int main(int argc, char **argv)
{
	HWND parent, child = NULL;
	char *control_class_name;
	char text[TEXT_BUF_SIZE];
	int length;
	int index;

	if (argc < 2) {
		fprintf(stderr, "usage: control_class_name\n");
		return 1;
	}

	control_class_name = argv[1];

	parent = FindWindow("NINJAMwnd", NULL);
	if (!parent) return 1;

	index = 0;
	while ((child = FindWindowEx(parent, child, control_class_name, 0)) != NULL) {
		length = SendMessage(child, WM_GETTEXTLENGTH, 0, 0);
		if (length + 1 < TEXT_BUF_SIZE) {
			SendMessage(child, WM_GETTEXT, length+1, (LPARAM)text);
			printf("[%3d] %s\n", index, text);
		}
		else {
			fprintf(stderr, "[%3d] ERROR too long length (%d)\n", index, length);
		}
		
		index++;
	}


	return 0;
}
