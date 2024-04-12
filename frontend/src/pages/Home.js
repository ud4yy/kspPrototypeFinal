import React, { useState } from 'react';
import AxiosInstance from './axios'; // Import your axios instance
import './Home.css'; // Import CSS 

function Home() {
  
  const [videoFile, setVideoFile] = useState(null);
  const [locality, setLocality] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [videoKey, setVideoKey] = useState(Date.now()); // Unique key for video element
  const [playing, setPlaying] = useState(false);

  const handleFileChange = (event) => {
    setError('');
    setVideoFile(event.target.files[0]);
    setPlaying(true); // Start playing the video when selected
    setVideoKey(Date.now()); // Update key to force re-render of video element
  };

  const handleLocalityChange = (event) => {
    setLocality(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoFile || !locality) {
      setError('Please fill out all fields.');
      return;
    }
    if (!videoFile.type.startsWith('video/')) {
      setError('Please select a valid video file.');
      return;
    }
    // All fields are valid
    setError(''); // Clear any existing error message
  
    // Create a FormData instance to hold the file and locality
    const formData = new FormData();
    formData.append('file', videoFile); // Make sure 'file' is the correct key
    formData.append('locality', locality); // Make sure 'locality' is the correct key
  
    try {
      // Make a POST request to your Django backend
      const response = await AxiosInstance.post('/upload_video/', formData); // Replace '/correct_endpoint/' with your actual endpoint
      console.log('Response:', response.data);
      setSubmitted(true);
      setVideoKey(Date.now()); // Update key to force re-render of video element
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Error uploading video. Please try again.');
    }
  
    // Clear the submitted state after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 2000);
  };
  

  return (
    <div className='home-container'>
      <div className="form-container">
        <h2 className="form-heading">Upload Video</h2>
        {error && <div className="error-message">{error}</div>}
        {submitted && <div className="success-message">Form submitted successfully!</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="video" className="form-label">Video:</label>
            <input type="file" id="video" className="form-input" onChange={handleFileChange} accept="video/*" />
          </div>
          <div className="form-group">
            <label htmlFor="locality" className="form-label">Locality:</label>
            <input type="text" id="locality" className="form-input" value={locality} onChange={handleLocalityChange} />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <div className="video-container">
        {playing && videoFile && (
          <video key={videoKey} controls autoPlay className="video-player">
            <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}

export default Home;
