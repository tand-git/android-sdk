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

        findViewById(R.id.send_event_1).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ParamBuilder paramBuilder = new ParamBuilder()
                        .setParam("item", "notebook")
                        .setParam("quantity", 1)
                        .setParam("price", 9.9);

                SphereAnalytics.logEvent("purchase", paramBuilder);
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

    }

    @Override
    protected void onNewIntent(Intent intent) {
        if (intent != null) {
            SphereAnalytics.setDeepLink(intent.getData());
        }
    }

}
