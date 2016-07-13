import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class LoginCtrl extends Controller {
  static $inject = ['$state', '$ionicLoading', '$ionicPopup', '$log', '$meteor'] 

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
    
    //const ionicLoading = this.$ionicLoading; 
    
    console.log(this);


    confirmPopup.then((res) => {
      if (!res) return;
      this.$ionicLoading.show({
      //this.$ionicLoading.show({
        template: 'Sending login information'
      });
      
      const context = this;

      this.$meteor.loginWithPassword(this.username, this.password)
        .then(function() {
          console.log('Login success ');
          //alert("logged in: " + $scope.credentials.username);
          //this.$ionicLoading.hide();
          context.redirectToHome();
      }, function(_error) {
          console.log('Login error - ', _error);
          context.redirectToErrorHandling(_error);
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

      const context = this;
 
      this.$meteor.createUser({
        username: this.username,
        password: this.password,
        profile: {
          name: this.username,
          createdOn: new Date()
        }
      }).then(function(_response) {
        console.log('doCreateAccountAction success');
        context.redirectToHome();
      }, function(_error) {
        console.log('Login error - ', _error);
        context.redirectToErrorHandling(_error);
      });
    
    }); 
  }


  redirectToHome() {
      this.$ionicLoading.hide();
      this.$state.go('profile');
  }

  redirectToErrorHandling(e) {
      this.$ionicLoading.hide();
      this.handleError(e);  
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
