import React, { useState } from 'react';
import MonsterApiClient from 'monsterapi';


const TextToImageGenerator = ({ apiKey }) => {
  const [textInput, setTextInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [gifUrl, setGifUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextToImageGeneration = async () => {
    try {
      if (!textInput.trim()) {
        // If input is empty, do not proceed
        alert('Please enter text for image generation.');
        return;
      }

      // Set loading to true while waiting for the API response
      setLoading(true);

      // Create a MonsterApiClient instance
      const client = new MonsterApiClient(apiKey);

      // Input parameters for text-to-image generation
      const input = {
        prompt: textInput,
        samples: 1,
      };

      // Call the Monster API to generate the image
      const response = await client.generate('txt2img', input);

      console.log('Generated image:', response);

      if (response && response.output && response.output.length > 0) {
        // Set the generated image URL
        setGeneratedImage(response.output[0]);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      // Set loading to false after API response or error
      setLoading(false);
    }};

    const handleTextToVideoGeneration = async () => {
      setLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:5000/generate_gif', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'  // Set the content type to JSON
          },
          body: JSON.stringify({ user_input: userInput }) 
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate GIF');
        }
  
        const data = await response.json();
        setGifUrl(data.gif_url);
      } catch (error) {
        console.error(error);
      }
      finally {
        // Set loading to false after API response or error
        setLoading(false);
      }

  };

  return (
    <div className="text-to-image-generator">
      

      {/* Input for text-to-image generation */}
      <textarea
        className="text-input text-black"
        placeholder="Enter text for image generation"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
   <div className="button-container">
      {/* Button to trigger text-to-image generation */}
      <button className="generate-btn" onClick={handleTextToImageGeneration}>
        Generate Image
      </button>
      <button className="generate-btn" onClick={handleTextToVideoGeneration}>
        Generate Video
      </button>
</div>
      {/* Display loading indicator while generating the image */}
      {loading && <p className="loading">Generating...</p>}

      {/* Display the generated image if available */}
      {generatedImage && (
        <div className="generated-image">
          <h3>Generated Image</h3>
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
{/* Display the generated image if available */}
{gifUrl && (
        <div>
          <h2>Generated GIF</h2>
          <img src={gifUrl} alt="Generated GIF" />
          
        </div>
      )}

      <style jsx>{`
        .text-to-image-generator {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .button-container {
          display: flex;
        }
        .generate-btn {
          margin-right: 10px; /* Add space between buttons */
        }
        
        .generate-btn:last-child {
          margin-right: 0; /* Remove margin for the last button to prevent extra space */
        }

        .text-input {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: vertical;
        }

        .generate-btn {
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 15px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .generate-btn:hover {
          background-color: #0056b3;
        }

        .loading {
          margin: 10px 0;
        }

        .generated-image {
          margin-top: 20px;
        }

        .generated-image img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default TextToImageGenerator;
