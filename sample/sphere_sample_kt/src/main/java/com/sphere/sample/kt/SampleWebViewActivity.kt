package com.sphere.sample.kt

import android.app.Activity
import android.os.Bundle
import android.webkit.WebView
import com.sphere.analytics.SphereJsInterface

class SampleWebViewActivity : Activity() {

//    private var mWebView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webview)

        // Initialize the webview
        val webView = findViewById<WebView>(R.id.webview)
        webView.settings.javaScriptEnabled = true


        // Add Sphere JavaScript Interface for Sphere Analytics
        webView.addJavascriptInterface(SphereJsInterface(), "SphereJsInterface")


        // Navigate to site
        webView.loadUrl("file:///android_asset/index.html")
//        webView.loadUrl("your website url");
    }
}