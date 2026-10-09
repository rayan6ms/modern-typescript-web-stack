#!/bin/sh
set -eu

product='modern-typescript-web-stack'
version='0.1.10'
if command -v bun >/dev/null 2>&1; then
  runtime=bun
elif command -v node >/dev/null 2>&1; then
  runtime=node
  node -e 'if(Number(process.versions.node.split(".")[0])<22){console.error("Node.js 22+ is required.");process.exit(1)}'
else
  printf '%s\n' 'Install Bun or Node.js 22+ first, then rerun this command.' >&2
  exit 1
fi
command -v curl >/dev/null 2>&1 || { printf '%s\n' 'curl is required.' >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { printf '%s\n' 'tar is required.' >&2; exit 1; }

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT HUP INT TERM
base="https://github.com/rayan6ms/$product/releases/download/v$version"
asset="$product-cli-v$version.tgz"
curl --fail --location --silent --show-error --retry 2 --connect-timeout 15 --max-time 60 "$base/$asset" -o "$work/cli.tgz"
curl --fail --location --silent --show-error --retry 2 --connect-timeout 15 --max-time 60 "$base/$asset.sha256" -o "$work/checksum"
"$runtime" -e 'const fs=require("node:fs"),crypto=require("node:crypto");const expected=fs.readFileSync(process.argv[2],"utf8").split(/\s+/)[0];const actual=crypto.createHash("sha256").update(fs.readFileSync(process.argv[1])).digest("hex");if(!/^[a-f0-9]{64}$/.test(expected)||expected!==actual){console.error("CLI download checksum mismatch.");process.exit(1)}' "$work/cli.tgz" "$work/checksum"
tar -xzf "$work/cli.tgz" -C "$work"

has_agent=false
for arg in "$@"; do
  case "$arg" in --agent|--agent=*|--help|-h|--version|-v) has_agent=true ;; esac
done
if [ "$has_agent" = true ]; then
  "$runtime" "$work/package/cli/index.mjs" setup "$@"
elif ( : </dev/tty ) 2>/dev/null; then
  "$runtime" "$work/package/cli/index.mjs" setup "$@" </dev/tty
else
  printf '%s\n' 'Interactive setup needs a terminal. Add --agent <id> to choose your agent explicitly.' >&2
  exit 1
fi
