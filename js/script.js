var tempInCelsius = 0;
var unitIsCelsius = true;

$(document).ready(function() {
  $("#toggle").click(function() {
    unitIsCelsius = !unitIsCelsius;
    updateTemp();
    if (unitIsCelsius) {
      $("#temp").addClass("celsius");
      $("#temp").removeClass("fahrenheit");
    }
    else {
      $("#temp").addClass("fahrenheit");
      $("#temp").removeClass("celsius");
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
      $.getJSON(url, function(data) {
        console.log(data);
        tempInCelsius = data.main.temp;
        updateTemp();
        $("#icon").attr("src", data.weather[0].icon).removeClass("d-none");
        $("#placeholder").addClass("d-none");
        $("#city").text(data.name);
        $("#condition").text(data.weather[0].description);
      });
    });
  }
});

function updateTemp() {
  if(unitIsCelsius) {
    $("#temp").text(tempInCelsius);
  }
  else {
    $("#temp").text((tempInCelsius * 9/5 + 32).toFixed(1));
  }
}
