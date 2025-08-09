import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a description');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to generate image');
      }

      navigate('/result', { 
        state: { 
          imageUrl: data.imageUrl,
          prompt: prompt,
          revisedPrompt: data.revised_prompt 
        } 
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Image Generator</h1>
        <Link 
          to="/gallery" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Gallery
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full p-3 border rounded-lg h-32"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 text-white p-3 rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
    </div>
  );
};

export default Home
