#!/bin/bash

# Configuration

SUPABASE_URL="https://sgstggxmzmcyctxzjbog.supabase.co"
SUPABASE_BUCKET="web-page"

FILE_NAME=parcjeandrapeau.html
URL_TO_FETCH="https://www.parcjeandrapeau.com/en/skaters-trail-skating-rink-ice-skate-activity-winter-montreal/"

NEW_FILE_NAME=parcjeandrapeau_$(date "+%Y.%m.%d-%H.%M").html

echo $NEW_FILE_NAME

echo "Fetching $URL_TO_FETCH..."
curl -s "$URL_TO_FETCH" -o "$FILE_NAME"

MOVE_URL="$SUPABASE_URL/storage/v1/object/move"

RESPONSE=$(curl -s -X POST "$MOVE_URL" \
    -H "Authorization: Bearer $SUPABASE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"bucketId\":\"$SUPABASE_BUCKET\", \"sourceKey\":\"$FILE_NAME\", \"destination\":\"$NEW_FILE_NAME\"}")



# Check response
if [[ $RESPONSE == *"error"* ]]; then
    echo "❌ Failed to rename file: $RESPONSE"
else
    echo "✅ File renamed successfully!"
    echo "🔗 New File URL: $SUPABASE_URL/storage/v1/object/public/$SUPABASE_BUCKET/$NEW_FILE_NAME"
fi

if [ ! -f "$FILE_NAME" ]; then
    echo "❌ Failed to fetch the webpage."
    exit 1
fi

echo "✅ Page saved as $FILE_NAME"

echo "Uploading to Supabase Storage..."

UPLOAD_RESPONSE=$(curl -X POST "$SUPABASE_URL/storage/v1/object/$SUPABASE_BUCKET/$FILE_NAME" \
  --data-binary "@$FILE_NAME" \
  -H "apikey: {anon-key}" \
  -H "Authorization: Bearer $SUPABASE_KEY")

echo "✅ File uploaded successfully!"

# Optional: Remove the local file after upload
rm "$FILE_NAME"
