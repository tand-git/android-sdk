package com.sphere.sample.kt

import android.app.Activity
import android.os.Bundle
import android.view.View
import com.sphere.analytics.ParamBuilder
import com.sphere.analytics.SphereAnalytics

class SampleAnalyticsActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_analytics)

        findViewById<View>(R.id.log_event).setOnClickListener {
            SphereAnalytics.logEvent("Purchase", null)

            // 이벤트 파라미터 설정
            val paramBuilder = ParamBuilder()
                    .setParam("item", "notebook")
                    .setParam("quantity", 1)
                    .setParam("price", 9.9)
            // 이벤트 기록
            SphereAnalytics.logEvent("purchase", paramBuilder)
        }

        findViewById<View>(R.id.set_user_property).setOnClickListener {
            val isLogIn = true

            if (isLogIn) { // 로그인: ON 상태

                // 사용자 아이디 설정
                SphereAnalytics.setUserId("[USER ID]")

                // 보유 포인트 설정
                SphereAnalytics.setRemainingPoint(1000)
                // 등급 설정
                SphereAnalytics.setGrade("vip")
                // 성별 설정
                SphereAnalytics.setGender("m") // 남성일 경우: "m"
//                SphereAnalytics.setGender("f"); // 여성일 경우: "f"
                // 출생년도 설정
                SphereAnalytics.setBirthYear(1995) // 출생년도
                // 이메일 설정
                SphereAnalytics.setEmail("xxxx@xxxx.com")
                // 전화번호 설정
                SphereAnalytics.setPhoneNumber("821011112222")

            } else { // 로그아웃: OFF 상태

                // 사용자 아이디 초기화
                SphereAnalytics.setUserId(null)

                // 보유 포인트 초기화
                SphereAnalytics.resetPoints()
                // 등급 초기화
                SphereAnalytics.setGrade(null)
                // 성별 초기화
                SphereAnalytics.setGender(null)
                // 출생년도 초기화
                SphereAnalytics.setBirthYear(0)
                // 이메일 초기화
                SphereAnalytics.setEmail(null)
                // 전화번호 초기화
                SphereAnalytics.setPhoneNumber(null)
            }
        }
    }

    override fun onStart() {
        super.onStart()

        // 파라미터가 없는 이벤트 기록
        SphereAnalytics.logEvent("purchaseView", null)
    }
}