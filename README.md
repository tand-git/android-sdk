# Sphere Android SDK

* [기본 연동](#기본-연동)
  * [Sphere Analytics 시작하기](#sphere-analytics-시작하기)
  * [샘플 소스 및 연동 검증 가이드](#샘플-소스-및-연동-검증-가이드)
  * [SDK 다운로드](#sdk-다운로드)
  * [안드로이드 스튜디오 프로젝트 설정](#안드로이드-스튜디오-프로젝트-설정)
  * [SDK 업데이트](#SDK-업데이트)
  * [프로가드 설정](#프로가드-설정)
  * [AndroidManifest 설정](#androidmanifest-설정)
  * [SDK 초기화하기](#sdk-초기화하기)
  * [프로세스 강제 종료 시 추가 설정](#프로세스-강제-종료-시-추가-설정)
* [웹뷰 연동](#웹뷰-연동)
  * [웹뷰 자바스크립트 인터페이스 핸들러 등록](#웹뷰-자바스크립트-인터페이스-핸들러-등록)
  * [자바스크립트 API](#자바스크립트-API)
* [이벤트 연동하기](#이벤트-연동하기)
* [사용자 속성 연동하기](#사용자-속성-연동하기)
  * [사용자 아이디 설정](#사용자-아이디-설정)
  * [사용자 정보 설정](#사용자-정보-설정)
  * [커스텀 사용자 속성 설정](#커스텀-사용자-속성-설정)  
  * [커스텀 사용자 포인트 설정](#커스텀-사용자-포인트-설정)
* [추가 설정](#추가-설정)
  * [로그 출력](#로그-출력)
  * [이벤트 즉시 전송](#이벤트-즉시-전송)
  * [이벤트 수집 비활성화](#이벤트-수집-비활성화)
  * [Sphere ID 확인](#Sphere-ID-확인)

## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

### Sphere Analytics 시작하기

Sphere Analytics 사용을 위해서는 기본적으로 앱키(App key)가 필요합니다.  
앱키가 없는 경우 Sphere Analytics 콘솔([https://analytics.tand.kr](https://analytics.tand.kr), Chrome 브라우저 활용)을 방문하여 회원 가입 및 로그인 후 앱등록 단계에서 앱키를 발급받습니다.

### 샘플 소스 및 연동 검증 가이드

* [SDK 샘플 소스](sample) : 최신 버전의 Sphere SDK가 연동된 샘플 소스를 확인할 수 있습니다.
* [SDK 연동 검증 가이드](https://github.com/tand-git/sphere-sdk/blob/master/guide/SDK_Inspection.md) : 기본 연동이 완료되었다면 SDK 연동 검증 가이드에 따라 SDK 동작 상태를 확인할 수 있습니다.

### SDK 다운로드

SDK 라이브러리를 다운로드하기 위해서는 [SDK 다운로드 페이지](https://github.com/tand-git/android-sdk/releases)를 방문하면 현재까지 릴리즈된 SDK 버전들을 확인할 수 있으며 가장 최신 버전의 SDK 파일(sphere_sdk.aar)을 선택하여 다운로드 합니다.

### 안드로이드 스튜디오 프로젝트 설정

1. 해당 모듈의 libs 폴더에 SDK 파일(.aar)을 복사합니다.
2. 해당 모듈의 `build.gradle` 파일에 아래 내용을 추가합니다.

`<build.gradle>`

```script
dependencies {
    implementation files('libs/sphere_sdk.aar')
}
```

### SDK 업데이트

SDK 업데이트를 위해 라이브러리(sphere_sdk.aar) 파일을 교체하는 경우 반드시 프로젝트 동기화 작업이 필요합니다.  
동기화 방법은 안드로이드 스튜디오 상단 메뉴 중 "File" > "Sync Project with Gradle Files"를 선택하면 프로젝트 동기화 작업이 시작됩니다.

### 프로가드 설정

프로가드를 사용 중인 경우 다음 코드를 프로가드 파일에 추가합니다.

```script
-keep class com.sphere.core.* { *;}
-keep class com.sphere.analytics.* { *;}
-keep class com.sphere.message.* { *;}
```

### AndroidManifest 설정

1. 권한 설정

인터넷 연결 및 네트워크 연결 상태 확인을 위해 사용 권한이 필요합니다.

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
   <uses-permission android:name="android.permission.INTERNET"/>
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   ...
</manifest>
```

2. 패키지 공개 상태 설정

Android 11에서는 앱이 사용자가 기기에 설치한 다른 앱을 쿼리하기 위해서는 패키지 공개 상태를 설정해야 합니다.  
앱이 아래 조건에 모두 해당되는 경우에는 패키지 공개 상태 설정이 필요합니다.

* 앱의 targetSdkVersion이 30 이상인 경우
* Sphere 콘솔에서 “App trends” (앱 설치 패턴 분석)에 대한 서비스 사용을 원하는 경우

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
    <queries>
        <intent>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent>
    </queries>
   ...
</manifest>
```

### SDK 초기화하기

Sphere SDK 라이브러리를 프로젝트에 추가하였다면 다음 코드와 같이 앱키와 함께 Sphere SDK를 초기화합니다.  
앱키가 없는 경우 [Sphere Analytics 시작하기](#sphere-analytics-시작하기)을 참고하여 앱키를 발급받습니다.

`<AndroidManifest.xml>`

```xml
<application
       android:name=".MyApplication">
    ...
</application>
```

`<Java> - MyApplication.java`

```java
import android.app.Application;
import com.sphere.analytics.SphereAnalytics;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");
    }
}
```

`<Kotlin> - MyApplication.kt`

```kt
import android.app.Application
import com.sphere.analytics.SphereAnalytics
import com.sphere.message.SphereInAppMessage

class SampleApp : Application() {

    override fun onCreate() {
        super.onCreate()

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key")
    }
}
```

### 프로세스 강제 종료 시 추가 설정

앱 종료 시 강제적으로 프로세스를 종료 시키는 앱의 경우만 해당된 설정입니다. 앱이 강제 종료가 되면 앱의 사용 시간을 정확히 알 수가 없기 때문에 추가적인 연동이 필요합니다.

만약 `android.os.Process.killProcess` 또는 `System.exit`와 같은 코드를 이용하여 앱을 강제 종료한다면 정상적인 세션 기록을 위해 해당 코드 이전에 `updateSessionBeforeProcessKill` 함수를 호출해야 합니다.

```java
// 강제 종료 이전에 세션 업데이트 함수 호출
SphereAnalytics.updateSessionBeforeProcessKill();

// 앱 종료 시 강제적으로 프로세스를 종료한다면 위의 코드 호출 필요
android.os.Process.killProcess(android.os.Process.myPid());
```

## 웹뷰 연동

> 웹뷰를 이용하는 웹앱의 경우 웹뷰 연동은 필수사항입니다.

웹뷰를 이용한 웹앱의 경우 이벤트를 수집하기 위해서는 자바스크립트 인터페이스 핸들러를 통해 네이티브 API를 호출해야 합니다.  
[샘플 소스](sample)를 참조하면 웹뷰를 통해 연동된 전체 샘플 소스를 확인할 수 있습니다.

### 웹뷰 자바스크립트 인터페이스 핸들러 등록

웹뷰에 스크립트 메세지 핸들러를 등록하여 웹에서 호출하는 Sphere 자바스크립트 인터페이스를 Sphere 네이티브 인터페이스로 연결합니다.  
관련 샘플 소스는 [sample/sphere_sample/src/main/java/com/sphere/sample/SampleWebViewActivity.java](sample/sphere_sample/src/main/java/com/sphere/sample/SampleWebViewActivity.java)에서 확인할 수 있습니다.

`<Java>`

```java
// Add Sphere JavaScript Interface for Sphere Analytics
mWebView.addJavascriptInterface(new SphereJsInterface(), "SphereJsInterface");
```

`<Kotlin>`

```kt
// Add Sphere JavaScript Interface for Sphere Analytics
webView.addJavascriptInterface(SphereJsInterface(), "SphereJsInterface")
```

### 자바스크립트 API

기본 연동 및 웹뷰 연동이 정상적으로 완료되었다면 웹뷰를 이용한 웹 환경에서 자바스크립트 API를 통해 이벤트 수집이 가능합니다.  
자바스크립트 API를 사용하기 위해서는 [Sphere Web SDK 연동 가이드](https://github.com/tand-git/web-sdk)를 참고하시기 바랍니다.

## 이벤트 연동하기

> 이벤트는 가장 기본이 되는 수집 정보이며 이벤트는 이벤트명과 파라미터들로 구성이 됩니다.

SDK가 초기화 되었다면 `logEvent` 함수를 이용하여 이벤트를 연동할 수 있으며, 한 이벤트는 최대 25개의 파라미터를 설정할 수 있습니다.
파라미터는 파라미터명과 파라미터값의 쌍으로 구성되며 `ParamBuilder` 클래스를 통해 설정이 가능합니다.

이벤트명은 필수이며 파라미터는 없는 경우 `null`로 설정 가능합니다. 이벤트명과 파라미터에 관한 규칙은 다음과 같습니다.

1. 이벤트명
    * 최대 40자  
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용  
    * 첫 글자는 영문 대소문자만 허용

2. 파라미터명
    * 최대 40자  
    * 영문 대소문자, 숫자, 특수 문자 중 ‘_’ 만 허용  
    * 첫 글자는 영문 대소문자만 허용

3. 파라미터값
    * 지원 타입 : String(최대 100자), long, double

`<Java>`

```java
// 파라미터를 포함한 이벤트 기록
ParamBuilder paramBuilder = new ParamBuilder()
        .setParam("param_name_1", "param_value")
        .setParam("param_name_2", 1)
        .setParam("param_name_3", 9.9);
SphereAnalytics.logEvent("event_name_1", paramBuilder);

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("event_name_2", null);
```

`<Kotlin>`

```kt
val paramBuilder = ParamBuilder()
        .setParam("param_name_1", "param_value")
        .setParam("param_name_2", 1)
        .setParam("param_name_3", 9.9)
SphereAnalytics.logEvent("event_name_1", paramBuilder)

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("event_name_2", null)
```

## 사용자 속성 연동하기

> 사용자 속성을 사용할 경우 수집된 이벤트들을 세분화하여 더욱 자세한 분석 정보를 얻을 수 있으며 개인 정보들은 암호화되어 서버에 저장됩니다. 사용자 속성들은 한번 설정되면 이후 재설정 또는 초기화될 때까지 설정된 값으로 유지됩니다.

사용자 속성 연동 시 고려해야 할 사항은 다음과 같으며 해당되는 모든 시점에 사용자 속성들을 설정해야 정확한 분석이 가능합니다.

1. (필수) 실행 후 현재 로그인 여부를 알 수 있는 가장 빠른 시점에 로그온 또는 로그오프 상태에 따라 사용자 아이디 및 사용자 정보를 설정 또는 초기화
2. 로그인 또는 로그아웃 상태 변경 시 해당 상태에 따라 해당 사용자 아이디 및 사용자 정보를 설정 또는 초기화

### 사용자 아이디 설정

사용자 아이디는 고객이 고객사의 서비스에 로그인할 때 사용되는 아이디가 아니라, 고객사의 시스템에서 사용자를 관리하는 고유한 식별값을 의미합니다.
고유한 사용자를 구분하기 위한 사용자 아이디로서 설정 여부에 따라 로그인 여부를 판단합니다.  
해당 정보는 유저를 구분하기 위한 용도로만 사용되므로 사용자를 식별하는 고유한 (Unique) 어떠한 식별 아이디도 사용 가능합니다.  
사용자 아이디는 최대 256자까지 설정가능하고 `null`로 설정 시 사용자 아이디 정보는 초기화되고 로그아웃 상태로 설정됩니다.  

`<Java>`

```java
if (isLogIn) { // 로그인: ON 상태

    // 사용자 아이디 설정 - 로그인: ON 상태
    SphereAnalytics.setUserId("[USER ID]");

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화 - 로그아웃: OFF 상태
    SphereAnalytics.setUserId(null);
}
```

`<Kotlin>`

```kt
if (isLogIn) { // 로그인: ON 상태

    // 사용자 아이디 설정
    SphereAnalytics.setUserId("[USER ID]")

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null)
}
```

### 사용자 정보 설정

추가적인 사용자 정보(보유 포인트, 등급, 성별, 출생년도)를 설정합니다.  
로그아웃 상태 시 다음과 같이 설정된 사용자 정보들을 초기화해야 합니다.

1. 문자형(등급, 성별) 초기화 : `null`로 설정
2. 숫자형(보유 포인트) 초기화 : `removePoints` 함수 호출
3. 숫자형(출생년도) 초기화 : `0`으로 설정

`<Java>`

```java
if (isLogIn) { // 로그인: ON 상태 및 사용자 정보 변경 시 설정

    // 사용자 아이디 설정 - 로그인: ON 상태
    SphereAnalytics.setUserId("[USER ID]");

    // 보유 포인트 설정
    SphereAnalytics.setRemainingPoint(1000);
    // 등급 설정
    SphereAnalytics.setGrade("vip");
    // 성별 설정
    SphereAnalytics.setGender("m"); // 남성일 경우: "m"
//    SphereAnalytics.setGender("f"); // 여성일 경우: "f"
    // 출생년도 설정
    SphereAnalytics.setBirthYear(1995); // 출생년도

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화 - 로그아웃: OFF 상태
    SphereAnalytics.setUserId(null);

    // 보유 포인트 초기화
    SphereAnalytics.removePoints();
    // 등급 초기화
    SphereAnalytics.setGrade(null);
    // 성별 초기화
    SphereAnalytics.setGender(null);
    // 출생년도 초기화
    SphereAnalytics.setBirthYear(0);
}
```

`<Kotlin>`

```kt
if (isLogIn) { // // 로그인: ON 상태 및 사용자 정보 변경 시 설정

    // 사용자 아이디 설정
    SphereAnalytics.setUserId("[USER ID]")

    // 보유 포인트 설정
    SphereAnalytics.setRemainingPoint(1000)
    // 등급 설정
    SphereAnalytics.setGrade("vip")
    // 성별 설정
    SphereAnalytics.setGender("m") // 남성일 경우: "m"
//    SphereAnalytics.setGender("f"); // 여성일 경우: "f"
    // 출생년도 설정
    SphereAnalytics.setBirthYear(1995) // 출생년도

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null)

    // 보유 포인트 초기화
    SphereAnalytics.resetPoints()
    // 등급 초기화
    SphereAnalytics.setGrade(null)
    // 성별 초기화
    SphereAnalytics.setGender(null)
    // 출생년도 초기화
    SphereAnalytics.setBirthYear(0)
}
```

### 커스텀 사용자 속성 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setUserProperty`(문자형) 또는 `setUserPropertyLong`(정수형) 함수를 이용하여 커스텀 사용자 속성을 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removeUserProperty` 함수를 이용하여 초기화가 가능합니다.
또한 문자형 사용자 속성의 경우 속성값을 `null`로 설정 시 해당 속성은 초기화 됩니다.

사용자 속성에 관한 규칙은 다음과 같습니다.

1. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * "sap"으로 시작되는 속성명은 사전 정의된 속성명으로 사용 불가

2. 사용자 속성값
    * 문자형 : 최대 100자
    * 정수형 : long 타입

`<Java>`

```java
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name_1", "user_property_value");
SphereAnalytics.setUserPropertyLong("user_property_name_2", 12345);
// 커스텀 사용자 속성 초기화
SphereAnalytics.removeUserProperty("user_property_name_1");
SphereAnalytics.removeUserProperty("user_property_name_2");
```

`<Kotlin>`

```kt
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name_1", "user_property_value")
SphereAnalytics.setUserPropertyLong("user_property_name_2", 12345)
// 커스텀 사용자 속성 초기화
SphereAnalytics.removeUserProperty("user_property_name_1")
SphereAnalytics.removeUserProperty("user_property_name_2")
```


### 커스텀 사용자 포인트 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setRemainingPoint`(보유 포인트) 함수를 이용하여 커스텀 사용자 포인트를 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removePoints` 함수를 이용하여 초기화가 가능합니다.
또한 사용자의 전체 포인트를 초기화하는 경우 `resetPoints`함수를 이용하여 초기화 가능합니다.

1. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

2. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * setRemainingPoint(포인트) 함수사용 시 "point"로 사전 정의된 포인트명임으로 사용 불가

```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setRemainingPoint( 1234567, "user_point_name");
// 커스텀 사용자 속성 초기화
SphereAnalytics.removePoints("user_point_name");
// 사용자 포인트 전체 초기화(기본포인트 + 커스텀포인트)
SphereAnalytics.resetPoints();
```


## 추가 설정

> 추가 설정은 필수적인 연동 사항은 아니며 필요한 경우 선택적으로 사용이 가능합니다.

### 로그 출력

로그 출력 함수를 활성화 하면 세션의 시작과 종료 및 이벤트 기록 로그와 에러 로그들을 확인할 수 있습니다.  
기본 설정은 비활성화 상태이며 출력되는 로그들은 [SDK 로그를 통한 검증](#sdk-로그를-통한-검증)에서 확인 가능합니다.

`<Java>`

```java
SphereAnalytics.enableLog(true); // 활성화
```

`<Kotlin>`

```kt
SphereAnalytics.enableLog(true) // 활성화
```

### 이벤트 즉시 전송

기본적으로 Sphere Analytics는 앱이 실행된 후 비활성화되는 시점에 자동으로 기록된 모든 이벤트들을 서버에 전송합니다.  
하지만 `requestUpload` 함수를 호출할 경우 호출 시점까지 기록된 모든 이벤트들을 즉시 서버로 전송이 가능하며 해당 시점에 즉시 이벤트 수집이 필요한 경우에만 사용하기를 권장합니다.

`<Java>`

```java
SphereAnalytics.requestUpload();
```

`<Kotlin>`

```kt
SphereAnalytics.requestUpload()
```

### 이벤트 수집 비활성화

Sphere Analytics의 이벤트 수집 기능을 비활성화하기를 원할 경우 아래와 같은 코드를 추가합니다.
기본 설정은 활성화 상태이며 비활성화된 이후로는 다시 활성화하기 전까지 이벤트가 수집되지 않습니다.

`<Java>`

```java
SphereAnalytics.setAnalyticsCollectionEnabled(false); // 비활성화
```

`<Kotlin>`

```kt
SphereAnalytics.setAnalyticsCollectionEnabled(false) // 비활성화
```

### Sphere ID 확인

Sphere ID는 Sphere에서 기기를 식별하는 고유한 식별자로서 앱 설치 시 SDK 내부에서 항상 새롭게 생성이 되므로 삭제 후 재설치 시 새로운 Sphere ID가 생성이 됩니다.  
Sphere ID를 확인하기 위해서는 `getSphereId` 함수를 호출하여 SDK로부터 Sphere ID를 가져온 후 로그를 출력하여 확인할 수 있습니다.

`<Java>`

```java
String sphereId = SphereAnalytics.getSphereId(context);
Log.v("Sphere", "Sphere ID: " + sphereId);
```

`<Kotlin>`

```kt
val sphereId = SphereAnalytics.getSphereId(context)
Log.v("Sphere", "Sphere ID: $sphereId")
```
