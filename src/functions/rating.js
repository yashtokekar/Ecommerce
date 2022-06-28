import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings; //&& returns first falsy value from left to right
    let total = []; // if no value is false it gives the latest value
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0); // adds the current value(p) and next(n) in initial value(0) for every element of array

    let result = totalReduced / length;
    // console.log('totalReduced', totalReduced, 'length', length);

    return (
      <>
        <div className='text-center pt-1 pb-3'>
          <span>
            <StarRating
              starDimension='20px'
              starSpacing='2px'
              starRatedColor='red'
              starHoverColor='black'
              editing={false}
              rating={result}
            />
          </span>
          <br />
          <span>({p.ratings.length})</span>
        </div>
      </>
    );
  }
};
