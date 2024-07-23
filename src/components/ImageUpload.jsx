import React, { useState } from "react";
import axios from "axios";
import '../styles/imageupload.css';

const ImageUpload = ({ handleImageUpload }) => {
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [loading, setLoading] = useState(false); // State for tracking loading status

  // Function to handle the image file upload
  const handleImageUploadChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    const reader = new FileReader(); // Create a new FileReader object
    // When the file is read, update the image state with the base64-encoded string
    reader.onloadend = () => {
      setImage(reader.result); // Set the image state with the base64 string
    };
    reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
  };

  // Function to send the image to the backend and get detected objects
  const detectObjects = async () => {
    try {
      setLoading(true); // Set loading to true when starting the detection process
      const base64Image = image.split(",")[1]; // Extract the base64-encoded string without the data URL prefix
      await handleImageUpload(base64Image); // Call the parent component's image upload handler
    } catch (error) {
      console.error("Error detecting objects:", error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false when the detection process is complete
    }
  };

  return (
    <div className="detect-container">
      {/* Input for uploading the image file */}
      <input className="input-field" type="file" accept="image/*" onChange={handleImageUploadChange} />
      {image && (
        <div>
          {/* Display the uploaded image */}
          <img src={image} alt="Uploaded" style={{ maxWidth: "250px" }} />
          {/* Button to trigger object detection */}
          <button className="detect-btn" onClick={detectObjects} disabled={loading}>
            {loading ? "Detecting..." : "Detect Objects"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;






