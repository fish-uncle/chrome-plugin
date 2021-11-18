import QRCode from 'h-qrcode'

export default state => {
	const canvas1 = document.getElementById('url2qrcode-canvas1')
	const canvas2 = document.getElementById('url2qrcode-canvas2')
	canvas1.innerHTML = ''
	canvas2.innerHTML = ''
	new QRCode(canvas1, {
		text: state.url,
		colorDark: state.colorDark,
		colorLight: state.colorLight,
		width: state.width,
		height: state.height,
		isDotted: false,
		colorful: state.colorful,
		dotColors: state.dotColors,
	})
	new QRCode(canvas2, {
		text: state.url,
		colorDark: state.colorDark,
		colorLight: state.colorLight,
		width: state.width,
		height: state.height,
		isDotted: true,
		colorful: state.colorful,
		dotColors: state.dotColors,
	})
	setTimeout(() => {
		if (state.imageUrl) {
			const can1 = document.getElementById('url2qrcode-canvas1').firstChild as HTMLCanvasElement
			const can2 = document.getElementById('url2qrcode-canvas2').firstChild as HTMLCanvasElement
			const img1 = document.getElementById('url2qrcode-canvas1').lastChild as HTMLElement
			const img2 = document.getElementById('url2qrcode-canvas2').lastChild as HTMLElement
			const ctx1 = can1.getContext('2d')
			const ctx2 = can2.getContext('2d')
			const img = new Image()
			img.src = state.imageUrl
			img.onload = () => {
				ctx1.drawImage(
					img,
					(state.width - state.imgWidth) / 2,
					(state.height - state.imgHeight) / 2,
					state.imgWidth,
					state.imgHeight,
				)
				ctx2.drawImage(
					img,
					(state.width - state.imgWidth) / 2,
					(state.height - state.imgHeight) / 2,
					state.imgWidth,
					state.imgHeight,
				)
				img1.setAttribute('src', can1.toDataURL('image/png'))
				img2.setAttribute('src', can2.toDataURL('image/png'))
			}
		}
	})
}
