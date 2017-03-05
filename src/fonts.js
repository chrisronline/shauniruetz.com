import WebFontLoader from 'webfontloader'

const fonts = [
	new FontFace(
		'Mathilde',
		'url(/assets/fonts/mathilde.woff)',
		{
			style: 'normal',
			unicodeRange: 'U+000-5FF',
			weight: '400'
		}
	),
	new FontFace(
		'FontAwesome',
		'url(/assets/fonts/fontawesome-webfont.woff)',
	),
	new FontFace(
		'BorderFont',
		'url(/assets/fonts/332EA8_0_0.woff)',
		{
			style: 'normal',
			unicodeRange: 'U+000-5FF',
			weight: '400'
		}
	)
]

let left = fonts.length + 1
function done() {
	if (--left <= 0) {
		setTimeout(() => {
			document.body.classList.remove('fonts-loading')
		}, 100)
	}
}


export default function loadFonts() {
	WebFontLoader.load({
		google: {
			families: ['Patrick Hand SC']
		},
		active: done
	})

	fonts.forEach(font => {
		font.load()
			.then(() => {
				document.fonts.add(font)
				done()
			})
	})
}