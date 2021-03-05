package com.sphere.sample.message.kt

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Switch
import androidx.appcompat.app.AppCompatActivity
import com.sphere.message.SpherePushMessage

class MainActivity : AppCompatActivity() {
    companion object {
        private const val KEY_YOUR_PUSH_LINK = "key_your_push_link"
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)

        // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
        SpherePushMessage.handleNewIntent(intent)

        // 푸시메시지 커스텀 데이터 전달 처리
        val extras = intent!!.extras
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            val link = extras.getString(KEY_YOUR_PUSH_LINK)
            // 링크 페이지로 이동
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        (findViewById<View>(R.id.agree_push_info) as Switch).setOnCheckedChangeListener { buttonView, isChecked ->
            // 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
            SpherePushMessage.agreePushMessageForInformation(isChecked)
        }
        (findViewById<View>(R.id.agree_push_ad) as Switch).setOnCheckedChangeListener { buttonView, isChecked ->
            // 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
            SpherePushMessage.agreePushMessageForAdvertisement(isChecked)
        }
        (findViewById<View>(R.id.agree_push_night) as Switch).setOnCheckedChangeListener { buttonView, isChecked ->
            // 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
            SpherePushMessage.agreePushMessageAtNight(isChecked)
        }

        // 푸시메시지 커스텀 데이터 전달 처리
        val extras = intent!!.extras
        if (extras != null && extras.containsKey(KEY_YOUR_PUSH_LINK)) {
            val link = extras.getString(KEY_YOUR_PUSH_LINK)
            // 링크 페이지로 이동
        }
    }
}