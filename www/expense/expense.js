(function () {
  var app = angular.module('zyloonApp', []);
  app.controller('zyloonAppCtrl', ['$scope', '$http',
    function ($scope, $http) {

      $scope.form = {};
      $scope.form.type = 'cash';
      var graphData = {};
      graphData.labels = [];
      graphData.series = [
        []
      ];

      $http.get('/api/expense/').success(function (data) {
        console.log('data', data);
        data.forEach(
          function (obj) {
            if (!obj.date)
              return;
            var date = obj.date.split('T')[0];
            graphData.labels.push(date);
            graphData.series[0].push(obj.amount);
          }
        );
        // console.log('graphData',graphData)
        setUpChart(graphData);
      }).error(function (error) {
        console.log("Error : ", error);
      });

      $scope.submitform = function () {
        console.log("I am in form", $scope.form);
        $http.post('/api/expense/', $scope.form)
          .success(function (data) {
            var date = data.date.split('T')[0];
            graphData.labels.push(date);
            graphData.series[0].push(data.amount);
            setUpChart(graphData);
          })
          .error(function (error) {
            console.log("Error:", error);
          });
      };

      function setUpChart(data) {
        var defaultOptions = {
          fullWidth: true,
          height: '300px'
        };
        new Chartist.Line('.ct-chart', data, defaultOptions);
      }

    }
  ]);

})();