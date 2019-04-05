// 两种日期格式化的方法，根据需求选取

// 日期格式化，方法一
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 日期格式化，方法二
function formatDate(fmt, date) {
  const oriDate = new Date(date);
  const o = {
    "M+": oriDate.getMonth() + 1, //月份
    "d+": oriDate.getDate(), //日
    "H+": oriDate.getHours(), //小时
    "m+": oriDate.getMinutes(), //分
    "s+": oriDate.getSeconds(), //秒
    "q+": Math.floor((oriDate.getMonth() + 3) / 3), //季度
    "S": oriDate.getMilliseconds() //毫秒
  };

  //因date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
  if (/(y+)/.test(fmt)) {
    //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。

    fmt = fmt.replace(RegExp.$1, (oriDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
    }
  }

  return fmt;
}

module.exports = {
  formatTime,
  formatDate,
}