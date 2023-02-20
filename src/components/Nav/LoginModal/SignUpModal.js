import React, { useState } from 'react';
import SignUpSuccess from './SignUpSuccess';
import './SignUpModal.scss';

const SignupModal = props => {
  const { signUpOpen, setSignUpOpen, setIsOpen, setMenuOpen } = props;
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    last_name: '',
    first_name: '',
    email: '',
    password: '',
  });

  const signUpCondition =
    signUpForm.email.includes('@') &&
    signUpForm.password.length > 5 &&
    signUpForm.last_name.length > 0 &&
    signUpForm.first_name.length > 0;

  const signUp = () => {
    fetch('http://52.78.118.58:3000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: signUpForm.email,
        password: signUpForm.password,
        firstname: signUpForm.first_name,
        lastname: signUpForm.last_name,
      }),
    })
      .then(response => response.json())
      .then(response => {
        setSignUpSuccess(true);
      });
  };

  const changeSignUpInput = ({ target }) => {
    const { name, value } = target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };
  if (!signUpOpen) return null;

  return (
    <div className="signOverlay">
      <div className="signModal">
        <div className="imageLine">
          <img
            className="arrow"
            src="images/leftarrow.png"
            onClick={() => setSignUpOpen(false)}
            alt="arrow"
          />
          <img
            className="delete"
            src="images/delete.png"
            alt="delete"
            onClick={() => {
              setIsOpen(false);
              setSignUpOpen(false);
              setMenuOpen(false);
            }}
          />
        </div>
        <div className="signUpText">회원가입</div>
        <div className="signUpAlram">
          회원가입을 통해 주문 내역을 확인하고 지난 구매 상품을 재구매하실 수
          있습니다.
        </div>
        <div className="inputBox">
          <div className="firstInputContainer">
            <input
              name="last_name"
              autoComplete="off"
              className="firstInput"
              onChange={changeSignUpInput}
              value={signUpForm.last_name}
            />
            <label className="firstInputLabel">
              <span className="firstInputName">성</span>
            </label>
          </div>
          <div className="secondInputContainer">
            <input
              name="first_name"
              autoComplete="off"
              className="secondInput"
              onChange={changeSignUpInput}
              value={signUpForm.first_name}
            />
            <label className="secondInputLabel">
              <span className="secondInputName">이름</span>
            </label>
          </div>
        </div>
        <div className="thirdInputContainer">
          <input
            name="email"
            autoComplete="off"
            className="thirdInput"
            onChange={changeSignUpInput}
            value={signUpForm.email}
          />
          <label className="thirdInputLabel">
            <span className="thirdInputName">이메일주소</span>
          </label>
        </div>
        <div className="fourthInputContainer">
          <input
            name="password"
            autoComplete="off"
            type="password"
            className="fourthInput"
            onChange={changeSignUpInput}
            value={signUpForm.password}
          />
          <label className="fourthInputLabel">
            <span className="fourthInputName">비밀번호</span>
          </label>
        </div>
        <div className="secondCheckBox">
          <input className="checkBoxBtn" type="checkbox" />
          <span>이용 약관에 동의합니다 (필수)</span>
        </div>
        <div className="terms">
          <p className="termsText">
            제 1 장 총 칙 제 1 조 (목적) 이 약관은 ASAP(이하 "사이트"라
            합니다)에서 제공하는 인터넷서비스(이하 "서비스"라 합니다)의 이용
            조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다. 제 2
            조 (약관의 효력 및 변경) ① 이 약관은 서비스 화면이나 기타의 방법으로
            이용고객에게 공지함으로써 효력을 발생합니다. ② 사이트는 이 약관의
            내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지
            또는 통지함으로써 효력을 발생합니다. 제 3 조 (용어의 정의) 이
            약관에서 사용하는 용어의 정의는 다음과 같습니다. ① 회원 : 사이트와
            서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은 개인 또는
            단체를 말합니다. ② 신청자 : 회원가입을 신청하는 개인 또는 단체를
            말합니다. ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이
            정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다. ④ 비밀번호 :
            회원이 부여 받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의
            비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다. ⑤
            해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.
          </p>
        </div>
        <button
          className="signUpBtn"
          disabled={!signUpCondition}
          onClick={signUp}
        >
          회원가입
        </button>
        <SignUpSuccess
          signUpSuccess={signUpSuccess}
          setIsOpen={setIsOpen}
          setSignUpOpen={setSignUpOpen}
          first_name={signUpForm.first_name}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </div>
  );
};

export default SignupModal;
