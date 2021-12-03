const { webContents } = require('electron/main');

const fenster2 = document.querySelector('#btnWinZwei');

fenster2.addEventListener('click', function (event) {

    const { BrowserWindow } = require('@electron/remote/main').enable(webContents);
    const win2 = new BrowserWindow({
        width: 400,
        height: 400
    });

    win2.loadFile('src/zwei.html');

});





