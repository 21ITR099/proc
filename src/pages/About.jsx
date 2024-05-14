import React from "react";

const About = () => {
  // Dummy image links
  const imgSrc =
    'https://www.bruker.com/content/bruker/int/en/applications/food-analysis-and-agriculture/agriculture/plants-soils-and-fertilizers/_jcr_content/teaserImage.coreimg.jpeg/1597815307771.jpeg';

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }
          .container {
            background: #cefad0;
            padding: 20px;
          }
          .about-us {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          .pic {
            height: 300px;
            width: 400px;
            border-radius: 15px;
          }
          .about {
            width: 100%;
            max-width: 1130px;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          .text {
            width: 50%;
          }
          .text h2 {
            color: black;
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .text p {
            color: black;
            font-size: 18px;
            line-height: 25px;
            letter-spacing: 1px;
          }
        `}
      </style>

      <section className="about-us">
        <div className="container">
          <div className="about">
            <img src={imgSrc} className="pic" alt="Girl" />
            <div className="text">
              <h2>About Us</h2>
              <p>
                Sri Vinayaga Agro Centre is your trusted destination for all pesticide needs. With a wide range of high-quality products, we are committed to helping you protect your crops and ensure agricultural success. Our knowledgeable staff is dedicated to providing expert advice and personalized service to meet your specific requirements. Visit us today to experience excellence in pesticide solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
