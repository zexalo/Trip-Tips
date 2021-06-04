import React from "react";

export default function EditProfilPicture(props) {
  const pickedImage = React.useRef(null);

  const handleImagePicking = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = pickedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div
      className="editProfilePictureMainContainer"
      style={{
        display: props.isEditProfilePictureVisible ? "flex" : "none",
      }}
      tabIndex={0}
      onClick={props.hideEditProfilePictureWindow}
    >
      <div
        className="edit-picture-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="crossButtonContainer">
          <button
            className="crossButton"
            onClick={props.hideEditProfilePictureWindow}
          >
            X
          </button>
        </div>
        <div className="header">Edit my profile picture</div>
        <div className="content">
          <form className="form">
            <div className="form-group">
              <label>Choose your new profil picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePicking}
              ></input>
            </div>
            <div className="form-group">
              <label className="previewerLabel">Previewer</label>
              <div className="profilImageContainer">
                <div className="profilImage">
                    <img ref={pickedImage}></img>
                </div>
              </div>
            </div>
            <div className="footer">
              <button type="submit" className="edit-button">Upload your picture</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
