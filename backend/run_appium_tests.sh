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

# Run Appium tests if script exists
if [ -f ./backend/package.json ] && npm run --prefix ./backend | grep -q "test:appium"; then
  echo "Running Appium tests..."
  npm run test:appium --prefix ./backend
else
  echo "ℹ️  No test:appium script defined – APK installed successfully on emulator"
fi
