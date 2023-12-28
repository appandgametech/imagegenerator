// ImageGenerator.js

import React, { useRef, useState, useEffect } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [logsExpanded, setLogsExpanded] = useState(true);
    const [model, setModel] = useState('dall-e-3');
    const [size, setSize] = useState('1024x1024');

    let inputRef = useRef(null);
    let generateBtnRef = useRef(null);

    const addLog = (message) => {
        setLogs([message]); // Only set the latest log
    };

    useEffect(() => {
        // Scroll to the bottom of the logs when updated
        const logsContainer = document.getElementById('logs-container');
        if (logsContainer) {
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    }, [logs]);

    const toggleLogsVisibility = () => {
        setLogsExpanded(!logsExpanded);
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
                        Authorization: 'Bearer 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',
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
                    // Display message for NSFW content
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

        // Disable the generate button for 7 seconds
        generateBtnRef.current.disabled = true;
        setTimeout(() => {
            generateBtnRef.current.disabled = false;
        }, 7000);
    };

    return (
        <div className='ai-image-generator'>
            <div className='header'>
                Ai image<span>generator</span>
            </div>
            <div className='header1'>
                By <span>MuzzyGames</span>
            </div>

            <div className='intro'>
                <p>
                    Welcome to our AI image generator! Create unique and fascinating images using
                    the latest version of DALL-E 3. This tool ensures that generated images are free
                    from NSFW content and known celebrities.
                </p>
                <p>
                    If you're looking for more photorealistic images or want to generate
                    celebrities, check out our other image generator.
                </p>
            </div>
            <div className='img-loading'>
                <div className='image'>
                    <img key={image_url} src={image_url === '/' ? default_image : image_url} alt='' />
                </div>
                <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
                <div className={loading ? 'loading-text' : 'display-none'}>Loading...</div>
            </div>
            <div className='settings'>
                <label>
                    Model:
                    <select value={model} onChange={(e) => setModel(e.target.value)}>
                        <option value='dall-e-2'>DALL-E 2</option>
                        <option value='dall-e-3'>DALL-E 3</option>
                    </select>
                </label>
                <label>
                    Size:
                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value='512x512'>512x512</option>
                        <option value='1024x1024'>1024x1024</option>
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
            <div className='logs' id='logs-container'>
                <h3>
                    Logs:{' '}
                    <button className='toggle-logs-btn' onClick={toggleLogsVisibility}>
                        {logsExpanded ? 'Collapse' : 'Expand'}
                    </button>
                </h3>
                {logsExpanded && <ul>{logs.map((log, index) => <li key={index}>{log}</li>)}</ul>}
            </div>
        </div>
    );
};

export default ImageGenerator;
