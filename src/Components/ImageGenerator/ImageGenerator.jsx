import React, { useRef, useState, useEffect } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logsExpanded, setLogsExpanded] = useState(true);
  const [introExpanded, setIntroExpanded] = useState(false);
  const [model, setModel] = useState('dall-e-3');
  const [size, setSize] = useState('1024x1024');

  let inputRef = useRef(null);
  let generateBtnRef = useRef(null);

  const addLog = (message) => {
    setLogs([message]); // Only set the latest log
  };

  useEffect(() => {
    const logsContainer = document.getElementById('logs-container');
    if (logsContainer) {
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
  }, [logs]);

  const toggleLogsVisibility = () => {
    setLogsExpanded(!logsExpanded);
  };

  const toggleIntroVisibility = () => {
    setIntroExpanded(!introExpanded);
  };

  const handleImageError = () => {
    // Handle image loading error for the default image
    console.error('Error loading default image');
    // You can add additional logic here, such as setting a different default image
  };

  const imageGenerator = async () => {
    if (inputRef.current.value === '') {
      addLog('Please enter a description.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'User-Agent': 'Chrome',
          },
          body: JSON.stringify({
            model: model,
            prompt: `${inputRef.current.value} I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`,
            n: 1,
            size: size,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          addLog('Error: Detected NSFW content. Please revise your prompt.');
          setLoading(false);
          return;
        }
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      addLog(`API Response: ${JSON.stringify(data)}`);

      let data_array = data.data;
      console.log('Data Array:', data_array);
      addLog(`Data Array: ${JSON.stringify(data_array)}`);

      if (data_array && data_array.length > 0) {
        setImage_url(data_array[0].url);
      } else {
        console.error('Unexpected response structure');
        addLog('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error:', error.message);
      addLog(`Error: ${error.message}`);
    }

    setLoading(false);
  };

  const handleGenerateClick = () => {
    imageGenerator();

    generateBtnRef.current.disabled = true;
    setTimeout(() => {
      generateBtnRef.current.disabled = false;
    }, 7000);
  };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);

    if (selectedModel === 'dall-e-2') {
      setSize('512x512');
    } else if (selectedModel === 'dall-e-3') {
      setSize('1024x1024');
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        Ai image<span>generator</span>
      </div>
      <div className='header1'>
        By <span>MuzzyGames</span>
      </div>
      <div className='img-loading'>
        <div className='image'>
          <img
            key={image_url}
            src={image_url === '/' ? default_image : image_url}
            alt=''
            onError={handleImageError}
          />
        </div>
        <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
        <div className={loading ? 'loading-text' : 'display-none'}>Loading...</div>
      </div>
      <div className='settings'>
        <label>
          Model:
          <select value={model} onChange={handleModelChange}>
            <option value='dall-e-2'>DALL-E 2</option>
            <option value='dall-e-3'>DALL-E 3</option>
          </select>
        </label>
        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {model === 'dall-e-2' && <option value='512x512'>512x512</option>}
            {model === 'dall-e-3' && <option value='1024x1024'>1024x1024</option>}
          </select>
        </label>
      </div>
      <div className='search-box'>
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see'
        />
        <div
          ref={generateBtnRef}
          className={`generate-btn ${loading ? 'loading' : ''}`}
          onClick={handleGenerateClick}
        >
          Generate
        </div>
      </div>

      <div className='toggle-intro-container'>
        <h3>
          Instructions:{' '}
          <button
            className={`toggle-intro-btn ${introExpanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleIntroVisibility}
          >
            {introExpanded ? 'Collapse' : 'Expand'}
          </button>
        </h3>
        {introExpanded && (
          <div className={`intro expanded`}>
            <p>
              Welcome to our AI image generator! Create unique and fascinating images using the latest
              version of DALL-E 3. Explore the frequently asked questions below for more information.
              Be sure to be very descriptive in your prompts; for example, if you want a realistic photo
              of something, at the end of your prompt type realistic high resolution. Please note that DALL-E/OpenAI
              sometimes will rewrite your prompt either to make it more descriptive for better results or to filter out
              restricted content as per their terms and conditions. To check if they rewrote your prompts, please expand
              the logs section below, and you'll see what they rewrote it to.
            </p>
            <div className='faq'>
              <h4>Frequently Asked Questions</h4>
              <p>
                <strong style={{ color: '#de1b89' }}>Q: What model do I choose?</strong>
              </p>
              <p>
                <strong>A:</strong> We offer two models, DALL-E 2 and DALL-E 3. DALL-E 2 is suitable for generating images
                with a resolution of 512x512 pixels, while DALL-E 3 can generate higher-resolution images at 1024x1024 pixels.
                Choose the model based on your specific requirements for image resolution and fidelity.
              </p>
              <p>
                <strong style={{ color: '#de1b89' }}>Q: Does the model generate NSFW content or celebrities?</strong>
              </p>
              <p>
                <strong>A:</strong> No, the models are designed to ensure that generated images are free from NSFW (Not Safe
                For Work) content and known celebrities. If you're interested in generating such content, please check out
                our other image generators.
              </p>
              <p>
                <strong style={{ color: '#de1b89' }}>Q: Can these models generate XYZ?</strong>
              </p>
              <p>
                <strong>A:</strong> The models have limitations, and they may not be able to generate certain types of content.
                If you have specific requirements, please check our other image generators to find a model that suits your needs.
              </p>
              <p>
                <strong style={{ color: '#de1b89' }}>
                  Q: I checked the logs after I generated an image, and DALL-E/OpenAI rewrote my prompt.
                  Why does this happen?
                </strong>
              </p>
              <p>
                <strong>A:</strong> The rewriting of prompts by DALL-E/OpenAI is part of the model's behavior. It aims to enhance
                the prompt's descriptiveness for better image generation results or to filter out restricted content as per their
                terms and conditions. Unfortunately, we cannot control this aspect of the model. If you prefer not to have your
                prompts rewritten, we recommend checking out our other image generators, as they may not have this restriction.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className='logs' id='logs-container'>
        <h3>
          Logs:{' '}
          <button
            className={`toggle-logs-btn ${logsExpanded ? 'expanded' : 'collapsed'}`}
            onClick={toggleLogsVisibility}
          >
            {logsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </h3>
        {logsExpanded && <ul>{logs.map((log, index) => <li key={index}>{log}</li>)}</ul>}
      </div>
    </div>
  );
};

export default ImageGenerator;
