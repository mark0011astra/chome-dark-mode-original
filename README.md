# chome-dark-mode-original
chomeをダークモードにするシンプルな拡張機能
## 概要

Dark Mode for Chrome は、Google Chrome 用の拡張機能で、ウェブページをダークモードに変換します。ユーザーは、拡張機能のアイコンをクリックするだけでダークモードのオン/オフを切り替えることができます。また、オプションページでダークモードを永続的に有効または無効にすることもできます。

## ファイル構成

拡張機能は以下のファイルで構成されています：

- `manifest.json`：拡張機能のマニフェストファイル
- `background.js`：バックグラウンドスクリプト
- `content.js`：コンテンツスクリプト
- `dark_mode.css`：ダークモードのスタイルシート
- `options.html`：オプションページの HTML ファイル
- `options.js`：オプションページのスクリプト
- `icon.png`：拡張機能のアイコン

## マニフェストファイル（manifest.json）

`manifest.json`ファイルは、拡張機能のメタデータとパーミッションを定義します。主な要素は以下の通りです：

- `manifest_version`：マニフェストのバージョン（現在は3）
- `name`：拡張機能の名前
- `version`：拡張機能のバージョン
- `description`：拡張機能の説明
- `permissions`：拡張機能が必要とするパーミッション
- `host_permissions`：拡張機能がアクセスできるホストのパターン
- `action`：拡張機能のアクションの定義（アイコンとタイトル）
- `background`：バックグラウンドスクリプトの定義
- `content_scripts`：コンテンツスクリプトの定義（適用するウェブページ、CSS、JS）
- `options_page`：オプションページの定義

## バックグラウンドスクリプト（background.js）

`background.js`ファイルは、拡張機能のメインロジックを担当します。主な機能は以下の通りです：

- ダークモードの初期状態を読み込む
- アイコンのクリックイベントを監視し、ダークモードのオン/オフを切り替える
- アイコンのタイトルをダークモードの状態に応じて更新する
- ストレージの変更を監視し、他のタブに変更を反映する

## コンテンツスクリプト（content.js）

`content.js`ファイルは、ウェブページにインジェクトされ、ダークモードの適用を担当します。主な機能は以下の通りです：

- ダークモードのオン/オフに応じて、`<body>`要素にクラスを追加/削除する
- ストレージからダークモードの設定を読み込み、初期化する

## ダークモードのスタイルシート（dark_mode.css）

`dark_mode.css`ファイルは、ダークモードが有効になったときに適用される CSS スタイルを定義します。主なスタイルは以下の通りです：

- `background-color`：背景色
- `color`：テキスト色
- `a`：リンクの色
- `button`、`input[type="button"]`、`input[type="submit"]`：ボタンの背景色とテキスト色
- `input[type="text"]`、`input[type="password"]`、`textarea`：フォーム要素の背景色とテキスト色

## オプションページ（options.html と options.js）

`options.html`ファイルと`options.js`ファイルは、拡張機能のオプションページを構成します。オプションページでは、ユーザーがダークモードを永続的に有効または無効にすることができます。

- `options.html`：オプションページの HTML 構造を定義
- `options.js`：オプションの保存と復元を担当するスクリプト

## 動作の流れ

1. ユーザーが拡張機能のアイコンをクリックすると、`background.js`がアイコンのクリックイベントを受け取り、ダークモードのオン/オフを切り替える。
2. `background.js`は、`chrome.storage.sync`を使用してダークモードの状態を保存し、アイコンのタイトルを更新する。
3. `background.js`は、`chrome.scripting.executeScript`を使用して`content.js`をアクティブなタブにインジェクトする。
4. `content.js`は、`chrome.storage.sync`からダークモードの状態を読み込み、`<body>`要素にクラスを追加/削除してダークモードを適用する。
5. ユーザーがオプションページでダークモードを永続的に有効/無効にすると、`options.js`が`chrome.storage.sync`を使用してその設定を保存する。
6. `background.js`は、`chrome.storage.onChanged`イベントを監視し、ダークモードの状態が変更されたときに他のタブに変更を反映する。

## 注意点

- この拡張機能は、Manifest V3 を使用しています。Manifest V2 とは異なる点があるため、注意が必要です。
- `chrome.storage.sync`を使用するには、`"storage"`パーミッションが必要です。
- `chrome://`で始まるURLを含むタブには、拡張機能を適用できません。
- ダークモードのスタイルは、`dark_mode.css`で定義されています。必要に応じてスタイルを追加・修正してください。

## 今後の改善点

- ユーザーが特定のウェブサイトに対してダークモードを無効にできるようにする
- ダークモードのカラーテーマをカスタマイズできるようにする
- キーボードショートカットでダークモードのオン/オフを切り替えられるようにする
- ダークモードの適用をより詳細に制御できるようにする（特定の要素を除外するなど）


# Dark Mode for Chrome - Developer Documentation

## Overview

Dark Mode for Chrome is a Google Chrome extension that converts web pages to dark mode. Users can toggle dark mode on or off simply by clicking the extension icon. Additionally, users can permanently enable or disable dark mode through the options page.

## File Structure

The extension consists of the following files:

- `manifest.json`: The extension's manifest file
- `background.js`: The background script
- `content.js`: The content script
- `dark_mode.css`: The stylesheet for dark mode
- `options.html`: The HTML file for the options page
- `options.js`: The script for the options page
- `icon.png`: The extension's icon

## Manifest File (manifest.json)

The `manifest.json` file defines the extension's metadata and permissions. The main elements are as follows:

- `manifest_version`: The version of the manifest (currently 3)
- `name`: The name of the extension
- `version`: The version of the extension
- `description`: A description of the extension
- `permissions`: The permissions required by the extension
- `host_permissions`: The host patterns the extension can access
- `action`: The definition of the extension's action (icon and title)
- `background`: The definition of the background script
- `content_scripts`: The definition of the content scripts (web pages to apply to, CSS, JS)
- `options_page`: The definition of the options page

## Background Script (background.js)

The `background.js` file is responsible for the main logic of the extension. Its main functions are as follows:

- Load the initial state of dark mode
- Monitor icon click events and toggle dark mode on/off
- Update the icon title based on the state of dark mode
- Monitor storage changes and reflect changes to other tabs

## Content Script (content.js)

The `content.js` file is injected into web pages and is responsible for applying dark mode. Its main functions are as follows:

- Add/remove a class to the `<body>` element based on whether dark mode is on/off
- Load the dark mode setting from storage and initialize

## Dark Mode Stylesheet (dark_mode.css)

The `dark_mode.css` file defines the CSS styles that are applied when dark mode is enabled. The main styles are as follows:

- `background-color`: The background color
- `color`: The text color
- `a`: The color of links
- `button`, `input[type="button"]`, `input[type="submit"]`: The background color and text color of buttons
- `input[type="text"]`, `input[type="password"]`, `textarea`: The background color and text color of form elements

## Options Page (options.html and options.js)

The `options.html` and `options.js` files make up the extension's options page. On the options page, users can permanently enable or disable dark mode.

- `options.html`: Defines the HTML structure of the options page
- `options.js`: The script responsible for saving and restoring options

## Flow of Operation

1. When the user clicks the extension icon, `background.js` receives the icon click event and toggles dark mode on/off.
2. `background.js` uses `chrome.storage.sync` to save the state of dark mode and updates the icon title.
3. `background.js` uses `chrome.scripting.executeScript` to inject `content.js` into the active tab.
4. `content.js` reads the state of dark mode from `chrome.storage.sync` and adds/removes a class to the `<body>` element to apply dark mode.
5. When the user permanently enables/disables dark mode on the options page, `options.js` uses `chrome.storage.sync` to save that setting.
6. `background.js` monitors the `chrome.storage.onChanged` event and reflects changes to other tabs when the state of dark mode is changed.

## Notes

- This extension uses Manifest V3. There are differences from Manifest V2, so caution is necessary.
- To use `chrome.storage.sync`, the `"storage"` permission is required.
- The extension cannot be applied to tabs that include URLs starting with `chrome://`.
- The styles for dark mode are defined in `dark_mode.css`. Add or modify styles as needed.

## Future Improvements

- Allow users to disable dark mode for specific websites
- Allow customization of the dark mode color theme
- Allow toggling dark mode on/off with a keyboard shortcut
- Allow more detailed control over the application of dark mode (e.g., excluding specific elements)



