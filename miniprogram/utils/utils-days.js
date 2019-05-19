const formatTime = function (dateStr) {
  var dateObj = dateStr.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  var targetDate = new Date(dateObj);//转化为时间对象
  var year = targetDate.getFullYear();
  var month = targetDate.getMonth() + 1;
  var day = targetDate.getDate();
  var hour = targetDate.getHours();
  var minute = targetDate.getMinutes();
  var second = targetDate.getSeconds();
  var nowDate = new Date();//获取当前时间
  var now_new = Date.parse(nowDate.toString());
  var milliseconds = now_new - targetDate;
  var timeSpanStr = '';
  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  }
  //60分钟以内
  else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  }
  //24小时以内
  else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  }
  //15天以内
  else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  }
  //4周内
  else if (1000 * 60 * 60 * 24 * 15 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15 * 4) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 7)) + '周前';
  }
  else if (milliseconds > 1000 * 60 * 60 * 24 * 15 * 4 && year == nowDate.getFullYear()) {
    timeSpanStr = month + '-' + day;
  } else {
    timeSpanStr = year + '-' + month + '-' + day;
  }
  return timeSpanStr;
}
module.exports = {
  formatTime: formatTime
}