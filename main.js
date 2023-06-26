size = [1000, 700] // size in pixels, the canvas is a square
aspectRatio = size[0] / size[1]
m = 1 // the "zoom in"
xOffset = -0.4 // the center of canvas is at point (xOffest, yOffset) in the complex plane
yOffset = 0
iterations = 350 // more iterations - more time to wait but better image

randomValues = [Math.random(), Math.random(), Math.random()] // required for "the colorful thing" around the Mandelbrot set
canvas = document.getElementById("cn")
canvas.width = size[0]
canvas.height = size[1]
ctx = canvas.getContext("2d")
// a complex number is an Array(real, imag)
doTheMandelbrotThing = (z, c) => {
	t = [z[0]+c[0], z[1]+c[1]]
	z = [(t[0]*t[0]) - (t[1]*t[1]), 2*t[0]*t[1]]
	return z
}

absSqr = (z) => {
	return z[0]*z[0]+z[1]*z[1]
}

setPixel = (x, y, r, g, b) => {
	ctx.fillStyle = "rgba("+r+","+g+","+b+",1)"
	ctx.fillRect( x, y, 1, 1 )
}

pixelsToCoords = (i, j, size, m) => { // converts coords of a pixel to coords of a point in the complex plane
	x = (2 * i / size[0] - 1) * aspectRatio * m + xOffset
	y = (2 * j / size[1] - 1) * m * -1 + yOffset
	return [x, y]
}

generateMandelbrot = () => {
	startTime = new Date().getTime()
	ctx.clearRect(0, 0, size[0], size[1])
	
	for (i = 0; i < size[0]; i++){
		for (j = 0; j < size[1]; j++){
			coords = pixelsToCoords(i, j, size, m)
			x = coords[0]
			y = coords[1]

			z = [0, 0] 
			for (k = 0; k < iterations; k++) {
				z = doTheMandelbrotThing(z, [x, y])
				if (absSqr(z) > 4) { // if |z|^2 > 4, then the point is NOT in the Mandelbrot set

					//"the colorful thing" around the Mandelbrot set
					//rgb values are from 0 to 1
					r = 0.25
					g = 0.5
					b = 0.5
					multiplier = k * 10
					setPixel(i, j, r * multiplier, g * multiplier, b * multiplier)
					break
				}
			}
		}
	}
	console.log((new Date().getTime() - startTime) / 1000)
}


generateMandelbrot()

document.getElementById("label").remove()

canvas.onclick = function(e) {
      rect = e.target.getBoundingClientRect()
      i = e.clientX - rect.left
      j = e.clientY - rect.top

      coords = pixelsToCoords(i, j, size, m)
      xOffset = coords[0]
      yOffset = coords[1]
      m /= 10

      generateMandelbrot()
    }