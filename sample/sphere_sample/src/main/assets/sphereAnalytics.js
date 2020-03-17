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
                command: "logEvent",
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
     * Sets the user ID to identify the user
     * @param userId The user ID to identify the user, which must be non-empty and no more than 256 characters long.
     *               Setting the ID to null removes the user ID.
     */
    setUserId:function(userId) {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setUserId(userId);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setUserId",
                userId: userId
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setGrade:function(grade) {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setGrade(grade);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setGrade",
                grade: grade
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setGender:function(gender) {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setGender(gender);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setGender",
                gender: gender
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setBirthYear:function(year) {
        if (!this._isNumberValue(year)) {
            console.log("setBirthYear: Invalid parameter.");
            return;
        }
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setBirthYear(year);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setBirthYear",
                year: year
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setPhoneNumber:function(number) {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setPhoneNumber(number);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setPhoneNumber",
                number: number
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setEmail:function(email) {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setEmail(email);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setEmail",
                email: email
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setRemainingPoint:function(point) {
        if (!this._isNumberValue(point)) {
            console.log("setRemainingPoint: Invalid parameter.");
            return;
        }
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setRemainingPoint(point);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setRemainingPoint",
                point: point
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setTotalEarnedPoint:function(point) {
        if (!this._isNumberValue(point)) {
            console.log("setTotalEarnedPoint: Invalid parameter.");
            return;
        }
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setTotalEarnedPoint(point);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setTotalEarnedPoint",
                point: point
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    setTotalUsedPoint:function(point) {
        if (!this._isNumberValue(point)) {
            console.log("setTotalUsedPoint: Invalid parameter.");
            return;
        }
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.setTotalUsedPoint(point);
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "setTotalUsedPoint",
                point: point
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    resetPoints:function() {
        if (this._isSphereAndroid()) {
            // Call Android interface
            window.SphereJsInterface.resetPoints();
        } else if (this._isSphereIOS()) {
            // Call iOS interface
            var message = {
                command: "resetPoints"
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    /**
     * Sets a user property to a given value.
     * Once set, user property values persist throughout the app lifecycle and across sessions.
     * @param name The name of the user property to set.
     *             Should contain 1 to 40 alphanumeric characters or underscores and must start with an alphabetic character.
     * @param value The value of the user property.
     *              Values can be up to 100 characters long. Setting the value to null removes the user property.
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
                command: "resetUserProperties"
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
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
                command: "requestUpload"
            };
            window.webkit.messageHandlers.sphere.postMessage(message);
        }
    },

    // private functions
    _isNumberValue:function(value) {
        return (typeof value === "number");
    },

    _isSphereAndroid:function() {
        return window.SphereJsInterface;
    },

    _isSphereIOS:function() {
        return window.webkit
               && window.webkit.messageHandlers
               && window.webkit.messageHandlers.sphere;
    }

};
