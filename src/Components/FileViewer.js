import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "./LoadingBox";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfjs from "pdfjs-dist/legacy/build/pdf";
import { useNavigate,useParams  } from 'react-router-dom';


// Import the default export from the pdf.worker.entry module
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

const FileViewer = () => {
  const [fileData, setFileData] = useState(null);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const {name}=params;
  const navigate=useNavigate();
  useEffect(() => {
    // Fetch the file from the URL
    fetchFile();
  }, []);

  const fetchFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/authentication-service/file/${name}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const blob = await response.blob();
      // Extract the file name from the URL
      const urlParts = response.url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const fileType = fileName.split(".").pop();
      const file = new File([blob], fileName, { type: `application/${fileType}` });
      setFileData(file);
      setLoading(false);
    } catch (error) {
    if (error.response && error.response.status === 401) {
        navigate('/login-register');
        }
      console.error("Error fetching file:", error);
      setLoading(false);
    }
  };

  const isPdf = fileData && /\.(pdf)$/i.test(fileData.name);
  const isImage = fileData && /\.(jpg|jpeg|png)$/i.test(fileData.name);

  if (isPdf) {
    return (
      <div>
        {loading ? (
          <LoadingBox />
        ) : (
          <div style={{ height: "80%" }}>
            {/* Pass the pdfWorker to the Worker prop */}
            <Viewer
              fileUrl={URL.createObjectURL(fileData)}
              worker={pdfWorker}
            />
          </div>
        )}
      </div>
    );
  }

  if (isImage) {
    const imageUrl = fileData && URL.createObjectURL(fileData);

    return (
      <div>
        {loading ? (
          <LoadingBox />
        ) : (
          <img className="file-viewer-image" src={imageUrl} alt="File" />
        )}
      </div>
    );
  }

  // Handle unsupported file types or when fileData is null
  return <div>Unsupported file or no file provided</div>;
};

export default FileViewer;
