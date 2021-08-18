// Sphere WebView Javascript API v1.2.0
var SphereAnalytics = {
    androidInterfaceName:"SphereJsInterface",
    iosInterfaceName:"sphere",

    logEvent:function(name, params) {
        try {
            let message = {
                command: "logEvent",
                name: name,
                parameters: params
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserId:function(userId) {
        try {
            let message = {
                command: "setUserId",
                userId: userId
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGrade:function(grade) {
        try {
            let message = {
                command: "setGrade",
                grade: grade
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGender:function(gender) {
        try {
            let message = {
                command: "setGender",
                gender: gender
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setBirthYear:function(year) {
        try {
            if (!this._isNumberValue(year)) {
                console.log("setBirthYear: Invalid parameter.");
                return;
            }
            let message = {
                command: "setBirthYear",
                year: year
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setPhoneNumber:function(number) {
        try {
            let message = {
                command: "setPhoneNumber",
                number: number
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setEmail:function(email) {
        try {
            let message = {
                command: "setEmail",
                email: email
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }

    },
    setRemainingPoint:function(point) {
        try {
            if (!this._isNumberValue(point)) {
                console.log("setRemainingPoint: Invalid parameter.");
                return;
            }
            let message = {
                command: "setRemainingPoint",
                point: point
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    removePoints:function() {
        try {
            let message = {
                command: "resetPoints"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserProperty:function(name, value) {
        try {
            let message = {
                command: 'setUserProperty',
                name: name,
                value: value
              };
              this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserPropertyLong:function(name, value) {
        try {
            if (SphereAnalytics._isWebView()) {
                let message = {
                    commandType: "analytics",
                    command: 'setUserPropertyLong',
                    name: name,
                    value: value
                };
                SphereAnalytics._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    removeUserProperty:function(name) {
        try {
            if (SphereAnalytics._isWebView()) {
                let message = {
                    commandType: "analytics",
                    command: 'removeUserProperty',
                    name: name
                };
                SphereAnalytics._postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    resetUserProperties:function() {
        try {
            let message = {
                command: "resetUserProperties"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    requestUpload:function() {
        try {
            let message = {
                command: "requestUpload"
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    enableLog:function(enable) {
        try {
            this.isLogEnabled = enable;
            let message = {
                command: "enableLog",
                enable: enable
            };
            this._postMessage(message);
        } catch(error) {
            this._consoleError(error);
        }
    },
    setLogLevel:function(level) {
        this.enableLog(!(level == "none"));
    },

    // private functions
    _postMessage:function(message) {
        if(this._isWebView){
            if (this.sphereAndroidInterface) {
                if (this.sphereAndroidInterface.postMessage) {
                    this.sphereAndroidInterface.postMessage(JSON.stringify(message));
                }
            } else if (this.sphereIOSInterface) {
                this.sphereIOSInterface.postMessage(message);
            }
        }else{
            SphereAnalytics._consoleError('required for (Android | iOS) SDK');
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
    sphereIOSInterface:null
};

var SpherePushMessage = {
    agreePushMessageForInformation:function(agree) {
        this._agreePushMessage("agreePushMessageForInformation", agree);
    },
    agreePushMessageForAdvertisement:function(agree) {
        this._agreePushMessage("agreePushMessageForAdvertisement", agree);
    },
    agreePushMessageAtNight:function(agree) {
        this._agreePushMessage("agreePushMessageAtNight", agree);
    },
    setFcmToken:function(token) {
        try {
            if (SphereAnalytics._isWebView()) {
                let message = {
                    commandType: "pushMessage",
                    command: "setFcmToken",
                    token: token
                };
                SphereAnalytics._postMessage(message);
            }
        } catch(error) {
            SphereAnalytics._consoleError(error);
        }
    },

    // private functions
    _agreePushMessage:function(command, agree) {
        try {
            if (SphereAnalytics._isWebView()) {
                let message = {
                    commandType: "pushMessage",
                    command: command,
                    agree: agree
                };
                SphereAnalytics._postMessage(message);
            }
        } catch(error) {
            SphereAnalytics._consoleError(error);
        }
    }
};

try {
    SphereAnalytics.sphereAndroidInterface = window[SphereAnalytics.androidInterfaceName];
    if (window.webkit && window.webkit.messageHandlers) {
        SphereAnalytics.sphereIOSInterface = window.webkit.messageHandlers[SphereAnalytics.iosInterfaceName];
    }
} catch(error) {
}