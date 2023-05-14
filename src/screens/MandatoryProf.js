import React, { useState, useEffect } from "react";
import Headed from "../components/Headed";
import FileInput from "../components/FileInput";
import ImageCropper from "../components/ImageCropper";
import Samplok from "../screens/Samplok";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MandatoryProf = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [profilePic, setProfilePic] = useState("");

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg, filename) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
    setProfilePic(filename); // Set the filename as the profilePic value
  };
  

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
  
    const context = canvasEle.getContext("2d");
  
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
  
      canvasEle.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setProfilePic(base64data);
          setCurrentPage("img-cropped");
        };
        reader.readAsDataURL(blob);
      }, "image/jpeg", 0.8);
    };
  };
  

  // Handle Cancel Button Click
  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  const handleProfilePicChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        setProfilePic(base64data);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePic("");
    }
  };
  

  const handleDoneButtonClick = () => {
    console.log(profilePic);
  };

  return (
    <div style={{ backgroundColor: "lightgray", height: "100vh" }}>
      <Headed />
      <div className="container">
        <div className="second">
          {currentPage === "choose-img" ? (
            <FileInput setImage={setImage} onImageSelected={onImageSelected} />
          ) : currentPage === "crop-img" ? (
            <ImageCropper
              image={image}
              onCropDone={onCropDone}
              onCropCancel={onCropCancel}
            />
          ) : (
            <div>
              <div>
                <img
                  src={profilePic}
                  className="cropped-img"
                  style={{
                    height: "185px",
                    width: "185px",
                    borderRadius: 200,
                    position: "absolute",
                    marginTop: "-118px",
                    marginLeft: "31px",
                  }}
                  alt="logo"
                />
              </div>

              <h2 style={{ color: "white", marginLeft: "30px", marginTop: 100 }}>
                Your Profile Picture
              </h2>

              <Samplok
                initialUsername={username}
                initialProfilePic={profilePic}
                onFileChange={handleProfilePicChange}
                doneButtonClicked={false}
                onDoneButtonClick={handleDoneButtonClick}
              />

              <button
                style={{
                  padding: "10px",
                  width: "100px",
                  marginRight: 50,
                  marginTop: "10px",
                  }}
                  onClick={() => {
                  setCurrentPage("crop-img");
                  }}
                  className="btn"
                  >
                  Edit
                  </button>
                  <button
                  style={{ padding: "10px", width: "100px" }}
                  className="btn"
                  onClick={handleDoneButtonClick}
                  >
                  Done
                  </button>
                  </div>
                  )}
                  </div>
                  </div>
                  </div>
                  );
                  };
                  
                  export default MandatoryProf;