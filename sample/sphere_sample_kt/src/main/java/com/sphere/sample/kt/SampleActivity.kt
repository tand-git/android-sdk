package com.sphere.sample.kt

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View

class SampleActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sample)

        findViewById<View>(R.id.sample_analytics).setOnClickListener {
            startActivity(Intent(this, SampleAnalyticsActivity::class.java))
        }

        findViewById<View>(R.id.sample_webview).setOnClickListener {
            startActivity(Intent(this, SampleWebViewActivity::class.java))
        }
    }
}
