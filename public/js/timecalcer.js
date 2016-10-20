const timecalcer = {

  init: function () {
    var myDate2 = new Date(); // Your timezone!
    console.log(myDate2)
    var myEpoch2 = myDate2.getTime()/1000.0;
    var d = new Date(new Date().getFullYear(), 0, 1);
    console.log(d)
    var myEpoch = d.getTime()/1000.0;

    caller.call(myEpoch, myEpoch2)
  }

}
timecalcer.init()
