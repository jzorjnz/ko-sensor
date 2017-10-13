function KoModel(data) {
  var self = this;
  self.machines = ko.observable(data.machines || null);
  self.browserData = ko.observable(data.browsers || null);
  self.lineData = ko.observable(data.lineData || null);
  self.pieData = ko.observable(data.pieData || null);
  self.pieChartOptions = ko.observable(data.pieChartOptions || null);
  self.doughnutData = ko.observable(data.doughtnutData || null);
  self.doughnutChartOptions = ko.observable(data.doughnutChartOptions || null);
  self.chart1Legend = ko.observable(null);
  self.chart1Image = ko.observable(null);

  this.selectedEndpoint = ko.observable();
  this.availableEndpoints = ko.observableArray ([]);

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
      //var packet = {"endpoint": self.selectedEndpoint()};// + '/3303/0/5700?cacheOnly=false&noResp=false'};

      cloud.getEndpointInfo("" + self.selectedEndpoint()).then(function (data) {
        console.log("function response: " + JSON.stringify(data));
        
      });
    }
    else{
      alert("Please select endpoint first!");
    }
    
  };

  
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

  self.alertLabel = function(chartItem, chart) {
    alert(chartItem.label);
  };
  self.alertJson = function(chartItem, chart) {
    alert(JSON.stringify(chartItem));
  };

  self.setBrowserData1 = function() {
    self.browserData({
      labels: ["January", "February", "March", "April"],
      datasets: [{
        label: 'IE',
        fillColor: 'rgba(250, 50, 50, 0.5)',
        strokeColor: 'rgba(250, 50, 50, 0.8)',
        highlightFill: 'rgba(250, 50, 50, 0.75)',
        highlightStroke: 'rgba(250, 50, 50, 1)',
        data: [60, 50, 45, 32]
      }, {
        label: 'Chrome',
        fillColor: 'rgba(50, 250, 50, 0.5)',
        strokeColor: 'rgba(50, 250, 50, 0.8)',
        highlightFill: 'rgba(50, 250, 50, 0.75)',
        highlightstroke: 'rgba(50, 250, 50, 1)',
        data: [10, 12, 16, 30]
      }]
    });
  };
  self.setBrowserData2 = function() {
    self.browserData({
      labels: ["September", "October", "November", "Dcember"],
      datasets: [{
        label: 'IE',
        fillColor: 'rgba(250, 50, 50, 0.5)',
        strokeColor: 'rgba(250, 50, 50, 0.8)',
        highlightFill: 'rgba(250, 50, 50, 0.75)',
        highlightStroke: 'rgba(250, 50, 50, 1)',
        data: [60, 50, 45, 32]
      }, {
        label: 'Firefox',
        fillColor: 'rgba(50, 50, 250, 0.5)',
        strokeColor: 'rgba(50, 50, 250, 0.8)',
        highlightFill: 'rgba(50, 50, 250, 0.75)',
        highlightStroke: 'rgba(50, 50, 250, 1)',
        data: [25, 22, 15, 24]
      }, {
        label: 'Chrome',
        fillColor: 'rgba(50, 250, 50, 0.5)',
        strokeColor: 'rgba(50, 250, 50, 0.8)',
        highlightFill: 'rgba(50, 250, 50, 0.75)',
        highlightstroke: 'rgba(50, 250, 50, 1)',
        data: [10, 12, 16, 30]
      }]
    });
  };
  self.setDataSet1 = function() {
    self.machines([{
      value: 100,
      color: '#FF3333',
      highlight: '#FF7777',
      label: 'PC'
    }, {
      value: 75,
      color: '#3333FF',
      highlight: '#7777FF',
      label: 'Android'
    }]);
  };
  self.setDataSet2 = function() {
    self.machines([{
      value: 30,
      color: '#FF3333',
      highlight: '#FF7777',
      label: 'PC'
    }, {
      value: 85,
      color: '#3333FF',
      highlight: '#7777FF',
      label: 'Android'
    }, {
      value: 15,
      color: '#33FF33',
      highlight: '#77FF77',
      label: 'Linux'
    }]);
  };
  self.setPieData1 = function() {
    self.pieData([{
      value: 360,
      color: '#33FF33',
      highlight: '#77FF77',
      label: 'Cat'
    }, {
      value: 150,
      color: '#3333FF',
      highlight: '#7777FF',
      label: 'Dog'
    }]);
  };
  self.setPieData2 = function() {
    self.pieData([{
      value: 70,
      color: '#FF3333',
      highlight: '#FF7777',
      label: 'Category 1'
    }, {
      value: 15,
      color: '#3333FF',
      highlight: '#7777FF',
      label: 'Category 2'
    }, {
      value: 65,
      color: '#33FF33',
      highlight: '#77FF77',
      label: 'Category 3'
    }]);
  };
  self.setLineData1 = function() {
    self.lineData({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }]
    });
  };
  self.setLineData2 = function() {
    self.lineData({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,120,220,0.2)",
        strokeColor: "rgba(220,120,220,1)",
        pointColor: "rgba(220,120,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [75, 69, 90, 91, 66, 65, 50]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(251,87,105,0.2)",
        strokeColor: "rgba(251,87,105,1)",
        pointColor: "rgba(251,87,105,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [38, 78, 20, 69, 26, 47, 10]
      }, {
        label: "Thurd dataset",
        fillColor: "rgba(45,217,125,0.2)",
        strokeColor: "rgba(45,217,125,1)",
        pointColor: "rgba(45,217,125,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [18, 28, 50, 32, 66, 57, 86]
      }]
    });
  };
  self.setPieChartOptions1 = function() {
  	self.pieChartOptions({animation : true, showTooltips: true, percentageInnerCutout : 0, segmentShowStroke : true, segmentStrokeColor: "#222222"});
  };
  self.setPieChartOptions2 = function() {
  	self.pieChartOptions({animation : true, animationSteps: 1, showTooltips: false, percentageInnerCutout : 0, segmentShowStroke : false});
  };
  self.setDoughnutChartOptions1 = function() {
  	self.doughnutChartOptions({animation : true, showTooltips: true, percentageInnerCutout : 30, segmentShowStroke : true, segmentStrokeColor: "#222222"});
  };
  self.setDoughnutChartOptions2 = function() {
  	self.doughnutChartOptions({animation : true, animationSteps: 60, animateScale: true, animationEasing: "easeOutBounce", showScale: true, showTooltips: false, percentageInnerCutout : 60, segmentShowStroke : false});
  };
  if (!self.machines()) {
    self.setDataSet1();
  }
  if (!self.pieData()) {
    self.setPieData1();
  }
  if (!self.browserData()) {
    self.setBrowserData1();
  }
  if (!self.lineData()) {
    self.setLineData1();
  }
  if (!self.pieChartOptions()) {
  	self.setPieChartOptions1();
  }
  if (!self.doughnutChartOptions()) {
  	self.setDoughnutChartOptions1();
  }

  self.getJSON = function () {
    var packet={
				//"username": self.logInUsername(),
    		//	"password": self.logInPassword(),
			};
			
			logIn(packet).then(function (token) {
      console.log();
        /*
        c.repositories.token=token;
		   c.repositories["userApi"].userDetails(token).then(function(user){
			  
			   document.getElementById("bs-example-navbar-collapse-1").style.visibility = 'visible';
				context.app.setHome("/"+user.type);
				document.getElementById("home-button").click();
       });
      */
      });
  };

};

$(document).ready(function() {
  var data = {};
  var koModel = new KoModel(data);
  ko.applyBindings(koModel);
});