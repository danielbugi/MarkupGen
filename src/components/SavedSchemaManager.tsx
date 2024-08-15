import React, { useState, useEffect } from 'react';
import {
  SavedSchema,
  getSavedSchemas,
  deleteSavedSchema,
} from '@/lib/schemaStorageUtils';

interface SavedSchemasManagerProps {
  onLoadSchema: (schema: SavedSchema) => void;
}

export const SavedSchemasManager: React.FC<SavedSchemasManagerProps> = ({
  onLoadSchema,
}) => {
  const [savedSchemas, setSavedSchemas] = useState<SavedSchema[]>([]);

  useEffect(() => {
    setSavedSchemas(getSavedSchemas());
  }, []);

  const handleDeleteSchema = (id: string) => {
    deleteSavedSchema(id);
    setSavedSchemas(getSavedSchemas());
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Saved Schemas</h2>
      {savedSchemas.length === 0 ? (
        <p className="text-gray-500">No saved schemas found.</p>
      ) : (
        <ul className="space-y-3">
          {savedSchemas.map((schema) => (
            <li key={schema.id} className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{schema.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({schema.type})
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => onLoadSchema(schema)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => handleDeleteSchema(schema.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
