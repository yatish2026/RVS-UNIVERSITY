$zipName = "rvs-quick-update.zip"
if (Test-Path $zipName) { Remove-Item $zipName -Force }

# First sync public/mail.php and public/api to dist
Copy-Item "public/mail.php" "dist/mail.php" -Force
Copy-Item "public/api/*" "dist/api/" -Recurse -Force

$staging = "rvs-quick-staging"
if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }

New-Item -ItemType Directory -Path "$staging/assets" -Force | Out-Null
New-Item -ItemType Directory -Path "$staging/api" -Force | Out-Null

Copy-Item "dist/index.html" "$staging/"
Copy-Item "dist/mail.php" "$staging/"
Copy-Item "dist/assets/index-*.js" "$staging/assets/"
Copy-Item "dist/assets/index-*.css" "$staging/assets/"
Copy-Item "dist/api/*" "$staging/api/" -Recurse -Force

Compress-Archive -Path "$staging/*" -DestinationPath $zipName -Force
Remove-Item $staging -Recurse -Force

$f = Get-Item $zipName
Write-Output "SUCCESS: Created $($f.Name) - Size: $([math]::Round($f.Length / 1KB, 2)) KB"
