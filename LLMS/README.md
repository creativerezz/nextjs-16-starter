# Documentation Directory

This directory contains comprehensive documentation for the technologies used in this Next.js 16 project.

## 📚 Documentation Structure

### AI SDK
- [`ai-sdk-updates.md`](./nextjs/ai-sdk-updates.md) - AI SDK 6 Beta update tracking and changelog
- [`ai-6sdk-vercel.md`](./nextjs/ai-6sdk-vercel.md) - AI SDK 6 Beta comprehensive reference
- [`nextjs-ai-integration.md`](./nextjs/nextjs-ai-integration.md) - Next.js + AI SDK integration patterns
- [`ai-sdk-patterns.md`](./nextjs/ai-sdk-patterns.md) - Common AI patterns and best practices

### shadcn/ui
- [`shadcn.txt`](./shadcn/shadcn.txt) - Complete component index
- [`intro.md`](./shadcn/intro.md) - Core principles and philosophy
- [`cli.md`](./shadcn/cli.md) - CLI commands and usage
- [`nextjs.md`](./shadcn/nextjs.md) - Next.js installation guide
- [`nextjs-integration.md`](./shadcn/nextjs-integration.md) - **NEW:** Detailed Next.js integration examples
- [`component-examples.md`](./shadcn/component-examples.md) - **NEW:** Component usage examples
- [`theming.md`](./shadcn/theming.md) - Theming and customization
- [`dark-mode.md`](./shadcn/dark-mode.md) - Dark mode implementation
- [`monorepo.md`](./shadcn/monorepo.md) - Monorepo setup
- [`registry.md`](./shadcn/registry.md) - Registry system
- [`mcp.md`](./shadcn/mcp.md) - MCP integration

### Project Patterns
- [`patterns/forms.md`](./patterns/forms.md) - **NEW:** Form patterns with shadcn/ui and AI SDK
- [`patterns/layouts.md`](./patterns/layouts.md) - **NEW:** Layout patterns and best practices
- [`patterns/authentication.md`](./patterns/authentication.md) - **NEW:** Authentication patterns
- [`patterns/ai-ui-integration.md`](./patterns/ai-ui-integration.md) - **NEW:** Combining AI SDK with shadcn/ui

## 🔄 Update Schedule

### AI SDK 6 Beta
- **Current Version:** 6.x.x-beta
- **Status:** Beta (APIs may change)
- **Stable Release:** Expected end of 2025
- **Update Tracking:** See [`ai-sdk-updates.md`](./nextjs/ai-sdk-updates.md)

### shadcn/ui
- **Current Version:** Latest
- **Status:** Stable
- **Updates:** Check [shadcn/ui changelog](https://ui.shadcn.com/docs/changelog)

## 🚀 Quick Start Guides

### Adding Components
```bash
# Add shadcn/ui components
bunx shadcn@latest add button card dialog

# Search for components
bunx shadcn@latest search @shadcn -q "form"
```

### Setting Up AI Features
```typescript
import { openai } from '@ai-sdk/openai';
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: openai('gpt-4o'),
  instructions: 'You are a helpful assistant.',
});
```

## 📖 Documentation Guidelines

1. **Keep Documentation Updated**
   - Monitor AI SDK 6 beta releases
   - Track breaking changes
   - Update examples as APIs stabilize

2. **Add Practical Examples**
   - Real-world use cases
   - Complete code samples
   - Common patterns and gotchas

3. **Document Integration Patterns**
   - How components work together
   - Best practices for combining technologies
   - Performance considerations

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [AI SDK Documentation](https://sdk.vercel.ai)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19 Documentation](https://react.dev)

## 📝 Contributing to Documentation

When adding new documentation:

1. Follow the existing structure
2. Include practical code examples
3. Add context and explanations
4. Reference related documentation
5. Keep it up-to-date with the latest versions
