var test = require('tape')
var mat4 = require('gl-mat4')

var Interpolator = require('./')


test('interpolates mat4', function(t){ 
    var start = mat4.create()
    var end = mat4.create()
    mat4.translate(end, end, [10, -50, 20])
    mat4.scale(end, end, [2, 4, 8])

    var lerp = Interpolator(start, end)
    var out = []

    t.equal(typeof lerp, 'function', 'is valid for interpolation')
    lerp(out, 1)
    t.deepEqual(out, [ 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 8, 0, 10, -50, 20, 1 ])

    lerp(out, 0.5)
    t.deepEqual(out, [ 1.5, 0, 0, 0, 0, 2.5, 0, 0, 0, 0, 4.5, 0, 5, -25, 10, 1 ])

    var lerp2 = Interpolator(mat4.scale([], mat4.create(), [0,0,0]), end)
    t.equal(lerp2, false, 'zero scale is not invertible')
    t.end()
})
