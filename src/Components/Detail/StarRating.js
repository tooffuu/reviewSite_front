import React, { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import "../../Style/Detail/StarRating.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const StarRating = () => {
  const { id } = useParams();
  const { place_name } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [user, setUser] = useRecoilState(userState);
  const [content, setContent] = useState("");
  const [files, setFlies] = useState([]);

  const picture = "/images/pictureInput.png";

  //-----------------------------------------------
  const [nickname, setNickname] = useState("");
  const [Click, setClick] = useState(false);

  function setting() {
    setNickname(user?.nickname);
  }
  useEffect(() => {
    setting();
  }, []);

  const star = rating;
  const detail_id = id;
  const detail_name = place_name;

  const formData = new FormData();

  const post = async (e) => {
    formData.append("content", content);
    formData.append("detail_id", detail_id);
    formData.append("detail_name", detail_name);
    formData.append("star", star);
    formData.append("nickname", nickname);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    if (window.confirm("등록하시겠습니까?")) {
      if (files.length > 5) {
        alert("사진은 5개까지만 등록가능합니다.");
        return;
      } else {
        try {
          const data = await axios({
            url: `${BACKEND_URL}/answer/create/post?userId=${user.id}`,
            method: "POST",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          window.location.reload();
        } catch (e) {
          console.log(e);
          alert("값 입력 실패");
        }
      }
    }
  };

  const message = () => {
    if (!user) {
      alert("로그인을 해주세요.");
      return;
    } else if (content == "") {
      alert("내용을 입력해주세요");
    } else if (star == 0) {
      alert("평점을 입력해주세요");
    } else {
      post();
    }
  };

  const onSubmit = (e) => {
    setFlies(e.target.files);
  };
  const onContent = (e) => {
    setContent(e.target.value);
  };

  // 이미지 업로드 커스텀
  const imageInput = useRef();
  const onCickImageUpload = () => {
    imageInput?.current.click();
  };

  return (
    <div className="write_review_div">
      <div className="review_components">
        {user ? (
          <textarea
            className="comment_textarea"
            placeholder="리뷰를 작성해주세요."
            onChange={onContent}
            spellCheck="false"
            cols="50"
            rows="10"
          />
        ) : (
          <textarea
            className="comment_textarea"
            placeholder="로그인 후 리뷰를 작성할 수 있습니다."
            onChange={onContent}
            spellCheck="false"
            cols="50"
            rows="10"
          />
        )}
        <input
          ref={imageInput}
          className="fileupload"
          type="file"
          multiple
          onChange={onSubmit}
        />
        <img
          className="pictureInput"
          onClick={onCickImageUpload}
          src={picture}
          alt="사진"
        />
        <div className="starRate">
          평점 :{"  "}
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
        <button
          className="writeInput"
          onClick={() => {
            message();
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default StarRating;
