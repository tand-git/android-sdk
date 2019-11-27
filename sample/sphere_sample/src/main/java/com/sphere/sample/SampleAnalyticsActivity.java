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

        findViewById(R.id.set_user_id).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 사용자 아이디 설정
                SphereAnalytics.setUserId("User ID");
                // 사용자 아이디 초기화
                SphereAnalytics.setUserId(null);
            }
        });

        findViewById(R.id.set_user_property).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 사용자 속성 설정
                SphereAnalytics.setUserProperty("user_property_name", "user_property_value");
                // 사용자 속성 초기화
                SphereAnalytics.setUserProperty("user_property_name", null);
                // 사용자 속성 전체 초기화
                SphereAnalytics.resetUserProperties();
            }
        });

        // 화면 이벤트 기록
        SphereAnalytics.logEvent("product_view", null);
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
