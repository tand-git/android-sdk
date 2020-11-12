package com.sphere.sample.kt

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.sphere.analytics.SphereJsInterface
import org.json.JSONObject

class SampleWebViewActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_webview)

        // Initialize the webview
        val webView = findViewById<WebView>(R.id.webview)
        webView.settings.javaScriptEnabled = true


        // Add Sphere JavaScript Interface for Sphere Analytics
        webView.addJavascriptInterface(TagJSInterface(), "TagJSInterface")


        // Navigate to site
        webView.loadUrl("file:///android_asset/index.html")
//        webView.loadUrl("your website url");
    }
}

class TagJSInterface {
    @JavascriptInterface
    fun postMessage(message: String?) {
        if(message == null)  return
        try {
            val jsonObject = JSONObject(message)
            when (jsonObject.optString("name")) {

                SphereJsInterface.getHandlerName() -> {
                    SphereJsInterface.handlePostMessageJsonObject(jsonObject)
                }

            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}