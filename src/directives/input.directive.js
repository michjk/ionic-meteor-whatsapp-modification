import { Directive } from 'angular-ecmascript/module-helpers';
 
export default class InputDirective extends Directive {
  static $inject = ['$timeout']
  static $name = 'input'
 
  restrict = 'E'
 
  scope = {
    'returnClose': '=',
    'onReturn': '&',
    'onFocus': '&',
    'onBlur': '&'
  }
 
  link(scope, element) {
    element.bind('focus', (e) => {
      if (!scope.onFocus) return;
 
      this.$timeout(() => {
        scope.onFocus();
      });
    });
 
    element.bind('blur', (e) => {
      if (!scope.onBlur) return;
 
      this.$timeout(() => {
        scope.onBlur();
      });
    });
 
    element.bind('keydown', (e) => {
      if (e.which != 13) return;
 
      if (scope.returnClose) {
        element[0].blur();
      }
 
      if (scope.onReturn) {
        this.$timeout(() => {
          scope.onReturn();
        });
      }
    });
  }
}