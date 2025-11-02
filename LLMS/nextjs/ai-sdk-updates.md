# AI SDK 6 Beta - Update Tracking

**Last Updated:** 2025-11-01
**Current Status:** Beta
**Stable Release:** Expected end of 2025

---

## ⚠️ Important Notes

- AI SDK 6 is in **beta** - APIs may change in patch releases
- Always **pin to specific versions** in production
- Review this document before updating versions
- Test thoroughly after each update

---

## 📦 Current Installation

```bash
bun add ai@beta @ai-sdk/openai@beta @ai-sdk/react@beta
```

**Recommended Version Pinning:**
```json
{
  "dependencies": {
    "ai": "6.x.x",
    "@ai-sdk/openai": "6.x.x",
    "@ai-sdk/react": "6.x.x"
  }
}
```

---

## 🔄 Update Checklist

Before updating AI SDK versions:

- [ ] Review [AI SDK GitHub Releases](https://github.com/vercel/ai/releases)
- [ ] Check [AI SDK Changelog](https://sdk.vercel.ai/docs/changelog)
- [ ] Review breaking changes section
- [ ] Update this document with new changes
- [ ] Test agent implementations
- [ ] Test tool approval workflows
- [ ] Test structured output generation
- [ ] Verify UI integration still works
- [ ] Update code examples if needed
- [ ] Update project documentation

---

## 📋 Version History

### Latest Beta (Track Here)

**Version:** [TBD]
**Release Date:** [TBD]
**Status:** Not yet released

**Changes:**
- Monitor [GitHub Releases](https://github.com/vercel/ai/releases) for updates

**Breaking Changes:**
- None yet

**Migration Notes:**
- N/A

---

### Initial Beta Release

**Version:** 6.0.0-beta
**Release Date:** [TBD]
**Status:** Initial beta release

**New Features:**
- ✨ Agent Abstraction with `ToolLoopAgent`
- ✨ Tool Execution Approval (human-in-the-loop)
- ✨ Structured Output (stable) with `Output` API
- ✨ Reranking Support (Cohere, Bedrock, Together.ai)
- 🔜 Image Editing Support (coming soon)

**Breaking Changes:**
- Version 3 Language Model Specification (major internal change)
- Most AI SDK 5 code should work with minimal changes

**Migration from AI SDK 5:**
- Update package versions to `@beta`
- Review agent-related code if using custom implementations
- Test tool calling workflows
- Verify structured output if using `generateObject`/`streamObject`

---

## 🚨 Known Issues

Track known issues here as they're discovered:

### Current Issues
- [ ] None reported yet

### Resolved Issues
- [ ] None yet

---

## 🔍 Monitoring Strategy

### Weekly Tasks
- [ ] Check [AI SDK GitHub](https://github.com/vercel/ai) for new releases
- [ ] Review [Discussions](https://github.com/vercel/ai/discussions) for beta feedback
- [ ] Monitor [Issues](https://github.com/vercel/ai/issues) for critical bugs

### Monthly Tasks
- [ ] Review overall beta progress
- [ ] Update code examples if APIs changed
- [ ] Test new features as they're released
- [ ] Document any breaking changes

### Before Stable Release
- [ ] Complete migration guide from beta to stable
- [ ] Update all code examples
- [ ] Remove beta warnings
- [ ] Update installation instructions

---

## 📖 Resources

- **Official Docs:** https://sdk.vercel.ai
- **GitHub:** https://github.com/vercel/ai
- **Changelog:** https://sdk.vercel.ai/docs/changelog
- **Releases:** https://github.com/vercel/ai/releases
- **Discord:** [Vercel Community](https://discord.gg/vercel)

---

## 🔔 Update Notifications

Set up notifications for AI SDK updates:

1. **GitHub Watch:** Watch the [vercel/ai](https://github.com/vercel/ai) repository
2. **RSS Feed:** Subscribe to [GitHub Releases RSS](https://github.com/vercel/ai/releases.atom)
3. **Discord:** Join Vercel Discord #ai-sdk channel
4. **Twitter/X:** Follow [@vercel](https://twitter.com/vercel)

---

## 📝 Update Log Template

Use this template when logging new updates:

```markdown
### Version X.X.X

**Version:** X.X.X
**Release Date:** YYYY-MM-DD
**Status:** Beta/RC/Stable

**Changes:**
- Feature 1
- Feature 2
- Bug fix 1

**Breaking Changes:**
- Breaking change 1
- Breaking change 2

**Migration Notes:**
- Step 1
- Step 2

**Tested:**
- [ ] Agent workflows
- [ ] Tool approval
- [ ] Structured output
- [ ] UI integration
- [ ] Examples updated
```

---

## 🎯 Stable Release Preparation

### Pre-Stable Checklist

When AI SDK 6 approaches stable release:

- [ ] Review all beta APIs used in project
- [ ] Update to latest release candidate
- [ ] Complete testing suite
- [ ] Update all documentation
- [ ] Remove version pinning restrictions
- [ ] Update installation commands
- [ ] Archive beta-specific notes
- [ ] Celebrate! 🎉

---

**Maintainer Notes:**
- Keep this document updated with each AI SDK release
- Document all breaking changes immediately
- Test updates in development before production
- Share learnings with the team
