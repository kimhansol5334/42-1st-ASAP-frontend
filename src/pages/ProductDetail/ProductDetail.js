import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuContext } from '../../components/Nav/MenuModal/Hide';
import Slider from '../../components/Slider/Slider';
import logoImage from './images/asaplogo_modified.png';
import './ProductDetail.scss';

const ProductDetail = () => {
  const [detailData, setDetailData] = useState([]);
  const [optionChoice, setOptionChioice] = useState('');
  const [optionSize, setOptionSize] = useState();
  const [navCartData, setNavCartData] = useState([]);
  const [menuOpen, setMenuOpen] = useContext(MenuContext);

  const params = useParams();

  const token = localStorage.getItem('login-token');

  useEffect(() => {
    fetch(`http://52.78.118.58:3000/products/detail/${params.id}`)
      .then(res => res.json())
      .then(data => setDetailData(data.data[0]));
  }, []);

  useEffect(() => {
    detailData.options && setOptionSize(detailData.options[0].size);
  }, [detailData]);

  // useEffect(() => {
  //   fetch('http://10.58.52.200:3000/carts/quantity', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       authorization: token,
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setNavCartData(data.data[0].quantity));
  // }, [onSubmitCart]);

  const detailOption = detailData.options;

  const onSubmitCart = event => {
    event.preventDefault();
    fetch('http://52.78.118.58:3000/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify({
        userId: 1,
        productOptionId: optionChoice,
        quantity: 1,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    alert('상품이 추가되었습니다');
  };

  const onChangeOption = event => {
    const { value, id } = event.target;
    setOptionChioice(value);
    setOptionSize(id);
  };

  return (
    <div className={!menuOpen ? 'productDetail' : 'productDetailClose'}>
      {detailData && (
        <>
          <div className="topWrapper">
            <img className="logo" alt="logo" src={logoImage} />
            <div className="topContainer">
              <div className="topLeft">
                <div className="imgWrapper">
                  <img
                    className="productImg1"
                    alt="productimg"
                    src={detailData.image_url}
                  />
                </div>
              </div>
              <div className="topRight">
                <form id="cartForm" onSubmit={onSubmitCart} method="GET">
                  <div className="detailWrapper">
                    <ul className="categoryList">
                      <li>
                        <a className="category_a">{detailData.main_category}</a>
                      </li>
                      <li className="categoryDot">
                        <a className="category_b">{detailData.sub_category}</a>
                      </li>
                    </ul>
                    <h2 className="productName">{detailData.name}</h2>
                    <div className="productDetail">
                      <p>{detailData.description}</p>
                    </div>
                    <div className="descriptionWrapper">
                      <dl className="textLists">
                        <dt>사용감</dt>
                        <dd>
                          {detailData.feeling_of_use &&
                            detailData.feeling_of_use.join(', ')}
                        </dd>
                        <dt>향</dt>
                        <dd>
                          {detailData.scents && detailData.scents.join(', ')}
                        </dd>
                        <dt>주요 성분</dt>
                        <dd>{detailData.main_ingredient}</dd>
                        <dt>사이즈</dt>
                        <dd className="radioBoxContainer">
                          <div className="radioBox">
                            {detailData.options &&
                              detailData.options.map(optionRadio => (
                                <div key={optionRadio.size}>
                                  <label
                                    className="optionSizeText"
                                    htmlFor="option01"
                                  >
                                    <input
                                      type="radio"
                                      id={optionRadio.size}
                                      name="sizeText"
                                      className="radioBtn"
                                      value={optionRadio.product_option_id}
                                      onChange={onChangeOption}
                                      checked={
                                        optionRadio.size === optionSize &&
                                        'checked'
                                      }
                                    />

                                    {optionRadio.size}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </dd>
                        <dd className="radioBoxContainer" />
                      </dl>
                    </div>
                    <button className="addCart">
                      <span>
                        카트에 추가하기&nbsp;-&nbsp;₩
                        {detailOption &&
                          detailOption.filter(
                            el =>
                              el.product_option_id === optionChoice ||
                              el.size === optionSize
                          )[0] &&
                          detailOption &&
                          detailOption.filter(
                            el =>
                              el.product_option_id === optionChoice ||
                              el.size === optionSize
                          )[0].price}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <aside className="asideWrapper">
            <div className="asideLeft">
              <h4 className="asideTitle">무료 선물 포장 서비스</h4>
              <span className="asideText">
                주문하신 모든 제품에 대해 선물 포장 서비스를 제공해 드립니다.
              </span>
            </div>
            <div className="asideRight">
              <h4 className="asideTitle">샘플 & 코튼 백 증정</h4>
              <span className="asideText">
                모든 주문 건에 무료 샘플과 코튼 백을 제공해 드립니다. (샘플
                종류는 임의 지정이 불가합니다.)
              </span>
            </div>
          </aside>

          <div className="howTo">
            <div className="howToLeft">
              <img
                alt="howToImg"
                className="howToImg"
                src={detailData.guides && detailData.guides[0].image_url}
              />
            </div>
            <div className="howToRight">
              <div className="howToContainer">
                <span className="smallTitle">사용법</span>
                <p className="howToDetail">
                  {detailData.guides && detailData.guides[0].usage_description}
                </p>

                <dl className="howToBox">
                  <dt className="howToTitle">사용량</dt>
                  <dd className="howToText">
                    {detailData.guides && detailData.guides[0].usage_amount}
                  </dd>
                  <dt className="howToTitle">텍스처</dt>
                  <dd className="howToText">
                    {detailData.guides && detailData.guides[0].texture}
                  </dd>
                  <dt className="howToTitle">질감</dt>
                  <dd className="howToText">{detailData.formulation}</dd>
                </dl>
              </div>
            </div>
          </div>
          <Slider />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
