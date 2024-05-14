import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';
import { countTotalCustomers, countTotalCustomersforlogin } from '../../../redux/userHandle'; // Update import

const sellerId = "65f6d6ccf33302ce95d50a47";

const SellerHomePage = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalCustomersforlogin, setTotalCustomersforlogin] = useState(0);

  useEffect(() => {
    async function fetchTotalCustomers() {
      try {
        const customersCount = await countTotalCustomers();
        setTotalCustomers(customersCount);
      } catch (error) {
        console.error('Error fetching total customers:', error);
      }
    }

    async function fetchTotalCustomersforlogin() {
      try {
        const customersCountForLogin = await countTotalCustomersforlogin();
        setTotalCustomersforlogin(customersCountForLogin);
      } catch (error) {
        console.error('Error fetching total logged-in customers:', error);
      }
    }

    fetchTotalCustomers();
    fetchTotalCustomersforlogin();
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Total Customers" total={totalCustomers+4} color='primary' icon={'ant-design:user-outlined'} />
      </Grid>

      

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={5} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Products" total={58} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
