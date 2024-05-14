import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BasicButton, BrownButton, DarkRedButton, IndigoButton } from '../../../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { deleteStuff, getProductsbySeller } from '../../../redux/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate.jsx';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import AlertDialogSlide from '../../../components/AlertDialogSlide';

const ShowProducts = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser, currentRole, loading, sellerProductData, responseSellerProducts } = useSelector(state => state.user);

  const sellerID = currentUser._id

  const [dialog, setDialog] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getProductsbySeller(currentUser._id));
  }, [dispatch, currentUser._id])

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteStuff(deleteID, address))
      .then(() => {
        dispatch(getProductsbySeller(currentUser._id));
      })
  }

  const deleteAllProducts = () => {
    deleteHandler(sellerID, "DeleteProducts")
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products ?")
        setShowDialog(true)
      }
    },
  ];

  const shopcartActions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Product',
      action: () => navigate("/Seller/addproduct")
    },
    {
      icon: <UploadIcon color="success" />, name: 'Upload New Product',
      action: () => navigate("/Seller/uploadproducts")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Products',
      action: () => {
        setDialog("Do you want to delete all products ?")
        setShowDialog(true)
      }
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {
            responseSellerProducts ?
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <IndigoButton onClick={() => navigate("/Seller/addproduct")}>
                  Add Product
                </IndigoButton>
                <br /><br />
                {
                  currentRole === "Shopcart" &&
                  <BrownButton onClick={() => navigate("/Seller/uploadproducts")}>
                    Upload Product
                  </BrownButton>
                }
              </Box>
              :
              <>
                {Array.isArray(sellerProductData) && sellerProductData.length > 0 &&
                  <ProductGrid container spacing={3}>
                    {sellerProductData.map((data, index) => (
                      <Grid item xs={12} sm={6} md={4}
                        key={index}
                      >
                        <ProductContainer stock={data.stock}>
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
                          <StockButton stock={data.stock}>
                            {data.stock > 3 ? 'In Stock' : 'Out of Stock'}
                          </StockButton>
                          <ButtonContainer>
                            <DarkRedButton
                              onClick={() => deleteHandler(data._id, "DeleteProduct")}
                            >
                              Delete
                            </DarkRedButton>
                            <BasicButton
                              onClick={() => navigate("/Seller/products/product/" + data._id)}
                            >
                              View
                            </BasicButton>
                          </ButtonContainer>
                        </ProductContainer>
                      </Grid>
                    ))}
                  </ProductGrid>
                }
                {
                  currentRole === "Shopcart"
                    ?
                    <SpeedDialTemplate actions={shopcartActions} />
                    :
                    <SpeedDialTemplate actions={actions} />
                }
              </>
          }
        </>
      }
      <AlertDialogSlide dialog={dialog} showDialog={showDialog} setShowDialog={setShowDialog} taskHandler={deleteAllProducts} />
    </>
  )
};

export default ShowProducts;

const ProductContainer = styled.div`
  margin-left: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 300px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${props =>
    props.stock > 3
      ? `background-color: white; color: white; `
      : `background-color: white; color: white;`
  }
`;

const ProductGrid = styled(Grid)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 8px;
  border-radius: 9px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

const ProductName = styled.p`
  font-weight: bold;
  text-align: center;
  color:black;
`;

const PriceMrp = styled.p`
  margin-top: 8px;
  text-align: center;
  text-decoration: line-through;
  color: red;
`;

const PriceCost = styled.h3`
  margin-top: 8px;
  text-align: center;
  color:black;

`;

const PriceDiscount = styled.p`
  margin-top: 8px;
  text-align: center;
  color: darkgreen;
`;

const StockButton = styled.div`
  margin-top: 8px;
  text-align: center;
  padding: 5px 14px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  ${props =>
    props.stock > 3
      ? `background-color: #4caf50;`
      : `background-color: #f44336;`
  }
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;
