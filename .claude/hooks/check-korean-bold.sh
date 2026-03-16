#!/bin/bash
# MDX 파일에서 한글 사이에 ** 볼드 구문이 있으면 경고
# 한글(유니코드) 뒤에 **로 시작하고 **로 끝난 후 다시 한글이 오는 패턴 검출
set -euo pipefail

# TOOL_INPUT에서 file_path 추출
FILE_PATH=$(echo "$TOOL_INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)"/\1/')

# MDX 파일이 아니면 무시
case "$FILE_PATH" in
  *.mdx) ;;
  *) exit 0 ;;
esac

# 파일이 존재하는지 확인
[ -f "$FILE_PATH" ] || exit 0

# 한글 뒤에 **텍스트**가 오고 다시 한글이 오는 패턴 검출
# perl regex로 한글(U+AC00-U+D7A3) 범위 체크
MATCHES=$(perl -ne 'print "$.: $_" if /[\x{AC00}-\x{D7A3}]\*\*[^*]+\*\*[\x{AC00}-\x{D7A3}]/' "$FILE_PATH" 2>/dev/null || true)

if [ -n "$MATCHES" ]; then
  echo "⚠️ 한글 볼드 파싱 경고: 아래 줄에서 **볼드** 구문이 한글과 바로 붙어있어 렌더링이 깨질 수 있습니다."
  echo "→ <strong>태그</strong>로 변경하세요."
  echo ""
  echo "$MATCHES"
  exit 1
fi

exit 0
