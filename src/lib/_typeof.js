/**
 * 
 * @param {any} o any object to be detected
 * @return {string} the type string
 */
function _typeof(o){
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

export default _typeof