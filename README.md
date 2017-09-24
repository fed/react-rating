# Campaign Monitor UI Engineer Coding Test

## Part 1: Static Version

> Live demo: https://react-rating-static.surge.sh

Check out the `./static` directory.

## Part 2: Reusable React Component

> Live demo: https://react-rating.surge.sh

Check out the `./src` directory and look for the `{Rating, Average, Stars}` folders.

`Rating` is a stateful class component, and `Average` is a stateless functional component. The rating component depends on a third stateful component called `Stars` which is only responsible for rendering the clickable stars.

Some notes on these components:

* Built to be accessible and keyboard-navigable.
* [Pixel perfect replication](https://i.imgur.com/NmoNOLx.png) of the design provided.
* **Browser support:** Tested on Chrome, Firefox, Safari, Internet Explorer 11 and Edge.
* **Tests**: I've written a bunch of tests to showcase different approaches to making sure the project works and to give an idea of how I'd go about testing the project: functional tests simulating events, mounting components to make sure they render without crashing, snapshot tests to make sure the output stays the same for the same set of props, tests to make sure the component's state is correct as the user interacts with the UI, mocking external helper methods, etc. This project is not as battled tested as it should be to be shipped to production, though.
* **Styles:** To keep it simple I've just written vanilla CSS (no pre-processors such as Less/Sass, no post-processing plugins to allow variables or nesting selectors, no CSS modules, etc.). What we should probably do is to abstract out and reuse some recurring values such as background/border colours and the like. Also, I've used BEM to name my classes.
* **Styleguide:** I've also provided a `Styleguide` and `Preview` components just to showcase the other two. Might as well have used [Styleguidist](https://github.com/styleguidist/react-styleguidist) or [Storybook](https://github.com/storybooks/storybook) but decided to keep it simple.

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

### Rating Component API

| Property | Type | Default | Description |
|---|---|---|---|
| `total` | number | 5 | Number of stars to display. Must be a positive integer or will otherwise fallback to `5`. |
| `title` | string | "Rate this product" | Title of the widget. |
| `buttonText` | string | "Apply" | Text displayed on the submit bottom. |
| `successMessage` | string | "Thanks for your rating!" | Text displayed once the submit button is hit. |
| `onSubmit` | function | Required | Pass in a callback that will trigger when the rating form gets submitted. The function will receive the submitted rating as an argument. Expected signature: `(rating: number): void` |

Example:

```js
import Rating from 'path/to/component';

<Rating
  total={10} // optional
  title="Rate Us" // optional
  buttonText="Cast your vote" // optional
  successMessage="Thanks!" // optional
  onSubmit={(rating) => console.info(`Submitted with rating: ${rating}`)} />
```

### Average Component API

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | string | "Average rating" | Text displayed next to the rating. |
| `rating` | number | 0 | Number of highlighted stars. The value provided must be in the [0,5] range. When provided negative values, the component will default to 0. When a value greater than 5 is passed in, it will default to 5. |

Example:

```js
import Average from 'path/to/component';

<Average
  title="Results" // optional
  rating={2} />
```

## Tech Stack

* Using ES6 (arrow functions, destructuring, `Array#fill`, etc.). This gets transpiled to ES5 so the app should run just fine in older browsers. Had to polyfill `Array#fill` though so that the app doesn't crash on IE.
* Using [Lodash](https://lodash.com/) to generate unique IDs (i'm only importing this single module, no need to bundle the whole library).
* Using [normalize.css](https://necolas.github.io/normalize.css/) so that all elements render consistently across browsers.
* Using [classnames](https://github.com/JedWatson/classnames) for conditional class rendering.
* Tests were written using [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme).
* This project was bootstrapped using [create-react-app](https://github.com/facebookincubator/create-react-app) for the sake of simplicity.
