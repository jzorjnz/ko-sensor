function KoModel(data) {
  var self = this;
  
  self.selectedEndpoint = ko.observable();
  self.availableEndpoints = ko.observableArray ([]);
  
  self.resourceTemp = "3303/0/5700";
  self.resourcePressure = "3300/0/5700";
  self.resourceButton = "3200/0/5501";

  self.tempData = ko.observable({labels: [], datasets: [{ label: "Temperature Dataset", fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",data: []}]});
  self.pressureData = ko.observable({labels: [], datasets: [{ label: "Pressure Dataset", fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",data: []}]});
  self.buttonData = ko.observable({labels: [], datasets: [{ label: "Button Dataset", fillColor: "rgba(220,220,220,0.2)", strokeColor: "rgba(220,220,220,1)", pointColor: "rgba(220,220,220,1)", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "rgba(220,220,220,1)",data: []}]});
  
  
  self.getEndpoints = function() {
    cloud.getDevices().then(function (data) {
      console.log("function response: " + JSON.stringify(data));
      self.availableEndpoints.removeAll();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          self.availableEndpoints.push(data[key].name);
        }
      }
    });
  };

  self.getEndpointInfo = function() {
    if(self.selectedEndpoint() && self.selectedEndpoint().length > 0 ){
      console.log("" + self.selectedEndpoint());
      cloud.sendNotificationRequest("" + self.selectedEndpoint()).then(function (data) {
        console.log("function response: " + JSON.stringify(data));
        
      });
    }
    else{
      alert("Please select endpoint first!");
    }
    
  };
  
  self.startNotificationService = function(path) {
    if(self.selectedEndpoint() && self.selectedEndpoint().length > 0 ){
      params = {
        "endpoint": self.selectedEndpoint(),
        "path": path//"3303/0/5700" //3200/0/5501"
      }
      cloud.startNotificationService(params).then(function (data) {
        console.log("function response: " + JSON.stringify(data));
        self.getResource(path);
      });
    }
    else{
      alert("Please select endpoint first!");
    }
  };

  self.stopNotificationService = function(path) {
    if(self.selectedEndpoint() && self.selectedEndpoint().length > 0 ){
      params = {
        "endpoint": self.selectedEndpoint(),
        "path": path//"3303/0/5700" //3200/0/5501"
      }
      cloud.stopNotificationService(params).then(function (data) {
        console.log("function response: " + JSON.stringify(data));
      });
    }
    else{
      alert("Please select endpoint first!");
    }
  };

  self.getResource = function(path) {
    params = {
      endpoint: self.selectedEndpoint(),
      path: path
    }
    cloud.getResource(params).then(function (data) {
      console.log("function response: " + JSON.stringify(data));
      
      var values = [];
      var labels = [];
      var i = 1;
      for(var key in data){
        if(data.hasOwnProperty(key)){
          d = new Date(data[key].time);
          
          labels.push(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
          values.push(data[key].payload);
          i++;
        }
      }
      
      if(path == self.resourceTemp){
        console.log('showing for temp!');
        self.tempData({
          labels: labels,
          datasets: [{
            label: "Button resource dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: values
          }]
        });
      }
      else if(path == self.resourcePressure){
        console.log('showing for pressure!');
        self.pressureData({
          labels: labels,
          datasets: [{
            label: "Button resource dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: values
          }]
        });
      }
      else if(path == self.resourceButton){
        console.log('showing for button!');
        self.buttonData({
          labels: labels,
          datasets: [{
            label: "Button resource dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: values
          }]
        });
      }
      
    });
    setTimeout(self.getResource, 1000, path);
  };

  self.startTempNotificationService = function() {
    self.startNotificationService(self.resourceTemp);
  };

  self.stopTempNotificationService = function() {
    self.stopNotificationService(self.resourceTemp);
  };

  self.getTemperatureResource = function() {
    self.getResource(self.resourceTemp);
  };
  
  self.startPressureNotificationService = function() {
    self.startNotificationService(self.resourcePressure);
  };

  self.stopPressureNotificationService = function() {
    self.stopNotificationService(self.resourcePressure);
  };

  self.getPressureResource = function() {
    self.getResource(self.resourcePressure);
  };

  self.startButtonNotificationService = function() {
    self.startNotificationService(self.resourceButton);
  };

  self.stopButtonNotificationService = function() {
    self.stopNotificationService(self.resourceButton);
  };

  self.getButtonResource = function() {
    self.getResource(self.resourceButton);
  };
  
  self.startService = function(){
    self.startNotificationService(self.resourceTemp);
    self.startNotificationService(self.resourcePressure);
    self.startNotificationService(self.resourceButton);
  };

};

$(document).ready(function() {
  var data = {};
  var koModel = new KoModel(data);
  ko.applyBindings(koModel);
});