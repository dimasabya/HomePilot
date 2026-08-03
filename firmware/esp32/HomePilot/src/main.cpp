#include <Arduino.h>

#include "config.h"
#include "wifi_manager.h"
#include "relay.h"
#include "api.h"

unsigned long lastHeartbeat = 0;

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

  bool status = getRelayStatus();

  if(status) {
    relayOn();
  } else {
    relayOff();
  }

  delay(200);
}
