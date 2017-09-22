# Campaign Monitor UI Engineer Coding Test

## Part 1: Static Version

> Live demo: https://react-rating-static.surge.sh

Check out the `./static` directory.

Some notes on the component:

* Built to be accessible and keyboard-navigable.
* Pixel perfect replication of the design provided.
* Tested on Chrome, Firefox, Safari Internet Explorer 11 and Edge.

## Part 2: Reusable React Component

### Demo & Examples

> Live demo: https://react-rating.surge.sh

## Running the project

To build the example locally, clone this repo and run:

```
yarn install // or `npm install`
yarn start   // or `npm start`
```

Project will go live on http://localhost:3000.

## Running the test suite

```
yarn test    // or `npm test`
```

I've just written a bunch of tests to showcase different approaches to making sure the project works and to give an idea of how I'd go about testing the project: functional tests simulating events, mounting components to make sure they render without crashing, snapshot tests to make sure the output stays the same for the same set of props, some basic unit tests for helper functions, tests to make sure the component's state is correct as the user interacts with the UI, etc. This project is not as battled tested as it should be to be shipped to production, though.

### Rating Component API

| Property | Type | Default | Description |
|---|---|---|---|
| `onSubmit` | function | Required | Pass in the function that will trigger when the rating form gets submitted. The function will receive the submitted rating as an argument. Expected signature: `({ rating: number }): void` |

### Average Component

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | string | "Average rating" | The text displayed next to the rating. |
| `rating` | number | 0 | The number of highlighted stars. The value provided must be in the [0,5] range. When provided negative values, the component will default to 0. When a value greater than 5 is passed in, it will default to 5. |
