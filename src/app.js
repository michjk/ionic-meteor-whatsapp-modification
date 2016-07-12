import Angular from 'angular';
import Ionic from 'ionic';
import Keyboard from 'cordova/keyboard';
import StatusBar from 'cordova/status-bar';
import Loader from 'angular-ecmascript/module-loader';

import ChatCtrl from './controllers/chat.controller';
import ChatsCtrl from './controllers/chats.controller';
//import LoginCtrl from './controllers/login.controller';
import InputDirective from './directives/input.directive';
import CalendarFilter from './filters/calendar.filter';
//import Routes from './routes';
import RoutesConfig from './routes';
const App = 'whatsapp';

Angular.module(App, [
  'angular-meteor',
//  'angular-meteor.auth',
  'angularMoment',
  'ionic'
]);

console.log("app initialization");

new Loader(App)
  .load(ChatCtrl)
  .load(ChatsCtrl)
  //.load(LoginCtrl)
  .load(InputDirective)
  .load(CalendarFilter)
  //.load(Routes);
  .load(RoutesConfig)

Ionic.Platform.ready(() => {
  if (Keyboard) {
    Keyboard.hideKeyboardAccessoryBar(true);
    Keyboard.disableScroll(true);
  }

  if (StatusBar) {
    StatusBar.styleLightContent();
  }

  Angular.bootstrap(document, [App]);
});