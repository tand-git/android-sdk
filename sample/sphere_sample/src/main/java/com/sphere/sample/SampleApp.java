package com.sphere.sample;

import android.app.Application;

import com.sphere.analytics.SphereAnalytics;
import com.sphere.core.SphereApp;

public class SampleApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

//        SphereAnalytics.setSessionTimeout(1000 * 60); // 1분
        SphereAnalytics.enableLog(true); // 활성화

        SphereApp.configure(this, "Your Sphere SDK App Key");
    }
}
