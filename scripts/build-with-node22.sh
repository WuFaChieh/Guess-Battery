#!/usr/bin/env bash
# Local workaround for this Windows dev machine's Node 24 vs Rollup
# native-addon build crash (see CLAUDE.md Known issues). Runs the exact
# same build as `npm run build` (tsc, then vite build) but through the
# standalone Node 22 runtime in .tools/node22 instead of whatever Node
# is the system default here.
#
# Setup: unzip a Node 22.x "win-x64" zip from https://nodejs.org/dist/
# into .tools/node22 (so .tools/node22/node.exe exists) -- no install,
# no admin rights needed. .tools/ is gitignored; this is per-machine.
#
# Usage: bash scripts/build-with-node22.sh   (run from the repo root)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE22="$REPO_ROOT/.tools/node22/node.exe"

if [ ! -x "$NODE22" ]; then
  echo "error: $NODE22 not found." >&2
  echo "Download a Node 22.x win-x64 zip from https://nodejs.org/dist/ and unzip it to .tools/node22 (so .tools/node22/node.exe exists)." >&2
  exit 1
fi

cd "$REPO_ROOT"
echo "Using $("$NODE22" --version) from $NODE22"
"$NODE22" node_modules/typescript/bin/tsc --noEmit
"$NODE22" node_modules/vite/bin/vite.js build
