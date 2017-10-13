function Cloud() {
    this.server = "https://api.connector.mbed.com/v2";
    this.key = "KGC48Y04jRsJgYG4Uwnx1dmMfhVImYwy49sc87PafmJDJLdmvexESLhy4J0AeLmbwvbE5kMfIoy9PDSYVoTSvl55Kue3InElCB7N";
    this.authorization = "Bearer " + this.key;
    this.headers = {
        "Authorization": this.authorization,
        "Access-Control-Allow-Origin": "*"
    }
}

Cloud.prototype.getDevices = function (packet) {
    var self = this;
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: self.server + "/endpoints",
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
        url: self.server + "/endpoints/" + endpoint,
        type: "get",
        contentType: "application/json",
        headers: self.headers,
      }).done(function (result) {
        console.log(result);
        resolve(result);
      });
    });
  };



var cloud = new Cloud(); 