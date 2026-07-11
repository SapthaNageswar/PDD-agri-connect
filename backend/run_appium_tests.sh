#!/bin/bash
# Wait for emulator to fully boot
echo "Waiting for device..."
adb wait-for-device
echo "Device connected. Checking boot completion..."
adb shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done'
echo "✅ Emulator ready"

# Install the built APK
echo "Installing APK..."
adb install -r ./backend/android/app/build/outputs/apk/debug/app-debug.apk

# Start Appium server in background
echo "Starting Appium server..."
appium --relaxed-security &
sleep 8

# Run Appium Simulation
echo "Starting Appium test execution simulation..."
python ./backend/run_appium_simulation.py
