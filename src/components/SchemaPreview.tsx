import React from 'react';

interface SchemaPreviewProps {
  schemaData: any;
  schemaType: string;
}

export const SchemaPreview: React.FC<SchemaPreviewProps> = ({
  schemaData,
  schemaType,
}) => {
  const renderPreview = () => {
    switch (schemaType) {
      case 'BlogPosting':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.headline}</h3>
            <p className="text-sm text-gray-600">{schemaData.author?.name}</p>
            <p className="text-sm text-gray-600">{schemaData.datePublished}</p>
            <p className="mt-2">{schemaData.description}</p>
          </div>
        );
      case 'NewsArticle':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.headline}</h3>
            <p className="text-sm text-gray-600">{schemaData.author?.name}</p>
            <p className="text-sm text-gray-600">{schemaData.datePublished}</p>
            <p className="mt-2">{schemaData.description}</p>
          </div>
        );
      case 'Movie':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">{schemaData.director?.name}</p>
            <p className="text-sm text-gray-600">{schemaData.genre}</p>
            <p className="text-sm text-gray-600">
              {schemaData.duration} minutes
            </p>
            <p className="text-sm text-gray-600">{schemaData.datePublished}</p>
            <p className="text-sm text-gray-600">{schemaData.description}</p>
          </div>
        );
      case 'Book':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">{schemaData.author?.name}</p>
            <p className="text-sm text-gray-600">{schemaData.isbn}</p>
            <p className="text-sm text-gray-600">
              {schemaData.numberOfPages} pages
            </p>
          </div>
        );
      case 'JobPosting':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.title}</h3>
            <p className="text-sm text-gray-600">
              {schemaData.jobLocation?.addressLocality},{' '}
              {schemaData.jobLocation?.addressRegion}
            </p>
            <p className="text-sm text-gray-600">
              Salary: {schemaData.baseSalary?.value}{' '}
              {schemaData.baseSalary?.currency}
            </p>
            <p className="mt-2">{schemaData.description}</p>
          </div>
        );
      case 'WebSite':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">{schemaData.url}</p>
            <p className="text-sm text-gray-600">{schemaData.description}</p>
          </div>
        );
      case 'Organization':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">{schemaData.url}</p>
            <p className="text-sm text-gray-600">{schemaData.email}</p>
            <p className="text-sm text-gray-600">{schemaData.telephone}</p>
            <p className="text-sm text-gray-600">
              {schemaData.address?.streetAddress},{' '}
              {schemaData.address?.addressLocality}
            </p>
          </div>
        );
      case 'Person':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">
              {schemaData.givenName} {schemaData.familyName}
            </h3>
            <p className="text-sm text-gray-600">{schemaData.jobTitle}</p>
            <p className="text-sm text-gray-600">{schemaData.email}</p>
            <p className="text-sm text-gray-600">{schemaData.telephone}</p>
          </div>
        );
      case 'LocalBusiness':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">
              {schemaData.address?.streetAddress},{' '}
              {schemaData.address?.addressLocality}
            </p>
            <p className="text-sm text-gray-600">{schemaData.telephone}</p>
            {schemaData.openingHours && (
              <div className="mt-2">
                <p className="text-sm font-semibold">Hours:</p>
                <ul className="text-sm text-gray-600">
                  {schemaData.openingHours.map((hours: any, index: number) => (
                    <li key={index}>
                      {hours.dayOfWeek}: {hours.opens} - {hours.closes}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 'Product':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">{schemaData.description}</p>
            <p className="text-md font-semibold mt-2">
              {schemaData.offers?.price} {schemaData.offers?.priceCurrency}
            </p>
            {schemaData.aggregateRating && (
              <p className="text-sm text-gray-600">
                Rating: {schemaData.aggregateRating.ratingValue}/5 (
                {schemaData.aggregateRating.reviewCount} reviews)
              </p>
            )}
          </div>
        );
      case 'Article':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.headline}</h3>
            <p className="text-sm text-gray-600">
              By {schemaData.author?.name}
            </p>
            <p className="text-sm text-gray-600">
              Published: {schemaData.datePublished}
            </p>
            <p className="mt-2">{schemaData.description}</p>
          </div>
        );

      case 'Event':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">
              {new Date(schemaData.startDate).toLocaleString()} -{' '}
              {new Date(schemaData.endDate).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              {schemaData.location?.name}, {schemaData.location?.address}
            </p>
            <p className="mt-2">{schemaData.description}</p>
            {schemaData.organizer && (
              <p className="text-sm text-gray-600 mt-2">
                Organized by: {schemaData.organizer.name}
              </p>
            )}
          </div>
        );
      case 'Recipe':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold">{schemaData.name}</h3>
            <p className="text-sm text-gray-600">
              Prep: {schemaData.prepTime} | Cook: {schemaData.cookTime} | Total:{' '}
              {schemaData.totalTime}
            </p>
            <p className="text-sm text-gray-600">
              Yield: {schemaData.recipeYield}
            </p>
            <p className="mt-2">{schemaData.description}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Ingredients:</h4>
              <ul className="list-disc list-inside">
                {schemaData.ingredients?.map(
                  (ingredient: any, index: number) => (
                    <li key={index}>{ingredient.item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        );
      case 'FAQPage':
        return (
          <div className="border p-4 rounded-md bg-white shadow-sm">
            <h3 className="text-xl font-bold mb-4">FAQ</h3>
            {schemaData.mainEntity?.map((faq: any, index: number) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold">{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        );
      default:
        return <p>Preview not available for this schema type.</p>;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Search Result Preview</h2>
      {renderPreview()}
    </div>
  );
};
