import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../redux/reducers/productsReducer";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import PageHero from "../Components/PageHero";
import { Link } from "react-router-dom";
import ProductImages from "../Components/ProductImages";
import Stars from "../Components/Stars";
import { formatPrice } from "../utils/helpers";
import AddToCart from "../Components/AddToCart";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hello");
    dispatch(
      fetchSingleProduct(
        `https://course-api.com/react-store-single-product?id=${id}`
      )
    );
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 3000);
    }
    return
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }


  const {name, price, description, stock, stars, reviews, id:sku, company, images} = single_product
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images = {images}/>
          <section className="content">
            <h2>{name}</h2>
            <Stars />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Availaible : </span>
              {stock > 0 ? "In Stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock> 0 && <AddToCart/>}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
