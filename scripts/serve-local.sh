#!/usr/bin/env sh
set -eu

PORT="${1:-8000}"

if command -v python3 >/dev/null 2>&1; then
  echo "Serving at http://localhost:${PORT}"
  exec python3 -m http.server "${PORT}"
fi

if command -v python >/dev/null 2>&1; then
  echo "Serving at http://localhost:${PORT}"
  exec python -m SimpleHTTPServer "${PORT}"
fi

echo "Python is required to run a local preview server." >&2
exit 1
