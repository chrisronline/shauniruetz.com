import WebFontLoader from 'webfontloader'

const mathilde = new FontFace(
	'Mathilde',
	'url(/assets/fonts/mathilde.woff)',
	{
		style: 'normal',
		unicodeRange: 'U+000-5FF',
		weight: '400'
	}
);

const fontAwesome = new FontFace(
	'FontAwesome',
	'url(/assets/fonts/fontawesome-webfont.woff)',
);

let left = 3
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

	mathilde.load()
		.then(() => {
			document.fonts.add(mathilde)
			done()
		})

	fontAwesome.load()
		.then(() => {
			console.log("fontawesome")
			document.fonts.add(fontAwesome)
			done()
		})
}