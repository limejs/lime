
exports.firstUpperCase = (str) => {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}