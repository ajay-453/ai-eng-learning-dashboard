#!/usr/bin/env bash
# Serve the dashboard, optionally as a persistent systemd --user service.
set -euo pipefail

PORT=9999
NAME=ai-eng-dashboard
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UNIT="$HOME/.config/systemd/user/${NAME}.service"

case "${1:-serve}" in
  serve)
    echo "Serving on http://localhost:${PORT} (Ctrl-C to stop)"
    exec python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$DIR"
    ;;
  install)
    mkdir -p "$(dirname "$UNIT")"
    cat > "$UNIT" <<EOF
[Unit]
Description=AI Engineering learning dashboard
After=network.target

[Service]
Type=simple
WorkingDirectory=${DIR}
ExecStart=/usr/bin/python3 -m http.server ${PORT} --bind 0.0.0.0
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
EOF
    systemctl --user daemon-reload
    systemctl --user enable --now "${NAME}.service"
    loginctl enable-linger "$(whoami)" 2>/dev/null || true
    echo "Installed and started. http://localhost:${PORT}"
    ;;
  status)  systemctl --user --no-pager status "${NAME}.service" ;;
  stop)    systemctl --user stop "${NAME}.service" ;;
  uninstall)
    systemctl --user disable --now "${NAME}.service" 2>/dev/null || true
    rm -f "$UNIT"
    systemctl --user daemon-reload
    echo "Uninstalled."
    ;;
  *) echo "usage: $0 {serve|install|status|stop|uninstall}" >&2; exit 1 ;;
esac
