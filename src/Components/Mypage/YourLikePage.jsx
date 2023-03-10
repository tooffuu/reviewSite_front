import React, { useEffect } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Mypage/LikePage.scss";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import { useState } from "react";
import LikePageList from "./LikePageList";
import { useParams } from "react-router-dom";

const YourLikePage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userid, setUserid] = useState(user && user?.id);
  const [likePosts, setLikePosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/heart/nickname?nickname=${params.id}`,
        method: "GET",
      });
      setLikePosts(data.data);
    };
    getData();
  }, []);

  return (
    <>
      <TopbarV2 />
      <div className="likebackground">
        <div className="liketemplate">
          <div className="like_wrap">
            <p>π {params.id} λμ΄ μ°ν κ°κ²</p>
            {user ? (
              likePosts.length != 0 ? (
                <div className="like_post_map">
                  {likePosts.map((likePost, index) => (
                    <LikePageList key={index} likePost={likePost} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="nothing_to_like">μ°ν κ°κ²κ° μμ΅λλ€.</div>
                  <button
                    className="go_like"
                    onClick={() => {
                      window.location.href = "/main";
                    }}
                  >
                    μ°νλ¬κ°κΈ° β
                  </button>
                </>
              )
            ) : (
              <div className="notFoundUserPage">
                λ‘κ·ΈμΈ νμ λ΄κ° μ°ν κ°κ²κ° λ³΄μ¬μ§λλ€.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YourLikePage;
