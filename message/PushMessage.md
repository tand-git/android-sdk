# Android Sphere Push Message 연동

* [SDK 기본 연동](#SDK-기본-연동)
  * [FCM 등록 토큰 설정](#FCM-등록-토큰-설정)
  * [사용자 푸시 동의 설정](#사용자-푸시-동의-설정)

## SDK 기본 연동

> 푸시 메시지 기능을 사용하기 위해서는 Sphere SDK 연동가이드의 기본 연동 및 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정이 필수적으로 완료되어야 메시지 수신이 가능합니다.

* [Android SDK 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동)
* [Android 기반 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정](https://firebase.google.com/docs/cloud-messaging/android/client)

### FCM 등록 토큰 설정

> FCM(Firebase Cloud Messaging)을 통해 푸시 메시지를 전송하기 위해서는 FCM 등록 토큰이 필요합니다.

1. 현재 등록된 FCM 토큰 설정

기존 앱 사용자들의 FCM 등록 토큰을 설정하기 위해서 다음 코드와 같이 Firebase로 부터 등록된 토큰을 가져오거나  
만약 앱에서 FCM 토큰을 저장하고 있다면 앱에 저장된 토큰을 setFcmToken 함수를 통해 SDK에 전달합니다.

`<Java> - MyApplication.java`

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        if (!SpherePushMessage.hasFcmToken()) {

            FirebaseMessaging.getInstance().getToken()
                    .addOnCompleteListener(new OnCompleteListener<String>() {
                        @Override
                        public void onComplete(@NonNull Task<String> task) {
                            if (!task.isSuccessful()) {
                                Log.w("Firebase", "Fetching FCM registration token failed", task.getException());
                                return;
                            }

                            // Sphere SDK 푸시 토큰 설정
                            String token = task.getResult();
                            SpherePushMessage.setFcmToken(token);
                        }
                    });
        }
    }
}
```

`<Kotlin> - MyApplication.kt`

```kt
class SampleApp : Application() {
    override fun onCreate() {

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key")

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        if (!SpherePushMessage.hasFcmToken()) {

            FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.w("Firebase", "Fetching FCM registration token failed", task.exception)
                    return@OnCompleteListener
                }

                // Sphere SDK 푸시 토큰 설정
                val token = task.result
                SpherePushMessage.setFcmToken(token)
            })
        }
    }
}
```


2. FCM 토큰 생성 시 설정

FirebaseMessagingService를 상속한 서비스를 AndroidManifest에 등록하고 onNewToken을 재정의하여 생성된 FCM 토큰을 Sphere SDK에 전달해야 합니다.

`<Java> - MyFirebaseMessagingService.java`

```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(@NonNull String token) {
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token);
    }
}
```

`<Kotlin> - MyFirebaseMessagingService.kt`

```kt
class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onNewToken(token: String) {
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token)
    }
}
```

`<AndroidManifest.xml>`

```xml
<<application>
    <service
        android:name=".MyFirebaseMessagingService"
        android:exported="false">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</<application>
```

### 사용자 푸시 동의 설정

> 사용자의 푸시 동의 설정에 따라 푸시 메시지 발송 허용 여부를 판단하기 위해서는 해당 정보를 SDK에 설정해야 합니다.

정보성, 광고성 푸시 발송 동의 설정은 필수 항목이며, 야간 푸시 발송은 미설정 시 동의 거부 상태로서 야간에 푸시 메시지가 발송되지 않습니다.

`<Java>`

```java
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true);
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(true);
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(true);
```

`<Kotlin>`

```kt
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true)
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(true)
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(true)
```
