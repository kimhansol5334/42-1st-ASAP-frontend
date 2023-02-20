import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { MenuContext } from '../../components/Nav/MenuModal/Hide';
import FilterNav from './FilterNav';
import BodyFilter from './Filter/BodyFilter';
import BodyProductList from './BodyProductList/BodyProductList';
import FilterButton from './FilterButton/FilterButton';
import './BodyList.scss';

export default function BodyList() {
  const [BodycardList, setBodyCardList] = useState([]);
  const [scents, setScents] = useState('');
  const [prices, setPrices] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [formulations, setFormulations] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [menuOpen, setMenuOpen] = useContext(MenuContext);

  const ModalHandler = () => {
    setIsModal(prev => !prev);
  };

  //TODO: API 연결 시 동작할 코드
  useEffect(() => {
    fetch('http://52.78.118.58:3000/products/2/13', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setBodyCardList(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://52.78.118.58:3000/products/2/13?formulation=${formulations}&scent=${scents}&ingredient${ingredient}`,
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(data => {
        //
        setBodyCardList(data.data);
      });
  }, [scents, formulations, prices, ingredient]);

  //TOFIX: mockData 연결 시 동작할 코드
  // useEffect(() => {
  //   fetch('./data/MockData.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setBodyCardList(data.data);
  //     });
  // }, []);

  const onChange = (e, category) => {
    if (category === '성분')
      setIngredient(prev => (prev === e.target.value ? '' : e.target.value));
    else if (category === '아로마')
      setScents(prev => (prev === e.target.value ? '' : e.target.value));
    else if (category === '가격 범위')
      setPrices(prev => (prev === e.target.value ? '' : e.target.value));
    else if (category === '제형 타입')
      setFormulations(prev => (prev === e.target.value ? '' : e.target.value));
  };

  return (
    <div className={!menuOpen ? 'bodyContainer' : 'bodyContainerClose'}>
      <section className="body-body">
        <Link to="/">
          <img className="logo" src="./images/asaplogo.png" alt="logo-img" />
        </Link>
        <h1 className="title">바디</h1>
        <FilterNav onChange={onChange} />
        {isModal && <BodyFilter setIsModal={setIsModal} onChange={onChange} />}
        <FilterButton ModalHandler={ModalHandler} isModal={isModal} />
        <BodyProductList BodycardList={BodycardList} />
      </section>
      <section className="present-body">
        <div className="present-wrapper">
          <h1 className="title">기프트 파인더</h1>
          <p className="title-box">
            기프트 파인더가 편안하게 선물을 찾을 수 있도록 받는 대상, 제품의
            기능, 가격대 별로 제품을 살펴볼 수 있는 기회를 선사합니다.
          </p>
          <Link className="present" to="/">
            기프트 파인더 보기
            <img
              className="see-all-arrow"
              src="./images/see-all-arrow.png"
              alt="see-all-arrow"
            />
          </Link>
        </div>
        <img
          className="present-img"
          src="./images/present.jpeg"
          alt="present-img"
        />
      </section>
    </div>
  );
}
