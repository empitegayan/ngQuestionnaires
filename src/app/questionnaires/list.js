angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'questionnaires',
    'pagination',
    function ($scope, $filter, $modal, questionnaires, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.questionnaires = questionnaires;

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestionnaires = $filter('filter')($scope.questionnaires, value);
        } else {
          $scope.filteredQuestionnaires = questionnaires;
        }
        $scope.totalItems = $scope.filteredQuestionnaires.length;
      });

      $scope.isMatch = function (questionnaire) {
        return $scope.search.query ? (
          questionnaire.title.indexOf($scope.search.query) > -1 ||
            questionnaire.description.indexOf($scope.search.query) > -1
          ) : true;
      };

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'questionnaireDeleteCtrl',
          templateUrl: 'questionnaires/delete.tpl.html',
          resolve: {
            questionnaire: function () {
              return questionnaires.getByName(id);
            }
          }
        }).result
          .then(function (questionnaire) {
            questionnaires.remove(questionnaire, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                $scope.addSuccessAlert(questionnaire.title + ' deleted successfully');
              }
            });
          });
      };
    }]);