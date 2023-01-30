import React, { useState } from "react";
import "../../Style/Main/Topbar.scss";
import { TiThMenu } from "react-icons/ti";
import { BiCurrentLocation } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import Login from "../Sign/Login";
import SignUp from "../Sign/SignUp";

const Topbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [modal, setModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [isOpen, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((isOpen) => !isOpen);
  };

  const logo = "/images/sitelogo.png";
  const logout = "/images/logout.png";
  const menu = "/images/menu.png";
  const user3 = "/images/user3.png";

  const openModal = () => {
    setModal(true);
  };

  const openModal2 = () => {
    setSignUpModal(true);
  };

  const closeModal = (e) => {
    setModal(false);
  };

  const closeModal2 = () => {
    setSignUpModal(false);
  };

  return (
    <>
      <div className="backbar">
        <div className="menuBar">
          <div className="siteLogo">
            <img
              className="siteLogo"
              onClick={() => {
                window.location.href = "/";
              }}
              src={logo}
              alt="logo"
            />
          </div>
        </div>

        {user ? (
          <>
            <div className={isOpen ? "menu1 menu2" : "menu1"}>
              <ul>
                <li>
                  <a href={`/myplace/${user.id}`}>MY PLACE</a>
                </li>
                <li>
                  <a href="/likePage">내가 찜한 가게</a>
                </li>
                <li>
                  <a href="/MyReview">내가 작성한 리뷰</a>
                </li>
                <li>
                  <a href="/MypageUserConfirm">마이페이지</a>
                </li>
              </ul>
            </div>
            <div className="sign_btn">
              <div className="now_location">
                <BiCurrentLocation className="BiCurrentLocation" />
                <span id="centerAddr" className="TestCenter"></span>
              </div>
              <div className={isOpen ? "username username1" : "username"}>
                <span
                  className="username_span"
                  onClick={() => {
                    window.location.href = "/MypageUserConfirm";
                  }}
                >
                  {user && `${user.nickname}`}
                </span>
                <span className="welcome_span1">{user && "님"}</span>
                <span className="welcome_span">{user && "님 환영합니다."}</span>
                <div
                  className="logoutBtn userBtn"
                  onClick={() => {
                    window.location.href = "/MypageUserConfirm";
                  }}
                >
                  <img src={user3} />
                </div>
                <div className="logoutBtn">
                  <img
                    src={logout}
                    onClick={() => {
                      if (window.confirm("로그아웃하시겠습니까?")) {
                        setUser(null);
                        window.location.href = "/main";
                      }
                    }}
                  />
                </div>
                <div
                  className="logoutBtn menuBtn"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <img src={menu} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="sign_btn">
              <div className="now_location now_location2">
                <BiCurrentLocation className="BiCurrentLocation" />
                <span id="centerAddr" className="TestCenter"></span>
              </div>
              <div className="loginBtn_wrap">
                <div className="loginBtn">
                  <h3 onClick={openModal}>로그인</h3>
                  <div className="loginBtn">
                    {modal && (
                      <Login closeModal={closeModal} openModal2={openModal2} />
                    )}
                  </div>
                </div>
                <div className="signUpBtn">
                  <h3 onClick={openModal2}>회원가입</h3>
                  <div className="openModal">
                    {signUpModal && (
                      <SignUp openModal={openModal} closeModal2={closeModal2} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Topbar;
