package com.moodyplayer
import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.content.res.Configuration;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.oblador.vectoricons.VectorIconsPackage;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "MoodyPlayer"
  

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
    }


    override fun onResume() {
    super.onResume()
    val intent = intent
    val uri: Uri? = intent?.data

    if (uri != null && uri.toString().startsWith("myapp://callback")) {
        // Extract the authorization code from the URI
        val authorizationCode = uri.getQueryParameter("code")

        if (authorizationCode != null) {
            // Now you can use this authorization code to get the access token from Spotify
            // You can call your React Native method or any Java/Kotlin function to continue the flow
            // For example, pass this code to your Spotify access token exchange function
            // Alternatively, you can call a method in React Native to handle this further.
            println("Authorization Code: $authorizationCode")
        } else {
            println("Authorization Code not found!")
        }
    }
}

}
