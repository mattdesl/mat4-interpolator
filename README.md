# mat4-interpolator

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Builds an interpolator that acts on two 4x4 matrices, using algorithms from [W3C Spec](http://www.w3.org/TR/css3-transforms/#matrix-interpolation) to produce consistent results with CSS animations. Translation, scale, skew and perspective are interpolated linearly, and rotation is interpolated with spherical interpolation.

```js
var start = mat4.create()
var end = mat4.fromRotationTranslation([], [0,1,0,0], [20, 50, -10])
var out = mat4.create()

//create the interpolator
var lerp = require('mat4-interpolator')(start, end)

if (!lerp) { 
    //returns false is the matrices cannot be inverted
    //in this case you need to fall back to your own animation method
    lerp = discreteAnimator
}

//.. in your render loop
function render() {
    //interpolate based on alpha, storing results in 'out' matrix
    lerp(out, alpha)
}
```

**Note:** [mat4-interpolate](https://www.npmjs.com/package/mat4-interpolate) is recommended for most use cases, but this module may be useful to avoid decomposing static matrices every frame.

You can run the demo on RequireBin:

http://requirebin.com/?gist=1347c3e7fd430a191545

## Usage

[![NPM](https://nodei.co/npm/mat4-interpolator.png)](https://nodei.co/npm/mat4-interpolator/)

#### `lerp = createInterpolator(start, end)`

Creates an interpolator function that acts on the target start and end matrices. This will decompose the two matrices into components. If either matrix is non-invertible (i.e. scale or perspective W of zero), this method returns `false`. W3C suggests falling back to discrete animations in this case.

#### `lerp(out, alpha)`

The returned function accepts an `out` matrix for storing the interpolated results, and an `alpha` for how much to interpolate. 

Returns the `out` matrix.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/mat4-interpolator/blob/master/LICENSE.md) for details.
