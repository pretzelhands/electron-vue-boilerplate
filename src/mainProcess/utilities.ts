import path from 'path'

export function getAssetPath(asset: string) {
	return path.resolve(__dirname, 'assets', asset)
}
