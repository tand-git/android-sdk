package com.sphere.sample.message.kt

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.sphere.message.SpherePushMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onNewToken(token: String) {
        // Sphere SDK 푸시 토큰 설정
        SpherePushMessage.setFcmToken(token)
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if (SpherePushMessage.isSpherePushMessage(remoteMessage.data)) {
            // Sphere 푸시 메시지 데이터 처리: 앱이 실행 중인 경우 알림창에 메시지 표시
            SpherePushMessage.handleMessageReceived(remoteMessage.data)

        } else {
            // Sphere 푸시 메시지가 아닌 경우 처리
        }
    }
}
