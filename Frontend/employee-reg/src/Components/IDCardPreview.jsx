import React, { useRef } from "react";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material"
import { QrCode as QrCodeIcon, Download as DownloadIcon } from "@mui/icons-material"
import jsPDF from "jspdf";
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas"

const IDCardPreview = () => {
  const location = useLocation();
  const { employee } = location.state || {};
  const componentRef = useRef();

  const cardRef = useRef(null)

  const generatePDF = async () => {
    
    if (cardRef.current) {
        console.log(employee)
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const imgWidth = 210 
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const yPosition = (297 - imgHeight) / 2 

      pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, imgHeight)
      pdf.save(`${employee.full_name}_ID_Card.pdf`)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" ref={cardRef}>
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6" >
            <Typography variant="h6" className="font-bold text-blue-600">
              INFOME ID
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              EMP - ID : {employee.id}
            </Typography>
          </div>
          <div className="flex items-center mb-6">
            <Avatar
              src={employee.profile_picture}
              alt={employee.full_name}
              className="w-24 h-24 border-4 border-blue-500"
            />
            <div className="ml-6">
              <Typography variant="h5" className="font-bold text-gray-800">
                {employee.full_name}
              </Typography>
              <Typography variant="body1" className="text-blue-600 font-semibold">
                {employee.designation}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Typography variant="body2" className="text-gray-500">
                Department
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {employee.department}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" className="text-gray-500">
                Date of Birth
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {employee.date_of_birth}
              </Typography>
            </div>
            <div>
              <Typography variant="body2" className="text-gray-500">
                Contact
              </Typography>
              <Typography variant="body1" className="font-semibold">
                {employee.contact_number}
              </Typography>
            </div>
            
            <div className="flex items-center justify-end">
              <QrCodeIcon className="text-blue-500" style={{ fontSize: 64 }} />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            fullWidth
            onClick={generatePDF}
            className="mt-4"
          >
            Download PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  )
};

export default IDCardPreview;
