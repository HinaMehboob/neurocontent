"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import Header from "./Header";
import {
  ArrowLeft,
  Download,
  FileText,
  File,
  Code,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export interface GeneratedContent {
  title: string;
  content: string;
  keywords: string;
  tone: string;
  length: string;
}

interface ExportScreenProps {
  content: GeneratedContent | null;
  onNavigate: (screen: string) => void;
}

export default function ExportScreen({
  content,
  onNavigate,
}: ExportScreenProps) {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [fileName, setFileName] = useState(
    content?.title?.replace(/[^a-zA-Z0-9]/g, "_") || "content"
  );
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const formatOptions = [
    {
      value: "pdf",
      label: "PDF Document",
      description: "Best for sharing and printing",
      icon: FileText,
    },
    {
      value: "docx",
      label: "Word Document",
      description: "Editable Microsoft Word format",
      icon: File,
    },
    {
      value: "markdown",
      label: "Markdown File",
      description: "Plain text with formatting",
      icon: Code,
    },
  ];

  const handleExport = async () => {
    if (!content) return;

    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);

      toast("Export successful!", {
        description: `Your content has been exported as ${exportFormat.toUpperCase()}.`,
        duration: 3000,
      });

      const element = document.createElement("a");
      const fileContent = includeMetadata
        ? `${content.title}\n\nKeywords: ${content.keywords}\nTone: ${content.tone}\nLength: ${content.length}\n\n${content.content}`
        : `${content.title}\n\n${content.content}`;

      const file = new Blob([fileContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${fileName}.${
        exportFormat === "docx" ? "docx" : exportFormat
      }`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      <Header onNavigate={onNavigate} variant="app" />

      <div className="container-neuro py-12 lg:py-16">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate("editor")}
          className="mb-8 text-slate-gray hover:text-midnight-black"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Editor
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-midnight-black mb-4">
              Export Content
            </h1>
            <p className="text-slate-gray text-lg lg:text-xl">
              Choose your preferred format and download your content.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Export Options */}
            <div className="lg:col-span-2">
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl text-midnight-black">
                    Export Options
                  </CardTitle>
                  <CardDescription className="text-slate-gray text-lg">
                    Configure your export settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                  {/* File Format Selection */}
                  <div>
                    <Label className="text-lg font-medium text-midnight-black mb-6 block">
                      Export Format
                    </Label>
                    <RadioGroup
                      value={exportFormat}
                      onValueChange={setExportFormat}
                    >
                      <div className="space-y-4">
                        {formatOptions.map((option) => {
                          const IconComponent = option.icon;
                          return (
                            <div
                              key={option.value}
                              className="flex items-center space-x-4"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                className="border-neuro-violet text-neuro-violet"
                              />
                              <label
                                htmlFor={option.value}
                                className="flex items-center space-x-4 cursor-pointer flex-1 p-6 rounded-xl border border-light-lavender hover:bg-light-lavender/30 transition-colors"
                              >
                                <IconComponent className="h-6 w-6 text-neuro-violet" />
                                <div className="flex-1">
                                  <div className="font-medium text-midnight-black text-lg">
                                    {option.label}
                                  </div>
                                  <div className="text-slate-gray">
                                    {option.description}
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* File Name */}
                  <div className="space-y-3">
                    <Label htmlFor="filename" className="text-base">
                      File Name
                    </Label>
                    <Input
                      id="filename"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="bg-light-lavender border-0 h-12 text-base"
                      placeholder="Enter file name"
                    />
                    <p className="text-sm text-slate-gray">
                      File extension will be added automatically
                    </p>
                  </div>

                  {/* Additional Options */}
                  <div>
                    <Label className="text-lg font-medium text-midnight-black mb-4 block">
                      Additional Options
                    </Label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="metadata"
                          checked={includeMetadata}
                          onCheckedChange={(checked) =>
                            setIncludeMetadata(Boolean(checked))
                          }
                          className="border-neuro-violet"
                        />
                        <label
                          htmlFor="metadata"
                          className="text-midnight-black cursor-pointer text-base"
                        >
                          Include metadata (keywords, tone, length)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Export Button */}
                  <div className="pt-6">
                    <Button
                      onClick={handleExport}
                      disabled={isExporting || !content}
                      className="w-full bg-neuro-violet hover:bg-neuro-violet/90 h-14 text-lg"
                    >
                      {isExporting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="mr-3 h-5 w-5" />
                          Export as {exportFormat.toUpperCase()}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Success Message */}
                  {exportSuccess && (
                    <div className="p-6 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-emerald-green" />
                        <div>
                          <p className="font-medium text-emerald-green text-lg">
                            Export Successful!
                          </p>
                          <p className="text-emerald-green/80">
                            Your file has been downloaded to your device.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Preview & Info */}
            <div className="space-y-8">
              {/* Content Preview */}
              {content && (
                <Card className="border-light-lavender shadow-lg">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl text-midnight-black">
                      Content Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-light-lavender/30 rounded-xl">
                        <h4 className="font-medium text-midnight-black line-clamp-2">
                          {content.title}
                        </h4>
                      </div>

                      <div className="p-4 bg-light-lavender/30 rounded-xl">
                        <p className="text-slate-gray text-sm line-clamp-4 leading-relaxed">
                          {content.content.substring(0, 150)}...
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between py-2">
                          <span className="text-slate-gray">Words:</span>
                          <span className="text-midnight-black font-medium">
                            {
                              content.content
                                .split(" ")
                                .filter((word) => word.length > 0).length
                            }
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-slate-gray">Characters:</span>
                          <span className="text-midnight-black font-medium">
                            {content.content.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-midnight-black">
                    What's Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate("generator")}
                    className="w-full border-neuro-violet text-neuro-violet hover:bg-neuro-violet hover:text-white h-12"
                  >
                    Create New Content
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => onNavigate("dashboard")}
                    className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-white h-12"
                  >
                    Back to Dashboard
                  </Button>
                </CardContent>
              </Card>

              {/* Export Info */}
              <Card className="border-light-lavender shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl text-midnight-black">
                    Export Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-3 text-slate-gray leading-relaxed">
                    <p>• PDF: Best for sharing and presentation</p>
                    <p>• DOCX: Editable in Microsoft Word</p>
                    <p>• Markdown: Plain text with formatting</p>
                    <p>• Metadata includes generation settings</p>
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
