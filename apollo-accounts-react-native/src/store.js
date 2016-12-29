import {
  AsyncStorage
} from 'react-native';

const onChangeCallbacks = []

export const getLoginToken = async function () {
  try {
    const value = await AsyncStorage.getItem('Meteor.loginToken');
    return value || null
  } catch (error) {
    // Error retrieving data
  }
}

export const getUserId = async function () {
  try {
    const value = await AsyncStorage.getItem('Meteor.userId');
    return value || null
  } catch (error) {
    // Error retrieving data
  }
}

const tokenDidChange = function () {
  for (const callback of onChangeCallbacks) {
    callback({userId: getUserId(), token: getLoginToken()})
  }
}

export const onTokenChange = function (callback) {
  onChangeCallbacks.push(callback)
}

export const storeLoginToken = async function (userId, token, tokenExpires) {

  try {
    await AsyncStorage.setItem('Meteor.userId', userId);
    await AsyncStorage.setItem('Meteor.loginToken', token);
    await AsyncStorage.setItem('Meteor.loginTokenExpires', tokenExpires.toString());
    tokenDidChange()

  } catch (error) {
    // Error saving data
  }
}

export const resetStore = function () {
  storeLoginToken('', '', '')
}
