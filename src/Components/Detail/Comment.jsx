import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BACKEND_URL, LOCAL_URL } from "../../utils";
import "../../Style/Detail/Comment.scss";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import CommentImage from "./CommentImage";

const Comment = ({ reviewlist }) => {
  const [user, setUser] = useRecoilState(userState);
  const [nicknameon, setNicknameon] = useState(false);
  const [selectNickname, setSelectNickname] = useState("");
  const picture = "/images/pictureInput.png";

  const imageInput = useRef();
  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  const onSubmoit = (e) => {
    e.preventDefault(); //동작때마다 새로고침 중지
    if (window.confirm("삭제하시겠습니까?") === true) {
      deletecontent();
    } else {
      console.log(e);
    }
  };

  const deletecontent = async (e) => {
    try {
      await axios({
        url: `${BACKEND_URL}/delete/${reviewlist.id}`,
        method: "DELETE",
        params: {
          id: reviewlist.id,
        },
      });

      window.location.reload();
    } catch (e) {
      alert("값 입력 실패");
    }
  };

  const get = async (e) => {
    try {
      await axios({
        url: `${BACKEND_URL}/update/content`,
        method: "PATCH",
        data: {
          id: reviewlist.id,
          content: content,
          star: rating,
        },
      });
      window.location.reload();
    } catch (e) {
      alert("값 입력 실패");
    }
  };

  const [Click, setClick] = useState(false);
  const toggleClick = () => {
    if (Click === true) {
      setClick((Click) => !Click); // on,off 개념 boolean
      if (window.confirm("수정하시겠습니까?") === true) {
        get();
      }
    } else if (Click === false) {
      setClick((Click) => !Click);
    }
  };
  //-----------------------------------------------
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setcontent] = useState("");
  // --------------------------------------------
  //수정버튼 눌럿을때 글상자에 원본 내용 나오게
  function setting() {
    setcontent(reviewlist.content);
  }

  const outNickneme = useRef();
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        nicknameon &&
        outNickneme.current &&
        !outNickneme.current.contains(e.target)
      ) {
        setNicknameon(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [nicknameon]);

  useEffect(() => {
    setting();
    setRating(reviewlist.star);
  }, []);

  return (
    <>
      {/* 유저 닉네임 클릭시 나오는 모달창 */}
      {Click === false && (
        <div className="사용자">
          {nicknameon === true && (
            <div className="nameContextMenu" ref={outNickneme}>
              <table className="mbLayer">
                <tbody>
                  <tr>
                    <td className="sideViewRow_mb_cid">
                      <a href={`${LOCAL_URL}/myplace/${selectNickname}`}>
                        📚 북마크
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="sideViewRow_mb_cid">
                      <a
                        href={`${LOCAL_URL}/YourLikePage/${reviewlist.user.nickname}`}
                      >
                        🧡 찜목록
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="sideViewRow_new">
                      <a
                        href={`${LOCAL_URL}/YouReview/${reviewlist.user.nickname}`}
                        rel="nofollow"
                        class="link_new_page"
                      >
                        😶 리뷰보기
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="userDiv">
        {Click === false ? (
          <div className="userReview">
            <img className="usersImg" src={reviewlist.user.imgUrl} />
            <span
              className="review_nick"
              onClick={() => {
                setNicknameon(true);
                setSelectNickname(reviewlist.user?.id);
              }}
            >
              {reviewlist.user?.nickname}
            </span>
            <div className="userReviewAndHeart">
              <span>리뷰 1</span>
              <span> · 찜 12 </span>
            </div>
            {reviewlist?.image.length != 0 ? (
              // 리뷰 댓글의 이미지가 있을 때
              <div className="starRateDate">
                <div className="star-rating">
                  평점 :　
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={index <= reviewlist.star ? "on" : "off"}
                      >
                        <span className="star">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
                <div className="createDate">
                  {reviewlist.createDate.substring(0, 10)}
                </div>
              </div>
            ) : (
              // 리뷰 댓글의 이미지가 없을 때
              <div className="starRateDate">
                <div className="star-rating">
                  평점 :　
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={index <= reviewlist.star ? "on" : "off"}
                      >
                        <span className="star">&#9733;</span>
                      </button>
                    );
                  })}
                </div>
                <div className="createDate">
                  {reviewlist.createDate.substring(0, 10)}
                </div>
              </div>
            )}
            <div className="image_wrap">
              {reviewlist?.image.map((photo, index) => (
                <CommentImage photo={photo} key={index} Click={Click} />
              ))}
            </div>
            <div className="review_content">{reviewlist.content}</div>
          </div>
        ) : (
          <>
            <div className="userReview">
              {reviewlist?.image.length != 0 ? (
                // 리뷰 댓글의 이미지가 있을 때
                <div className="starRateDate">
                  <div className="star-rating star-rating2 star-rating3">
                    평점 :　
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
                </div>
              ) : (
                // 리뷰 댓글의 이미지가 없을 때
                <div className="starRateDate starRateDate2">
                  <div className="star-rating star-rating2">
                    평점 :　
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
                </div>
              )}
              <div className="image_wrap">
                {reviewlist?.image.map((photo, index) => (
                  <CommentImage photo={photo} key={index} />
                ))}
              </div>
              <div className="review_components review_components2">
                <textarea
                  className="comment_textarea comment_textarea2"
                  spellCheck="false"
                  cols="100"
                  rows="9"
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                >
                  {reviewlist.content}
                </textarea>
                <input
                  ref={imageInput}
                  className="fileupload"
                  type="file"
                  multiple
                  // onChange={onSubmit}
                />
                <img
                  className="pictureInput pictureInput2"
                  onClick={onCickImageUpload}
                  src={picture}
                  alt="사진"
                />
              </div>
            </div>
          </>
        )}
        {user?.nickname === reviewlist?.user?.nickname && (
          <>
            {Click === false ? (
              <div className="review_upd_btn">
                <button className="review_edit_btn" onClick={toggleClick}>
                  수정
                </button>
                <button className="review_delete_btn" onClick={onSubmoit}>
                  삭제
                </button>
              </div>
            ) : (
              <div className="review_upd_btn">
                <button className="review_edit_btn" onClick={toggleClick}>
                  수정
                </button>
                <button
                  className="review_delete_btn"
                  onClick={() => {
                    if (window.confirm("수정을 취소하시겠습니까?") === true) {
                      setClick(false);
                    }
                  }}
                >
                  취소
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Comment;
