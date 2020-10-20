// Sphere Analytics Javascript API Version 1.0.0 for HCS

var SphereAnalytics = {
    androidInterfaceName:"sphereJsHandler",
    iosInterfaceName:"sphereJsHandler",

    logEvent:function(name, params) {
        try {
            if (this._isWebView()) {
                if (name == null) return;
                var message = {
                    command: "logEvent",
                    name: name,
                    parameters: params
                };
                this._postMessage(message);
            } else {
                this._consoleLog("[SPHERE] logEvent: Invalid WebView interface.");
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserId:function(userId) {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "setUserId",
                    userId: userId
                };
                this._postMessage(message);
            } else {
                this._consoleLog("[SPHERE] setUserId: Invalid WebView interface.");
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGrade:function(grade) {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "setGrade",
                    grade: grade
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGender:function(gender) {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "setGender",
                    gender: gender
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setBirthYear:function(year) {
        try {
            if (this._isWebView()) {
                if (!this._isNumberValue(year)) {
                    this._consoleError("[SPHERE] setBirthYear: Invalid parameter.");
                    return;
                }
                var message = {
                    command: "setBirthYear",
                    year: year
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setPhoneNumber:function(number) {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "setPhoneNumber",
                    number: number
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setEmail:function(email) {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "setEmail",
                    email: email
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setRemainingPoint:function(point) {
        try {
            if (this._isWebView()) {
                if (!this._isNumberValue(point)) {
                    this._consoleError("[SPHERE] setRemainingPoint: Invalid parameter.");
                    return;
                }
                var message = {
                    command: "setRemainingPoint",
                    point: point
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    resetPoints:function() {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "resetPoints"
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserProperty:function(name, value) {
        try {
            if (this._isWebView()) {
                if (name == null) return;
                var message = {
                  command: 'setUserProperty',
                  name: name,
                  value: value
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    resetUserProperties:function() {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "resetUserProperties"
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    requestUpload:function() {
        try {
            if (this._isWebView()) {
                var message = {
                    command: "requestUpload"
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    enableLog:function(enable) {
        try {
            this.isLogEnabled = enable;
            if (this._isWebView()) {
                var message = {
                    command: "enableLog",
                    enable: enable
                };
                this._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setLogLevel:function(level) {
        this.enableLog(!(level == "none"));
    },

    // private functions
    _postMessage:function(message) {
        if (this.sphereAndroidInterface) {
            this.sphereAndroidInterface.postMessage(JSON.stringify(this._sphereHandlerMessage(message)));
        } else if (this.sphereIOSInterface) {
            this.sphereIOSInterface.postMessage(this._sphereHandlerMessage(message));
        }
    },
    _sphereHandlerMessage:function(message) {
        return {
            name: "sphereJsHandler",
            sphereJsHandler: message
        }
    },
    _isWebView:function() {
        return this.sphereAndroidInterface != null || this.sphereIOSInterface != null;
    },
    _isNumberValue:function(value) {
        return (typeof value === "number");
    },
    isLogEnabled: false,
    _consoleLog:function(message) {
        if (this.isLogEnabled) {
            console.log(message);
        }
    },
    _consoleError:function(message) {
        if (this.isLogEnabled) {
            console.error(message);
        }
    },
    sphereAndroidInterface:null,
    sphereIOSInterface:null,
};
try {
    SphereAnalytics.sphereAndroidInterface = window[SphereAnalytics.androidInterfaceName];
    if (window.webkit && window.webkit.messageHandlers) {
        SphereAnalytics.sphereIOSInterface = window.webkit.messageHandlers[SphereAnalytics.iosInterfaceName];
    }
} catch(error) {
}
