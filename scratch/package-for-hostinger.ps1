# package-for-hostinger.ps1
# Este script prepara el proyecto para subirlo a Hostinger Node.js Manager.

Write-Host "--- Preparando paquete para Hostinger ---" -ForegroundColor Cyan

# 1. Verificar si existe la carpeta standalone
if (!(Test-Path ".next/standalone")) {
    Write-Host "No se detectó la carpeta '.next/standalone'. Ejecutando build primero..." -ForegroundColor Yellow
    npm run build
}

if (!(Test-Path ".next/standalone")) {
    Write-Host "ERROR: No se pudo generar la carpeta standalone. Revisa que next.config.mjs tenga output: 'standalone'." -ForegroundColor Red
    exit
}

# 2. Crear carpeta temporal de empaquetado
$tempDir = "deploy_temp"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copiando archivos standalone..." -ForegroundColor Gray
Copy-Item -Recurse ".next/standalone/*" $tempDir

Write-Host "Copiando assets públicos..." -ForegroundColor Gray
if (Test-Path "public") {
    Copy-Item -Recurse "public" "$tempDir/public"
}

Write-Host "Copiando archivos estáticos de Next.js..." -ForegroundColor Gray
if (Test-Path ".next/static") {
    $staticDest = "$tempDir/.next/static"
    if (!(Test-Path "$tempDir/.next")) { New-Item -ItemType Directory -Path "$tempDir/.next" | Out-Null }
    Copy-Item -Recurse ".next/static" $staticDest
}

# 3. Crear el archivo ZIP
$zipFile = "hostinger_deploy.zip"
if (Test-Path $zipFile) { Remove-Item $zipFile }

Write-Host "Generando archivo ZIP: $zipFile ..." -ForegroundColor Green
Compress-Archive -Path "$tempDir/*" -DestinationPath $zipFile

# 4. Limpiar
Remove-Item -Recurse -Force $tempDir

Write-Host "`n====================================================" -ForegroundColor Cyan
Write-Host " PROCESO COMPLETADO CON ÉXITO" -ForegroundColor Green
Write-Host "====================================================`n" -ForegroundColor Cyan
Write-Host "Instrucciones para Hostinger:"
Write-Host "1. Sube '$zipFile' a tu administrador de archivos en Hostinger."
Write-Host "2. Descomprímelo en la carpeta donde apunta tu Node.js App."
Write-Host "3. Asegúrate de configurar las Variables de Entorno (SUPABASE_URL, etc.) en el panel de Hostinger."
Write-Host "4. El archivo de inicio debe ser 'server.js'."
Write-Host "====================================================`n"
