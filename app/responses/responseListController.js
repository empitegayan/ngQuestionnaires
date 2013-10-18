'use strict';

angular.module('ngQuestionnaires.responseListController', [])
    .controller('responseListController', [
        '$scope',
        '$log',
        '_',
        'responseFactory',
        function ($scope, $log, _, responseFactory) {
            responseFactory.query().then(function (responses) {
                $scope.responses = responses;
            }, $log.error);

            $scope.isMatch = function (response) {
                return $scope.search.query ? (
                    response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
                        response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
                        _.any(response.answers, function (answer) {
                            return answer.question.indexOf($scope.search.query.toLowerCase()) > -1 ||
                                answer.choice.indexOf($scope.search.query.toLowerCase()) > -1;
                        })
                    ) : true;
            };
        }]);