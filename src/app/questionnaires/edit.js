angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireNewCtrl', [
    '$scope',
    '$cacheFactory',
    '$state',
    'questionnaires',
    'questions',
    function ($scope, $cacheFactory, $state, questionnaires, questions) {
      var questionnaire = $cacheFactory.get('data').get('questionnaire');

      function navigate() {
        $cacheFactory.get('data').remove('questionnaire');
        $state.go('questionnaireList');
      }

      $scope.action = $state.current.data.action;

      $scope.questionnaire = {userId: $scope.user.id};

      if (questionnaire !== undefined) {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      $scope.questions = questions;

      $scope.addQuestion = function () {
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $state.go('questionNew', {referrer: $state.current.name});
      };

      $scope.save = function () {
        questionnaires.add($scope.questionnaire, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.questionnaire.title + ' saved successfully');
            navigate();
          }
        });
      };

      $scope.cancel = navigate;

    }])

  .controller('questionnaireEditCtrl', [
    '$scope',
    '$cacheFactory',
    '$state',
    '$stateParams',
    'questionnaires',
    'questions',
    function ($scope, $cacheFactory, $state, $stateParams, questionnaires, questions) {

      var questionnaire = $cacheFactory.get('data').get('questionnaire'),
        navigate = function () {
          $cacheFactory.get('data').remove('questionnaire');
          $state.go('questionnaireShow');
        };

      $scope.action = $state.current.data.action;

      if (questionnaire === undefined) {
        $scope.questionnaire = questionnaires.getByName($stateParams.id);
      } else {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      $scope.questions = questions;

      $scope.addQuestion = function () {
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $state.go('questionNew', {referrer: $state.current.name, id: $stateParams.id});
      };

      $scope.update = function () {
        questionnaires.update($scope.questionnaire, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            $scope.addSuccessAlert($scope.questionnaire.title + ' updated successfully');
            navigate();
          }
        });
      };

      $scope.cancel = navigate;

    }]);