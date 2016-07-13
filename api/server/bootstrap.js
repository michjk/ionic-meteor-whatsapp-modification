import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
 
Meteor.startup(function() {
  if (Meteor.users.find().count() !== 0) return;

  Accounts.createUser({
    username: "user1",
    password: "user1",
    profile: {
      name: "user1"
    }
  });
 
});