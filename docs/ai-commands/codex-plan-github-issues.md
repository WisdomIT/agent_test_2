# Codex Command: Plan GitHub Issues

Use this prompt with Codex when a user gives a broad requirement and wants GitHub issues created.

Example:

```bash
codex exec "$(cat docs/ai-commands/codex-plan-github-issues.md)

Requirement:
<paste user requirement here>"
```

## Instruction

You are creating GitHub issues for AI development automation.

Follow this workflow:

1. Inspect the repository before creating issues.
2. Identify one milestone-level epic.
3. Break the epic into independently implementable work-item issues.
4. Create the epic and work-item issues with `gh issue create`.
5. Link every work item back to the epic.
6. Update the epic body with actual child issue links.

Run these checks first:

```bash
git status --short
gh repo view --json nameWithOwner,defaultBranchRef
gh issue list --state open --limit 50
rg --files
```

Use these files:

- `.github/ISSUE_TEMPLATE/epic.yml`
- `.github/ISSUE_TEMPLATE/work-item.yml`
- `docs/ai-commands/issue-planning.md`

Before creating issues, make labels available:

```bash
scripts/bootstrap-github-labels.sh
```

Quality rules:

- Do not create issues before reading relevant files.
- Keep each work issue small enough for one PR.
- Include context, requirements, acceptance criteria, and expected test plan.
- Put unknowns in risks/open questions.
- Avoid bundling unrelated work into one issue.
