size = 700 // size in pixels, the canvas is a square
m = 1 // the "zoom", higher m - smaller mandelbrot set
xOffset = -0.4 // the center of canvas is at point (xOffest, 0) in the complex plane
iterations = 200 // more iterations - more time to wait but better the image

canvas = document.getElementById("cn")
canvas.width = size
canvas.height = size
ctx = canvas.getContext("2d")

id = ctx.createImageData(1, 1) // some stuff for "setPixel" function
d = id.data
d[3] = 255

// square of absolute value of a complex number (we don't need the real abs value)
// a complex number is Array(real, imag)
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
	y = (2 * i / size - 1) * m * -1
	return [x, y]
}

generateMandelbrot = () => {
	for (i = 0; i < size; i++){
		for (j = 0; j < size; j++){
			coords = pixelsToCoords(i, j, size, m)
			x = coords[0]
			y = coords[1]

			z = [0, 0] 
			for (k = 0;k < iterations; k++) {
				z = complexSquare([z[0]+x, z[1]+y])
				if (absSqr(z) > 4) {
					//"the yellow thing" around the Mandelbrot set
					//the values are from 0 to 1
					r = 0
					g = 1
					b = 1
					multiplier = k / 50 * 255 
					setPixel(j, i, r * multiplier, g * multiplier, b * multiplier)
					break
				}
			}
		}
	}
}

generateMandelbrot()