(() => {
  let app = angular.module('uw-schedules', []);

  app.controller('MainController', ['$scope', 'schedule', '$sce', ($scope, schedule, $sce) => {
    $scope.data = {
      title: 'Schedule',
      term: 1165,
      colors: 'orange,#4D4DFF,red,yellow,#339933,pink,cyan',
      course_numbers: ['3565', '3135,3136', '3231,3232', '4377', '4856', '4368']
    };
    $scope.searchParams = {};
    $scope.error = '';
    $scope.scheduleContent = 'Schedule will appear <em>here</em>';
    $scope.generating = false;

    $scope.addCourse = () => {
      $scope.data.course_numbers.push('');
    };

    $scope.removeCourse = (index) => {
      $scope.data.course_numbers.splice(index, 1);
    };

    $scope.generateSchedule = () => {
      $scope.generating = true;
      $scope.error = '';
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

    $scope.search = () => {
      let subject = $scope.searchParams.subject || '';
      subject = subject.toUpperCase();
      $scope.searchParams.subject = subject;
      let cournum = $scope.searchParams.cournum;
      if(subject && cournum && subject.trim() && cournum.trim()) {
        schedule.search($scope.data.term, subject, cournum).then((result) => {
          $scope.searchResults = $sce.trustAsHtml(result.data);
          $('#searchModal').modal();
        }, (err) => {
          $scope.error = err.data;
        });
      }
    };
  }]);

  app.factory('schedule', ['$http', ($http) => {
    let BASE_URL = 'http://107.20.22.194:4567';
    return {
      generate: (data) => {
        return $http.post(`${BASE_URL}/`, data);
      },
      search: (term, subject, cournum) => {
        return $http.get(`${BASE_URL}/search?term=${term}&subject=${subject}&cournum=${cournum}`);
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
