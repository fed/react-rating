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

### Rating Component

![Rating Component](https://i.imgur.com/BKjvmMx.jpg)

API:

| Property | Type | Default | Description |
|---|---|---|---|
| `onSubmit` | function | Required | Expected signature: `({ rating: number }): void` |

### Average Component

![Average Component](https://i.imgur.com/3RiSeQo.jpg)

Here's the API:

| Property | Type | Default | Description |
|---|---|---|---|
| `rating` | number | 0 |  |
