import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { imageUrl, prompt, revisedPrompt } = location.state || {};

  if (!imageUrl) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={imageUrl} 
          alt={prompt}
          className="w-full h-auto"
        />
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold">Original Prompt:</h3>
            <p className="text-gray-600">{prompt}</p>
          </div>
          {revisedPrompt && (
            <div>
              <h3 className="font-semibold">Revised Prompt:</h3>
              <p className="text-gray-600">{revisedPrompt}</p>
            </div>
          )}
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Generate Another
            </Link>
            <Link 
              to="/gallery" 
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result
