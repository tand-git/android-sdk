# Android Sphere In-App Message 연동

* [SDK 기본 연동](#SDK-기본-연동)
  * [인앱 메시지 활성화](#인앱-메시지-활성화)

## SDK 기본 연동

> 인앱 메시지 기능을 사용하기 위해서는 SDK 연동가이드의 기본 연동이 필수적으로 완료되어야 메시지 수신이 가능합니다.

* [Android SDK 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동)

### 인앱 메시지 활성화

> 기본 연동 후 발급받은 앱키로 SDK 초기화가 되었다면 다음 샘플 코드와 같이 인앱 메시지 기능을 활성화 해야 합니다.

`<MyApplication.java>`

```java
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // Sphere In-App Message 활성화
        SphereInAppMessage.start();
    }
}
```
