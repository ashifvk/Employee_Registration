// EmployeeList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  // Fetch employees from the backend using Axios
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/employee/');
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/employee/${id}/`);
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find(employee => employee.id === id);
    setEditEmployee(employeeToEdit);
    setProfilePicture(null); // Reset profile picture when opening the dialog
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    // Append fields to FormData
    formData.append('full_name', editEmployee.full_name);
    formData.append('email', editEmployee.email);
    formData.append('department', editEmployee.department);
    formData.append('designation', editEmployee.designation);
    formData.append('date_of_birth', editEmployee.date_of_birth); // New field
    formData.append('contact_number', editEmployee.contact_number); // New field

    if (profilePicture) {
      formData.append('profile_picture', profilePicture); // Add profile picture to FormData
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/employee/${editEmployee.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart
        },
      });
      setEmployees(employees.map(employee => employee.id === editEmployee.id ? { ...editEmployee, profile_picture: profilePicture } : employee));
      setOpenDialog(false);
      setProfilePicture(null); // Reset profile picture after saving
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Generate ID card
  const generateIdCard = (employee) => {
    navigate('/Id', { state: { employee } });
  };

  const handleAddEmployee = () => {
    navigate('/');
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '20px' }}
        onClick={handleAddEmployee}
      >
        Add New Employee
      </Button>

      <TableContainer component={Paper} style={{ margin: '20px', padding: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>DP</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>
                    {employee.profile_picture && (
                    <img
                        src={employee.profile_picture} 
                        alt={`${employee.full_name}'s Profile`}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                    />
                    )}
                </TableCell>
                <TableCell>{employee.full_name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(employee.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => generateIdCard(employee)}>
                    <PictureAsPdfIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={editEmployee?.full_name || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, full_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={editEmployee?.email || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Department"
            type="text"
            fullWidth
            value={editEmployee?.department || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, department: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Designation"
            type="text"
            fullWidth
            value={editEmployee?.designation || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, designation: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            value={editEmployee?.date_of_birth || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, date_of_birth: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact"
            type="tel"
            fullWidth
            value={editEmployee?.contact_number || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, contact_number: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])} // Set the selected file
          />
          {profilePicture && (
            <img
              src={URL.createObjectURL(profilePicture)} // Preview the image
              alt="Profile Preview"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeList;
