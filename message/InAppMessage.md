# Android Sphere In-App Message 연동

- [SDK 기본 연동](#SDK-기본-연동)
  - [메시지 이미지 링크 연동](#메시지-이미지-링크-연동)
- [추가 설정](#추가-설정)
  - [Message Display Listener 설정](#Message-Display-Listener-설정)

## SDK 기본 연동

> 인앱 메시지 기능을 사용하기 위해서는 SDK 연동가이드의 기본 연동이 필수적으로 완료되어야 메시지 수신이 가능합니다.

- [Sphere SDK Android 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동)

### 메시지 이미지 링크 연동

> 인앱 메시지의 이미지 링크가 설정이 되었다면 메시지 팝업이 표시된 후 이미지 클릭 시 해당 링크로 이동을 하게 됩니다.  
> 이미지 링크가 정상적으로 연동이 되지 않았다면 해당 링크로 이동없이 팝업이 닫히게 됩니다.

기본적으로 메시지의 이미지 링크는 SDK 내부에서 `Intent.ACTION_VIEW` 액션 인텐트를 통해 아래 샘플 코드와 같이 링크를 실행하게 됩니다.  
만약 앱에서 인텐트를 통해 링크 실행이 가능한 앱링크를 지원하지 않는 경우, `SphereOpenLinkListener`를 등록하여 전달된 이미지 링크로 페이지를 이동할 수 있도록 앱에서 직접 구현해야 합니다.  
정상적으로 링크를 실행하였다면 반드시 `true`를 결과로 반환해야 합니다.

`<Java>`

```java
SphereInAppMessage.setOpenLinkListener(new SphereMessageOpenLinkListener() {
    @Override
    public boolean openLink(Activity activity, String linkUrl) {
        Uri uri = Uri.parse(linkUrl);
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        activity.startActivity(intent);

        return true;
    }
});
```

`<Kotlin>`

```kt
SphereInAppMessage.setOpenLinkListener(SphereMessageOpenLinkListener { activity, linkUrl ->
    val uri = Uri.parse(linkUrl)
    val intent = Intent(Intent.ACTION_VIEW, uri)
    intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
    activity.startActivity(intent)

    true
})
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

`<Kotlin>`

```kt
SphereInAppMessage.setMessageDisplayListener(object : SphereMessageDisplayListener {
    override fun messageShown(activity: Activity, campaignName: String) {
        // 메시지가 화면에 표시될때 호출
    }

    override fun messageDismissed(activity: Activity, campaignName: String) {
        // 메시지가 화면에서 사라질때 호출
    }

    override fun messageClicked(activity: Activity, campaignName: String, linkUrl: String) {
        // 메시지의 이미지를 클릭하여 해당 링크로 이동될때 호출
    }
})
```
