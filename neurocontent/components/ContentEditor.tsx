"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import Header from "./Header";
import {
  ArrowLeft,
  Save,
  Download,
  RotateCcw,
  Eye,
  EyeOff,
  Bold,
  Italic,
  List,
} from "lucide-react";
import { toast } from "sonner";

export interface GeneratedContent {
  title: string;
  content: string;
  keywords: string;
  tone: string;
  length: string;
}

interface ContentEditorProps {
  content: GeneratedContent | null;
  onNavigate: (screen: string) => void;
  onContentUpdate: (content: GeneratedContent) => void;
}

export default function ContentEditor({
  content,
  onNavigate,
  onContentUpdate,
}: ContentEditorProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (content) {
      setTitle(content.title);
      setBody(content.content);
    }
  }, [content]);

  useEffect(() => {
    if (content && (title !== content.title || body !== content.content)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [title, body, content]);

  const handleSave = () => {
    if (content) {
      const updatedContent: GeneratedContent = {
        ...content,
        title,
        content: body,
      };
      onContentUpdate(updatedContent);
      setHasUnsavedChanges(false);
      toast("Content saved successfully!", {
        description: "Your changes have been saved.",
        duration: 2000,
      });
    }
  };

  const handleExport = () => {
    if (hasUnsavedChanges) {
      handleSave();
    }
    onNavigate("export");
  };

  const handleClear = () => {
    setTitle("");
    setBody("");
    setHasUnsavedChanges(false);
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText || "bold text"}**`;
        break;
      case "italic":
        formattedText = `*${selectedText || "italic text"}*`;
        break;
      case "list":
        formattedText = `\n- ${selectedText || "list item"}\n`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent =
      body.substring(0, start) + formattedText + body.substring(end);
    setBody(newContent);
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^(.)/gm, "<p>$1")
      .replace(/(.)\n$/gm, "$1</p>");
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <Header onNavigate={onNavigate} variant="app" />

      <div className="container-neuro py-12 lg:py-16">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate("generator")}
          className="mb-8 text-slate-gray hover:text-midnight-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Generator
        </Button>

        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-midnight-black mb-4">
                Content Editor
              </h1>
              <p className="text-slate-gray text-lg lg:text-xl">
                Edit and refine your AI-generated content to perfection.
              </p>
            </div>

            {hasUnsavedChanges && (
              <div className="text-neon-blue bg-neon-blue/10 px-4 py-2 rounded-full">
                Unsaved changes
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Editor Panel */}
            <div className="lg:col-span-2">
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-midnight-black">
                      {isPreviewMode ? "Preview" : "Editor"}
                    </CardTitle>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className="border-slate-gray text-slate-gray hover:bg-slate-gray hover:text-white px-4 py-2"
                      >
                        {isPreviewMode ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Edit
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 px-8 pb-8">
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-base">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-light-lavender border-0 h-12 text-base"
                      placeholder="Enter content title"
                    />
                  </div>

                  {!isPreviewMode && (
                    <>
                      {/* Formatting Toolbar */}
                      <div className="flex items-center space-x-3 p-4 bg-light-lavender/50 rounded-xl">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("bold")}
                          className="h-10 w-10 p-0"
                        >
                          <Bold className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("italic")}
                          className="h-10 w-10 p-0"
                        >
                          <Italic className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("list")}
                          className="h-10 w-10 p-0"
                        >
                          <List className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="content-editor" className="text-base">
                          Content
                        </Label>
                        <Textarea
                          id="content-editor"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                          className="min-h-[500px] bg-light-lavender border-0 resize-none text-base leading-relaxed"
                          placeholder="Start editing your content here..."
                        />
                      </div>
                    </>
                  )}

                  {isPreviewMode && (
                    <div className="space-y-6">
                      <div className="p-6 bg-light-lavender/30 rounded-xl">
                        <h1 className="text-3xl font-bold text-midnight-black">
                          {title}
                        </h1>
                      </div>
                      <div
                        className="prose prose-sm max-w-none p-6 bg-light-lavender/30 rounded-xl min-h-[500px] text-base leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: renderPreview(body),
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actions Panel */}
            <div className="space-y-8">
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-midnight-black">
                    Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <Button
                    onClick={handleSave}
                    className="w-full bg-emerald-green hover:bg-emerald-green/90 h-12"
                    disabled={!hasUnsavedChanges}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Content
                  </Button>

                  <Button
                    onClick={handleExport}
                    className="w-full bg-neuro-violet hover:bg-neuro-violet/90 h-12"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Content
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="w-full border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white h-12"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Clear Editor
                  </Button>
                </CardContent>
              </Card>

              {/* Content Info */}
              {content && (
                <Card className="border-light-lavender shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl text-midnight-black">
                      Content Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6">
                    <div className="p-4 bg-light-lavender/50 rounded-xl">
                      <div>
                        <span className="font-medium text-midnight-black block mb-2">
                          Keywords:
                        </span>
                        <p className="text-slate-gray">{content.keywords}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-light-lavender/50 rounded-xl">
                      <div>
                        <span className="font-medium text-midnight-black block mb-2">
                          Tone:
                        </span>
                        <p className="text-slate-gray capitalize">
                          {content.tone}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-light-lavender/50 rounded-xl">
                      <div>
                        <span className="font-medium text-midnight-black block mb-2">
                          Length:
                        </span>
                        <p className="text-slate-gray capitalize">
                          {content.length}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-light-lavender/50 rounded-xl">
                      <div>
                        <span className="font-medium text-midnight-black block mb-2">
                          Word Count:
                        </span>
                        <p className="text-slate-gray">
                          {body.split(" ").filter((w) => w.length > 0).length}{" "}
                          words
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Editor Tips */}
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-midnight-black">
                    Editor Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3 text-slate-gray">
                    <p className="text-base">
                      • Use **text** for bold formatting
                    </p>
                    <p className="text-base">
                      • Use *text* for italic formatting
                    </p>
                    <p className="text-base">• Use # for main headings</p>
                    <p className="text-base">• Use ## for subheadings</p>
                    <p className="text-base">• Use - for bullet points</p>
                    <p className="text-base">
                      • Preview mode shows formatted content
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
