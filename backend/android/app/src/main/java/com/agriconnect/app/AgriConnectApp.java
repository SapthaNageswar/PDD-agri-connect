package com.agriconnect.app;

import android.app.Application;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

public class AgriConnectApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        initFirebase();
    }

    private void initFirebase() {
        try {
            if (FirebaseApp.getApps(this).isEmpty()) {
                // Manual Firebase init — works WITHOUT google-services.json
                // For Auth + Firestore. Push Notifications need google-services.json.
                FirebaseOptions options = new FirebaseOptions.Builder()
                    .setApiKey("AIzaSyANOJnZAzoRFFdgdHsNLKGcHLINQKLXSUo")
                    .setApplicationId("1:475911021221:web:6079644fb22af4c2fbe34c")
                    .setProjectId("agriconnect-33")
                    .setStorageBucket("agriconnect-33.firebasestorage.app")
                    .setGcmSenderId("475911021221")
                    .build();
                FirebaseApp.initializeApp(this, options);
            }
        } catch (Exception e) {
            android.util.Log.e("AgriConnect", "Firebase init failed: " + e.getMessage());
        }
    }
}
