
#include <stdio.h>
#include <windows.h>


// RICHEDIT

#define EM_SETSEL        0x00B1
#define EM_SETCHARFORMAT 0x0443
#define EM_SETBKGNDCOLOR 0x0445
#define LF_FACESIZE     32

typedef struct _charformat {
	UINT  cbSize;                  // 構造体のサイズ(=60)
	DWORD dwMask;                  // 有効メンバ
	DWORD dwEffects;               // 文字の効果
	LONG  yHeight;                 // 文字の高さ
	LONG  yOffset;                 // ベースラインからのオフセット
	COLORREF  crTextColor;         // 文字の色
	BYTE  bCharSet;                // キャラクタセット
	BYTE  bPitchAndFamily;         // フォントファミリとピッチ
	TCHAR szFaceName[LF_FACESIZE]; // フォント名
} CHARFORMAT;



int main(int argc, char **argv)
{
	HWND parent;
	HWND textarea;
	CHARFORMAT cf;

	parent = FindWindow("NINJAMwnd", 0);
	if (!parent) return 1;
	textarea = FindWindowEx(parent, 0, "RichEdit20A", 0);
	if (!textarea) return 1;
	

	memset(&cf, 0, sizeof(cf));
	cf.cbSize = sizeof(cf);
	cf.dwMask = 1 | 0x40000000 | 0x80000000;
	cf.dwEffects = 1;
	cf.crTextColor = 0xff0000;
	cf.yHeight = 20 * 20;
	
	// TODO: attach thread
	// TODO: alloc "cf" in ninjam process memory
	// TODO: or make this as DLL
	// TODO: read ninjam win client source
	
	SendMessage(textarea, EM_SETSEL, 0, -1); // seem work 
	SendMessage(textarea, EM_SETCHARFORMAT, 3, (LPARAM)&cf); // not work
	
	SendMessage(textarea, EM_SETBKGNDCOLOR, 0, 0xffffff);
	

	return 0;
}

