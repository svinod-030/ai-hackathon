#!/bin/bash

# ============================================
# TalentIQ AI Backend Test Script
# Tests:
# 1. Health Check
# 2. JD Upload
# 3. Resume Upload
# 4. JD-Resume Matching
# 5. Interview Question Generation
# ============================================

set -e

BASE_URL="http://localhost:5500"

echo ""
echo "======================================="
echo "TalentIQ AI Backend Test"
echo "======================================="

# ----------------------------------------
# 1. Health Check
# ----------------------------------------

echo ""
echo "1. Checking Server Health..."

curl --silent $BASE_URL

echo ""
echo ""
echo "Server is running."

# ----------------------------------------
# 2. Upload Job Description
# ----------------------------------------

echo ""
echo "2. Uploading Job Description..."

JD_RESPONSE=$(curl --silent --location \
  "$BASE_URL/api/jd/upload" \
  --form "jd=@./sample-data/jd.pdf")

echo "$JD_RESPONSE"

# Extract JD ID
JD_ID=$(echo "$JD_RESPONSE" | \
  grep -o '"id":"[^"]*' | \
  head -1 | cut -d'"' -f4)

echo ""
echo "JD ID: $JD_ID"

# ----------------------------------------
# 3. Upload Resume
# ----------------------------------------

echo ""
echo "3. Uploading Resume..."

RESUME_RESPONSE=$(curl --silent --location \
  "$BASE_URL/api/resume/upload" \
  --form "resume=@./sample-data/resume.pdf")

echo "$RESUME_RESPONSE"

# Extract Resume ID
RESUME_ID=$(echo "$RESUME_RESPONSE" | \
  grep -o '"id":"[^"]*' | \
  head -1 | cut -d'"' -f4)

echo ""
echo "Resume ID: $RESUME_ID"

# ----------------------------------------
# 4. Match JD & Resume
# ----------------------------------------

echo ""
echo "4. Matching Resume with JD..."

MATCH_RESPONSE=$(curl --silent \
  --location \
  --request POST "$BASE_URL/api/match" \
  --header "Content-Type: application/json" \
  --data "{
    \"jdId\": \"$JD_ID\",
    \"resumeId\": \"$RESUME_ID\"
}")

echo "$MATCH_RESPONSE"

# ----------------------------------------
# 5. Generate Interview Questions
# ----------------------------------------

echo ""
echo "5. Generating Interview Questions..."

INTERVIEW_RESPONSE=$(curl --silent \
  --location \
  --request POST "$BASE_URL/api/interview" \
  --header "Content-Type: application/json" \
  --data '{
    "skills": ["React", "Node.js", "PostgreSQL"],
    "experienceLevel": "mid"
}')

echo "$INTERVIEW_RESPONSE"

echo ""
echo ""
echo "======================================="
echo "All Tests Completed"
echo "======================================="