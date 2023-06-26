size = 700 // size in pixels, the canvas is a square
m = 1 // the "zoom in"
xOffset = -0.4 // the center of canvas is at point (xOffest, yOffset) in the complex plane
yOffset = 0
iterations = 200 // more iterations - more time to wait but better the image

randomValues = [Math.random(), Math.random(), Math.random()] // required for "the colorful thing" around the Mandelbrot set
canvas = document.getElementById("cn")
canvas.width = size
canvas.height = size
ctx = canvas.getContext("2d")

id = ctx.createImageData(1, 1) // some stuff for the "setPixel" function
d = id.data
d[3] = 255

// square of absolute value of a complex number (we won't need the real abs value)
// a complex number is an Array(real, imag)
absSqr = (z) => { 

	return (z[0]*z[0]+z[1]*z[1]) 
}

complexSquare = (z) => { // square of a complex number
	return [(z[0]*z[0]) - (z[1]*z[1]), 2*z[0]*z[1]]
}

setPixel = (x, y, r, g, b) => {
	d[0] = r
	d[1] = g
	d[2] = b
	ctx.putImageData(id, x, y)
}

pixelsToCoords = (i, j, size, m) => { // converts coords of a pixel to coords of a point in the complex plane
	x = (2 * j / size - 1) * m + xOffset
	y = (2 * i / size - 1) * m * -1 + yOffset
	return [x, y]
}

generateMandelbrot = () => {
	ctx.clearRect(0, 0, size, size)
	for (i = 0; i < size; i++){
		for (j = 0; j < size; j++){
			coords = pixelsToCoords(i, j, size, m)
			x = coords[0]
			y = coords[1]

			z = [0, 0] 
			for (k = 0;k < iterations; k++) {
				z = [z[0]+x, z[1]+y]
				z = complexSquare([z[0], z[1]])
				if (absSqr(z) > 4) { // if |z|^2 > 4, then the point is NOT in the Mandelbrot set
					//"the colorful thing" around the Mandelbrot set
					//rgb values are from 0 to 1
					r = randomValues[0]
					g = randomValues[1]
					b = randomValues[2]
					multiplier = k / 50 * 255 
					setPixel(j, i, r * multiplier, g * multiplier, b * multiplier)
					break
				}
			}
		}
	}
}

generateMandelbrot()
document.getElementById("label").remove()

canvas.onclick = function(e) {
      rect = e.target.getBoundingClientRect()
      i = e.clientX - rect.left
      j = e.clientY - rect.top

      coords = pixelsToCoords(j, i, size, m)
      xOffset = coords[0]
      yOffset = coords[1]
      m /= 10

      generateMandelbrot()
    }