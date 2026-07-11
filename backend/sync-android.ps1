# sync-android.ps1
# Run this from the project root after `npm run build`
# It copies the compiled web assets into the native Android project

$distPath   = Join-Path $PSScriptRoot "dist"
$assetsPath = Join-Path $PSScriptRoot "android\app\src\main\assets\public"

if (!(Test-Path $distPath)) {
    Write-Error "dist/ folder not found. Run 'npm run build' first."
    exit 1
}

# Clean previous assets
if (Test-Path $assetsPath) {
    Remove-Item -Recurse -Force $assetsPath
}
New-Item -ItemType Directory -Force -Path $assetsPath | Out-Null

# Copy fresh build
Copy-Item -Recurse -Force "$distPath\*" $assetsPath
Write-Host "✓ Web assets synced to android/app/src/main/assets/public/" -ForegroundColor Green
