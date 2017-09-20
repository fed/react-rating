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

To build the examples locally, clone this repo then run:

```
npm install
npm start
```

Then open http://localhost:3000 in your browser.

### Rating Component API

| Property | Type | Default | Description |
|---|---|---|---|
| `onSubmit` | function | Required | Pass in the function that will trigger when the rating form gets submitted. The function will receive the submitted rating as an argument. Expected signature: `({ rating: number }): void` |

### Average Component

| Property | Type | Default | Description |
|---|---|---|---|
| `title` | string | "Average rating" | The text displayed next to the rating. |
| `rating` | number | 0 | The number of highlighted stars. The value provided must be in the [0,5] range. When provided negative values, the component will default to 0. When a value greater than 5 is passed in, it will default to 5. |
