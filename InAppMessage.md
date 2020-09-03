# Android Sphere In-App Message 연동

* [SDK 기본 연동](#SDK-기본-연동)
  * [인앱 메시지 활성화](#인앱-메시지-활성화)
* [추가 설정](#추가-설정)
  * [Message Display Listener 설정](#Message-Display-Listener-설정)
  * [앱에서 직접 메세지 링크 실행](#앱에서-직접-메세지-링크-실행)

## SDK 기본 연동

> 인앱 메시지 기능을 사용하기 위해서는 SDK 연동가이드의 기본 연동이 필수적으로 완료되어야 메시지 수신이 가능합니다.

* [Android SDK 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동)

### 인앱 메시지 활성화

> 기본 연동 후 발급받은 앱키로 SDK 초기화가 되었다면 `SphereInAppMessage.start`를 호출하여 인앱 메시지 기능을 활성화 해야 합니다.

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

## 추가 설정

### Message Display Listener 설정

앱에서 `SphereInAppMessageDisplayListener`를 등록하면 인앱 메시지가 화면에 보여지거나 사라질 때 해당 함수를 호출하여 앱에서 필요한 작업을 수행할 수 있습니다.

`<Java>`

```java
SphereInAppMessage.setMessageDisplayListener(new SphereInAppMessageDisplayListener() {
    @Override
    public void messageShown(Activity activity, String campaignName) {
        // 메시지가 화면에 표시될때 호출
    }

    @Override
    public void messageDismissed(Activity activity, String campaignName) {
        // 메시지가 화면에서 사라질때 호출
    }

    @Override
    public void messageClicked(Activity activity, String campaignName, String linkUrl) {
        // 메시지의 이미지를 클릭하여 해당 링크로 이동될때 호출
    }
});
```

### 앱에서 직접 메세지 링크 실행

기본적으로 메세지의 이미지 링크는 SDK 내부에서 `Intent.ACTION_VIEW` 인텐트를 통해 아래 샘플 코드와 같이 링크를 실행하게 됩니다.  
만약 앱에서 직접 링크를 실행해야 할 경우 `SphereOpenLinkListener`를 등록하여 해당 링크를 직접 실행할 수 있습니다.  
정상적으로 링크를 실행하였다면 반드시 `true`를 결과로 반환해야 합니다.

`<Java>`

```java
SphereInAppMessage.setOpenLinkListener(new SphereMessageOpenLinkListener() {
    @Override
    public boolean openLink(Activity activity, String linkUrl) {
        Uri uri = Uri.parse(linkUrl);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        if (intent.resolveActivityInfo(activity.getPackageManager(), 0) != null) {
            activity.startActivity(intent);
            return true;
        }
        return false;
    }
});
```
