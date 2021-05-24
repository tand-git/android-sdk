// Sphere WebView Javascript API v1.2.0
var SphereAnalytics = {
    androidInterfaceName:"SphereJsInterface",
    iosInterfaceName:"sphere",

    logEvent:function(name, params) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.logEvent(name, JSON.stringify(params));
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "logEvent",
                    name: name,
                    parameters: params
                };
                this.sphereIOSInterface.postMessage(message);
            } else {
                this._consoleLog("No native APIs found.");
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserId:function(userId) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setUserId(userId);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setUserId",
                    userId: userId
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGrade:function(grade) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setGrade(grade);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setGrade",
                    grade: grade
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setGender:function(gender) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setGender(gender);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setGender",
                    gender: gender
                };
                this.sphereIOSInterface.postMessage(message);
            }
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
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setBirthYear(year);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setBirthYear",
                    year: year
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setPhoneNumber:function(number) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setPhoneNumber(number);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setPhoneNumber",
                    number: number
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setEmail:function(email) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setEmail(email);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setEmail",
                    email: email
                };
                this.sphereIOSInterface.postMessage(message);
            }
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
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setRemainingPoint(point);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "setRemainingPoint",
                    point: point
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    resetPoints:function() {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.resetPoints();
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "resetPoints"
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserProperty:function(name, value) {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.setUserProperty(name, value);
            } else if (this.sphereIOSInterface) {
                var message = {
                  command: 'setUserProperty',
                  name: name,
                  value: value
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    setUserPropertyLong:function(name, value) {
        try {
            if (SphereAnalytics._isWebView()) {
                var message = {
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
                var message = {
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
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.resetUserProperties();
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "resetUserProperties"
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    requestUpload:function() {
        try {
            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.requestUpload();
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "requestUpload"
                };
                this.sphereIOSInterface.postMessage(message);
            }
        } catch(error) {
            this._consoleError(error);
        }
    },
    enableLog:function(enable) {
        try {
            this.isLogEnabled = enable;

            if (this.sphereAndroidInterface) {
                this.sphereAndroidInterface.enableLog(enable);
            } else if (this.sphereIOSInterface) {
                var message = {
                    command: "enableLog",
                    enable: enable
                };
                this.sphereIOSInterface.postMessage(message);
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
            if (this.sphereAndroidInterface.postMessage) {
                this.sphereAndroidInterface.postMessage(JSON.stringify(message));
            }
        } else if (this.sphereIOSInterface) {
            this.sphereIOSInterface.postMessage(message);
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
                var message = {
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
                var message = {
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