/* WebStorage to keep page status | Created 2017/09 */
if (typeof sessionStorage === 'undefined') {
  console.log("sessionStorage is not available...");
} else {
  console.log("sessionStorage Available!");

  /* save this page status  */
  function setStorage() {
    var elements = document.getElementsByTagName("input");
    for (var i=0; i<elements.length; i++) {
      var type = elements[i].type;
      var key = elements[i].id;
      if (type == "range") {
        sessionStorage[key] = elements[i].value;
      } else if (type == "checkbox" || type == "radio") {
        sessionStorage[key] = elements[i].checked;
      }
    }

    elements = document.getElementsByTagName("select");
    for (var i=0; i<elements.length; i++) {
      var key = elements[i].id;
      sessionStorage[key] = elements[i].value;
    }
  }

  /* load this page status */
  function getStorage() {
    var elements = document.getElementsByTagName("input");
    var when_def = null;
    for (var i=0; i<elements.length; i++) {
      var type = elements[i].type;
      var key = elements[i].id;
      if (type == "range") {
        elements[i].value = sessionStorage[key] == null ? "1" : sessionStorage[key];
        document.querySelector("#num").innerHTML = elements[i].value;
        // %に合わせてグラグを表示
        var num = elements[i].value/10;
        var id = num+1;
        for (var i=num; i>0; i--) {
          document.getElementById('chart'+i).style.background = "transparent";
          document.getElementById('chart-'+i).style.background = "transparent";
        }
        for (var i=0; i<(10-num); i++,id++) {
          document.getElementById('chart'+id).style.background = "#ecf0f1";
          document.getElementById('chart-'+id).style.background = "#ecf0f1";
        }
      } else if (type == "checkbox") {
        elements[i].checked = sessionStorage[key] == "true" ? true : false;
      } else if (type == "radio") {
        elements[i].checked = sessionStorage[key] == "true" ? true : false;
        if (when_def == null && elements[i].name == "when") {
          when_def = true;
        }
        if ((elements[i].name == "when") && (elements[i].checked == true)) {
          if (elements[i].value == "when-day") {
            document.getElementById('when-day').style.display = "block";
            document.getElementById('when-week').style.display = "none";
            document.getElementById('when-month').style.display = "none";
          } else if (elements[i].value == "when-week") {
            document.getElementById('when-day').style.display = "none";
            document.getElementById('when-week').style.display = "block";
            document.getElementById('when-month').style.display = "none";
          } else if (elements[i].value == "when-month") {
            document.getElementById('when-day').style.display = "none";
            document.getElementById('when-week').style.display = "none";
            document.getElementById('when-month').style.display = "block";
          }
          when_def = false;
        }
      }
    }
    if (when_def == true) {
      document.getElementById('choice-day').checked = true;
    }

    var elements = document.getElementsByTagName("select");
    for (var i=0; i<elements.length; i++) {
      var key = elements[i].id;
      if (sessionStorage[key] != null) {
        elements[i].value = sessionStorage[key];
        if (elements[i].name == "lang") {
          var btn = document.getElementById('start-btn');
          if (elements[i].value == "ja") {
            btn.innerHTML = "回答する";
          } else if (elements[i].value == "en") {
            btn.innerHTML = "START";
          } else if (elements[i].value == "cn") {
            btn.innerHTML = "回答";
          }
        }
      } else {
        if (elements[i].name == "lang") {
          elements[i].value = "ja";
        } else if (elements[i].name == "day") {
          elements[i].value = "day1";
        } else if (elements[i].name == "week") {
          elements[i].value = "week1";
        } else if (elements[i].name == "month") {
          elements[i].value = "month1";
        }
      }
    }
  }

  /* remove this page status for each tag */
  function removeStorage() {
    var elements = document.getElementsByTagName("input");
    for (var i=0; i<elements.length; i++) {
      var key = elements[i].id;
      sessionStorage.removeItem(key);
    }

    elements = document.getElementsByTagName("select");
    for (var i=0; i<elements.length; i++) {
      var key = elements[i].id;
      sessionStorage.removeItem(key);
    }
    location.reload();
  }

  /* remove this page all status */
  function removeAllStorage() {
    sessionStorage.clear();
//    location.reload();
  }

  if (window.addEventListener) {
    window.addEventListener('load', function () { getStorage() });
  } else {
    window.onload = function(){ getStorage() }
  }
}
