

--------
環境
--------

    win32/ninjam client専用です。reaperへは対応しません。


--------
使い方
--------

    * toolbox.hta ファイルをダブルクリックして起動。

        * !vote      ... 選択されている BPM/BPI を投票します。
        * sync       ... NINJAM から現在の BPM/BPI を所得し設定します。
                         BPM/BPI が現在のリストにない場合は設定されません。
                         ※ 一時的に外部プログラム起動による別ウィンドウが表示されます。

        * Setup      ... 選択されている曲の、BPM/BPI/コードを送信。
        * Chords     ... 選択されている曲の、コードのみを送信。

        * Theme      ... スタイルシートを切り替えます。
        * Clipboard  ... クリップボードの内容をチャットへ発言。
        * Random     ... ランダムに曲を選択。
        * Reset      ... 選択項目を初期状態に戻します。
        * NINJAM     ... NINJAM を起動、もしくはNINJAMのウィンドウをアクティブにし表示します。
                         エラーが出る場合は、/user/conf/settings.js の ninjam_exe に
                         正しいNINJAMの実行ファイルの場所を指定してください。

        * vote on change    ... 選択時に即送信。
        * confirm on submit ... 送信前に確認ダイアログを出す。
        * clear on save     ... 保存後、NINJAMのチャットログを消去する。
        * lock controls     ... コントロールを非アクティブ変更します。


    誤動作防止の為、"vote!", "Setup" は一度送信した後、
    BPM/BPI/曲を変更する迄、再度クリック出来ません。
    リセットボタンや、F5キーによるアプリケーションの再起動でも解除できます。
    
    
    * songbook.hta
    
      * View 曲一覧表示
        * Double click: 曲のデータを編集
        * Right click: 削除
      
      * Edit
        * タイトル・BPM/BPI・キー・コードを入力して保存出来ます。
        * ./user/tmp/ へ以前のデータはバックアップされます。
        * toolbox.hta で変更後のデータを読み込むには F5 で再読み込みしてください。
      
      * Server
        * サーバの状態監視
        * サーバ名をダブルクリックで、NINJAMの接続ダイアログが開きます
        
      * Develop
        * 最新版へのリンク

------------------
設定/カスタマイズ
------------------

    * /share/doc/CUSTOM.ja.txt



__EOF__