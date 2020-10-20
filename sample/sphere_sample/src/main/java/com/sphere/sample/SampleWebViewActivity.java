package com.sphere.sample;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;

import com.sphere.analytics.SphereJsInterface;

public class SampleWebViewActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_webview);

        // Initialize the webview
        WebView webView = findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);


        // Add Sphere JavaScript Interface for Sphere Analytics
        webView.addJavascriptInterface(new SphereJsInterface(), SphereJsInterface.getHandlerName());


        // Navigate to site
        webView.loadUrl("file:///android_asset/index.html");
//        webView.loadUrl("your website url");
    }
}
