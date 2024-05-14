import React from 'react';

function Story() {
  const styles = {
    '.story': {
      padding: '8rem 0 1rem',
    },
    '.story__container': {
      display: 'grid',
      rowGap: '7.5rem',
      gridTemplateColumns: '1fr 1fr', // Added to split into two columns
    },
    '.section__title': {
      position: 'relative',
      fontSize: '1.25rem',
      marginBottom: '3rem',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textAlign: 'center',
    },
    '.section__title::before': {
      content: "''",
      position: 'absolute',
      top: '-1rem',
      left: 0,
      right: 0,
      margin: '0 auto',
      width: '67px',
      height: '1px',
      backgroundColor: 'var(--first-color)',
    },
    '.story__title': {
      fontSize: '2.25rem',
      marginBottom: '1rem',
    },
    '.story__description': {
      marginBottom: '2.5rem',
    },
    '.button': {
      display: 'inline-block',
      backgroundColor: 'var(--button-color)',
      color: '#FFF',
      padding: '1.25rem 2rem',
      fontWeight: 'var(--font-medium)',
      transition: '.3s',
    },
    '.button:hover': {
      backgroundColor: 'var(--button-color-alt)',
    },
    '.button--small': {
      padding: '1rem 1.5rem',
    },
  };

  return (
    <>
      <style jsx>
        {`
          :root {
            --button-color: hsl(0, 0%, 17%);
            --button-color-alt: hsl(0, 0%, 21%);
            --first-color: hsl(31, 100%, 70%);
          }

          .story {
            padding: 8rem 0 1rem;
          }

          .story__container {
            display: grid;
            row-gap: 7.5rem;
            grid-template-columns: 1fr 1fr;
          }

          .section__title {
            position: relative;
            font-size: 1.25rem;
            margin-bottom: 3rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-align: center;
          }

          .section__title::before {
            content: '';
            position: absolute;
            top: -1rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 67px;
            height: 1px;
            background-color: var(--first-color);
          }

          .story__title {
            font-size: 2.25rem;
            margin-bottom: 1rem;
          }

          .story__description {
            margin-bottom: 2.5rem;
            text-align: justify;
          }

          .button {
            display: inline-block;
            background-color: var(--button-color);
            color: #FFF;
            padding: 1.25rem 2rem;
            font-weight: var(--font-medium);
            transition: .3s;
          }

          .button:hover {
            background-color: var(--button-color-alt);
          }

          .button--small {
            padding: 1rem 1.5rem;
          }

          /* Additional styles for positioning */
          .story__data {
            margin-left: 5cm;
          }

          .story__images {
            margin-left: 46px;
          }
        `}
      </style>
      <section className="story section container" style={styles['.story']}>
        <div className="story__container grid" style={styles['.story__container']}>
          <div className="story__data">
            <h2 className="section__title story__section-title" style={styles['.section__title']}>
              Our Solution
            </h2>

            <h1 className="story__title" style={styles['.story__title']}>
            </h1>

            <p className="story__description" style={styles['.story__description']}>
            We are solving the knowledge gap in farmers through content and personalized assistance for information. 
            Farmers also get access to good quality original agri inputs at their fingertips with the option to get the products delivered to their doorsteps or available at the nearest AgroStar retail store.
           Post-harvest, farmers also get access to the best markets that help them fetch the best available rate, thereby helping them grow more and earn more.
            </p>

           
          </div>

          <div className="story__images">
            <img src="https://ariesagro.com/wp-content/uploads/2022/12/Mask-group-2.png" alt="Story" className="story__img" />
          </div>
        </div>
        <div style={{ color: 'white' }}>.</div>
<div>.</div>

      </section>
    </>
  );
}

export default Story;