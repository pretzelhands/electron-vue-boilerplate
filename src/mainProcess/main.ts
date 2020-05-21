import path from 'path'
import { app, BrowserWindow } from 'electron'

import { getAssetPath } from './utilities'

async function createMainWindow() {
	const queryString = '' // For licensing information or other things
	const windowUrl = process.env.NODE_ENV === 'development'
		? `http://localhost:8080/index.html${queryString}`
		: `file://${path.resolve(__dirname, '..', 'rendererProcess')}/index.html${queryString}`

	global.mainWindow = new BrowserWindow({
		icon: getAssetPath('icon.png'),
		webPreferences: {
			nodeIntegration: true,
			devTools: process.env.NODE_ENV === 'development',
		}
	})

	global.mainWindow.on('closed', () => global.mainWindow = null)
	global.mainWindow.once('ready-to-show', () => global.mainWindow?.show())

	await global.mainWindow.loadURL(windowUrl)

	if (process.env.NODE_ENV === 'development') {
		require('devtron').install()
		require('vue-devtools').install()
	}
}

global.mainWindow = null
app.allowRendererProcessReuse = true

app.on('ready', () => createMainWindow())
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => !global.mainWindow && createMainWindow())
