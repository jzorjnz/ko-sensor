function Cloud() {
    self = this;
    this.mbed_server = "https://api.connector.mbed.com/v2";
    //this.notification_server = "http://93.62.59.68:53576";
    this.notification_server = "http://192.168.1.20:8082";
    //this.key = "KGC48Y04jRsJgYG4Uwnx1dmMfhVImYwy49sc87PafmJDJLdmvexESLhy4J0AeLmbwvbE5kMfIoy9PDSYVoTSvl55Kue3InElCB7N";
    // new
    this.key = "hPDJSltBhMi9l73Lf1I6S9lXKnIFrVIPfRnwJvq8Ak88AKiY2J87q4nUG2RzOfKd0qAbgd53Iq65Op2qPewv06JssDPJMUsa14mn";

    this.authorization = "Bearer " + this.key;
    this.headers = {
        "Authorization": this.authorization,
        //"Access-Control-Allow-Origin": "*"
    }
}

Cloud.prototype.getDevices = function (packet) {
    var self = this;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.mbed_server + "/endpoints",
        type: "get",
        contentType: "application/json",
        dataType:"json",
        headers: self.headers,
      }).done(function (result) {
        resolve(result);
      });
    });
  };

Cloud.prototype.getEndpointInfo = function (endpoint) {
    var self = this;
    //console.log("packet: " + JSON.stringify(packet));
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.mbed_server + "/endpoints/" + endpoint,
        type: "get",
        contentType: "application/json",
        headers: self.headers,
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };


Cloud.prototype.sendNotificationRequest = function (endpoint) {
    //console.log("packet: " + JSON.stringify(packet));
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.mbed_server + "/notification/callback",
        type: "put",
        contentType: "application/json",
        data: JSON.stringify(
          {
            "url": self.notification_server +  "/data",
            "headers" : {
              "Authorization" : "auth", 
              "test-header" : "test"
            }
          }),
        headers: self.headers,
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };


  Cloud.prototype.startNotificationService = function (params) {
    //console.log("packet: " + JSON.stringify(packet));
    console.log('starting...');
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.notification_server +  "/start/" + params.endpoint + "/" + params.path,
        type: "get",
        contentType: "application/json"
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };

  Cloud.prototype.stopNotificationService = function (params) {
    //console.log("packet: " + JSON.stringify(packet));
    console.log('stopping...');
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.notification_server +  "/stop/" + params.endpoint + "/" + params.path,
        type: "get",
        contentType: "application/json"
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };

  Cloud.prototype.getResource = function (params) {
    //console.log("packet: " + JSON.stringify(packet));
    console.log('gettting resources...');
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.notification_server +  "/get_resource/" + params.endpoint + "/" + params.path,
        type: "get",
        contentType: "application/json"
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };

  
var cloud = new Cloud(); 