import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form'

import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CloudUpload } from '@mui/icons-material'
const departments = ['HR', 'Engineering', 'Marketing', 'Sales'];
const designations = ['Manager', 'Developer', 'Designer', 'Consultant'];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    department: '',
    designation: '',
    dateOfBirth: null,
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      formErrors.email = 'Valid email is required';
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber))
      formErrors.contactNumber = 'Valid contact number is required';
    if (!formData.department) formErrors.department = 'Department is required';
    if (!formData.designation) formErrors.designation = 'Designation is required';
    if (!formData.dateOfBirth) formErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.profilePicture) formErrors.profilePicture = 'Profile picture is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const data = new FormData();
    data.append('full_name', formData.fullName);
    data.append('email', formData.email);
    data.append('contact_number', formData.contactNumber);
    data.append('department', formData.department);
    data.append('designation', formData.designation);
    data.append('date_of_birth', formData.dateOfBirth.toISOString().split('T')[0]);
    data.append('profile_picture', formData.profilePicture);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/employee/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', error.response.data);
    }
    navigate('/list');
  };

  return (
   
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" 
        >
      <Paper className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
    <Container>
      <Typography variant="h4" className="text-center font-bold text-gray-900 " sx={{ marginBottom: 3 }}>
       Registration Form
    </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              name="contactNumber"
              fullWidth
              value={formData.contactNumber}
              onChange={handleChange}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.department}>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                label="Department"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
              {errors.department && <span>{errors.department}</span>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.designation}>
              <InputLabel>Designation</InputLabel>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                label="Designation"
              >
                {designations.map((designation) => (
                  <MenuItem key={designation} value={designation}>
                    {designation}
                  </MenuItem>
                ))}
              </Select>
              {errors.designation && <span>{errors.designation}</span>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!errors.dateOfBirth} helperText={errors.dateOfBirth} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<CloudUpload />}
            className="rounded-md border-2 border-dashed border-gray-300 p-4 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
          >
              Upload Profile Picture
              <input
                type="file"
                name="profilePicture"
                hidden
                onChange={handleChange}
              />
            </Button>
            {errors.profilePicture && <span>{errors.profilePicture}</span>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </Paper>
    </Box>

  );
};

export default Register;
