# AI Issue Planning Commands

Use this guide when Claude Code or Codex receives a broad requirement and must create GitHub issues with `gh`.

## Goal

Create:

1. One milestone-level epic issue.
2. Multiple implementation-sized work issues linked to the epic.

The AI should inspect the repository before creating issues.

## Tool-specific entry points

Claude Code project command:

```text
/project:plan-github-issues <user requirement>
```

Codex prompt command:

```bash
codex exec "$(cat docs/ai-commands/codex-plan-github-issues.md)

Requirement:
<paste user requirement here>"
```

## Required pre-checks

```bash
git status --short
gh repo view --json nameWithOwner,defaultBranchRef
gh issue list --state open --limit 50
rg --files
```

Inspect relevant code and docs before writing issue bodies.

## Create an epic issue

Use this command shape:

```bash
gh issue create \
  --title "[Epic] <short outcome>" \
  --label "epic,ai-ready" \
  --body-file /tmp/epic.md
```

Recommended `/tmp/epic.md` structure:

```markdown
## Goal

<Describe the overall outcome.>

## Background and Current State

- <Relevant existing behavior>
- <Relevant files>
- <Constraints and decisions>

## Scope

### Included

- ...

### Excluded

- ...

## Proposed Child Issues

- [ ] <Work item 1>
- [ ] <Work item 2>
- [ ] <Work item 3>

## Epic Acceptance Criteria

- [ ] All child issues are closed
- [ ] End-to-end workflow is verified
- [ ] Documentation is updated

## Risks and Open Questions

- ...
```

Capture the epic number:

```bash
EPIC_URL="$(gh issue create --title "[Epic] <short outcome>" --label "epic,ai-ready" --body-file /tmp/epic.md)"
EPIC_NUMBER="${EPIC_URL##*/}"
echo "$EPIC_NUMBER"
```

## Create work-item issues

Use this command shape for each work item:

```bash
gh issue create \
  --title "[Work] <specific task>" \
  --label "work-item,ai-ready" \
  --body-file /tmp/work-item.md
```

Recommended `/tmp/work-item.md` structure:

```markdown
## Parent Epic

Parent: #<EPIC_NUMBER>

## Task

<One concrete implementation task.>

## Context

- Related files:
  - ...
- Current behavior:
  - ...
- Constraints:
  - ...

## Requirements

- ...

## Acceptance Criteria

- [ ] ...
- [ ] ...

## Expected Test Plan

- ...

## Out of Scope

- ...

## Notes for AI Worker

- Inspect these files first:
  - ...
```

## Link child issues from the epic

After creating all work issues, update the epic body so it contains actual issue links.

```bash
gh issue view "$EPIC_NUMBER" --json body --jq .body > /tmp/epic-current.md
```

Then edit `/tmp/epic-current.md` to replace planned items with links:

```markdown
## Child Issues

- [ ] #124
- [ ] #125
- [ ] #126
```

Update the epic:

```bash
gh issue edit "$EPIC_NUMBER" --body-file /tmp/epic-current.md
```

## Recommended labels

Create labels once if they do not exist:

```bash
scripts/bootstrap-github-labels.sh
```

Equivalent manual commands:

```bash
gh label create epic --color 6f42c1 --description "Milestone-level issue grouping multiple work items"
gh label create work-item --color 0969da --description "Implementation-sized issue"
gh label create ai-ready --color 0e8a16 --description "Ready for AI automation"
gh label create needs-human --color d93f0b --description "Requires human decision before automation continues"
```

If labels already exist, `gh label create` will fail; that is fine.

## Quality rules for AI-generated issues

- Do not create issues before inspecting relevant files.
- Keep each work issue independently implementable.
- Include exact files or modules to inspect when known.
- Include a test plan that can be executed by automation.
- Put unknowns in "Risks and Open Questions" instead of hiding assumptions.
- Avoid bundling unrelated work into one work issue.
