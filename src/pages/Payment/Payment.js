import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../components/Nav/MenuModal/Hide';
import PaymentEmail from './components/PaymentEmail';
import PaymentAddress from './components/PaymentAddress';
import PaymentShipping from './components/PaymentShipping';
import './Payment.scss';

function Payment() {
  const [inputs, setInputs] = useState({
    email: '',
    lastName: '',
    firstName: '',
    phone: '',
    address: '',
  });

  const [isValid, setIsValid] = useState({
    default: false,
    email: false,
    name: true,
    address: false,
  });

  const [choiceCountry, setChoiceCountry] = useState('USA');

  const handleCountry = e => {
    setChoiceCountry(e.target.value);
  };

  const [paymentData, setPaymentData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [menuOpen, setMenuOpen] = useContext(MenuContext);

  const { email, lastName, firstName, address } = inputs;

  const displayText = e => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const navigate = useNavigate();

  let token = localStorage.getItem('login-token');

  useEffect(() => {
    fetch('http://52.78.118.58:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setUserData(data.data && data.data[0]));
  }, []);

  useEffect(() => {
    fetch('http://52.78.118.58:3000/carts/price', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setPaymentData(data.data && data.data[0]));
  }, []);

  useEffect(() => {
    fetch('http://52.78.118.58:3000/carts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => setCartData(data.data && data.data));
  }, []);

  const onClickAddress = e => {
    e.preventDefault();
    setIsValid({ ...isValid, address: true });
  };

  const onClickPay = e => {
    e.preventDefault();
    fetch('http://52.78.118.58:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        address: address,
        country: choiceCountry,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
    // .finally(() => alert('결제가 완료되었습니다.'));
    alert('결제가 완료되었습니다.');
    navigate('/');
  };

  return (
    <div className={!menuOpen ? 'Payment' : 'PaymentClose'}>
      <div className="left">
        <div className="logoWrapper">
          <img alt="logo" className="logo" src="./images/asaplogo.png" />
        </div>
        <div className="contextWrapper">
          {isValid.default && (
            <PaymentEmail
              value={email}
              element={email}
              name={email}
              displayText={displayText}
              isValid={isValid}
            />
          )}

          {isValid.name && (
            <PaymentAddress
              value={address}
              element={address}
              displayText={displayText}
              isValid={isValid}
              onClickAddress={onClickAddress}
              choiceCountry={choiceCountry}
              handleCountry={handleCountry}
              userData={userData}
            />
          )}

          {isValid.address && (
            <PaymentShipping
              isValid={isValid}
              displayText={displayText}
              inputs={inputs}
              onClickPay={onClickPay}
              userData={userData}
            />
          )}
        </div>
      </div>
      <div className="right">
        <section className="paymentOverview">
          <div className="overviewDetail">
            <dt>배송비</dt>
            <dd>₩0</dd>
          </div>

          <div className="overviewDetail">
            <dt>포함된 세금</dt>
            <dd>₩0</dd>
          </div>

          <div className="overviewDetail total">
            <dt>합계</dt>
            <dd>
              ₩
              {paymentData.total_price &&
                paymentData.total_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </dd>
          </div>

          <div className="viewAll">
            <dt>모든 제품 보기({cartData && cartData.length})</dt>
          </div>

          {cartData.map(item => (
            <div key={item.id} className="cartDataList">
              <img
                alt="cartImage"
                className="cartImage"
                src={item.info && item.info[0].image_url}
              />
              <div className="cartTextWrapper">
                <span className="cartTextName">
                  {item.info && item.info[0].name}
                </span>
                <span className="cartTextPrice">
                  ₩
                  {item.info &&
                    item.info[0].sub_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className="cartTextQuantity">
                  {item.info && item.info[0].quantity}개
                </span>
              </div>
            </div>
          ))}

          <div className="presentOption">
            <dt className="presentLeft">
              <img
                alt="presents"
                className="presents"
                src="./images/presents.png"
              />
              선물할 제품인가요?
            </dt>
            <dd className="modify">변경</dd>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Payment;
