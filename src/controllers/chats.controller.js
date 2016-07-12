import { Chats } from 'api/collections';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);
    console.log("hohoho");
    this.helpers({
      data() {
        return Chats.find();
      }
    });
  }

  remove(chat) {
    this.data.remove(chat);
  }
}