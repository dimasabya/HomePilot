#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include "config.h"
#include "api.h"
#include "relay.h"

void sendHeartbeat(){

  if(WiFi.status() != WL_CONNECTED){
    return;
  }

  WiFiClientSecure client;

  client.setInsecure();

  HTTPClient http;

  String url = String(API_URL) + "/devices/heartbeat";

  Serial.println("HeartBeat: ");
  Serial.println(url);

  if(!http.begin(client, url)){
    Serial.println("HTTP begin failed");
    return;
  }

  http.addHeader("Content-Type", "application/json");
  http.addHeader(
  "Authorization",
  "Bearer " + String(DEVICE_TOKEN)
);

  String body = 
    "{"
    "\"code\":\"" + String(DEVICE_CODE) + "\","
    "\"ip\":\"" + WiFi.localIP().toString() + "\""
    "}";

  int response = http.POST(body);

  if(response == 200) {
    Serial.println("Heatbeat OK");
  }else {
    Serial.println("Heatbeat Failed: ");
    Serial.println(response);

    if(response > 0) {
      Serial.println(http.getString());
    }
  }

  http.end();
}

bool getRelayStatus(){

  if(WiFi.status() != WL_CONNECTED){
    return false;
  }

  WiFiClientSecure client;

  client.setInsecure();

  HTTPClient http;

  String url = 
    String(API_URL) + "/devices/" + String(DEVICE_CODE) + "/status";

  Serial.println("Relay status URL: ");
  Serial.println(url);

  if(!http.begin(client, url)){
    Serial.println("HTTP begin failed");
    return false;
  }

  http.addHeader(
  "Authorization",
  "Bearer " + String(DEVICE_TOKEN)
  );

  int response = http.GET();

  if(response == 200) {
    String data = http.getString();

    Serial.println("Response: ");
    Serial.println(data);

    StaticJsonDocument<200> doc;

    DeserializationError error = deserializeJson(doc, data);

    if(error) {
      Serial.println("JSON parse failed");
      http.end();
      return false;
    }

    bool relay = doc["relay"];

    http.end();

    return relay;
  }

  Serial.println("Relay status request failed: ");
  Serial.println(response);
  
  http.end();
  return false;
}