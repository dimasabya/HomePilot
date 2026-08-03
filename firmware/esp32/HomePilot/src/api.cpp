#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include "config.h"
#include "api.h"
#include "relay.h"

void sendHeartbeat(){

  if (WiFi.status() != WL_CONNECTED) {
    return;
  }


  if(WiFi.status()==WL_CONNECTED){


    HTTPClient http;


    http.begin(
      String(API_URL) + "/devices/heartbeat"
    );


    http.addHeader(
    "Content-Type",
    "application/json"
    );



    String body = 
    "{"
    "\"code\":\""+String(DEVICE_CODE)+"\","
    "\"ip\":\""+WiFi.localIP().toString()+"\""
    "}";



    int response = http.POST(body);

    if (response == 200) {
      Serial.println("Heartbeat OK");
    }else {
      Serial.print("Heartbeat Failed: ");
      Serial.println(response);
    }

    http.end();
  }
}

bool getRelayStatus(){

  if (WiFi.status() != WL_CONNECTED) {
    return false;
  }

  if(WiFi.status()==WL_CONNECTED){

    HTTPClient http;

    http.begin(
      String(API_URL) + "/devices/" + DEVICE_CODE + "/status"
    );

    int response = http.GET();
    
    if(response == 200){
      String data = http.getString();

      Serial.println(data);

      StaticJsonDocument<200> doc;

      deserializeJson(doc,data);

      bool relay = doc["relay"];

      http.end();

      return relay;
    }
    http.end();
  }
  return false;
}