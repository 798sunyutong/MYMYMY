export function getParameter(name){
let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
let num = +window.location.hash.indexOf('?')+1; 
let r =
    window.location.hash===''
    ? window.location.search.substr(1).match(reg)
    : window.location.hash.substr(num).match(reg);
    if(r!=null) return decodeURI(r[2]);
    return '';
}
