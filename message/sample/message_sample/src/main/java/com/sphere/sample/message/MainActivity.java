package com.sphere.sample.message;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.CompoundButton;
import android.widget.Switch;

import com.sphere.message.SpherePushMessage;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        // 앱 실행 시 Sphere 푸시 메시지 데이터 처리
        SpherePushMessage.handleNewIntent(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ((Switch)findViewById(R.id.agree_push_info)).setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                // 정보성 푸시 발송 동의 설정
                SpherePushMessage.agreePushMessageForInformation(isChecked);
            }
        });

        ((Switch)findViewById(R.id.agree_push_ad)).setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                // 광고성 푸시 발송 동의 설정
                SpherePushMessage.agreePushMessageForAdvertisement(isChecked);
            }
        });

        ((Switch)findViewById(R.id.agree_push_night)).setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                // 야간 푸시 발송 동의 설정
                SpherePushMessage.agreePushMessageAtNight(isChecked);
            }
        });
    }
}