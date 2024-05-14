import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import styled from 'styled-components';
import { BasicButton } from '../utils/buttonStyles';
import { getProductDetails, updateStuff } from '../redux/userHandle';
import { Avatar, Card, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { generateRandomColor, timeAgo } from '../utils/helperFunctions';
import { MoreVert } from '@mui/icons-material';

const ViewProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const productID = params.id;

    const { currentUser, currentRole, productDetails, loading, responseDetails } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getProductDetails(productID));
    }, [productID, dispatch]);

    const [anchorElMenu, setAnchorElMenu] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    const deleteHandler = (reviewId) => {
        const fields = { reviewId };
        dispatch(updateStuff(fields, productID, "deleteProductReview"));
    };

    const reviewer = currentUser && currentUser._id;

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {
                        responseDetails ?
                            <div>Product not found</div>
                            :
                            <>
                                <ProductContainer>
                                    <ProductImage src={productDetails && productDetails.productImage} alt={productDetails && productDetails.productName} />
                                    <ProductInfo>
                                        <ProductName>{productDetails && productDetails.productName}</ProductName>
                                        <PriceContainer>
                                            <PriceCost>₹{productDetails && productDetails.price && productDetails.price.cost}</PriceCost>
                                            <PriceMrp>₹{productDetails && productDetails.price && productDetails.price.mrp}</PriceMrp>
                                            <PriceDiscount>{productDetails && productDetails.price && productDetails.price.discountPercent}% off</PriceDiscount>
                                        </PriceContainer>
                                        <Description>{productDetails && productDetails.description}</Description>
                                        
                                        <ProductDetails>
                                            <Paragraph><CategoryText>Category:</CategoryText> {productDetails && productDetails.category}</Paragraph>
                                            <Paragraph><TechnicalContentText>Technical Content:</TechnicalContentText>{productDetails && productDetails.subcategory}</Paragraph>
                                        </ProductDetails>
                                    </ProductInfo>
                                </ProductContainer>

                                {
                                    currentRole === "Customer" &&
                                    <>
                                        <ButtonContainer>
                                            <BasicButton
                                                onClick={() => dispatch(addToCart(productDetails))}
                                            >
                                                Add to Cart
                                            </BasicButton>
                                        </ButtonContainer>
                                    </>
                                }
                                <ReviewWritingContainer>
                                    <Typography variant="h4"></Typography>
                                </ReviewWritingContainer>

                                {productDetails.reviews && productDetails.reviews.length > 0 ? (
                                    <ReviewContainer>
                                        {productDetails.reviews.map((review, index) => (
                                            <ReviewCard key={index}>
                                                <ReviewCardDivision>
                                                    <Avatar sx={{ width: "60px", height: "60px", marginRight: "1rem", backgroundColor: generateRandomColor(review._id) }}>
                                                        {String(review.reviewer.name).charAt(0)}
                                                    </Avatar>
                                                    <ReviewDetails>
                                                        <Typography variant="h6">{review.reviewer.name}</Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>

                                                            <Typography variant="body2">
                                                                {timeAgo(review.date)}
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="subtitle1">Rating: {review.rating}</Typography>
                                                        <Typography variant="body1">{review.comment}</Typography>
                                                    </ReviewDetails>
                                                    {review.reviewer._id === reviewer &&
                                                        <>
                                                            <IconButton onClick={handleOpenMenu} sx={{ width: "4rem", color: 'inherit', p: 0 }}>
                                                                <MoreVert sx={{ fontSize: "2rem" }} />
                                                            </IconButton>
                                                            <Menu
                                                                id="menu-appbar"
                                                                anchorEl={anchorElMenu}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                keepMounted
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                                open={Boolean(anchorElMenu)}
                                                                onClose={handleCloseMenu}
                                                                onClick={handleCloseMenu}
                                                            >
                                                                <MenuItem onClick={() => {
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Edit</Typography>
                                                                </MenuItem>
                                                                <MenuItem onClick={() => {
                                                                    deleteHandler(review._id)
                                                                    handleCloseMenu()
                                                                }}>
                                                                    <Typography textAlign="center">Delete</Typography>
                                                                </MenuItem>
                                                            </Menu>
                                                        </>
                                                    }
                                                </ReviewCardDivision>
                                            </ReviewCard>
                                        ))}
                                    </ReviewContainer>
                                )
                                    :
                                    <ReviewWritingContainer>
                                      
                                    </ReviewWritingContainer>
                                }
                            </>
                    }
                </>
            }
        </>
    );
};

export default ViewProduct;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const ProductImage = styled.img`
margin-left:20px;
margin-rigth:30px;
    max-width: 300px;
    /* width: 50%; */
    margin-bottom: 20px;
`;

const ProductInfo = styled.div`
margin-left:22px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 2px solid black;
`;

const ProductName = styled.h1`
    font-size: 24px;
    text-align: center; /* Center-align the product name */
`;

const CategoryText = styled.span`
    font-weight: bold; /* Make the category text bold */
`;

const TechnicalContentText = styled.span`
    font-weight :bold;
`;
const Paragraph = styled.p`
margin-top: 12px;
line-height: 1.6;
text-align: justify;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the price */
    margin-top: 8px;
`;

const PriceMrp = styled.p`
    margin-top: 8px;
    text-decoration: line-through;
    color: #525050;
`;

const PriceCost = styled.h3`
    margin-top: 8px;
`;

const PriceDiscount = styled.p`
    margin-top: 8px;
    color: darkgreen;
`;

const Description = styled.p`
    margin-top: 16px;
    gap: 2rem;
`;

const ProductDetails = styled.div`
    margin: 16px;
`;

const ButtonContainer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewWritingContainer = styled.div`
    margin: 6rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ReviewContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ReviewCard = styled(Card)`
  && {
    background-color: white;
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const ReviewCardDivision = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReviewDetails = styled.div`
  flex: 1;
`;