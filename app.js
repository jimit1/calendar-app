$(document).ready(function () {
  var time = moment().format("HH");
  var displayDate = "";
  var displayTime = "";
  var calendarLength = 20;
  try {
    var storeData = JSON.parse(window.localStorage.getItem("storeData"));
  } catch {
    var storeData = [];
    for (var i = 0; i < calendarLength; i++) {
      storeData.push("");
    }
  }

  var updateTime = function () {
    displayDate = moment().format("LL");
    displayTime = moment().format("LTS");
    $("#currentDay").text(`${displayDate} ${displayTime}`);
  };
  updateTime();
  setInterval(updateTime, 1000);

  var clock = 0;
  var amPm = "";

  for (var i = 9; i < calendarLength; i++) {
    if (i < 13) {
      clock = i;
      amPm = "am";
    } else {
      clock = i - 12;
      amPm = "pm";
    }
    if (!storeData) {
      var storeData = [];
      for (var j = 0; j < calendarLength; j++) {
        storeData.push("");
      }
    }
    $(".container").append(`<div class="row time-block">
    <h6 class="text-center col-1 p-0 border-top">${clock} ${amPm}</h6>
    <textarea
      class="text-center col-10 textInput"
      name="${i}"
      id="t${i}"
      cols="100"
      rows="2"
    >${storeData[i]}</textarea>
    <button class="saveBtn col-1 p-0" id="${i}">Save</button>
  </div>
    `);

    //For past time blocks
    if (i < time) {
      $(`#t${i}`).attr("style", "background-color: #d3d3d3; color: white;");
      $(`#t${i}`).attr("readonly", "readonly");
    }
    //For future time blocks
    if (i > time) {
      $(`#t${i}`).attr("style", "background-color: #77dd77; color: white;");
    }
    //For current time blocks
    $(`#t${time}`).attr("style", "background-color: #ff6961; color: white;");
  }

  $(document).on("click", ".saveBtn", function () {
    var id = $(this).attr("id");
    var userInput = $(`#t${id}`).val();
    storeData.splice(id, 1, userInput);
    console.log(storeData);
    window.localStorage.setItem("storeData", JSON.stringify(storeData));
    if (storeData[id] === "") {
      showAlert("You have removed an item", "warning");
    }
    if (storeData[id] !== "") {
      showAlert("You have successully added an item", "success");
    }
  });

  function showAlert(str, type) {
    $("#alert").show();
    $("#alert").attr("class", `alert text-center alert-${type}`);
    $("#alert").text(str);
    window.setTimeout(function () {
      $("#alert").hide();
    }, 3000);
    $("#alert").on("click", function () {
      $("#alert").hide();
    });
  }

  $("#resetBtn").on("click", function () {
    showAlert("You have successfully deleted all data", "danger");
    window.localStorage.removeItem("storeData");
    storeData = null;
    window.setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  });
});
