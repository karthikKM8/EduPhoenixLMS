import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentViewerProps {
  title: string;
  content?: string;
}

export function DocumentViewer({ title, content }: DocumentViewerProps) {
  const sampleContent = `
# ${title}

## Overview
This document provides comprehensive guidance on the topic covered in this lesson.

## Key Concepts

### 1. Understanding the Basics
Before diving deep, it's essential to understand the foundational concepts that will be referenced throughout this course.

- **Concept A**: Description of the first major concept
- **Concept B**: Description of the second major concept
- **Concept C**: Description of the third major concept

### 2. Practical Applications
Here we explore how these concepts apply in real-world scenarios.

\`\`\`javascript
// Example code snippet
function exampleFunction() {
  const result = processData(input);
  return result;
}
\`\`\`

### 3. Best Practices
Follow these guidelines to ensure optimal results:

1. Always validate input data
2. Use consistent naming conventions
3. Document your code thoroughly
4. Write tests for critical functionality

## Summary
This lesson covered the essential aspects of the topic. Make sure to review the key concepts before moving to the next lesson.

---

*Continue to the next lesson to apply what you've learned.*
  `;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
            <FileText className="text-info" size={20} />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">Documentation</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download size={16} />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink size={16} />
            Open
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content || sampleContent}
        </div>
      </div>
    </div>
  );
}
