package com.sphere.sample;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

import com.sphere.analytics.ParamBuilder;
import com.sphere.analytics.SphereAnalytics;

public class SampleAnalyticsActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_analytics);

        findViewById(R.id.log_event).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 이벤트 파라미터 설정
                ParamBuilder paramBuilder = new ParamBuilder()
                        .setParam("item", "notebook")
                        .setParam("quantity", 1)
                        .setParam("price", 9.9);
                // 이벤트 기록
                SphereAnalytics.logEvent("purchase", paramBuilder);

                // 파라미터가 없는 이벤트 기록
                SphereAnalytics.logEvent("purchase_clicked", null);
            }
        });

        findViewById(R.id.set_user_property).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                boolean isLogIn = true;

                if (isLogIn) { // 로그인: ON 상태

                    // 사용자 아이디 설정
                    SphereAnalytics.setUserId("[USER ID]");

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

                    // 사용자 포인트 설정
                    SphereAnalytics.setRemainingPoint(1000); // 현재 보유 포인트
                    SphereAnalytics.setTotalEarnedPoint(5000); // 총 적립 포인트
                    SphereAnalytics.setTotalUsedPoint(4000); // 총 사용 포인트

                } else { // 로그아웃: OFF 상태

                    // 사용자 아이디 초기화
                    SphereAnalytics.setUserId(null);

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

                    // 사용자 포인트 초기화(현재 보유 포인트, 총 적립 포인트, 총 사용 포인트)
                    SphereAnalytics.resetPoints();
                }

                // 커스텀 사용자 속성 설정
                SphereAnalytics.setUserProperty("user_property_name", "user_property_value");
                // 커스텀 사용자 속성 초기화
//                SphereAnalytics.setUserProperty("user_property_name", null);
            }
        });

        findViewById(R.id.reset_user_properties).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 사용자 속성 전체 초기화
                SphereAnalytics.resetUserProperties();
            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        // 강제 종료 이전에 세션 업데이트 함수 호출
//        SphereAnalytics.updateSessionBeforeProcessKill();

        // 앱 종료 시 강제적으로 프로세스를 종료한다면 위의 코드 호출 필요
//        android.os.Process.killProcess(android.os.Process.myPid());
    }
}
