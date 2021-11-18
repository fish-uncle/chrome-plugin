import hotReload from '@/utils/hotReload'

hotReload()
window.chrome.contextMenus.create({
	type: 'normal',
	title: '生成二维码',
	id: 'url2qrcode',
	contexts: ['all'],
	onclick: info => {
		window.chrome.tabs.create({ url: `routers.html?url=${encodeURIComponent(info.pageUrl)}#/url2qrcode` })
	},
})

window.chrome.contextMenus.create({
	type: 'normal',
	title: '图片转base64',
	id: 'img2base64',
	contexts: ['all'],
	onclick: () => {
		window.chrome.tabs.create({ url: `routers.html#/img2base64` })
	},
})
