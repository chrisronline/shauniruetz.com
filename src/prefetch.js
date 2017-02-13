export default function prefetch() {
  if (process.env.BROWSER) {
    const page = window.location.pathname
    let images = []
    if (page === '/bio') {
      images = ['/assets/images/1.jpg', '/assets/images/3.jpg']
    }
    else if (page === '/contact') {
      images = ['/assets/images/1.jpg', '/assets/images/2.jpg']
    }
    else {
      images = ['/assets/images/2.jpg', '/assets/images/3.jpg']
    }

    images.forEach(src => {
      var img = new Image()
      img.src = src
    })
  }
}