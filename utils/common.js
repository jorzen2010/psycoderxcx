function formatTime(timestamp) {
  var date = new Date(timestamp);
  //date.setTime(timestamp); 
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return year + "-" + month + "-" + date;
 // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



function formatDate(dt,timetype) {
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var date = dt.getDate();
  var hour = dt.getHours();
  var minute = dt.getMinutes();
  var second = dt.getSeconds();
  if(timetype=="long")
  {
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
  else if (timetype == "short") {
    return year + "-" + month + "-" + date;
  }
  else if (timetype == "time") {
    return hour + ":" + minute + ":" + second;
  }
  else if (timetype == "mintime") {
    return hour + ":" + minute;
  }

}
function formatDateStamp(time, timetype) {
  var t = time.slice(6, 19);
  var NewDtime = new Date(parseInt(t));
  return formatDate(NewDtime,timetype);
}



module.exports = {
  formatTime: formatTime,
  formatDateStamp: formatDateStamp,
  formatDate: formatDate
}