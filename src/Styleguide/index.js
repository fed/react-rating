import React from 'react';
import Preview from '../Preview';
import Rating from '../Rating';
import Average from '../Average';

export default function Styleguide() {
  return (
    <div>
      <Preview title="Interactive rating component">
        <Rating onSubmit={(rating) => console.info(`Submitted with rating: ${rating}`)} />
      </Preview>

      <Preview title="Interactive rating component">
        <Rating
          title="Rate Us"
          buttonText="Cast your vote"
          successMessage="Thanks!"
          onSubmit={(rating) => console.info(`Submitted with rating: ${rating}`)} />
      </Preview>

      <Preview title="Non-interactive Average rating component, 0 stars, default view">
        <Average />
      </Preview>

      <Preview title="Non-interactive Average rating component, custom title">
        <Average title="Results" rating={2} />
      </Preview>

      <Preview title="Non-interactive Average rating component, 3 stars">
        <Average rating={3} />
      </Preview>

      <Preview title="Non-interactive Average rating component, 5 stars">
        <Average rating={5} />
      </Preview>

      <Preview title="Non-interactive Average rating component, 7 stars, defaults to 5">
        <Average rating={7} />
      </Preview>

      <Preview title="Non-interactive Average rating component, negative values default to 0">
        <Average rating={-4} />
      </Preview>
    </div>
  );
}
