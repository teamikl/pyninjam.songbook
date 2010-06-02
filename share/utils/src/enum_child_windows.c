
#include <stdio.h>
#include <windows.h>

BOOL CALLBACK EnumChildWindowsProc(HWND hwnd, LPARAM lp)
{
	size_t len;
	char *text;
	char clsName[256];
	HWND parent;

	len = SendMessage(hwnd, WM_GETTEXTLENGTH, 0, 0);

	text = (char *)malloc(len + 1);

	SendMessage(hwnd, WM_GETTEXT, len+1, (LPARAM)text);
	
	len = GetClassName(hwnd, clsName, 256);
	parent = GetParent(hwnd);

	printf("%p %p %-20s %s %p\n", hwnd, parent, clsName, text);

	free(text);


	return TRUE;
}



int main(int argc, char **argv)
{
	HWND parent;
	int count = 0;

	parent = FindWindow("NINJAMwnd", 0);
	if (!parent) return 1;

	printf("%p\n", parent);

	EnumChildWindows(parent,EnumChildWindowsProc, (LPARAM)&count);

	return 0;
}

