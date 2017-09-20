# Campaign Monitor UI Engineer Coding Test

## Part 1: Static Markup & styles

Check out the `./static` directory.

Live demo: https://campaign-monitor-rating-static.surge.sh

The component was built to be accessible and to fully work with a keyboard.

## Part 2: React Components

### Demo & Examples

Live demo: https://campaign-monitor-rating.surge.sh

To build the examples locally, clone this repo then run:

```js
npm install
npm start
```

Then open http://localhost:3000 in your browser.

### Installation

The easiest way to use the `Rating` and `Average` components is to install them from NPM and include them in your own React build process (using Webpack/Rollup/Browserify/etc).

```js
npm install fknussel/react-rating
```

At this point you can import `react-rating` and its styles in your application as follows:

```js
import Rating, {Average} from 'react-rating';

// Be sure to include styles at some point, probably during bootstrapping
import 'react-rating/build/react-rating.css';
```

### Rating Component API

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `onSubmit` | function | Required | Expected signature: `({ rating: number }): void` |

### Average Component API

| Property | Type | Default | Description |
|:---|:---|:---|:---|
| `rating` | number | 0 |  |
