declare global {
	namespace NodeJS {
		interface Global {
			mainWindow: Electron.BrowserWindow|null;
		}
	}
}

export {};
