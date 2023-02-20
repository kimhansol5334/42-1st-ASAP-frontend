import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingButton from '../LoadingButton/LoadingButton';
import './Card.scss';

export default function Card({ cardData }) {
  const [inputValue, setInputValue] = useState();
  const [sizeChoice, setSizeChoice] = useState(cardData.options[0].size);

  const [loading, setLoading] = useState(false);

  const cartLoading = e => {
    setLoading(true);
  };

  let token = localStorage.getItem('login-token');

  const handleChangeValue = event => {
    const { value, id } = event.target;
    setSizeChoice(id);
    setInputValue(value);
  };

  useEffect(() => {
    if (loading)
      fetch('http://52.78.118.58:3000/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
        body: JSON.stringify({
          userId: 1,
          productOptionId: inputValue,
          quantity: 1,
        }),
      })
        .then(res => res.json())
        .then(data => {
          setInputValue(data);
        })
        .finally(() => {
          setLoading(false);
          alert('상품이 추가되었습니다');
        });
  }, [loading]);

  const price = cardData.options[0].price;

  return (
    <div className="h-product-wrapper">
      <div className="product">
        <Link
          className="product-detail-link"
          to={`/productdetail/${cardData.id}`}
        >
          <img
            className="hand-product"
            src={cardData.image_url}
            alt="hand-product-img"
          />
        </Link>
        <div className="h-title-wrapper">
          <h3 className="title-name">{cardData.name}</h3>
          <p className="size">
            {cardData.options.length} 사이즈 / ￦&nbsp;
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 부터
          </p>
          <div className="radio-box">
            {cardData.options.map((element, index) => (
              <label className="radio-label" key={element.size}>
                <input
                  id={element.size}
                  type="radio"
                  name={element.product_option_id}
                  value={element.product_option_id}
                  onChange={handleChangeValue}
                  checked={element.size === sizeChoice && 'checked'}
                />
                {element.size}
              </label>
            ))}
          </div>
        </div>
      </div>
      <ul className="product-detail-box">
        <li className="product-detail">
          <span className="texture">사용감</span>
          <span className="texture-feeling">
            {cardData.feeling_of_use.map(element => (
              <span key={element} className="feeling">
                {element}
              </span>
            ))}
          </span>
        </li>
        <li className="product-detail">
          <span className="texture">향</span>
          <span className="texture-feeling">
            {cardData.scents.map(element => (
              <span key={element} className="feeling">
                {element}
              </span>
            ))}
          </span>
        </li>
      </ul>
      {loading ? (
        <LoadingButton />
      ) : (
        <button className="add-cart" type="button" onClick={cartLoading}>
          카트에 추가 – ￦&nbsp;
          {cardData.options
            .filter(el => el.id === inputValue || el.size === sizeChoice)[0]
            ?.price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </button>
      )}
    </div>
  );
}
