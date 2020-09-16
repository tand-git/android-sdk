package com.sphere.sample.kt

import android.app.Application
import com.sphere.analytics.SphereAnalytics

class SampleApp : Application() {

    override fun onCreate() {
        super.onCreate()

        // 로그 활성화
        SphereAnalytics.enableLog(true)

        // Sphere Analytics SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key")
    }
}