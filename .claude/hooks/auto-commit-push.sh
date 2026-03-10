#!/bin/bash
# Auto commit and push after file changes
set -euo pipefail

PROJECT_DIR="$CLAUDE_PROJECT_DIR"

cd "$PROJECT_DIR"

# Check if there are any changes to commit
if git diff --quiet && git diff --staged --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  # No changes, exit silently
  exit 0
fi

# Stage all changes
git add -A

# Create commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "auto: 파일 변경사항 자동 저장 ($TIMESTAMP)" --no-verify 2>&1

# Push to remote
git push 2>&1

echo "✓ 변경사항이 자동으로 커밋 및 푸시되었습니다."
