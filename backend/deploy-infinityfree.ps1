# deploy-infinityfree.ps1
# Prépare le package de déploiement pour InfinityFree (sans CB, sans Docker)
# Usage : .\deploy-infinityfree.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host ""
Write-Host "=== Isla Joya — Package InfinityFree ===" -ForegroundColor Cyan
Write-Host ""

# ─── 1. Composer prod ─────────────────────────────────────────────────────────
Write-Host "[1/4] composer install --no-dev..." -ForegroundColor Yellow
composer install --no-dev --optimize-autoloader --no-interaction
Write-Host "  OK" -ForegroundColor Green

# ─── 2. laravel.zip ───────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[2/4] laravel.zip (app + vendor, hors public/)..." -ForegroundColor Yellow

$laravelTemp = "$root\__laravel_temp__"
if (Test-Path $laravelTemp) { Remove-Item $laravelTemp -Recurse -Force }
New-Item -ItemType Directory $laravelTemp | Out-Null

$include = @('app','bootstrap','config','database','resources','routes','storage','vendor','artisan','composer.json','composer.lock')
foreach ($item in $include) {
    $src = Join-Path $root $item
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $laravelTemp $item) -Recurse
    }
}

# Vider les caches runtime (seront régénérés au premier appel)
$toEmpty = @(
    "$laravelTemp\storage\framework\cache\data",
    "$laravelTemp\storage\framework\sessions",
    "$laravelTemp\storage\framework\views",
    "$laravelTemp\storage\logs",
    "$laravelTemp\bootstrap\cache"
)
foreach ($dir in $toEmpty) {
    if (Test-Path $dir) {
        Get-ChildItem $dir -File | Remove-Item -Force
    }
}

# Exclure storage/app/public (ira dans htdocs/storage/)
$appPublic = "$laravelTemp\storage\app\public"
if (Test-Path $appPublic) { Remove-Item $appPublic -Recurse -Force }

$laravelZip = "$root\laravel.zip"
if (Test-Path $laravelZip) { Remove-Item $laravelZip -Force }
Compress-Archive -Path "$laravelTemp\*" -DestinationPath $laravelZip
Remove-Item $laravelTemp -Recurse -Force
Write-Host "  OK → laravel.zip" -ForegroundColor Green

# ─── 3. htdocs.zip ────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[3/4] htdocs.zip (index.php modifié + assets publics)..." -ForegroundColor Yellow

$htdocsTemp = "$root\__htdocs_temp__"
if (Test-Path $htdocsTemp) { Remove-Item $htdocsTemp -Recurse -Force }
New-Item -ItemType Directory $htdocsTemp | Out-Null

# index.php modifié pour InfinityFree
Copy-Item "$root\.infinityfree\htdocs-index.php" "$htdocsTemp\index.php"

# .htaccess spécifique InfinityFree
Copy-Item "$root\.infinityfree\htdocs-htaccess" "$htdocsTemp\.htaccess"

# Assets publics (favicon, robots, build/, etc.)
foreach ($f in Get-ChildItem "$root\public" -File) {
    if ($f.Name -notin @('index.php', '.htaccess')) {
        Copy-Item $f.FullName "$htdocsTemp\"
    }
}
foreach ($d in Get-ChildItem "$root\public" -Directory) {
    Copy-Item $d.FullName "$htdocsTemp\$($d.Name)" -Recurse
}

# storage/app/public → htdocs/storage/ (images produits, etc.)
$storageSrc = "$root\storage\app\public"
if (Test-Path $storageSrc) {
    Copy-Item $storageSrc "$htdocsTemp\storage" -Recurse
} else {
    New-Item -ItemType Directory "$htdocsTemp\storage" | Out-Null
}

$htdocsZip = "$root\htdocs.zip"
if (Test-Path $htdocsZip) { Remove-Item $htdocsZip -Force }
Compress-Archive -Path "$htdocsTemp\*" -DestinationPath $htdocsZip
Remove-Item $htdocsTemp -Recurse -Force
Write-Host "  OK → htdocs.zip" -ForegroundColor Green

# ─── 4. .env template ─────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[4/4] Génération APP_KEY..." -ForegroundColor Yellow
$appKey = "base64:" + [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
Write-Host "  APP_KEY = $appKey" -ForegroundColor Cyan

# ─── Résumé ───────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Package prêt !" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " Fichiers à uploader sur InfinityFree :"
Write-Host "   laravel.zip  → dézipper dans /laravel/"
Write-Host "   htdocs.zip   → dézipper dans /htdocs/"
Write-Host ""
Write-Host " Ensuite créer /laravel/.env avec :"
Write-Host "   (modèle : .infinityfree\env-template.txt)"
Write-Host ""
Write-Host "   APP_KEY=$appKey"
Write-Host "   APP_URL=https://VOTRE_SOUS_DOMAINE.infinityfreeapp.com"
Write-Host "   DB_PASSWORD=VOTRE_MDP_TIDB"
Write-Host ""
