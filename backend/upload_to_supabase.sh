#!/bin/bash

# Configuration

echo "Fetching $URL_TO_FETCH..."
curl -s "$URL_TO_FETCH" -o "$FILE_NAME"

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
