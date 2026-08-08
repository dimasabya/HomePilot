#include <Arduino.h>

#include "config.h"
#include "wifi_manager.h"
#include "relay.h"
#include "api.h"

unsigned long lastHeartbeat = 0;
unsigned long lastRelayCheck = 0;

void setup() {
  Serial.begin(115200);

  relayBegin();

  wifiBegin();
}

void loop() {
  wifiReconnect();

  if (millis() - lastHeartbeat > 10000) {
    sendHeartbeat();
    lastHeartbeat = millis();
  }

  // cek status relay setia p 1 detik
  if(millis() - lastRelayCheck > 1000){
    bool status = getRelayStatus();
  
    if(status) {
      relayOn();
      Serial.println("Relay on");
    } else {
      relayOff();
      Serial.println("Relay off");
    }

    lastRelayCheck = millis();
  }

  delay(50);
}
