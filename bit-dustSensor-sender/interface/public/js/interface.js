// Function to control lamp
$(document).ready(function() {

  // Refresh sensor data
  refreshSensors();
  setInterval(refreshSensors, 1000);

});

function refreshSensors() {

	$.get('/dustsensor_module/dustDensityug', function(json_data) {
      $("#dustDensityug").text('dustDensityug: ' + json_data.dustDensityug + ' [ug/m3]');
    });
}
