module.exports = {
    substringStr: function(u) {
        return u && u.length > 12 ? (u = u.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "")) ? u.slice(0, 12) + "..." : "匿名" : u;
    }
};