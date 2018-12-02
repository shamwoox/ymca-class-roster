var myFunctions = {};

myFunctions.formatPhoneNumber = function (phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

myFunctions.getTodaysDate = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  if(dd<10) {
      dd = '0'+dd
  } 
  
  if(mm<10) {
      mm = '0'+mm
  } 
  
  return mm + '/' + dd + '/' + yyyy;
}

myFunctions.getCurrentTime = function() {
  var today = new Date();
  var hh = today.getHours();
  if (hh > 12) {
    hh -= 12;
    return hh + ":" + today.getMinutes() + ":" + today.getSeconds() + " pm";
  }
  return hh + ":" + today.getMinutes() + ":" + today.getSeconds() + " am";
}

module.exports = myFunctions;