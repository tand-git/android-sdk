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

//        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        SphereApp.setUserLevel(this, "useTestServer!@#$");
        SphereApp.setUserLevel(this, "SphereDebugUser!@#$");
        SphereAnalytics.configure(this, "app_key_android_sphere_sample");
    }
}
