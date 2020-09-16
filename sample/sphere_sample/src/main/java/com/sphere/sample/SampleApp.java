package com.sphere.sample;

import android.app.Application;

import com.sphere.analytics.SphereAnalytics;

public class SampleApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // 로그 활성화
        SphereAnalytics.enableLog(true);

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");
    }
}
