import React, { useState, useRef, useEffect } from "react";
import Header from "../../Header/header";
import Sidebar from "../../Sidemenu/Sidebar";
import pdf1 from "../../../../assets/pdfs/blob.pdf"
import pdf2 from "../../../../assets/pdfs/blob(1).pdf"
import pdf3 from "../../../../assets/pdfs/blob(2).pdf"
import pdf4 from "../../../../assets/pdfs/blob(3).pdf"
import { Document, Page } from 'react-pdf';
const Reports = () => {
  console.log(pdf1)
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Report 1",
      date: "2023-08-01",
      pdfUrl: pdf1,
    },
    {
      id: 2,
      title: "Report 2",
      date: "2023-08-02",
      pdfUrl: pdf2,
    },
    {
      id: 3,
      title: "Report 3",
      date: "2023-08-03",
      pdfUrl: pdf3,
    },
    {
      id: 4,
      title: "Report 4",
      date: "2023-08-04",
      pdfUrl: pdf4,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setPdfName('');
    setPdfFile(null);
  };

 
  const handleSaveReport = () => {
    if (pdfName && pdfFile) {
      const currentDate = new Date().toISOString().split('T')[0];
      const newReport = {
        id: reports.length + 1,
        title: pdfName,
        date: currentDate,
        pdfUrl: URL.createObjectURL(pdfFile),
      };
      setReports([...reports, newReport]);
      handleCloseDialog();
    }
  };
  const handleDelete = (id) => {
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
  };

  return (
    <>
      <Header />
      <div className="app d-flex " style={{ position: 'absolute', width: '100%', height: 'calc(100vh - 120px)' }}>
        <Sidebar />
        <div className="componentContainer">
          <div className="ComponentInnerContainer" style={{ padding: "20px" }}>
            <div style={{display:"flex",justifyContent:"space-between", marginBottom:"35px"}}>
            <h2>Reports</h2>
            <button title="Upload New PDF"style={{color:"white"}} onClick={handleOpenDialog}> + </button>
            </div>
            <hr></hr>
            <div className="reports-container">
              {reports.map((report) => (
                <div key={report.id} className="report-card" style={{display:"flex",justifyContent:"space-between",
                padding: "16px",
                borderRadius: "12px" ,marginBottom:"10px",marginTop:"10px",  boxShadow: "rgba(0, 0, 0, 0.2) 1px 4px 7px"}}>
                  <div className="report-info">
                    <h3>{report.title}</h3>
                    <p>Date: {report.date}</p>
                  </div>
                  <div className="report-actions" style={{alignItems:"center" ,display:"flex"}}>
                    <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <button>view</button>
                    </a>
                    <button onClick={() => handleDelete(report.id)} style={{backgroundColor:"red",color:"white"}}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
      {dialogOpen && <>
         <div className="componentContainer">

         <div className="dialog-container">
          
           <div className="dialog-box">
           <h2>Upload PDF</h2>
           <div>
           
          <input
            type="text"
            placeholder="PDF Name"
            value={pdfName}
            onChange={(e) => setPdfName(e.target.value) } style={{marginBottom:"20px",marginTop:"20px"}}
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])} style={{marginBottom:"20px"}}
          />
          <button onClick={handleSaveReport}>Save</button>
          <button onClick={handleCloseDialog}>Cancel</button>
        </div>
            </div>
            </div>
            </div>
           </>
      }

    </>
  );
}


export default Reports;