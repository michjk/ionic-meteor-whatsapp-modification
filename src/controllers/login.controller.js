/*import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class LoginCtrl extends Controller {
  static $inject = ['$state', '$ionicLoading', '$ionicPopup', '$log', '$meteor']
  
  constructor() {
    super();
    console.log("login created");
  } 


  login() {
    if (_.isEmpty(this.username) || _.isEmpty(this.password)) return;
 
    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Login Confirmation',
      template: '<div>Is your login information correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });
 
    confirmPopup.then((res) => {
      if (!res) return;
 
      this.$ionicLoading.show({
        template: 'Sending login information'
      });
 
      this.$meteor.loginWithPassword(this.username, this.password)
        .then(function() {
          console.log('Login success ');
          //alert("logged in: " + $scope.credentials.username);
          this.$ionicLoading.hide();
          this.$state.go('tab.chats');
      }, function(_error) {
          console.log('Login error - ', _error);
          this.$ionicLoading.hide();
          this.handleError(_error);
      });
    
    });
  }

  createAccount() {
    if (_.isEmpty(this.username) || _.isEmpty(this.password)) return;
 
    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Login Confirmation',
      template: '<div>Is your login information correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });
 
    confirmPopup.then((res) => {
      if (!res) return;
 
      this.$ionicLoading.show({
        template: 'Sending login information'
      });
 
      this.$meteor.createUser({
        username: this.username,
        email: this.username,
        password: this.password,
        profile: {
          createdOn: new Date()
        }
      }).then(function(_response) {
        this.$ionicLoading.hide();
        console.log('doCreateAccountAction success');
        this.$state.go('tab.chats');
      }, function(_error) {
        this.$ionicLoading.hide();
        console.log('Login error - ', _error);
        this.handleError(_error);
      });
    
    }); 
  }
 
  handleError(err) {
    this.$log.error('Login error ', err);
 
    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
*/