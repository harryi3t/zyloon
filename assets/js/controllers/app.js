(function() {
    var app = angular.module('zyloonApp', []);
    app.controller('zyloonAppCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.form = {};
        $scope.form.type = 'cash';
        var graphData = {};
        graphData.labels = [];
        graphData.series = [[]];

        $http.get('http://localhost:1337/api/zyloon/expense/').success(function(data) {
            console.log('data',data);
            data.result.forEach(
              function (obj) {
                var date = obj.date.split('T')[0];
                graphData.labels.push(date);
                graphData.series[0].push(obj.amount);
              }
            );
            // console.log('graphData',graphData)
            setUpChart(graphData);
        }).error(function(error) {
            console.log("Error : ", error);
        });

        $scope.submitform = function() {
            console.log("I am in form", $scope.form);
            $http.post('http://localhost:1337/api/zyloon/expense/', $scope.form)
                .success(function(data) {
                    // console.log("This is mydata :", data);
                    var date = data.result.date.split('T')[0];
                    graphData.labels.push(date);
                    graphData.series[0].push(data.result.amount);
                    setUpChart(graphData);
                })
                .error(function(error) {
                    console.log("Error:", error);
                });
        };

        function setUpChart(data) {
          var defaultOptions = {
            fullWidth: true,
            height: '300px'
          };
          // var data = {
          //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          //   series: [
          //     [5, 2, 4, 2, 0]
          //   ]
          // };
          new Chartist.Line('.ct-chart', data, defaultOptions);
        }

    }]);
    
})();
