@echo off

set GOOGLE_CLOUD_PROJECT=lateral-ceiling-437101-j3
set PROJECT_NAME=scaneats-website

CALL gcloud config^
    set project %GOOGLE_CLOUD_PROJECT%
CALL gcloud builds submit^
    --tag gcr.io/%GOOGLE_CLOUD_PROJECT%/%PROJECT_NAME%
CALL gcloud run deploy^
    %PROJECT_NAME%^
    --image gcr.io/%GOOGLE_CLOUD_PROJECT%/%PROJECT_NAME%^
    --platform=managed^
    --region=asia-southeast2^
    --allow-unauthenticated^
    --max-instances=1^
    --cpu-boost^
    --cpu=2^
    --memory=4096Mi