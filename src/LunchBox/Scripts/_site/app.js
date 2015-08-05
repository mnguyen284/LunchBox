(function () {

    var app = angular.module("lunchBoxApp", ["lunchBoxControllers", "lunchBoxServices"]);

})();

(function () {

    var controllers = angular.module("lunchBoxControllers", []);

    controllers.controller("CourseController", ["$scope", "CourseFactory", "CopyCourseService",
        function ($scope, CourseFactory, CopyCourseService) {
            $scope.newCourse = {};
            $scope.courses = CourseFactory.query();

            $scope.addCourse = function () {
                $scope.newCourse.Price *= 1000;
                CourseFactory.save($scope.newCourse, function () {
                    $scope.courses = CourseFactory.query();
                });
                $scope.newCourse = {};
                $("[ng-model='newCourse.Name']").focus();
            };

            $scope.removeCourse = function (course) {
                course.$delete(null, function () {
                    updateCourses();
                });
            };

            $scope.canCopyCourseToToday = function (course) {
                return CopyCourseService.canCopyCourse(course);
            };

            $scope.copyCourseToToday = function (course) {
                CopyCourseService.copyCourse(course);
            };

            function updateCourses() {
                CourseFactory.query(null, function (data) {
                    $scope.courses = data;
                });
            }
        }
    ]);

    controllers.controller("OrderController", ["$scope", "CourseOrderFactory", "CopyCourseService",
        function ($scope, CourseOrderFactory, CopyCourseService) {
            $scope.newCourseOrder = {
                Diners: []
            };
            $scope.courseOrders = CourseOrderFactory.query();
            $scope.userName = getCookie("userName");

            CopyCourseService.init($scope);

            $scope.addCourseOrder = function () {
                $scope.newCourseOrder.Price *= 1000;
                CourseOrderFactory.save($scope.newCourseOrder, function () {
                    $scope.courseOrders = CourseOrderFactory.query();
                });
                $scope.newCourseOrder = {
                    Diners: []
                };
                $("[ng-model='newCourseOrder.Name']").focus();
            };

            $scope.canAddFromCourse = function (course) {
                var found = false;
                $.each($scope.courseOrders, function (index, item) {
                    if (item.Name === course.Name) {
                        found = true;
                        return false;
                    }
                });
                return !found;
            };

            $scope.addFromCourse = function (course) {
                var courseOrder = {
                    Name: course.Name,
                    Price: course.Price,
                    Diners: []
                };
                CourseOrderFactory.save(courseOrder, function () {
                    updateCourseOrders();
                });
            };

            $scope.removeCourseOrder = function (courseOrder) {
                courseOrder.$delete(null, function () {
                    updateCourseOrders();
                });
            };

            $scope.canAddDiner = function (courseOrder) {
                return $scope.userName && $scope.userName.trim().length > 0 && courseOrder.Diners.indexOf($scope.userName) < 0;
            };

            $scope.canRemoveDiner = function (courseOrder) {
                return $scope.userName && $scope.userName.trim().length > 0 && courseOrder.Diners.indexOf($scope.userName) >= 0;
            };

            $scope.addDiner = function (courseOrder) {
                courseOrder.Diners.push($scope.userName);
                courseOrder.$save(null, function () {
                    updateCourseOrders();
                });
            };

            $scope.removeDiner = function (courseOrder) {
                courseOrder.Diners.splice(courseOrder.Diners.indexOf($scope.userName), 1);
                courseOrder.$save(null, function () {
                    updateCourseOrders();
                });
            };

            $scope.saveUserName = function () {
                setCookie("userName", $scope.userName, 365);
            };

            function updateCourseOrders() {
                CourseOrderFactory.query(null, function (data) {
                    $scope.courseOrders = data;
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

    services.factory("CourseOrderFactory", ["Resource",
      function ($resource) {
          return $resource("api/CourseOrders/:courseOrderId", { courseOrderId: "@Id" });
      }
    ]);

    services.service("CopyCourseService", function () {
        return {
            init: function (orderController) {
                this.orderController = orderController;
            },

            canCopyCourse: function (course) {
                return this.orderController.canAddFromCourse(course);
            },

            copyCourse: function (course) {
                this.orderController.addFromCourse(course);
            }
        };
    });

})();