import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SchemaType, SchemaField, schemaConfigs } from '../types/schemaTypes';

interface SchemaFormProps {
  selectedType: SchemaType;
  onFormSubmit: (data: any) => void;
  initialData?: any;
}

export const SchemaForm: React.FC<SchemaFormProps> = ({
  selectedType,
  onFormSubmit,
  initialData,
}) => {
  const { fields, zodSchema } = schemaConfigs[selectedType];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const renderField = (field: SchemaField, parentName: string = '') => {
    const fullName = parentName ? `${parentName}.${field.name}` : field.name;

    switch (field.type) {
      case 'object':
        return (
          <div key={fullName} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 bg-gray-50 p-4 rounded-md">
              {field.subfields?.map((subfield) =>
                renderField(subfield, fullName)
              )}
            </div>
          </div>
        );
      case 'array':
        return (
          <ArrayField
            key={fullName}
            name={fullName}
            label={field.label}
            control={control}
            subfields={field.subfields}
          />
        );
      case 'number':
        return (
          <div key={fullName} className="mb-4">
            <label
              htmlFor={fullName}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              {...register(fullName, { valueAsNumber: true })}
              type="number"
              step="0.01"
              id={fullName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );
      default:
        return (
          <div key={fullName} className="mb-4">
            <label
              htmlFor={fullName}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <input
              {...register(fullName)}
              type={field.type}
              id={fullName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {fields.map((field) => renderField(field))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Generate Markup
      </button>
    </form>
  );
};

interface ArrayFieldProps {
  name: string;
  label: string;
  control: any;
  subfields?: SchemaField[];
}

const ArrayField: React.FC<ArrayFieldProps> = ({
  name,
  label,
  control,
  subfields,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {fields.map((field, index) => (
        <div key={field.id} className="mt-2 bg-gray-50 p-4 rounded-md">
          {subfields?.map((subfield) => (
            <div key={`${name}.${index}.${subfield.name}`} className="mb-2">
              <label className="block text-xs font-medium text-gray-600">
                {subfield.label}
              </label>
              <Controller
                name={`${name}.${index}.${subfield.name}`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={subfield.type === 'number' ? 'number' : 'text'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})}
        className="mt-2 px-2 py-1 bg-green-500 text-white rounded-md text-sm"
      >
        Add {label}
      </button>
    </div>
  );
};
