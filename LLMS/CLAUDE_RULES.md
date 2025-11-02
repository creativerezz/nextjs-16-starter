# Claude Code Rules for this Project

These rules should be integrated into the system prompt via API to ensure consistent behavior across all Claude Code sessions.

## File Operations Rules

### Rule 1: Always Verify Directory Structure First
**When**: Before performing any file or directory operations
**Action**:
- Use `ls -la <path>` to verify directory contents
- Never attempt to `Read` a directory path
- Always confirm directory structure exists before writing/editing

**Example of wrong approach:**
```
Read /path/to/directory  # ❌ Will fail
```

**Example of correct approach:**
```bash
ls -la /path/to/directory  # ✅ Verify first
```

### Rule 2: Use Bash for Directory Listing, Not Read Tool
**When**: Need to explore or verify directory contents
**Action**: Use `Bash` with `ls -la` or `find` commands
**Never**: Try to `Read` a directory - it will error

### Rule 3: Check Before Assuming File Locations
**When**: Working with subdirectories or nested structures
**Action**:
- Always `ls` the parent directory first
- Verify exact file paths before reading
- Don't assume file structure based on partial information

**Example**: If you see "shadcn" in a listing, verify if it's a file or directory with `ls -la` before proceeding.

## Search and Exploration Rules

### Rule 4: Use Explore Agent for Codebase Questions
**When**: Trying to understand project structure, find patterns, or answer "where is X?" questions
**Action**: Use `Task` tool with `subagent_type=Explore`
**Never**: Guess or make assumptions about code organization

### Rule 5: Verify Before Referencing
**When**: About to tell user about a file location or feature
**Action**:
- Actually find and read the relevant code
- Don't reference files you haven't verified exist
- Include line numbers when providing code references

## Documentation Rules

### Rule 6: Index All Documentation When Adding References
**When**: Adding documentation references to CLAUDE.md or similar files
**Action**:
- Use `ls` to verify all files exist
- Use `find` to discover all files in a directory tree
- Document complete structure, not partial assumptions
- Update ALL documentation in a section when one reference is added

**Example**: When documenting `/LLMS`, verify all subdirectories and files before writing.

## Learning and Improvement Rules

### Rule 7: Log Mistakes and Update Rules
**When**: You break a rule or make a mistake
**Action**:
- Acknowledge the mistake to the user
- Update this CLAUDE_RULES.md file immediately
- Add a specific rule that prevents this mistake in future
- Include examples of wrong vs right approaches

**Format for new rules:**
```markdown
### Rule X: [Clear Rule Name]
**When**: [Situation that triggers this rule]
**Action**: [What to do]
**Never**: [What NOT to do]
**Why**: [Explanation of why this matters]

**Example of wrong approach:**
[Show the mistake]

**Example of correct approach:**
[Show the fix]
```

## Task Management Rules

### Rule 8: Use TodoWrite for Multi-Step Tasks
**When**: Task has 3+ steps OR is complex OR is non-trivial
**Action**:
- Create todo list immediately
- Mark tasks `in_progress` before starting
- Mark tasks `completed` immediately after finishing
- Update list as new tasks are discovered

### Rule 9: Read Files Before Editing
**When**: Using the `Edit` tool
**Action**:
- Always `Read` the file first
- Understand the full context
- Preserve exact indentation from Read output
- Never include line number prefix in old_string/new_string

## Code Quality Rules

### Rule 10: Follow Project Guidelines from CLAUDE.md
**When**: Writing or modifying code
**Action**:
- Check CLAUDE.md for technology stack and conventions
- Follow the Development Guidelines section
- Use Bun, not npm/yarn/pnpm
- Use Next.js App Router patterns
- Use shadcn/ui components when available
- Always await async APIs in Next.js 16

### Rule 11: Verify Changes Don't Break Rules
**When**: Making code changes
**Action**:
- Check for hardcoded colors (should use theme tokens)
- Verify padding/spacing follows responsive pattern
- Use `Link` from next/link for navigation
- Use Server Components by default
- Use `cn()` from @/lib/utils for conditional classes

## Communication Rules

### Rule 12: Be Transparent About Limitations
**When**: You can't do something or don't know something
**Action**:
- Clearly state what you cannot do
- Explain why (if relevant)
- Suggest alternatives when possible
- Ask for clarification if needed

## General Best Practices

- **Parallel Operations**: Make independent tool calls in parallel when possible
- **Efficiency**: Minimize token usage by being direct and concise
- **Verification**: Always verify assumptions before acting on them
- **Documentation**: Keep CLAUDE.md updated with important project information
- **Progress Tracking**: Use TodoWrite for visibility on progress

## Rule Versioning

- **Version**: 1.0
- **Last Updated**: 2025-10-30
- **Created by**: Claude Code
- **To be integrated by**: User via API system prompt update

### When updating rules:
1. Increment the version number
2. Update the "Last Updated" date
3. Add new rule with next sequential number
4. Keep old rules for historical context (unless explicitly removed)
5. Add to system prompt and confirm integration
