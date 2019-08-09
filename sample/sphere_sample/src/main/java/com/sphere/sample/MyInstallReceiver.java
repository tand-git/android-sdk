package com.sphere.sample;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.sphere.analytics.SphereReferrerReceiver;

public class MyInstallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        SphereReferrerReceiver.handleOnReceive(context, intent);
    }
}
