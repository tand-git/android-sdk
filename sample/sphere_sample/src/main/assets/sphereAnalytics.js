var SphereAnalytics = {

/**
 * Logs an custom event. The event can have up to 25 parameters.
 * Events with the same name must have the same parameters.
 * @param name The name of the event
 * @param params The event parameters of JSON type
 */
logEvent:function(name, params) {
  if (this._isSphereAndroid()) {
    // Call Android interface
    window.SphereJsInterface.logEvent(name, JSON.stringify(params));
  } else if (this._isSphereIOS()) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
},

/**
 * Sets the user ID
 * @param userId The user ID to ascribe to the user of this app on this device, which must be non-empty and no more than 256 characters long.
 *               Setting the ID to null removes the user ID.
 */
setUserId:function(userId) {
  if (this._isSphereAndroid()) {
    // Call Android interface
    window.SphereJsInterface.setUserId(userId);
  } else if (this._isSphereIOS()) {
    // Call iOS interface
    var message = {
      command: 'setUserId',
      userId: userId
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
},

/**
 * Sets a user property to a given value.
 * Once set, user property values persist throughout the app lifecycle and across sessions.
 * @param name The name of the user property to set.
 *             Should contain 1 to 24 alphanumeric characters or underscores and must start with an alphabetic character.
 * @param value The value of the user property.
 *              Values can be up to 36 characters long. Setting the value to null removes the user property.
 */
setUserProperty:function(name, value) {
  if (this._isSphereAndroid()) {
    // Call Android interface
    window.SphereJsInterface.setUserProperty(name, value);
  } else if (this._isSphereIOS()) {
    // Call iOS interface
    var message = {
      command: 'setUserProperty',
      name: name,
      value: value
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
},

/**
 * Initialize all user properties.
 */
resetUserProperties:function() {
  if (this._isSphereAndroid()) {
    // Call Android interface
    window.SphereJsInterface.resetUserProperties();
  } else if (this._isSphereIOS()) {
    // Call iOS interface
    var message = {
      command: 'resetUserProperties'
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
},

/**
 * Request to upload events now.
 */
requestUpload:function() {
  if (this._isSphereAndroid()) {
    // Call Android interface
    window.SphereJsInterface.requestUpload();
  } else if (this._isSphereIOS()) {
    // Call iOS interface
    var message = {
      command: 'requestUpload'
    };
    window.webkit.messageHandlers.sphere.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
},

// private functions
_isSphereAndroid:function() {
  return window.SphereJsInterface;
},

_isSphereIOS:function() {
  return window.webkit
         && window.webkit.messageHandlers
         && window.webkit.messageHandlers.sphere;

}

};
