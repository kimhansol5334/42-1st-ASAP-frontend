import React, { useState, useEffect } from 'react';
import SignupModal from './SignUpModal';
import deleteImg from './images/delete.png';
import './LoginModal.scss';

const LoginModal = props => {
  const { isOpen, setIsOpen, setLoginStatus, setMenuOpen } = props;
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.style.overflowY = 'hidden';
    } else {
      html.style.overflowY = 'auto';
    }
    return () => {
      html.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const loginHandler = () => {
    fetch('http://52.78.118.58:3000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then(response => response.json())
      .catch(error => alert('서버와의 연결이 원활하지 않습니다'))
      .then(data => {
        if (data.accessToken) {
          alert('로그인 되셨습니다');
          localStorage.setItem('login-token', data.accessToken);
          setIsOpen(false);
          setFormData({ email: '', password: '' });
        } else {
          alert('아이디 혹은 비밀번호를 확인해주세요!');
        }
      });
  };

  const changeFormInput = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="loginOverlay">
      <div className="loginModal" id="modalScroll">
        <div className="loginDelete">
          <img
            className="closeBtn"
            src={deleteImg}
            onClick={() => {
              setIsOpen(false);
              setMenuOpen(false);
              setFormData({ email: '', password: '' });
            }}
            alt="delete"
          />
        </div>
        <div className="loginText">로그인</div>
        <p className="idInputContainer">
          <input
            className="idInput"
            id="inputEmail"
            name="email"
            onChange={changeFormInput}
            value={formData.email}
            autoComplete="off"
          />
          <label className="idLabel">
            <span className="idName">이메일주소</span>
          </label>
        </p>
        <p className="pwInputContainer">
          <input
            className="pwInput"
            name="password"
            type="password"
            onChange={changeFormInput}
            value={formData.password}
            autoComplete="current-password"
          />
          <label className="pwLabel">
            <span className="pwName">비밀번호</span>
          </label>
        </p>

        <button
          className="loginBtn"
          onClick={loginHandler}
          disabled={
            !(formData.email.includes('@') && formData.password.length > 5)
          }
        >
          로그인
        </button>
        <div className="notMember">회원이 아니신가요?</div>
        <button className="signupBtn" onClick={() => setSignUpOpen(true)}>
          회원가입
        </button>
        <SignupModal
          signUpOpen={signUpOpen}
          setSignUpOpen={setSignUpOpen}
          setIsOpen={setIsOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </div>
  );
};

export default LoginModal;
