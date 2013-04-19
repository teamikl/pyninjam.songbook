
#include <stdio.h>
#include <windows.h>


// RICHEDIT

#define EM_SETSEL        0x00B1
#define EM_SETBKGNDCOLOR 0x0443
#define EM_SETCHARFORMAT 0x0444
#define LF_FACESIZE     32

// TODO: see also CHARFORMAT2

typedef struct _charformat {
	UINT  cbSize;                  // 構造体のサイズ(=60)
	DWORD dwMask;                  // 有効メンバ
	DWORD dwEffects;               // 文字の効果
	LONG  yHeight;                 // 文字の高さ
	LONG  yOffset;                 // ベースラインからのオフセット
	COLORREF  crTextColor;         // 文字の色 (BBGGAA)
	BYTE  bCharSet;                // キャラクタセット
	BYTE  bPitchAndFamily;         // フォントファミリとピッチ
	TCHAR szFaceName[LF_FACESIZE]; // フォント名
} CHARFORMAT;


int main(int argc, char **argv)
{
	HWND parent;
	HWND textarea;
	CHARFORMAT cf;
	CHARFORMAT *vcf;

	DWORD dwProcessId = 0;
	HANDLE hProcess;

	parent = FindWindow("NINJAMwnd", 0);
	if (!parent) return 1;
	textarea = FindWindowEx(parent, 0, "RichEdit20A", 0);
	if (!textarea) return 1;

	memset(&cf, 0, sizeof(cf));
	cf.cbSize = sizeof(cf);
	cf.dwMask = 0x80000000 | 0x40000000 | 0x20000000 | 1;
	cf.dwEffects = 1;
	cf.crTextColor = RGB(0x00, 0x00, 0x00);
	cf.yHeight = 18 * 20;
	strcpy(cf.szFaceName, "MS Gothic");

	SendMessage(textarea, EM_SETBKGNDCOLOR, 0, RGB(0xee, 0xee, 0xff));

	GetWindowThreadProcessId(textarea, &dwProcessId);
	hProcess = OpenProcess(PROCESS_VM_OPERATION | PROCESS_VM_READ | PROCESS_VM_WRITE, FALSE, dwProcessId);
	if (hProcess) {
		vcf = (CHARFORMAT *)VirtualAllocEx(hProcess, NULL, sizeof(CHARFORMAT), MEM_RESERVE | MEM_COMMIT, PAGE_READWRITE);
		WriteProcessMemory(hProcess, vcf, &cf, sizeof(CHARFORMAT), NULL);

		// SendMessage(textarea, EM_SETSEL, 0, -1); // seem work
		SendMessage(textarea, EM_SETCHARFORMAT, 4, (LPARAM)vcf);

		// XXX: Really can I release the memory ?
		VirtualFreeEx(hProcess, vcf, 0, MEM_RELEASE);
		CloseHandle(hProcess);
	}

	return 0;
}

