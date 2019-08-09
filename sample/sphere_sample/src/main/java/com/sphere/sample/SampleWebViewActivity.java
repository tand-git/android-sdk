package com.sphere.sample;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

import com.sphere.analytics.SphereJsInterface;

public class SampleWebViewActivity extends Activity {

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_webview);

        mWebView = findViewById(R.id.webview);

        // Add Sphere JavaScript Interface Handler
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.addJavascriptInterface(new SphereJsInterface(), "SphereJsInterface");

        // Navigate to site
        String folderPath = "file:android_asset/";
        String fileName = "index.html";
        String hostingUrl = folderPath + fileName;

        mWebView.loadUrl(hostingUrl);
//        mWebView.loadUrl("your website url");
    }

}
