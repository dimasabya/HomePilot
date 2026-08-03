#include <Arduino.h>

#include "config.h"
#include "relay.h"

void relayBegin() {
    pinMode(RELAY_PIN, INPUT);
}

void relayOn() {
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW);
}

void relayOff() {
    pinMode(RELAY_PIN, INPUT);
}

bool relayStatus() {
    return digitalRead(RELAY_PIN) == LOW;
}