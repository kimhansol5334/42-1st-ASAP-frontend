import { Link, useNavigate, useParams } from 'react-router-dom';
import { productListData } from './Data/ProductListData';
import HandProduct from './HandProduct/HandProduct';
import BodyProduct from './BodyProduct/BodyProduct';
import Nav from '../../components/Nav/Nav';
import ProductBox from './ProductBox/ProductBox';
import './ProductList.scss';
import { useEffect, useState, useContext } from 'react';
import { MenuContext } from '../../components/Nav/MenuModal/Hide';

const ProductList = () => {
  const [allProductData, setAllProductData] = useState([]);
  const [menuOpen, setMenuOpen] = useContext(MenuContext);
  const HandData = allProductData.filter(el => el.sub_category === '핸드');
  const BodyData = allProductData.filter(el => el.sub_category === '바디');

  const navigate = useNavigate();

  const onClick = list => {
    if (list === '핸드') {
      return navigate('/hand-list');
    } else if (list === '바디') {
      return navigate('/body-list');
    } else if (list === '모든 바디 & 핸드') {
      return navigate('/product-list');
    }
  };

  //TOFIX: mockData 연결 시 동작할 코드
  // useEffect(() => {
  //   fetch('./data/MockData.json', {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setAllProductData(data.data);
  //     });
  // }, []);

  // TODO: API 연결 시 동작할 코드
  useEffect(() => {
    fetch('http://52.78.118.58:3000/products/2?limit=13', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setAllProductData(data.data);
      });
  }, []);

  return (
    <div className={!menuOpen ? 'body' : 'bodyClose'}>
      <div className="bgImgWrapper">
        <img
          className="background-img"
          src="./images/background-img.jpeg"
          alt="background-img"
        />
      </div>
      <div className="goods">
        <Link to="/">
          <img className="logo" src="./images/asaplogo_w.png" alt="logo-img" />
        </Link>
        <div />
        <div className="product-box">
          <h1 className="title">바디 & 핸드</h1>
          <p className="title-box">
            이솝의 바디와 핸드 제품은 효과적인 클렌징, 수분공급, 퍼스널 케어에
            따른
            <br />
            고민 완화 등 일상적일 수 있는 경험을 한층 풍성하게 만들어줍니다.
          </p>
        </div>
      </div>
      <div className="filter-wrapper">
        <div className="filter-nav">
          <ul className="filter-nav-list">
            {productListData.map(productListData => (
              <button
                className="filter-nav-button"
                type="button"
                key={productListData.id}
                onClick={() => onClick(productListData.prductList)}
              >
                <li>{productListData.prductList}</li>
              </button>
            ))}
          </ul>
        </div>
      </div>
      <section className="product-description">
        <div className="product-description-wrapper">
          <ProductBox
            title="핸드"
            seeAll="핸드 모두보기&#40;5&#41;"
            to="/hand-list"
            allProductData={allProductData}
          >
            매일 우리에게 안락함을 선사하는 손은 보살핌을
            <br />
            받을 자격이 충분합니다. 아로마 클렌저와 밤은
            <br />
            손에 수분과 영양을 공급하고 부드럽게 가꿔줍니다.
            <br />
          </ProductBox>
          <HandProduct HandData={HandData} />
        </div>
      </section>
      <section className="body-color">
        <div className="product-description">
          <ProductBox
            title="바디"
            seeAll="바디 모두보기&#40;8&#41;"
            to="/body-list"
            allProductData={allProductData}
          >
            보태니컬 원료가 풍부하게 함유된 바디 클랜저,
            <br />
            하이드레이터 그리고 부드러운 바디 트리트먼트 오일은
            <br />
            깨끗하고 부드러운 피부를 유지하도록 도와줍니다.
            <br />
          </ProductBox>
          <BodyProduct BodyData={BodyData} />
        </div>
      </section>
      <section className="scent-body">
        <div className="scent-wrapper">
          <ProductBox
            title="향수"
            seeAll="향수보기"
            to="/"
            linkstyle={true}
            allProductData={allProductData}
          >
            일본의 숲과 높은 산의 정상, 모로코의 재래시장처럼
            <br />
            다채로운 지역 특성에서 영감을 받아 탄생한
            <br />
            다양한 개성의 향수 제품.
            <br />
            소중한 분을 위한 선물로 이상적입니다.
          </ProductBox>
        </div>
        <img className="scent-img" src="./images/scent.jpeg" alt="scent-img" />
      </section>
    </div>
  );
};

export default ProductList;
