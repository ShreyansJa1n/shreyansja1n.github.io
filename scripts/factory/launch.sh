#!/usr/bin/env bash
# Thin wrapper; the launcher (dependency graph, waves, stacking) lives in launch.py.
exec python3 "$(dirname "$0")/launch.py" "$@"
