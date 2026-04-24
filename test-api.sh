#!/bin/bash
# PetAdopt API Regression Tests
# Run: chmod +x test-api.sh && ./test-api.sh

set -e
echo "=========================================="
echo "  PetAdopt API Regression Test Suite"
echo "=========================================="

BASE_URL="https://localhost:7001"
PASS=0; FAIL=0

check() {
  local label=$1; local status=$2; local expected=$3
  if [ "$status" -eq "$expected" ]; then
    echo "  ✅ PASS — $label (HTTP $status)"
    ((PASS++))
  else
    echo "  ❌ FAIL — $label (Expected $expected, Got $status)"
    ((FAIL++))
  fi
}

# SEED DATA (Adjust as needed for your DB)
ADMIN_EMAIL="admin@petadopt.com"
ADMIN_PASS="Admin@123456"
SHELTER_EMAIL="shelter@test.com"
SHELTER_PASS="Shelter@123456"
ADOPTER_EMAIL="adopter@test.com"
ADOPTER_PASS="Adopter@123456"

# ─────────────────────────────────────────────
# 1. PUBLIC ENDPOINTS (no auth)
# ─────────────────────────────────────────────
echo ""
echo "── 1. PUBLIC ENDPOINTS ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/pets")
check "GET /api/pets (public browse)" $STATUS 200

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/pets/1")
check "GET /api/pets/1 (pet detail)" $STATUS 200

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/reviews/pet/1")
check "GET /api/reviews/pet/1 (public reviews)" $STATUS 200

# ─────────────────────────────────────────────
# 2. AUTH ENDPOINTS
# ─────────────────────────────────────────────
echo ""
echo "── 2. AUTH ──"

# Login as Adopter
ADOPTER_RESP=$(curl -sk -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADOPTER_EMAIL\",\"password\":\"$ADOPTER_PASS\"}")
ADOPTER_TOKEN=$(echo $ADOPTER_RESP | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
check "POST /api/auth/login (adopter)" $([ -n "$ADOPTER_TOKEN" ] && echo 200 || echo 401) 200

# Login as Shelter
SHELTER_RESP=$(curl -sk -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$SHELTER_EMAIL\",\"password\":\"$SHELTER_PASS\"}")
SHELTER_TOKEN=$(echo $SHELTER_RESP | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
check "POST /api/auth/login (shelter)" $([ -n "$SHELTER_TOKEN" ] && echo 200 || echo 401) 200

# Login as Admin
ADMIN_RESP=$(curl -sk -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASS\"}")
ADMIN_TOKEN=$(echo $ADMIN_RESP | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
check "POST /api/auth/login (admin)" $([ -n "$ADMIN_TOKEN" ] && echo 200 || echo 401) 200

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/auth/me" \
  -H "Authorization: Bearer $ADOPTER_TOKEN")
check "GET /api/auth/me (authenticated)" $STATUS 200

# ─────────────────────────────────────────────
# 3. ROUTE GUARD TESTS (must return 401/403)
# ─────────────────────────────────────────────
echo ""
echo "── 3. ROUTE GUARD TESTS (expect 401/403) ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/admin/users/pending")
check "GET /admin/users/pending WITHOUT token → 401" $STATUS 401

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/admin/users/pending" \
  -H "Authorization: Bearer $ADOPTER_TOKEN")
check "GET /admin/users/pending AS ADOPTER → 403" $STATUS 403

# ─────────────────────────────────────────────
# 4. ADOPTER ENDPOINTS
# ─────────────────────────────────────────────
echo ""
echo "── 4. ADOPTER ENDPOINTS ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/favorites" \
  -H "Authorization: Bearer $ADOPTER_TOKEN")
check "GET /api/favorites (adopter)" $STATUS 200

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/adoption-requests" \
  -H "Authorization: Bearer $ADOPTER_TOKEN")
check "GET /api/adoption-requests (adopter)" $STATUS 200

# ─────────────────────────────────────────────
# 5. SHELTER ENDPOINTS
# ─────────────────────────────────────────────
echo ""
echo "── 5. SHELTER ENDPOINTS ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/shelter/pets" \
  -H "Authorization: Bearer $SHELTER_TOKEN")
check "GET /api/shelter/pets (shelter)" $STATUS 200

# ─────────────────────────────────────────────
# 6. ADMIN ENDPOINTS
# ─────────────────────────────────────────────
echo ""
echo "── 6. ADMIN ENDPOINTS ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" "$BASE_URL/api/admin/users/pending" \
  -H "Authorization: Bearer $ADMIN_TOKEN")
check "GET /api/admin/users/pending (admin)" $STATUS 200

# ─────────────────────────────────────────────
# 7. SIGNALR HUB REACHABILITY
# ─────────────────────────────────────────────
echo ""
echo "── 7. SIGNALR HUB ──"

STATUS=$(curl -sk -o /dev/null -w "%{http_code}" \
  "$BASE_URL/hubs/notifications/negotiate?access_token=$ADOPTER_TOKEN" \
  -X POST)
check "POST /hubs/notifications/negotiate (adopter)" $STATUS 200

# ─────────────────────────────────────────────
# RESULTS
# ─────────────────────────────────────────────
echo ""
echo "=========================================="
echo "  RESULTS: ✅ $PASS passed  ❌ $FAIL failed"
echo "=========================================="
