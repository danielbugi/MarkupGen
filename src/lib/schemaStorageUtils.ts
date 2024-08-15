export interface SavedSchema {
  id: string;
  name: string;
  type: string;
  data: any;
  createdAt: string;
}

export const saveSchema = (schema: SavedSchema): void => {
  const savedSchemas = getSavedSchemas();
  savedSchemas.push(schema);
  localStorage.setItem('savedSchemas', JSON.stringify(savedSchemas));
};

export const getSavedSchemas = (): SavedSchema[] => {
  const savedSchemasString = localStorage.getItem('savedSchemas');
  return savedSchemasString ? JSON.parse(savedSchemasString) : [];
};

export const deleteSavedSchema = (id: string): void => {
  const savedSchemas = getSavedSchemas();
  const updatedSchemas = savedSchemas.filter((schema) => schema.id !== id);
  localStorage.setItem('savedSchemas', JSON.stringify(updatedSchemas));
};
