import React from "react";
import { LOCAL_URL } from "../../utils";

const LikePageList = ({ likePost }) => {
  const id = likePost.postid;
  const name = likePost.postName;
  const img = likePost.img;

  return (
    <>
      <div className="postList_wrap">
        <img
          src={img}
          className="post_photo"
          onClick={() => {
            window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
          }}
        />
        <div className="list_info_wrap">
          {name?.length > 12 ? (
            <div
              className="post_Name post_Name2"
              onClick={() => {
                window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
              }}
            >
              {name}
            </div>
          ) : (
            <div
              className="post_Name"
              onClick={() => {
                window.location.href = `${LOCAL_URL}/Detail/${name}/${id}`;
              }}
            >
              {name}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LikePageList;
