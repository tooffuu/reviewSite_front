import React, { useState } from "react";
import "../../Style/Main/Topbar.scss";
import { TiThMenu } from "react-icons/ti";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import Login from "../Sign/Login";
import SignUp from "../Sign/SignUp";
import $ from "jquery";

// 스크롤 감지 헤더
$(function () {
  // 변수 초기화
  let lastScrollTop = 0,
    delta = 400; // 기존의 스크롤 위치를 저장하는 역할, 헤더가 숨겨지는 위치값

  // 문서를 스크롤했을 때 함수 실행
  $(window).scroll(function (event) {
    // 현재 스크롤 위치를 st 변수에 저장
    let st = $(this).scrollTop();

    // Math.abs()는 절대값을 반환하는 함수입니다. 예) -1 = 1, 1 = 1
    // lastScrollTop - 현재 위치값(st)을 뺐을 때의 절대값이, delta 보다 작거나 같다면, 함수를 실행 취소합니다
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // 만약에 현재 위치가 lastScrollTop보다 작고, 0보다 크다면 (스크롤을 내리면)
    if (st > lastScrollTop && lastScrollTop > 0) {
      // 헤더의 위치를 top:-61px(헤더의 높이)로 이동해라. (위로 올려라)
      $("header").css("top", "-110px");
    } else {
      // 그렇지 않다면 헤더의 위치를 원래 위치로 이동시켜라.
      $("header").css("top", "0px");
    }

    // lastScrollTop 변수에 스크롤의 현재 위치 저장
    lastScrollTop = st;
  });
});

const Topbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [modal, setModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const logo = "/images/sitelogo.png";
  const logout = "/images/logout.png";

  const openModal = () => {
    setModal(true);
  };

  const openModal2 = () => {
    setSignUpModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const closeModal2 = () => {
    setSignUpModal(false);
  };

  return (
    <>
      <header className="backbar">
        <div className="menuBar">
          <div className="siteLogo">
            <img
              className="siteLogo"
              onClick={() => {
                window.location.href = "/main ";
              }}
              src={logo}
              alt="logo"
            />
          </div>
        </div>

        {user ? (
          <>
            <div className="menu1">
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
              <p className="username">
                <span
                  className="username_span"
                  onClick={() => {
                    window.location.href = "/MypageUserConfirm";
                  }}
                >
                  {user && `${user.nickname}`}
                </span>
                {user && "님 환영합니다."}
              </p>
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
            </div>
          </>
        ) : (
          <>
            <div className="sign_btn">
              <div className="loginBtn_wrap">
                <div className="loginBtn">
                  <h3 onClick={openModal}>로그인</h3>
                  <div className="openModal">
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
      </header>
    </>
  );
};

export default Topbar;
