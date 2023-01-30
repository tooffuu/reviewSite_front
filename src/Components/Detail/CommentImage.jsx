import React from "react";

const CommentImage = ({ photo, Click }) => {
  const cancel = "/images/cancel.png";

  return (
    <>
      {Click === false ? (
        <div className="imageBox">
          <img className="review_img" src={photo.imgUrl} />
        </div>
      ) : (
        <div className="imageBox">
          <img className="review_img" src={photo.imgUrl} />
          <img className="image_delete" src={cancel} />
        </div>
      )}
    </>
  );
};

export default CommentImage;
