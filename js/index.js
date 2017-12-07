$(() => {
  var sessionTime = 25,
    breakTime = 5;
  const interval = 1;

  var timer = null,
    timerBreak = null,
    countBreak = convert(breakTime),
    countTime = convert(sessionTime);

  $("#plus").click(() => {
    sessionTime += interval;
    $("#num25").html(sessionTime);
    countTime = convert(sessionTime);
  });

  $("#minus").click(() => {
    if (sessionTime > interval && sessionTime > breakTime) {
      sessionTime -= interval;
      $("#num25").html(sessionTime);
      countTime = convert(sessionTime);
    }
  });

  $("#plusBreak").click(() => {
    if (breakTime < sessionTime) {
      breakTime += interval;
      $("#num5").html(breakTime);
      countBreak = convert(breakTime);
    }
  });

  $("#minusBreak").click(() => {
    if (breakTime > interval) {
      breakTime -= interval;
      $("#num5").html(breakTime);
      countBreak = convert(breakTime);
    }
  });

  $("#reset,#stop").hide();

  $("#start").click(() => {
    $("#break,#main-heading,#st,#plus,#minus").hide();
    $("#reset,#stop,#timeType").show();
    $("#timeType").html("Session time started:");
    
    updateTime();
    if (!timer && countTime > 0) {
      timer = setInterval(updateTime, 1000);
    }
  });

  //('0' + mintues).slice(-2) + ':' + ('0' + seconds).slice(-2)
  $("#stop").click(() => {
    //console.log("stopped");
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (timerBreak) {
      clearInterval(timerBreak);
      timerBreak = null;
    }
  });

  $("#reset").click(() => {
    $("#break,#main-heading,#st,#plus,#minus").show();
    $("#session,#main-heading,#bt,#plusBreak,#minusBreak").show();
    $("#reset,#stop,#timeType").hide();
    sessionTime = 25;
    breakTime = 5;
    countTime = convert(sessionTime);
    countBreak = convert(breakTime);

    $("#num25").html(sessionTime);
    $("#num5").html(breakTime);
    $("#buzzer")
      .get(0)
      .load();
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (timerBreak) {
      clearInterval(timerBreak);
      timerBreak = null;
    }
  });
  function updateTime() {
    display(countTime, "num25");

    if (countTime <= 0) {
      $("#buzzer")
      .get(0)
      .play();
      clearInterval(timer);
      timer = null;
      if (countBreak <= 0 && !timerBreak) {
        countBreak = convert(breakTime);
      }

      setBreak();
      //console.log("Break time now..." + countBreak);
      if (!timerBreak && countBreak > 0) {
        timerBreak = setInterval(setBreak, 1000);
      }
    } else {
      countTime -= 1000;
    }
  }

  function setBreak() {
    $("#timeType").html("Break time started:");

    display(countBreak, "num25");

    if (countBreak <= 0) {
     
      clearInterval(timerBreak);
      timerBreak = null;
      $("#timeType").html("Session time started:");

      countTime = convert(sessionTime);
      display(countTime, "num25");
      if (!timer && countTime > 0) {
        timer = setInterval(updateTime, 1000);
        //console.log("Session time now ..." + countTime);
      }
    } else {
      countBreak -= 1000;
    }
  } // setBreak

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  function convert(time) {
    return time * 1000 * 60;
  }

  function display(total, id) {
    var seconds = Math.floor((total / 1000) % 60);
    var mintues = Math.floor(total / 1000 / 60);
    $("#" + id).html(pad(mintues) + ":" + pad(seconds));
  }
});
