#!/usr/bin/env bash
# PreToolUse hook (Bash matcher): blocks commits/pushes directly against
# main/master, enforcing the "never push directly to main" rule in
# .claude/rules/git.md and root CLAUDE.md mechanically.

set -euo pipefail

input="$(cat)"
command="$(echo "$input" | node -e '
  let data = "";
  process.stdin.on("data", (chunk) => (data += chunk));
  process.stdin.on("end", () => {
    try {
      const parsed = JSON.parse(data);
      process.stdout.write(parsed.tool_input && parsed.tool_input.command ? parsed.tool_input.command : "");
    } catch {
      process.stdout.write("");
    }
  });
' <<< "$input")"

current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")"

if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
  exit 0
fi

if echo "$command" | grep -qE '\bgit\s+push\b'; then
  echo "Blocked: direct 'git push' on '$current_branch'. Work on a feature branch and open a PR instead." >&2
  exit 2
fi

if echo "$command" | grep -qE '\bgit\s+commit\b'; then
  echo "Blocked: direct 'git commit' on '$current_branch'. Create a feature branch first." >&2
  exit 2
fi

exit 0
