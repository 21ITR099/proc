import { Box, Typography, Button, styled, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Slide = ({ products, title }) => {
    const navigate = useNavigate();

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                <ViewAllButton variant="contained" onClick={() => { navigate("/Products") }}>
                    View All
                </ViewAllButton>
            </Deal>
            <Divider />
            <ProductGrid>
                {products.slice(0, 9).map((product, index) => (
                    <Link key={index} to={`/product/view/${product._id}`} style={{ textDecoration: 'none' }}>
                        
                        <ProductBox>
    <Image src={product.productImage} alt={product.productName} />
    <TitleText>{product.productName}</TitleText>
    <Text>₹{product.price.cost}</Text>
    {product.price.discountPercent !== 0 && (
        <Text style={{ color: 'green' }}>{product.price.discountPercent}% Offer</Text>
    )}
    <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
</ProductBox>

                    </Link>
                ))}
            </ProductGrid>
        </Component>
    );
}

export default Slide;

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
    padding: 25px;
    font-size: 19px;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #154406;
    border-radius: 2px;
    font-size: 13px;
    &:hover {
      background-color: #7a1ccb;
    }
`;

const ProductGrid = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three columns */
    gap: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    overflow: hidden; /* Prevents content from overflowing */

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const ProductBox = styled(Box)`
 margin-left:20px;
 margin-top:20px;
 margin-bottom:20px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 300px;
    height: 260px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Image = styled('img')`
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

const TitleText = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
`;

const Text = styled(Typography)`
    font-size: 14px;
    margin-bottom: 5px;
`;

