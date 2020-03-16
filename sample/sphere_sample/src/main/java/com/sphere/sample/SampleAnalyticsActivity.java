package com.sphere.sample;

import android.app.Activity;
import android.content.Intent;
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
                // 사용자 아이디 설정 - 로그인 상태
                SphereAnalytics.setUserId("[USER ID]");
                // 사용자 아이디 초기화 - 로그오프 상태
//                SphereAnalytics.setUserId(null);

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
            }
        });
    }

    @Override
    protected void onNewIntent(Intent intent) {
        if (intent != null) {
            // 딥링크 설정
            SphereAnalytics.setDeepLink(intent.getData());
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        // 강제 종료 이전에 세션 업데이트 함수 호출
//        SphereAnalytics.updateSessionBeforeProcessKill();

        // 앱 종료 시 강제적으로 프로세스 종료
//        android.os.Process.killProcess(android.os.Process.myPid());
    }
}
