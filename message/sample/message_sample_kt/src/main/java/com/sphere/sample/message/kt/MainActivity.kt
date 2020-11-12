package com.sphere.sample.message.kt

import android.os.Bundle
import android.view.View
import android.widget.Switch
import androidx.appcompat.app.AppCompatActivity
import com.sphere.message.SpherePushMessage

class MainActivity : AppCompatActivity() {
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
    }
}