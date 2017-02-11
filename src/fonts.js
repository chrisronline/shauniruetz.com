import WebFontLoader from 'webfontloader'

const font = new FontFace(
	'Mathilde',
	'url(/assets/fonts/mathilde.woff)',
	{
		style: 'normal',
		unicodeRange: 'U+000-5FF',
		weight: '400'
	}
);

let left = 0
function done() {
	if (--left <= 0) {
		setTimeout(() => {
			document.body.classList.remove('fonts-loading')
		}, 100)
	}
}


export default function loadFonts() {
	let loaded = 0

	WebFontLoader.load({
		google: {
			families: ['Patrick Hand SC']
		},
		active: done
	})

	font.load()
		.then(() => {
			document.fonts.add(font)
			done()
		})
}