export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home flex layout="column" />'
    })
    .state('pendu', {
      url: '/pendu',
      template: '<pendu flex layout="column" />'
    });
}
