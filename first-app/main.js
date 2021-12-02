const {app, BrowserWindow} = require('electron');


// Erstellt neues Fenster
function createWindow(){
    const win = new BrowserWindow({

        width: 800,
        height: 600,
        webPreferences: {
            // Das ermöglicht es die NODE.JS Module direkt im Frontend zu benutzen
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    // lädt die Datei die im renderprozess angezeit werden soll
    win.loadFile(__dirname+'/index.html');

}

/*-- EVENT BASED FUNTIONS --*/

// lädt die createWindow funtion sobald die App bereit ist
app.whenReady().then(createWindow);
// schielsst die app wenn alle Fenter geschlossen sind (EVENT)
app.on('window-all-closed',()=>{
    app.quit();
});

app.on('activate',()=>{
    // Erstellt Fenster wenn noch kein fenster vorhanden ist (erst-neu-start)
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});