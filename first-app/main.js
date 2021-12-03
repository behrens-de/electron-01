require('@electron/remote/main').initialize();
const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const { shell } = require('electron/common');
// Erstellt neues Fenster
function createWindow() {
    const win = new BrowserWindow({
        icon: 'assets/icons/appicon.png',
        width: 800,
        height: 600,
        titleBarOverlay: true,
        webPreferences: {
            // Das ermöglicht es die NODE.JS Module direkt im Frontend zu benutzen
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    if (process.platform === 'darwin') {
        app.dock.setIcon('assets/icons/appicon.png');
    }

    // lädt die Datei die im renderprozess angezeit werden soll
    win.loadFile(__dirname + '/src/index.html');

    anwendungsmenu();
    contextmenu(win);

 

}

/*-- EVENT BASED FUNTIONS --*/

// lädt die createWindow funtion sobald die App bereit ist
app.whenReady().then(createWindow);
// schielsst die app wenn alle Fenter geschlossen sind (EVENT)
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    // Erstellt Fenster wenn noch kein fenster vorhanden ist (erst-neu-start)
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.setName("DEMO");



//-----

const contextmenu = (win) => {

    const cmenu = new Menu();
    cmenu.append(new MenuItem({
        label: "Klick",
        click() {
            console.log("funktioniert");
        }
    }));
    cmenu.append(new MenuItem(
        { role: "selectAll", label: 'Alles auswählen' }
    ));
    // DEVTOOLS 
    cmenu.append(new MenuItem({
        label: 'DEV Tools',
        click: () => {
            win.webContents.openDevTools();
        }
    }));

    // Rechtsklick Event
    win.webContents.on('context-menu', function (e, params) {
        // um das Menü an der mousposition erscheinen zu lassen
        cmenu.popup(win, params.x, params.y);
    });
}


// Anwendungsmenu
const anwendungsmenu = () => {
    const menuObjects = [
        {
            label: 'Menupunkt',
            submenu: [
                {
                    label: "Unterpunkt 1", click: function () {
                        console.log('YUHUU');
                    }
                },
                {
                    label: "Doku", click() {
                        shell.openExternal('https://www.electronjs.org/docs/latest/');
                    }
                },
                { label: "Unterpunkt 3" },
                { type: "separator" },
                {
                    label: "ende", click() {
                        app.quit();
                    }
                }
            ]
        }, {
            label: 'Menupunkt 2',
            submenu: [
                { role: "selectAll", label: 'Alles auswählen' }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuObjects);
    Menu.setApplicationMenu(menu);
}

