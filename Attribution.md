## Attribution ID 설정 연동 가이드

Attribution ID 설정을 위해 Sphere SDK 초기화 이후 Attribution ID 설정을 위한 콜백(`VendorCallback`)을 등록하고 `updateAttributionId` 콜백 구현부에서 현재 연동된 Attribution ID를 설정합니다.

* Adjust Android SDK 가이드: [Adjust Device Identifier](https://github.com/adjust/android_sdk#adjust-device-identifier)

`<Java> - MyApplication.java`

```java
public class MyApplication extends Application implements SphereAttribution.VendorCallback {
    @Override
    public void onCreate() {

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // Attribution ID 설정 콜백 등록
        SphereAttribution.setVendorCallback(this);
    }

    @Override
    public void updateAttributionId() {
        // Adjust ID 설정
        String adjustId = Adjust.getAdid();
        SphereAttribution.setAttributionId(SphereAttribution.VENDOR_ADJUST, adjustId);
    }
}
```

`<Kotlin> - MyApplication.kt`

```kt
class MyApplication : Application(), SphereAttribution.VendorCallback {
    override fun onCreate() {
        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key")

        // Attribution ID 설정 콜백 등록
        SphereAttribution.setVendorCallback(this)
    }

    override fun updateAttributionId() {
        // Adjust ID 설정
        val adjustId = Adjust.getAdid()
        SphereAttribution.setAttributionId(SphereAttribution.VENDOR_ADJUST, adjustId)
    }
}
```

## 구글 플레이 Install Referrer 설정

앱 설치 시 유입 경로 확인을 위해서는 구글 플레이 Install Referrer 설정이 필요합니다.  
해당 모듈의 `build.gradle` 파일에 최신 버전의 구글 플레이 Install Referrer를 dependency로 추가합니다.

`<build.gradle>`

```script
dependencies {
    implementation 'com.android.installreferrer:installreferrer:2.2'
}
```
