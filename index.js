var lerp = require('gl-vec3/lerp')

var recomposeMat4 = require('mat4-recompose')
var decomposeMat4 = require('mat4-decompose')
var determinant = require('gl-mat4/determinant')
var slerp = require('quat-slerp')

var state0 = state()
var state1 = state()
var tmpState = state()

module.exports = interpolator
function interpolator(start, end) {
    //decompose the start and end matrices into individual components
    var r0 = decompose(start, state0)
    var r1 = decompose(end, state1)
    var valid = r0 && r1
    if (!valid)
        return false

    return function(out, alpha) {
        //now lerp/slerp the start and end components into a temporary state
        lerp(tmpState.translate, state0.translate, state1.translate, alpha)
        lerp(tmpState.skew, state0.skew, state1.skew, alpha)
        lerp(tmpState.scale, state0.scale, state1.scale, alpha)
        lerp(tmpState.perspective, state0.perspective, state1.perspective, alpha)
        slerp(tmpState.quaternion, state0.quaternion, state1.quaternion, alpha)
        
        //and recompose into our 'out' matrix
        recomposeMat4(out, tmpState.translate, tmpState.scale, 
                tmpState.skew, tmpState.perspective, tmpState.quaternion)
        return out
    }
}

function decompose(m, state) {
    if (determinant(m) === 0)
        return false
    return decomposeMat4(m, state.translate, state.scale, state.skew, state.perspective, state.quaternion)
}

function state() {
    return {
        translate: vec3(),
        scale: vec3(1),
        skew: vec3(),
        perspective: vec4(),
        quaternion: vec4()
    }
}

function vec3(n) {
    return [n||0,n||0,n||0]
}

function vec4() {
    return [0,0,0,1]
}