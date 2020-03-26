# Sphere SDK - Android

* [기본 연동](#기본-연동)
  * [Sphere Analytics 시작하기](#sphere-analytics-시작하기)
  * [샘플 소스 및 연동 검증 가이드](#샘플-소스-및-연동-검증-가이드)
  * [SDK 다운로드](#sdk-다운로드)
  * [안드로이드 스튜디오 프로젝트 설정](#안드로이드-스튜디오-프로젝트-설정)
  * [프로가드 설정](#프로가드-설정)
  * [AndroidManifest 설정](#androidmanifest-설정)
  * [SDK 초기화하기](#sdk-초기화하기)
  * [프로세스 강제 종료 시 추가 설정](#프로세스-강제-종료-시-추가-설정)
* [웹뷰 설정](#웹뷰-설정)
  * [웹뷰 자바스크립트 인터페이스 핸들러 등록](#웹뷰-자바스크립트-인터페이스-핸들러-등록)
  * [자바스크립트 API](#자바스크립트-API)
* [커스텀 이벤트 사용하기](#커스텀-이벤트-사용하기)
* [사용자 속성 사용하기](#사용자-속성-사용하기)
  * [사용자 아이디 설정](#사용자-아이디-설정)
  * [사용자 정보 설정](#사용자-정보-설정)
  * [사용자 포인트 설정](#사용자-포인트-설정)
  * [커스텀 사용자 속성 설정](#커스텀-사용자-속성-설정)
  * [사용자 속성 전체 초기화](#사용자-속성-전체-초기화)
* [추가 설정](#추가-설정)
  * [로그 출력](#로그-출력)
  * [사용자 세션 관리](#사용자-세션-관리)
  * [이벤트 즉시 전송](#이벤트-즉시-전송)
  * [앱 언어 설정](#앱-언어-설정)
  * [이벤트 수집 비활성화](#이벤트-수집-비활성화)

## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

### Sphere Analytics 시작하기

Sphere Analytics 사용을 위해서는 기본적으로 앱키(App key)가 필요합니다.  
앱키가 없는 경우 [Sphere Analytics 콘솔](https://analytics.tand.kr)을 방문하여 회원 가입 및 로그인 후 앱을 등록하여 앱키를 발급받습니다.

### 샘플 소스 및 연동 검증 가이드

* [SDK 샘플 소스](sample) : 최신 버전의 Sphere SDK가 연동된 샘플 소스를 확인할 수 있습니다.
* [SDK 연동 검증 가이드](https://github.com/tand-git/sphere-sdk/blob/master/guide/SDK_Inspection.md) : 기본 연동이 완료되었다면 SDK 연동 검증 가이드에 따라 SDK 동작 상태를 확인할 수 있습니다.

### SDK 다운로드

SDK 라이브러리를 다운로드하기 위해서는 [SDK 다운로드 페이지](https://github.com/tand-git/android-sdk/releases)를 방문하면 현재까지 릴리즈된 SDK 버전들을 확인할 수 있으며 가장 최신 버전의 SDK 파일(sphere_sdk.aar)을 선택하여 다운로드 합니다.

### 안드로이드 스튜디오 프로젝트 설정

1. 모듈의 libs 폴더에 SDK 파일(.aar)을 복사합니다.
2. 모듈의 `build.gradle` 파일에 아래 내용을 추가합니다.

`<build.gradle>`

```script
repositories {
   flatDir {
       dirs 'libs'
   }
}

dependencies {
   implementation(name: 'sphere_sdk', ext: 'aar')
}
```

### 프로가드 설정

프로가드를 사용 중인 경우 다음 코드를 프로가드 파일에 추가합니다.

```script
-keep class com.sphere.core.* { *;}
-keep class com.sphere.analytics.* { *;}
```

### AndroidManifest 설정

인터넷 연결 및 네트워크 연결 상태 확인을 위해 `AndroidManifest.xml` 파일에 권한을 설정합니다.

* 필수 권한

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
   <uses-permission android:name="android.permission.INTERNET"/>
   ...
</manifest>
```

* 권장 권한

`<AndroidManifest.xml>`

```xml
<manifest>
   ...
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
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

`<MyApplication.java>`

```java
import android.app.Application;
import com.sphere.analytics.SphereAnalytics;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        SphereAnalytics.configure(this, "Your Sphere SDK App Key");
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

## 웹뷰 설정

> 웹뷰를 이용하는 웹앱의 경우 웹뷰 설정은 필수 연동 사항입니다.

웹뷰를 이용한 웹앱의 경우 이벤트를 수집하기 위해서는 자바스크립트 인터페이스 핸들러를 통해 네이티브 API를 호출해야 합니다.  
[샘플 소스](sample)를 참조하면 웹뷰를 통해 연동된 전체 샘플 소스를 확인할 수 있습니다.

### 웹뷰 자바스크립트 인터페이스 핸들러 등록

웹뷰에 스크립트 메세지 핸들러를 등록하여 웹에서 호출하는 Sphere 자바스크립트 인터페이스를 Sphere 네이티브 인터페이스로 연결합니다.  
관련 샘플 소스는 [sample/sphere_sample/src/main/java/com/sphere/sample/SampleWebViewActivity.java](sample/sphere_sample/src/main/java/com/sphere/sample/SampleWebViewActivity.java)에서 확인할 수 있습니다.

`<Java>`

```java
// Add Sphere JavaScript Interface Handler
mWebView.getSettings().setJavaScriptEnabled(true);
mWebView.addJavascriptInterface(new SphereJsInterface(), "SphereJsInterface");

// Navigate to site
mWebView.loadUrl("your website url");
```

### 자바스크립트 API

기본 연동 및 웹뷰 설정이 정상적으로 완료되었다면 웹서버에서 자바스크립트 API를 통해 이벤트 수집이 가능합니다.  
웹뷰용 자바스크립트 API를 사용하기 위해서는 [웹뷰용 자바스크립트 가이드](https://github.com/tand-git/web-sdk)를 참고하시기 바랍니다.

## 커스텀 이벤트 사용하기

> 이벤트는 가장 기본이 되는 수집 정보이며 이벤트는 이벤트명과 파라미터들로 구성이 됩니다.

SDK가 초기화 되었다면 `logEvent` 함수를 이용하여 커스텀 이벤트를 설정할 수 있으며, 한 이벤트는 최대 25개의 파라미터를 설정할 수 있습니다.
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
    * 지원 타입 : String(최대 100자), int, long, float, double

`<Java>`

```java
// 이벤트 파라미터 설정
ParamBuilder paramBuilder = new ParamBuilder()
    .setParam("item", "notebook")
    .setParam("quantity", 1)
    .setParam("price", 9.9);
// 이벤트 기록
SphereAnalytics.logEvent("purchase", paramBuilder);

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("purchase_clicked", null);
```

## 사용자 속성 사용하기

> 사용자 속성을 사용할 경우 수집된 이벤트들을 세분화하여 더욱 자세한 분석 정보를 얻을 수 있으며 개인 정보들은 암호화되어 서버에 저장됩니다. 사용자 속성들은 한번 설정되면 이후 재설정 또는 초기화될 때까지 설정된 값으로 유지됩니다.

사용자 속성 연동 시 고려해야 할 사항은 다음과 같으며 가능한 해당되는 모든 시점에 사용자 속성들을 설정해야 정확한 분석이 가능합니다.

1. 앱이 실행된 후 해당 속성 정보를 알 수 있는 가장 빠른 시점(예:홈 화면 진입)에 사용자 속성들을 설정
2. 앱 사용 중 해당 사용자 속성이 변경 시 변경된 사용자 속성들을 즉시 설정

### 사용자 아이디 설정

고유한 사용자를 구분하기 위한 사용자 아이디로서 설정 여부에 따라 로그인 여부를 판단합니다.  
해당 정보는 유저를 구분하기 위한 용도로만 사용되므로 사용자를 구분하는 어떠한 식별 아이디도 사용 가능합니다.  
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

### 사용자 정보 설정

추가적인 사용자 정보(등급, 성별, 출생년도, 전화번호, 이메일)를 설정합니다.  
설정된 사용자 정보들은 문자형의 경우 `null`로 설정 시 초기화되며 출생년도의 경우 0으로 설정 시 초기화됩니다.  
Sphere Analytics를 통해 메세지(준비중) 기능을 사용하기 위해서는 전화번호 또는 이메일 정보를 필수로 설정해야 합니다.

`<Java>`

```java
if (isLogIn) { // 로그인: ON 상태

    // 등급 설정
    SphereAnalytics.setGrade("vip");
    // 성별 설정
    SphereAnalytics.setGender("m"); // 남성일 경우: "m"
//                SphereAnalytics.setGender("f"); // 여성일 경우: "f"
    // 출생년도 설정
    SphereAnalytics.setBirthYear(1995); // 출생년도
    // 이메일 설정
    SphereAnalytics.setEmail("xxxx@xxxx.com");
    // 전화번호 설정
    SphereAnalytics.setPhoneNumber("821011112222");

} else { // 로그아웃: OFF 상태

    // 등급 초기화
    SphereAnalytics.setGrade(null);
    // 성별 초기화
    SphereAnalytics.setGender(null);
    // 출생년도 초기화
    SphereAnalytics.setBirthYear(0);
    // 이메일 초기화
    SphereAnalytics.setEmail(null);
    // 전화번호 초기화
    SphereAnalytics.setPhoneNumber(null);

}
```

### 사용자 포인트 설정

사용자의 포인트 정보(현재 보유 포인트, 총 적립 포인트, 총 사용 포인트)를 설정합니다.  
설정된 사용자 포인트 정보들은 `resetPoints` 함수 호출 시 일괄적으로 초기화 됩니다.  
설정 가능한 포인트의 종류는 다음과 같으며 가능한 모든 포인트 정보를 설정해야 더욱 자세한 사용자 분석이 가능합니다.

`<Java>`

```java
if (isLogIn) { // 로그인: ON 상태

    // 사용자 포인트 설정
    SphereAnalytics.setRemainingPoint(1000); // 현재 보유 포인트
    SphereAnalytics.setTotalEarnedPoint(5000); // 총 적립 포인트
    SphereAnalytics.setTotalUsedPoint(4000); // 총 사용 포인트

} else { // 로그아웃: OFF 상태

    // 사용자 포인트 초기화(현재 보유 포인트, 총 적립 포인트, 총 사용 포인트)
    SphereAnalytics.resetPoints();
}
```

### 커스텀 사용자 속성 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setUserProperty` 함수를 이용하여 커스텀 사용자 속성을 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 속성값을 `null`로 설정 시 해당 속성은 초기화 됩니다.

사용자 속성에 관한 규칙은 다음과 같습니다.

1. 사용자 속성명
    * 최대 40자  
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용  
    * 첫 글자는 영문 대소문자만 허용

2. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

`<Java>`

```java
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name", "user_property_value");
// 커스텀 사용자 속성 초기화
SphereAnalytics.setUserProperty("user_property_name", null);
```

### 사용자 속성 전체 초기화

현재까지 설정된 전체 사용자 속성을 초기화합니다. 대상이 되는 속성들은 다음과 같습니다.

1. 사용자 아이디
2. 사용자 정보: 등급, 성별, 출생년도, 전화번호, 이메일
3. 사용자 포인트: 현재 보유 포인트, 총 적립 포인트, 총 사용 포인트
4. 커스텀 사용자 속성

```java
// 사용자 속성 전체 초기화
SphereAnalytics.resetUserProperties();
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

### 사용자 세션 관리

사용자의 앱 사용 시간은 세션 관리를 통해 기록되며 사용자 세션 정보를 위한 신규 세션 생성 규칙은 다음과 같습니다.  
앱 종료 후 일정 시간(기본 설정: 30분)이 지나고 앱 실행 시 신규 세션이 시작되고 "#session" 이벤트가 기록됩니다.

* 앱이 비활성화 상태에서 활성화 상태로 변경 시 타임아웃 시간(기본 설정: 30분)이 경과한 후에만 신규 세션 시작
* 앱이 활성화 시 이전 세션의 시작 시간과 날짜가 변경된 경우 신규 세션 시작

아래 코드를 통해 사용자 세션 타임아웃 시간을 변경할 수 있습니다. (기본 설정: 30분)  

`<Java>`

```java
SphereAnalytics.setSessionTimeout(1000 * 60); // 1분
```

### 이벤트 즉시 전송

기본적으로 Sphere Analytics는 앱이 실행된 후 비활성화되는 시점에 자동으로 기록된 모든 이벤트들을 서버에 전송합니다.  
하지만 `requestUpload` 함수를 호출할 경우 호출 시점까지 기록된 모든 이벤트들을 즉시 서버로 전송이 가능하며 해당 시점에 즉시 이벤트 수집이 필요한 경우에만 사용하기를 권장합니다.

```java
SphereAnalytics.requestUpload();
```

### 앱 언어 설정

기본적으로 시스템 설정의 언어 정보를 사용하기 때문에 대부분의 앱에서는 설정할 필요가 없습니다.  
시스템 설정의 언어 설정이 아닌 앱 내에서 별도의 언어 설정을 사용하는 경우에만 해당되는 사용자 속성입니다.  

`<Java>`

```java
// 앱 사용 언어 코드 설정
SphereAnalytics.setAppLanguage("ko"); // 언어 코드
```

### 이벤트 수집 비활성화

Sphere Analytics의 이벤트 수집 기능을 비활성화하기를 원할 경우 아래와 같은 코드를 추가합니다.
기본 설정은 활성화 상태이며 비활성화된 이후로는 다시 활성화하기 전까지 이벤트가 수집되지 않습니다.

`<Java>`

```java
SphereAnalytics.setAnalyticsCollectionEnabled(false); // 비활성화
```
