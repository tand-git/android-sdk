package com.sphere.sample.message.kt

import android.app.Application
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import com.sphere.analytics.SphereAnalytics
import com.sphere.message.SpherePushMessage

class SampleApp : Application() {
    override fun onCreate() {
        super.onCreate()

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key")

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            // Sphere SDK 푸시 토큰 설정
            if (task.isSuccessful) {
                val token = task.result
                SpherePushMessage.setFcmToken(token)
            }
        })
    }
}
