# PetAdopt API Regression Tests (PowerShell)
$baseUrl = "https://localhost:7001"
$pass = 0
$fail = 0

function Check([string]$label, [int]$status, [int]$expected) {
    if ($status -eq $expected) {
        Write-Host "  ✅ PASS — $label (HTTP $status)" -ForegroundColor Green
        $script:pass++
    } else {
        Write-Host "  ❌ FAIL — $label (Expected $expected, Got $status)" -ForegroundColor Red
        $script:fail++
    }
}

Write-Host "=========================================="
Write-Host "  PetAdopt API Regression Test Suite"
Write-Host "=========================================="

# 1. PUBLIC ENDPOINTS
Write-Host "`n── 1. PUBLIC ENDPOINTS ──"
try {
    $resp = Invoke-WebRequest -Uri "$baseUrl/api/pets" -SkipCertificateCheck -Method Get
    Check "GET /api/pets" $resp.StatusCode 200
} catch { Check "GET /api/pets" $_.Exception.Response.StatusCode 200 }

# ... (Additional tests can be added similarly)

Write-Host "`n=========================================="
Write-Host "  RESULTS: ✅ $pass passed  ❌ $fail failed"
Write-Host "=========================================="
