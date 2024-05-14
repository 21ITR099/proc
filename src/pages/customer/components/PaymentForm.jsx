import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { fetchProductDetailsFromCart, removeAllFromCart, removeSpecificProduct } from '../../../redux/userSlice';

const PaymentForm = ({ handleBack }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, currentUser, productDetailsCart } = useSelector(state => state.user);
    const params = useParams();
    const productID = params.id;

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (productID) {
            dispatch(fetchProductDetailsFromCart(productID));
        }
    }, [productID, dispatch]);

    useEffect(() => {
        if (status === 'added') {
            navigate('/');
        } else if (status === 'failed') {
            setMessage("Order Failed");
            setShowPopup(true);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, navigate]);

    const handlePlaceOrder = () => {
        if (productID) {
            dispatch(addStuff("newOrder", {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: productDetailsCart,
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity: productDetailsCart.quantity,
                totalPrice: productDetailsCart.price && productDetailsCart.price.cost * productDetailsCart.quantity,
            }));
            dispatch(removeSpecificProduct(productID));
        } else {
            const productsQuantity = currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = currentUser.cartDetails.reduce((total, item) => total + (item.quantity * item.price.cost), 0);

            dispatch(addStuff("newOrder", {
                buyer: currentUser._id,
                shippingData: currentUser.shippingData,
                orderedProducts: currentUser.cartDetails,
                paymentInfo: { id: 'dummy_payment_id', status: 'Successful' },
                productsQuantity,
                totalPrice,
            }));
            dispatch(removeAllFromCart());
        }
    };

    const handleStripeRedirect = () => {
        // Redirect to the Stripe URL
        window.location.href = "https://buy.stripe.com/test_dR63dVaJ21R79sA7ss";
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                </Button>
                <Button onClick={handleStripeRedirect} sx={{ mt: 3, ml: 1 }}>
                    Go to Stripe
                </Button>
                
                <Button onClick={handlePlaceOrder} variant="contained" sx={{ mt: 3, ml: 1 }}>
                    Return to home
                </Button>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </React.Fragment>
    );
}

export default PaymentForm;
