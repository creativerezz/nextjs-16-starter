# AI + UI Integration Patterns

Comprehensive guide to combining AI SDK 6 with shadcn/ui components for powerful AI-driven user experiences.

---

## 🤖 Overview

This guide demonstrates how to build AI-powered features using:
- **AI SDK 6 Beta** - Agent abstraction, tool calling, structured output
- **shadcn/ui** - Beautiful, accessible UI components
- **Next.js 16** - Server Actions and streaming

---

## 💬 AI Chat Interface

### Basic Chat UI

```tsx
// components/chat/chat-interface.tsx
"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User } from "lucide-react"

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <Card className="flex h-[600px] flex-col">
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

### Chat API Route

```tsx
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai"
import { ToolLoopAgent } from "ai"
import { createAgentUIStreamResponse } from "ai"

const chatAgent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  instructions: "You are a helpful assistant.",
})

export async function POST(request: Request) {
  const { messages } = await request.json()

  return createAgentUIStreamResponse({
    agent: chatAgent,
    messages,
  })
}
```

---

## 🛠️ Tool Approval UI

### Tool Approval Component

```tsx
// components/chat/tool-approval.tsx
"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, X } from "lucide-react"

export function ChatWithToolApproval() {
  const { messages, input, handleInputChange, handleSubmit, addToolApprovalResponse } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id}>
          {/* Regular message */}
          {message.role === "assistant" && message.content && (
            <Card>
              <CardContent className="pt-6">
                <p>{message.content}</p>
              </CardContent>
            </Card>
          )}

          {/* Tool invocations */}
          {message.toolInvocations?.map((invocation) => (
            <Card key={invocation.toolCallId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {invocation.toolName}
                  </CardTitle>
                  <Badge variant={
                    invocation.state === "approval-requested" ? "secondary" :
                    invocation.state === "output-available" ? "default" :
                    "outline"
                  }>
                    {invocation.state}
                  </Badge>
                </div>
                <CardDescription>
                  Tool parameters: {JSON.stringify(invocation.input)}
                </CardDescription>
              </CardHeader>

              {invocation.state === "approval-requested" && (
                <>
                  <CardContent>
                    <div className="flex items-start gap-2 rounded-md bg-muted p-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        This action requires your approval to proceed
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        addToolApprovalResponse({
                          id: invocation.approval.id,
                          approved: true,
                        })
                      }
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        addToolApprovalResponse({
                          id: invocation.approval.id,
                          approved: false,
                        })
                      }
                    >
                      <X className="mr-2 h-4 w-4" />
                      Deny
                    </Button>
                  </CardFooter>
                </>
              )}

              {invocation.state === "output-available" && (
                <CardContent>
                  <pre className="rounded-md bg-muted p-3 text-sm">
                    {JSON.stringify(invocation.output, null, 2)}
                  </pre>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ))}

      {/* Input form */}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}
```

### Tool Definition with Approval

```tsx
// lib/tools/weather-tool.ts
import { tool } from "ai"
import { z } from "zod"

export const weatherTool = tool({
  description: "Get the current weather in a location",
  inputSchema: z.object({
    city: z.string().describe("The city to get weather for"),
  }),
  needsApproval: true, // Require user approval
  execute: async ({ city }) => {
    // Fetch weather data
    const response = await fetch(
      `https://api.weather.com/v1/current?city=${city}`
    )
    const data = await response.json()
    return {
      temperature: data.temp,
      condition: data.condition,
      humidity: data.humidity,
    }
  },
})
```

---

## 📊 Structured Output UI

### Data Extraction Interface

```tsx
// components/ai/data-extractor.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

type ExtractedData = {
  name: string
  email: string
  phone: string
  company: string
}

export function DataExtractor() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<ExtractedData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleExtract() {
    setIsLoading(true)
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      })
      const data = await response.json()
      setResult(data.output)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>Input Text</CardTitle>
          <CardDescription>
            Paste any text containing contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="John Doe is the CEO of Acme Inc. You can reach him at john@acme.com or call +1-555-0123."
            rows={10}
          />
          <Button onClick={handleExtract} disabled={isLoading || !input}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Extract Data
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card>
        <CardHeader>
          <CardTitle>Extracted Data</CardTitle>
          <CardDescription>
            Structured information extracted from the text
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="text-sm text-muted-foreground">{result.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-sm text-muted-foreground">{result.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <p className="text-sm text-muted-foreground">{result.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <p className="text-sm text-muted-foreground">{result.company}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No data extracted yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

### Extraction API Route

```tsx
// app/api/extract/route.ts
import { openai } from "@ai-sdk/openai"
import { ToolLoopAgent, Output } from "ai"
import { z } from "zod"

const extractionAgent = new ToolLoopAgent({
  model: openai("gpt-4o"),
  instructions: "Extract contact information from the provided text.",
  output: Output.object({
    schema: z.object({
      name: z.string().describe("Full name of the person"),
      email: z.string().email().describe("Email address"),
      phone: z.string().describe("Phone number"),
      company: z.string().describe("Company name"),
    }),
  }),
})

export async function POST(request: Request) {
  const { text } = await request.json()

  const { output } = await extractionAgent.generate({
    prompt: text,
  })

  return Response.json({ output })
}
```

---

## 📝 AI-Powered Forms

### Smart Form with AI Suggestions

```tsx
// components/forms/smart-form.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export function SmartForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function generateDescription() {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      })
      const data = await response.json()
      setDescription(data.description)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Fill in the details or let AI help you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Project"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Description</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateDescription}
              disabled={!title || isGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate with AI"}
            </Button>
          </div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of your project..."
            rows={5}
          />
        </div>

        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## 🎨 Streaming UI

### Streaming Text Generation

```tsx
// components/ai/text-generator.tsx
"use client"

import { useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function TextGenerator() {
  const [prompt, setPrompt] = useState("")
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate",
  })

  async function handleGenerate() {
    await complete(prompt)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Text Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            rows={3}
          />
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate
          </Button>
        </CardContent>
      </Card>

      {completion && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              {completion}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
```

---

## 🔍 Search with Reranking

### Smart Search Component

```tsx
// components/search/smart-search.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

type SearchResult = {
  id: string
  title: string
  description: string
  score: number
}

export function SmartSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  async function handleSearch(q: string) {
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      })
      const data = await response.json()
      setResults(data.results)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search with AI-powered reranking..."
          className="pl-9"
        />
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result) => (
            <Card key={result.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{result.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(result.score * 100)}% match
                  </span>
                </div>
                <CardDescription>{result.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Search API with Reranking

```tsx
// app/api/search/route.ts
import { rerank } from "ai"
import { cohere } from "@ai-sdk/cohere"

const documents = [
  { id: "1", title: "Next.js Guide", description: "Learn Next.js from scratch" },
  { id: "2", title: "React Tutorial", description: "Master React components" },
  // ... more documents
]

export async function POST(request: Request) {
  const { query } = await request.json()

  // Rerank documents based on query
  const { rerankedDocuments } = await rerank({
    model: cohere.reranking("rerank-v3.5"),
    documents: documents.map((d) => ({
      ...d,
      text: `${d.title} ${d.description}`,
    })),
    query,
    topN: 5,
  })

  return Response.json({ results: rerankedDocuments })
}
```

---

## 📚 Best Practices

1. **Progressive Enhancement** - Start with basic functionality, enhance with AI
2. **Loading States** - Always show loading indicators during AI operations
3. **Error Handling** - Handle AI errors gracefully with user-friendly messages
4. **Rate Limiting** - Implement rate limits to prevent abuse
5. **Cost Awareness** - Monitor API usage and implement usage limits
6. **Streaming** - Use streaming for better UX with long-running operations
7. **Tool Approval** - Always request approval for destructive or sensitive actions
8. **Validation** - Validate AI outputs before using them
9. **Accessibility** - Ensure AI features are accessible
10. **Privacy** - Handle user data responsibly

---

## 🚀 Advanced Patterns

### Multi-Agent Workflow

```tsx
const orchestrator = new Orchestrator({
  subAgents: {
    researcher: researchAgent,
    writer: writerAgent,
    editor: editorAgent,
  },
})
```

### Streaming with Progress

```tsx
const { partialOutputStream } = await agent.stream({ prompt })

for await (const partial of partialOutputStream) {
  updateProgress(partial)
}
```

---

## 🔗 Complete Example Project

Check out the example implementations in:
- `/components/chat` - Chat interfaces
- `/components/ai` - AI-powered components
- `/app/api` - AI API routes
- `/lib/agents` - Agent configurations

---

## 📖 Further Reading

- [AI SDK 6 Documentation](../nextjs/ai-6sdk-vercel.md)
- [Form Patterns](./forms.md)
- [Layout Patterns](./layouts.md)
- [Authentication Patterns](./authentication.md)
