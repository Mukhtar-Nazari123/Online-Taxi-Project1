import React, { useState } from 'react';
import axios from 'axios';


function DriverInfo() {
  const [files, setFiles] = useState({
    your_photo: null,
    id_card_photo: null,
    license_photo: null,
  });
  const [address, setAddress] = useState('');
  const userId = localStorage.getItem('driver_id');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files && files[0]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [id]: files[0],
      }));
      console.log(`File added for ${id}:`, files[0]); // Log the file
    } else {
      console.log(`No file selected for ${id}`);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage('User ID is required.');
      return;
    }

    if (!files.your_photo || !files.id_card_photo || !files.license_photo) {
      setErrorMessage('All file fields are required.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('your_photo', files.your_photo);
      formData.append('id_card_photo', files.id_card_photo);
      formData.append('license_photo', files.license_photo);
      formData.append('address', address);

      try {
        const response = await axios.post('/api/driver/docs', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.status === 200) {
          localStorage.setItem('driver_id', response.data.id);}
        setSuccessMessage(response.data.message);
      } catch (error) {
        let errorMsg = 'An unexpected error occurred.';
        
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          // Assuming the errors object contains field names as keys
          errorMsg = Object.values(errors)
            .flat() // Flatten array of arrays
            .join(', '); // Join with commas
        }
    
        setErrorMessage(errorMsg);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-6 mt-3'>
        <form className="row g-3" onSubmit={handleSubmit}>
          <p className='fs-3 fw-bold'>Your Documents</p>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <div className="col-md-6">
            <label htmlFor="your_photo" className="form-label">Your Photo</label>
            <input type="file" accept="image/*" className="form-control" id="your_photo" onChange={handleFileChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="id_card_photo" className="form-label">ID Card Front</label>
            <input type="file" accept="image/*" className="form-control" id="id_card_photo" onChange={handleFileChange} />
          </div>
          <div className="col-12">
            <label htmlFor="license_photo" className="form-label">Driving License</label>
            <input type="file" accept="image/*" className="form-control" id="license_photo" onChange={handleFileChange} />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="address..." value={address} onChange={handleAddressChange} />
          </div>
          <div className="col-12">
            <input type="submit" value={loading ? 'Submitting...' : 'Submit'} className="bg-primary form-control mt-2" disabled={loading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default DriverInfo;