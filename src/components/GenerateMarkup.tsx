import React from 'react';
import { Copy } from 'lucide-react';

interface GeneratedMarkupProps {
  markup: string;
  onCopy: () => void;
}

export const GeneratedMarkup: React.FC<GeneratedMarkupProps> = ({
  markup,
  onCopy,
}) => (
  <div className="mt-8 bg-white shadow rounded-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Generated Markup</h2>
      <button
        onClick={onCopy}
        className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        <Copy size={16} className="mr-1" />
        Copy
      </button>
    </div>
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code>{markup}</code>
    </pre>
  </div>
);
