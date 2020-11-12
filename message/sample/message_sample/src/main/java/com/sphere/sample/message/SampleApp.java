package com.sphere.sample.message;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;
import com.sphere.analytics.SphereAnalytics;
import com.sphere.message.SpherePushMessage;

public class SampleApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Sphere SDK 초기화
        SphereAnalytics.configure(this, "Your Sphere SDK App Key");

        // 기존 설치된 사용자를 위한 푸시 토큰 설정
        if (!SpherePushMessage.hasFcmToken()) {

            FirebaseMessaging.getInstance().getToken()
                    .addOnCompleteListener(new OnCompleteListener<String>() {
                        @Override
                        public void onComplete(@NonNull Task<String> task) {
                            if (!task.isSuccessful()) {
                                Log.w("Firebase", "Fetching FCM registration token failed", task.getException());
                                return;
                            }

                            // Sphere SDK 푸시 토큰 설정
                            String token = task.getResult();
                            SpherePushMessage.setFcmToken(token);
                        }
                    });
        }
    }
}
