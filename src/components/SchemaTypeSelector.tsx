import React, { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  SchemaType,
  schemaTypeCategories,
  schemaTypeDescriptions,
} from '@/types/schemaTypes';

interface SchemaTypeSelectorProps {
  selectedType: SchemaType | '';
  onTypeSelect: (type: SchemaType) => void;
}

export const SchemaTypeSelector: React.FC<SchemaTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
}) => {
  const defaultCategory = 'Business & Organizations';
  const defaultType = 'LocalBusiness';

  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);

  useEffect(() => {
    // Set default values on component mount
    if (!selectedType) {
      setSelectedCategory(defaultCategory);
      onTypeSelect(defaultType as SchemaType);
    }
  }, []);

  useEffect(() => {
    // Update category when selectedType changes
    const category = schemaTypeCategories.find((cat) =>
      cat.types.includes(selectedType as SchemaType)
    );
    if (category) {
      setSelectedCategory(category.name);
    }
  }, [selectedType]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const firstTypeInCategory = schemaTypeCategories.find(
      (cat) => cat.name === newCategory
    )?.types[0];
    if (firstTypeInCategory) {
      onTypeSelect(firstTypeInCategory as SchemaType);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeSelect(event.target.value as SchemaType);
  };

  const currentCategoryTypes =
    schemaTypeCategories.find((cat) => cat.name === selectedCategory)?.types ||
    [];

  return (
    <div className="mb-8 flex space-x-4">
      <div className="flex-1">
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Category
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {schemaTypeCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="schema-type-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Schema Type
        </label>
        <Tooltip.Provider>
          <select
            id="schema-type-select"
            value={selectedType}
            onChange={handleTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {currentCategoryTypes.map((type) => (
              <Tooltip.Root key={type}>
                <Tooltip.Trigger asChild>
                  <option value={type}>{type}</option>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="bg-gray-800 text-white p-2 rounded-md text-sm"
                  side="right"
                  sideOffset={5}
                >
                  {schemaTypeDescriptions[type as SchemaType]}
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Root>
            ))}
          </select>
        </Tooltip.Provider>
      </div>
    </div>
  );
};
