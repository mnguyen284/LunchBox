(function () {

    var app = angular.module("lunchBoxApp", ["lunchBoxControllers", "lunchBoxServices"]);

})();

(function () {

    var controllers = angular.module("lunchBoxControllers", []);

    controllers.controller("OrderController", ["$scope", "CourseFactory",
        function ($scope, CourseFactory) {
            $scope.newCourse = {
                Diners: []
            };
            $scope.courses = CourseFactory.query();
            $scope.userName = getCookie("userName");

            $scope.addCourse = function () {
                //$scope.courses.push($scope.newCourse);
                $scope.newCourse.Price *= 1000;
                CourseFactory.save($scope.newCourse, function () {
                    $scope.courses = CourseFactory.query();
                });
                $scope.newCourse = {
                    Diners: []
                };
                $("[ng-model='newCourse.Name']").focus();
            };

            $scope.removeCourse = function (course) {
                //$scope.courses.splice($scope.courses.indexOf(course), 1);
                course.$delete(null, function () {
                    updateCourses();
                });
            };

            $scope.canAddDiner = function (course) {
                return $scope.userName && $scope.userName.trim().length > 0 && course.Diners.indexOf($scope.userName) < 0;
            };

            $scope.canRemoveDiner = function (course) {
                return $scope.userName && $scope.userName.trim().length > 0 && course.Diners.indexOf($scope.userName) >= 0;
            };

            $scope.addDiner = function (course) {
                course.Diners.push($scope.userName);
                course.$save(null, function () {
                    updateCourses();
                });
            };

            $scope.removeDiner = function (course) {
                course.Diners.splice(course.Diners.indexOf($scope.userName), 1);
                course.$save(null, function () {
                    updateCourses();
                });
            };

            $scope.saveUserName = function () {
                setCookie("userName", $scope.userName, 365);
            };

            function updateCourses() {
                CourseFactory.query(null, function (data) {
                    $scope.courses = data;
                });
            }
        }
    ]);

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

})();

(function () {

    var services = angular.module("lunchBoxServices", ["ngResource"]);

    services.factory("Resource", ["$resource",
      function ($resource) {
          return function (url, params, methods) {
              var defaults = {
                  update: { method: 'put', isArray: false },
                  create: { method: 'post' }
              };

              methods = angular.extend(defaults, methods);

              var resource = $resource(url, params, methods);

              resource.prototype.$save = function (parameters, success, error) {
                  if (!this.id && !this.Id) {
                      return this.$create(parameters, success, error);
                  }
                  else {
                      return this.$update(parameters, success, error);
                  }
              };

              return resource;
          };
      }
    ]);

    services.factory("CourseFactory", ["Resource",
      function ($resource) {
          return $resource("api/Courses/:courseId", { courseId: "@Id" });
      }
    ]);

})();