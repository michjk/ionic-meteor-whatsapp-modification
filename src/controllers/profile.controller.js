import { _ } from 'meteor/underscore';
import { Controller } from 'angular-ecmascript/module-helpers';
 
export default class ProfileCtrl extends Controller {
  static $inject = ['$state', '$ionicPopup', '$log', '$cordovaCamera', '$ionicLoading']
 
  constructor() {
    super(...arguments);
 
    const profile = this.currentUser && this.currentUser.profile;
    this.name = profile ? profile.name : '';
  }
 
  updateName() {
    if (_.isEmpty(this.name)) return;
 
    this.callMethod('updateName', this.name, (err) => {
      if (err) return this.handleError(err);
      this.$state.go('tab.chats');
    });
  }

  updatePicture () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 60,
      targetHeight: 60,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }
    
    console.log("update first");

    const context = this;

    console.log("update second");
    
    console.log(context);     

    this.$cordovaCamera.getPicture(options).then(function(data) {
      data = "data:image/jpeg;base64," + data;

      context.$ionicLoading.show({
        template: 'Updating picture...'
      });

      console.log("after load update");

      context.callMethod('updatePicture', data, (err) => {
        console.log("update finish");
        context.$ionicLoading.hide();
        context.handleError(err);
      });
    },
    function(err) {
      // error
      this.handleError(err);
    });

    /*
    MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err, data) => {
      if (err) return this.handleError(err);
 
      this.$ionicLoading.show({
        template: 'Updating picture...'
      });
 
      this.callMethod('updatePicture', data, (err) => {
        this.$ionicLoading.hide();
        this.handleError(err);
      });
    });
    */
  }
 
  handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profile save error ', err);
    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}