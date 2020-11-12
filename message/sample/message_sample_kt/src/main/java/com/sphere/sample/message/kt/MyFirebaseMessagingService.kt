package com.sphere.sample.message.kt

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.sphere.message.SpherePushMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {}
}
