#!/bin/sh

set -eu

# Process both .js bundles and all .env* files in one go:
find . -type f \( -name '*.js' -o -name '.env*' \) -print | \
while IFS= read -r file; do
  # Only run sed on files that actually contain a placeholder
  if grep -q 'FP_REPLACE_' "$file"; then
    sed -i \
      -e "s#FP_REPLACE_API_URL#$API_URL#g" \
      -e "s#FP_REPLACE_KEYCLOAK_ID#$KEYCLOAK_ID#g" \
    "$file"
  fi
done

exec node server.js;
