"use client";

import React, { useEffect, useState } from 'react';
import { validateAllSchemaInPage } from '@/lib/utils/schema-validator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Suspense } from "react"

// Define proper interfaces for validation results
interface SchemaValidationResult {
  valid: boolean;
  data: Record<string, unknown>;
  errors?: string[];
}

interface SchemaValidationState {
  valid: boolean;
  results: SchemaValidationResult[];
}

/**
 * A development-only component for debugging SEO implementation
 * 
 * This component is only rendered in development mode and provides
 * tools to inspect and validate structured data, meta tags, and other SEO elements
 */
function SEODebugger() {
  // Initialize all state variables unconditionally at the top level
  const [isClient, setIsClient] = useState(false);
  const [validationResults, setValidationResults] = useState<SchemaValidationState | null>(null);
  const [validatingSchema, setValidatingSchema] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('schemas');
  const [selectedAccordionItems, setSelectedAccordionItems] = useState<string[]>([]);

  // Set up client-side validation on mount
  useEffect(() => {
    setIsClient(true);
    
    const validateSchemas = async () => {
      try {
        setValidatingSchema(true);
        setValidationError(null);
        const results = await validateAllSchemaInPage();
        setValidationResults(results);
      } catch (error) {
        setValidationError(error instanceof Error ? error.message : String(error));
      } finally {
        setValidatingSchema(false);
      }
    };
    
    validateSchemas();
  }, []);
  
  // Handle accordion item selection
  const handleAccordionItemClick = (value: string) => {
    setSelectedAccordionItems(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Early return for server-side rendering
  if (!isClient) {
    return null;
  }
  
  return (
    <Card className="border border-amber-300 shadow-md mb-6 mt-20">
      <CardHeader className="bg-amber-50 border-b border-amber-200">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-amber-800">SEO Debugger</CardTitle>
            <CardDescription className="text-amber-700">
              Inspect structured data, metadata, and SEO elements
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-white text-amber-800 border-amber-300">
            Development Only
            </Badge>
        </div>
        </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="schemas" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="schemas">Structured Data</TabsTrigger>
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="links">Link Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schemas" className="space-y-4">
            {validatingSchema && (
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse"></div>
                <span>Validating structured data...</span>
              </div>
            )}
            
            {validationError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                <strong>Error:</strong> {validationError}
              </div>
            )}
            
            {!validatingSchema && !validationError && validationResults && (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant={validationResults.valid ? "default" : "destructive"}>
                    {validationResults.valid ? "All Valid" : "Has Issues"}
                  </Badge>
                  <span className="text-sm text-slate-500">
                    Found {validationResults.results.length} schema items
                  </span>
                </div>
                
                <Accordion 
                  type="multiple" 
                  value={selectedAccordionItems}
                  onValueChange={setSelectedAccordionItems}
                  className="space-y-2"
                >
                  {validationResults.results.map((result, index) => (
                    <AccordionItem 
                      key={`schema-${index}`}
                      value={`schema-${index}`}
                      className={`border ${!result.valid ? 'border-red-200 bg-red-50' : 'border-slate-200'} rounded-md overflow-hidden`}
                    >
                      <AccordionTrigger 
                        onClick={() => handleAccordionItemClick(`schema-${index}`)}
                        className="px-3 py-2 hover:bg-slate-50 hover:no-underline"
                      >
                      <div className="flex items-center gap-2">
                        <Badge variant={result.valid ? "default" : "destructive"} className="text-xs">
                            {result.data && typeof result.data['@type'] === 'string' 
                              ? result.data['@type'] 
                              : 'Unknown'}
                        </Badge>
                          {!result.valid && result.errors && result.errors.length > 0 && (
                          <span className="text-destructive">{result.errors.length} issues</span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {result.valid ? (
                        <div className="text-xs">
                          <pre className="bg-muted p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      ) : (
                          <div className="text-xs p-3">
                            <div className="mb-2 font-semibold text-destructive">Validation Errors:</div>
                            <ul className="space-y-1 list-disc pl-5">
                              {result.errors && result.errors.map((error, i) => (
                                <li key={i} className="text-destructive">{error}</li>
                              ))}
                            </ul>
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              <div className="font-semibold mb-1">Schema Data:</div>
                          <pre className="bg-muted p-2 rounded overflow-auto max-h-40">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                            </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              </>
            )}
            </TabsContent>
            
          <TabsContent value="meta">
            <div className="p-4 text-sm text-slate-500 bg-slate-50 rounded-md">
              Meta tag debugging coming soon...
              </div>
            </TabsContent>
            
          <TabsContent value="links">
            <div className="p-4 text-sm text-slate-500 bg-slate-50 rounded-md">
              Link analysis coming soon...
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
  );
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SEODebuggerWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SEODebugger {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SEODebuggerWrapper as SEODebugger };