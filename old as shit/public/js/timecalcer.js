const timecalcer = {

  init: function () {
    const myDate2 = new Date(); // Your timezone!
    console.log(myDate2)
    const myEpoch2 = myDate2.getTime()/1000.0;
    const d = new Date(new Date().getFullYear(), 0, 1);
    console.log(d)
    const myEpoch = d.getTime()/1000.0;
    caller.call(myEpoch, myEpoch2)
  }

}
timecalcer.init()
