import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import leftArrowImage from './images/slideArrow.png';
import rightArrowImage from './images/slideArrowB.png';
import './Slider.scss';

const IMG_WIDTH = 500;
const PROGRESS_WIDTH = 200;

const Slider = () => {
  const [move, setMove] = useState(0);
  const [progress, setProgress] = useState(0);
  const [recommendData, setRecommendData] = useState([]);

  // useEffect(() => {
  //   fetch('/data/recommendData.json')
  //     .then(res => res.json())
  //     .then(data => setRecommendData(data.data));
  // }, []);

  useEffect(() => {
    fetch('http://52.78.118.58:3000/products?limit=5')
      .then(res => res.json())
      .then(data => setRecommendData(data.data));
  }, []);

  const moveLeft = () => {
    if (move <= -IMG_WIDTH) {
      setMove(move => move + IMG_WIDTH);
    }
    if (progress <= -PROGRESS_WIDTH) {
      setProgress(progress => progress + PROGRESS_WIDTH);
    }
  };

  const moveRight = () => {
    if (move >= -(recommendData.length * IMG_WIDTH) + IMG_WIDTH * 4) {
      setMove(move => move - IMG_WIDTH);
    }

    if (progress > -(PROGRESS_WIDTH * 2)) {
      setProgress(progress => progress - PROGRESS_WIDTH);
    }
  };
  return (
    <div className="SliderContainer">
      <div className="slider">
        <img
          src={rightArrowImage}
          className="leftArrow"
          onClick={moveLeft}
          alt="arrowIcon"
        />
        <img
          src={leftArrowImage}
          className="rightArrow"
          onClick={moveRight}
          alt="arrowIcon"
        />
        <div className="carouselWrapper">
          <div
            className="carousel"
            style={{ transform: `translateX(${move}px)` }}
          >
            <div className="recommendTitleBox">
              <p className="textTop">스킨케어 플러스</p>
              <h2 className="textMiddle">
                복잡한 피부를 위한
                <br />
                집중 케어 제품
              </h2>
              <p className="textBottom">
                지친 피부와 도시 거주자를 고려해 만들어져 데일리 수분공급은 물론
                강력한 비타민 효과를 추가로 선사하는 제품을 만나보세요.
              </p>
              <button className="recommendBtn">제품 보기→</button>
            </div>
            {recommendData.map(({ id, name, image_url, description }, item) => {
              return (
                <ItemCard
                  key={id}
                  name={name}
                  img={image_url}
                  description={description}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="lines">
        <div
          style={{ transform: `translateX(${-progress * 2.6}px)` }}
          className="line1"
        />
        <div className="line2" />
      </div>
    </div>
  );
};

export default Slider;
