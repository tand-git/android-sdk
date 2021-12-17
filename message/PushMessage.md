# Android Sphere Push Message 연동

* [SDK 기본 연동](#SDK-기본-연동)
  * [FCM 등록 토큰 설정](#FCM-등록-토큰-설정)
  * [푸시 메시지 서비스 등록](#푸시-메시지-서비스-등록)
  * [앱 실행 시 인텐트 설정](#앱-실행-시-인텐트-설정)
  * [사용자 푸시 동의 설정](#사용자-푸시-동의-설정)
* [푸시메시지 데이터 전달](#푸시메시지-데이터-전달)

## SDK 기본 연동

> 푸시 메시지 기능을 사용하기 위해서는 Sphere SDK 연동가이드의 기본 연동 및 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정이 필수적으로 완료되어야 메시지 수신이 가능합니다.

* [Sphere SDK Android 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동)
* [Android 기반 FCM(Firebase Cloud Messaging) 클라이언트 앱 설정](https://firebase.google.com/docs/cloud-messaging/android/client)

SDK 기본 연동 및 푸시 메시지 연동이 모두 완료된 샘플 프로젝트는 아래 샘플 소스 참조 사이트에서 확인이 가능합니다.  
샘플 프로젝트를 통해 단말에서 메시지 전송 테스트를 하기 위해서는 Firebase 콘솔에서 샘플앱 프로젝트를 생성 후 발급받은 `google-services.json` 파일로 교체해야 테스트가 가능합니다.

* 샘플 소스: [https://github.com/tand-git/android-sdk/tree/master/message/sample](https://github.com/tand-git/android-sdk/tree/master/message/sample)

### FCM 등록 토큰 설정

> FCM(Firebase Cloud Messaging)을 통해 푸시 메시지를 전송하기 위해서는 FCM 등록 토큰이 필요합니다.

기존 앱 사용자들의 FCM 등록 토큰을 설정하기 위해서 다음 코드와 같이 Firebase로 부터 등록된 토큰을 가져오거나  
만약 앱에서 FCM 토큰을 저장하고 있다면 앱에 저장된 토큰을 `setFcmToken`를 통해 SDK에 전달합니다.

`<Java> - MyApplication.java`

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
            @Override
            public void onComplete(@NonNull Task<String> task) {
                // Sphere SDK 푸시 토큰 설정
                if (task.isSuccessful()) {
                    String token = task.getResult();
                    SpherePushMessage.setFcmToken(token);
                }
            }
        });
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
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            // Sphere SDK 푸시 토큰 설정
            if (task.isSuccessful) {
                val token = task.result
                SpherePushMessage.setFcmToken(token)
            }
        })
    }
}
```

### 푸시 메시지 서비스 등록

> 푸시 메시지 서비스 등록이 연동되지 않을 경우 앱 실행 중 푸시 메시지 전송 시 메시지가 알림창에 표시되지 않습니다.

`FirebaseMessagingService` 클래스를 상속한 푸시 메시지 서비스를 등록하고 아래 샘플 코드와 같이 `onNewToken`, `onMessageReceived` 메소드를 재정의합니다. 앱에 이미 등록된 `FirebaseMessagingService`가 있다면 기존 등록된 서비스에 `onNewToken`, `onMessageReceived` 메소드를 재정의해야 합니다.  
만약 앱에서 타사의 푸시 메시지 SDK를 연동 중이라면 해당 SDK 내부에서 `FirebaseMessagingService`를 등록하고 있는 지 확인이 필요하며 ***중복 등록 시 정상적인 푸시 서비스가 불가능합니다***.

`<AndroidManifest.xml>`

```xml
<application>
    <service
        android:name=".MyFirebaseMessagingService"
        android:exported="false">
        <intent-filter>
            <action android:name="com.google.firebase.MESSAGING_EVENT" />
        </intent-filter>
    </service>
</application>
```

`<Java> - MyFirebaseMessagingService.java`

```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(@NonNull String token) {
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        if (SpherePushMessage.isSpherePushMessage(remoteMessage.getData())) {
            // 상단바 small아이콘 커스텀 사용 시
            // ex)  remoteMessage.getData().put("customIcon", Integer.toString(R.drawable.ic_launcher_foreground));
            // ex)  remoteMessage.getData().put("customIcon", Integer.toString(R.mipmap.ic_launcher_foreground));
            
            // 상단 이름 색 커스텀 사용 시
            // ex) remoteMessage.getData().put("customColor", ContextCompat.getColor(this, R.color.teal_800)+"");

            /* Sphere 푸시 메시지 데이터 처리: 앱이 실행 중인 경우 알림창에 메시지 표시 */
            SpherePushMessage.handleMessageReceived(remoteMessage.getData());

        } else {
            // Sphere 푸시 메시지가 아닌 경우 처리
        }
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

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if (SpherePushMessage.isSpherePushMessage(remoteMessage.data)) {
       
            // 상단바 small아이콘 커스텀 사용 시
            // ex) remoteMessage.data.put("customIcon", (R.drawable.ic_launcher_foreground.toString()));
            // ex) remoteMessage.data.put("customIcon", (R.mipmap.ic_launcher_foreground.toString()));

            // 상단 이름 색 커스텀 사용 시
            // ex) remoteMessage.data.put("customColor", ContextCompat.getColor(this, R.color.teal_700).toString());

            /* Sphere 푸시 메시지 데이터 처리: 앱이 실행 중인 경우 알림창에 메시지 표시 */
            SpherePushMessage.handleMessageReceived(remoteMessage.data)

        } else {
            // Sphere 푸시 메시지가 아닌 경우 처리
        }
    }
}
```

### 앱 실행 시 인텐트 설정

> 앱 실행 시 인텐트 설정이 연동되지 않을 경우 Sphere 콘솔에서 "메시지 오픈"에 대한 통계 데이터가 부정확할 수 있습니다.

사용자가 발송된 푸시 메시지를 클릭하여 실행되는 Activity에 `onNewIntent`를 재정의 하여 아래 샘플 코드와 같이 `Intent`를 Sphere SDK에 전달해야 합니다.

앱 실행 시 시작되는 Activity
1. AndroidManifest.xml에 카테고리가 `android.intent.category.LAUNCHER`인 Activity
2. 앱 링크를 사용하고 있다면 앱 링크를 통해 실행되는 Activity

`<Java> - MyActivity.java`

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
        SpherePushMessage.handleNewIntent(intent);
    }
}
```

`<Kotlin> - MyActivity.kt`

```kt
class MainActivity : AppCompatActivity() {
    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)

        // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
        SpherePushMessage.handleNewIntent(intent)
    }
}
```

### 사용자 푸시 동의 설정

> 사용자의 푸시 동의 설정에 따라 푸시 메시지 발송 허용 여부를 판단하기 위해서는 해당 정보를 SDK에 설정해야 합니다.

> 로그인, 로그아웃 등 푸시동의정보 변경이 발생되는 위치에 SDK 설정이 필요합니다.

정보성, 광고성 푸시 발송 동의 설정은 필수 항목이며, 야간 푸시 발송은 미설정 시 동의 거부 상태로서 야간에 푸시 메시지가 발송되지 않습니다.

> 야간 광고성 동의 설정: 야간 시간대(밤 9시 ~ 아침 8시)에 메세지를 발송 시 광고성 알림 동의와 별도로 야간 알림 동의를 받아야 합니다.

`<Java>`

```java
//설정 방법
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true);
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(false));
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(false); 

ex)
SpherePushMessage.agreePushMessageForInformation(false);
SpherePushMessage.agreePushMessageForAdvertisement(false));
//야간동의 설정이 있는 경우에만 
//SpherePushMessage.agreePushMessageAtNight(false); 
if (isLogIn) { // 로그인: ON 상태
    // 사용자 아이디 설정 - 로그인: ON 상태
    SphereAnalytics.setUserId("[USER ID]");
    ...
    // 사용자 동의정보 설정
    SpherePushMessage.agreePushMessageForInformation(true);
    SpherePushMessage.agreePushMessageForAdvertisement(["동의설정값"]));
    //야간동의 설정이 있는 경우에만 true|false 설정
    //SpherePushMessage.agreePushMessageAtNight(["동의설정값"]); 
} else { // 로그아웃: OFF 상태
    // 사용자 아이디 초기화 - 로그아웃: OFF 상태
    SphereAnalytics.setUserId(null);
    ...
    // 비회원 동의정보 설정
    SpherePushMessage.agreePushMessageForInformation(true);
    SpherePushMessage.agreePushMessageForAdvertisement(["동의설정값"]));
    //야간동의 설정이 있는 경우에만 true|false 설정
    //SpherePushMessage.agreePushMessageAtNight(["동의설정값"]); 
}

```



`<Kotlin>`

```kt
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true)
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(true)
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(true)

ex)
SpherePushMessage.agreePushMessageForInformation(false)
SpherePushMessage.agreePushMessageForAdvertisement(false))
// 야간 동의 설정이 있는 경우에만
//SpherePushMessage.agreePushMessageAtNight(false);  
if (isLogIn) { // 로그인: ON 상태
    // 사용자 아이디 설정
    SphereAnalytics.setUserId("[USER ID]")
    // 사용자 동의정보 설정
    SpherePushMessage.agreePushMessageForInformation(true)
    SpherePushMessage.agreePushMessageForAdvertisement(["동의설정값"]))
    // 야간 동의 설정이 있는 경우에만 true|false 설정
    //SpherePushMessage.agreePushMessageAtNight(true);  
} else { // 로그아웃: OFF 상태
    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null)
    // 비회원 동의정보 설정
    SpherePushMessage.agreePushMessageForInformation(true)
    SpherePushMessage.agreePushMessageForAdvertisement(["동의설정값"]))
    // 야간 동의 설정이 있는 경우에만 true|false 설정
    //SpherePushMessage.agreePushMessageAtNight(false);  
}


```

## 푸시메시지 데이터 전달

> 푸시 메시지 전송 시 데이터(키/값)를 함께 전달하는 기능으로 Sphere 콘솔에서 푸시메시지 입력 시 키/값을 설정해야 합니다.
* 키-값(key-value) 이용가이드: [링크](https://www.notion.so/Key-value-c65b4843b7cd4b6e80e91ad994af52b2)


데이터(키/값)와 함께 푸시메시지를 전송하면 메시지 클릭 시 실행되는 `Activity`로 데이터가 전달됩니다.  
만약 링크를 통해 앱 내 특정 페이지로 이동할 경우 링크에 해당하는 키/값이 `Activity`로 전달되면 해당 링크를 확인하여 링크 페이지로 이동하는 코드를 구현해야 합니다.

`<Java>`

```java
public class MainActivity extends AppCompatActivity {

    private static final String KEY_YOUR_PUSH_LINK = "key_your_push_link";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 푸시메시지 커스텀 데이터 전달 처리
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            String link = extras.getString(KEY_YOUR_PUSH_LINK);
            // 링크 페이지로 이동
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        // 푸시메시지 커스텀 데이터 전달 처리
        Bundle extras = intent.getExtras();
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            String link = extras.getString(KEY_YOUR_PUSH_LINK);
            // 링크 페이지로 이동
        }
    }
}
```

`<Kotlin>`

```kt
class MainActivity : AppCompatActivity() {
    companion object {
        private const val KEY_YOUR_PUSH_LINK = "key_your_push_link"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        // 푸시메시지 커스텀 데이터 전달 처리
        val extras = intent!!.extras
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            val link = extras.getString(KEY_YOUR_PUSH_LINK)
            // 링크 페이지로 이동
        }
    }

    override fun onNewIntent(intent: Intent?) {
        // 푸시메시지 커스텀 데이터 전달 처리
        val extras = intent!!.extras
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            val link = extras.getString(KEY_YOUR_PUSH_LINK)
            // 링크 페이지로 이동
        }
    }

}
```