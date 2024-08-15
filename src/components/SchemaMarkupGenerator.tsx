'use client';

import React, { useState, useEffect } from 'react';
import { SchemaType, SchemaTypeConfig } from '@/types/schemaTypes';
import { SchemaTypeSelector } from '@/components/SchemaTypeSelector';
import { SchemaForm } from '@/components/SchemaForm';
import { GeneratedMarkup } from '@/components/GenerateMarkup';
import { SchemaPreview } from '@/components/SchemaPreview';
import { SavedSchemasManager } from '@/components/SavedSchemaManager';
import { saveSchema, SavedSchema } from '@/lib/schemaStorageUtils';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SchemaMarkupGenerator: React.FC<{}> = () => {
  const [selectedType, setSelectedType] = useState<SchemaType>('LocalBusiness');
  const [schemaData, setSchemaData] = useState<any>(null);
  const [generatedMarkup, setGeneratedMarkup] = useState<string>('');

  useEffect(() => {
    // Generate initial schema for LocalBusiness
    const initialSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      // Add some default fields here
      name: 'Your Business Name',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main St',
        addressLocality: 'Your City',
        addressRegion: 'Your State',
        postalCode: '12345',
        addressCountry: 'Your Country',
      },
    };
    setSchemaData(initialSchema);
    setGeneratedMarkup(JSON.stringify(initialSchema, null, 2));
  }, []);

  const handleTypeSelect = (type: SchemaType) => {
    setSelectedType(type);
    // Clear previous schema data when type changes
    setSchemaData(null);
    setGeneratedMarkup('');
  };

  const handleFormSubmit = (data: any) => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': selectedType,
      ...data,
    };
    setGeneratedMarkup(JSON.stringify(schema, null, 2));
    setSchemaData(data);
    toast.success('Schema markup generated successfully!');
  };

  const handleCopyMarkup = () => {
    navigator.clipboard.writeText(generatedMarkup);
    toast.info('Markup copied to clipboard!');
  };

  const handleSaveSchema = () => {
    if (schemaData && selectedType) {
      const schemaToSave: SavedSchema = {
        id: Date.now().toString(),
        name: `${selectedType} Schema ${new Date().toLocaleString()}`,
        type: selectedType,
        data: schemaData,
        createdAt: new Date().toISOString(),
      };
      saveSchema(schemaToSave);
      toast.success('Schema saved successfully!');
    }
  };

  const handleLoadSchema = (loadedSchema: SavedSchema) => {
    setSelectedType(loadedSchema.type as SchemaType);
    setSchemaData(loadedSchema.data);
    const schema = {
      '@context': 'https://schema.org',
      '@type': loadedSchema.type,
      ...loadedSchema.data,
    };
    setGeneratedMarkup(JSON.stringify(schema, null, 2));
    toast.success('Schema loaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Schema Markup Generator
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SchemaTypeSelector
                selectedType={selectedType}
                onTypeSelect={handleTypeSelect}
              />
              {selectedType && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Generate Schema Markup
                  </h2>
                  <SchemaForm
                    selectedType={selectedType}
                    onFormSubmit={handleFormSubmit}
                    initialData={schemaData}
                  />
                </div>
              )}
              {schemaData && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                  <SchemaPreview
                    schemaData={schemaData}
                    schemaType={selectedType}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSaveSchema}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save Schema
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <SavedSchemasManager onLoadSchema={handleLoadSchema} />
              {generatedMarkup && (
                <div className="mt-6">
                  <GeneratedMarkup
                    markup={generatedMarkup}
                    onCopy={handleCopyMarkup}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default SchemaMarkupGenerator;
