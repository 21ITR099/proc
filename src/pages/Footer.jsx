import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  padding: 0;
  margin: 0;
  height: auto;
  display: flex;
  align-items: flex-end;
`;

const FooterContainer = styled.footer`
  background-color: #121315;
  color: #ffffff;
  font-size: 14px;
`;

const FooterRow = styled.div`
  padding: 2em 1em;
`;

const PrimaryRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  align-items: stretch;
  gap: 25px; 
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2em;
  min-height: 15em;
  margin: 0 10px; /* Added margin */
`;

const Title = styled.h3`
  width: 100%;
  text-align: left;
  color: green;
  font-size: 1.6em;
  white-space: nowrap;
`;

const List = styled.ul`
margin-left:20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  margin-bottom: 2em; /* Added margin bottom */
`;

const ListItem = styled.li`
  &:not(:first-child) {
    margin-top: 0.8em;
  }

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      color: #2a8ded;
    }
  }
`;

const About = styled.p`
  text-align: justify;
  line-height: 2;
  margin: 0;
`;

const Input = styled.input`
  font-size: 1em;
  padding: 0.8em; /* Adjusted padding */
  width: 400px; /* Adjusted width */
  border-radius: 5px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: #2a8ded;
  color: #ffffff;
  font-size: 0.9em; /* Adjusted font size */
  padding: 0.8em 1.5em; /* Adjusted padding */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d2636;
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 2.4em;
  flex-direction: row;
  margin-top: 0.5em;
`;

const SecondaryRow = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;

  i {
    font-size: 1.8em;
    color: #2a8ded;
  }

  div {
    padding: 1em 0;
    width: 100%;

    &:hover {
      background-color: #25262e;
    }
  }
`;

const Copyright = styled.div`
  padding: 0.3em 1em;
  background-color: #25262e;

  p {
    font-size: 0.9em;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterRow>
          <PrimaryRow>
            <Column>
              <Title>Sri Vinayaga Agro Centre </Title>
              <About>
                Explore our selection of agricultural solutions designed to enhance crop health and maximize yields.
                The platform leverages technology to provide a wide range of solutions and services to farmers, helping them optimize their agricultural practices,
                increase productivity, and ultimately improve their livelihoods.
              </About>
            </Column>
            
            <Column>
              <Title>Our Product</Title>
              <List>
                <ListItem><a href="#Herbicides">Herbicides</a></ListItem>
                <ListItem><a href="#Pesticides">Pesticides</a></ListItem>
                <ListItem><a href="#Insecticides">Insecticides</a></ListItem>
                <ListItem><a href="#WaterSoluble">Water Soluble</a></ListItem>
                <ListItem><a href="#PlantGrowthRegulators">Plant Growth Regulators</a></ListItem>
              </List>
            </Column>
            <Column>
              <Title>Subscribe</Title>
              <div>
                <Input type="email" placeholder="Your email id here" />
                <Button>Subscribe</Button>
              </div>
              <Social>
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-instagram-square"></i>
                <i className="fab fa-twitter-square"></i>
              </Social>
            </Column>
          </PrimaryRow>
          <SecondaryRow>
            <div>
              <p><i className="fas fa-phone-alt"></i></p>
              <p>+91 9842018689</p>
            </div>
            <div>
              <p><i className="fas fa-envelope"></i></p>
              <p>ramesh@gmail.com</p>
            </div>
            <div>
              <p><i className="fas fa-map-marker-alt"></i></p>
              <p>136/8, PK Complex, Annasagaram Post, Dharmapuri.</p>
            </div>
          </SecondaryRow>
          <Copyright>
            <p>Copyright &copy; 2024 Sri Vinayaga Agro Centre</p>
          </Copyright>
        </FooterRow>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
