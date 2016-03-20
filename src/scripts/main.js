(() => {
  let app = angular.module('uw-schedules', []);

  app.controller('MainController', ['$scope', 'schedule', ($scope, schedule) => {
    $scope.data = {
      title: 'Schedule',
      term: 1165,
      colors: 'orange,#4D4DFF,red,yellow,#339933,pink,cyan',
      course_numbers: ['3565', '3135,3136', '3231,3232', '4377', '4856', '4368']
    };

    $scope.error = '';
    $scope.scheduleContent = 'Schedule will appear <em>here</em>';
    $scope.generating = false;
    $scope.showForm = true;

    $scope.addCourse = () => {
      $scope.data.course_numbers.push('');
    };

    $scope.removeCourse = (index) => {
      $scope.data.course_numbers.splice(index, 1);
    };

    $scope.toggleForm = () => {
      $scope.showForm = !$scope.showForm;
    };

    $scope.generateSchedule = () => {
      $scope.generating = true;
      let dataCopy = angular.copy($scope.data);
      dataCopy.colors = dataCopy.colors.split(',');
      dataCopy.course_numbers.forEach((codeList, i, courses) => {
        courses[i] = codeList.split(',');
      });
      schedule.generate(dataCopy).then((result) => {
        $scope.scheduleContent = result.data;
      }, (err) => {
        $scope.error = 'Could not generate schedule: ' + err.data;
        $scope.scheduleContent = 'Schedule will appear <em>here</em>';
      }).finally(() => {
        $scope.generating = false;
      });
    };
  }]);

  app.factory('schedule', ['$http', ($http) => {
    return {
      generate: (data) => {
        return $http.post('http://localhost:4567', data);
      }
    };
  }]);

  app.filter('toTrusted', ['$sce', ($sce) => {
    return (text) => $sce.trustAsHtml(text);
  }]);

  angular.element(document).on('ready', () => {
    angular.bootstrap(document, ['uw-schedules']);
  });
})();
