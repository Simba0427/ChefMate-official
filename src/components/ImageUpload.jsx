import React, { useState } from "react";
import axios from "axios";
import '../styles/imageupload.css';

<<<<<<< HEAD
const ImageUpload = ({ handleImageUpload }) => {
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [loading, setLoading] = useState(false); // State for tracking loading status

  // Function to handle the image file upload
  const handleImageUploadChange = (e) => {
=======
const ImageUpload = ({ addIngredient }) => {
  const [image, setImage] = useState(null); // State for storing the uploaded image
  const [loading, setLoading] = useState(false); // State for tracking loading status
  const [detectedObjects, setDetectedObjects] = useState("");
  // Function to handle the image file upload
  const handleImageUpload = (e) => {
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
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
<<<<<<< HEAD
      await handleImageUpload(base64Image); // Call the parent component's image upload handler
=======
      const response = await axios.post("http://localhost:5000/api/detect", {
        imageBase64: base64Image, // Send the base64-encoded image to the backend
      });

      setDetectedObjects(response.data.detectedObjects); // Update the detectedObjects state with the response data
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
    } catch (error) {
      console.error("Error detecting objects:", error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false when the detection process is complete
    }
  };

  return (
    <div className="detect-container">
      {/* Input for uploading the image file */}
<<<<<<< HEAD
      <input className="input-field" type="file" accept="image/*" onChange={handleImageUploadChange} />
=======
      <input className="input-field" type="file" accept="image/*" onChange={handleImageUpload} />
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
      {image && (
        <div>
          {/* Display the uploaded image */}
          <img src={image} alt="Uploaded" style={{ maxWidth: "250px" }} />
          {/* Button to trigger object detection */}
          <button className="detect-btn" onClick={detectObjects} disabled={loading}>
<<<<<<< HEAD
            {loading ? "Detecting..." : "Detect Objects"}
          </button>
        </div>
      )}
=======
            Detect Objects
          </button>
        </div>
      )}
      {/* Display loading message when detection is in progress */}
      {loading && <p>Detecting objects, please wait...</p>}
      {detectedObjects && (
        <div>
          <h3>Detected Objects:</h3>
          <p className="p-tag">{detectedObjects}</p>
        </div>
      )}
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
    </div>
  );
};

export default ImageUpload;
<<<<<<< HEAD






=======
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
