import React, { useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <div>Product not found</div>;
  }

  const filteredProducts = productData.filter(product => product.stock >= 3);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4}
            key={index}
            onClick={() => navigate("/product/view/" + data._id)}
            sx={{ cursor: "pointer" }}
          >
            <ProductContainer>
              <ProductImage src={data.productImage} />
              <ProductName>{data.productName}</ProductName>

              {data.price.discountPercent !== 0 ? (
                <>
                  <PriceMrp>{data.price.mrp}</PriceMrp>
                  <PriceCost>₹{data.price.cost}</PriceCost>
                  <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
                </>
              ) : (
                <PriceCost>₹{data.price.cost}</PriceCost>
              )}
              
              <AddToCart>
                {currentRole === "Customer" && (
                  <BasicButton onClick={(event) => handleAddToCart(event, data)}>
                    Add To Cart
                  </BasicButton>
                )}
                {currentRole === "Shopcart" && (
                  <BasicButton onClick={(event) => handleUpload(event, data)}>
                    Upload
                  </BasicButton>
                )}
                {currentRole === null && (
                  <BasicButton onClick={messageHandler}>
                    Add To Cart
                  </BasicButton>
                )}
              </AddToCart>
            </ProductContainer>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  )
};

export default Products;

const ProductContainer = styled.div`
  margin-left: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 300px;
  height: 350px; /* Set a fixed height for all product containers */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 150px;
  margin-bottom: 8px;
  border-radius: 8px;
  
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
        z-index: 1;
    }
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: #Ff0000;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;
const ProductQuality = styled.p`
  color: #212121;
  opacity: 0.6;
  text-align: center; /* Apply text-align center */
`;

const AddToCart = styled.div`
  margin-top: 16px;
`;

