#include <Arduino.h>
#include <WiFi.h>

#include "config.h"
#include "wifi_manager.h"
#include "secrets.h"

void wifiBegin() {
    WiFi.mode(WIFI_STA);
    WiFi.setAutoReconnect(true);
    WiFi.persistent(true);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    Serial.print("Connecting to WiFi");

    while(WiFi.status() != WL_CONNECTED){

        delay(500);
        Serial.print(".");
    }


    Serial.println();

    Serial.println("WiFi Connected");

    Serial.println(
        WiFi.localIP()
    );
}

unsigned long lastReconnnectAttempt = 0;

void wifiReconnect() {
    if(WiFi.status() == WL_CONNECTED) {
        return;
    }

    if(millis() - lastReconnnectAttempt < 5000) {
        return;
    }

    lastReconnnectAttempt = millis();

    Serial.println("Wifi disconnected...");
    Serial.println("Reconnect...");

    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
}