import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';

class RoutesConfig extends Config {
  static $inject = ['$stateProvider', '$urlRouterProvider']

  constructor() {
    super(...arguments);
 
    this.isAuthorized = ['$auth', this::this.isAuthorized];
  }

  configure() {
    this.$stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl as logger'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl as profile',
        resolve: {
          user: this.isAuthorized
        }
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        resolve: {
          user: this.isAuthorized,
          chats() {
            return Meteor.subscribe('chats');
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl as settings',
          }
        }
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chats.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat.html',
            controller: 'ChatCtrl as chat'
          }
        }
      });

    this.$urlRouterProvider.otherwise('tab/chats');
  }
  
  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

class RoutesRunner extends Runner {
  static $inject = ['$rootScope', '$state']
 
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);
 
      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}
 
export default [RoutesConfig, RoutesRunner];


