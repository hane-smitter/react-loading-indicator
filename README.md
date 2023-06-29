# react-loading-indicators

A library of light-weight and customizable _loading indicators_ to fascinate your users while waiting for a response. Built with elegance keeping browser performance in mind.

Built with Typescript. Compatible with **react version >=16.8.0**(since hooks).

## A demo has something to say

A glimpse of what is wrapped🎁.<br />
See [DEMO](https://react-loading-indicators.netlify.app/).

## Installation

```
npm install react-loading-indicators
```

## Components

```jsx
<Atom />
<Commet />
<OrbitProgress />
<GlidingBlink />
<FourSquare />
<TrophySpin />
<ThreeDot />
<LifeLine />
<Mosaic />
<Riple />
<Slab />

```

## Examples

### Importing a loading indicator

```jsx
import React from "react";
import { Atom } from "react-loading-indicators";

const Loading = () => <Atom text="Loading..." />;

export default Loading;
```

<details>
  <summary><strong>Example usage</strong></summary>

```jsx
<Suspense fallback={<Loading />}>
	<Albums artistId={artist.id} />
</Suspense>
```

<strong><small>Side note:</small></strong> You can use <a href="https://dev.to/smitterhane/swap-out-useeffect-with-suspense-for-data-fetching-in-react-2leb">suspense for data fetching</a> other than lazy loading.

</details>

### An even lighter build

If you desire to include **only** what you need from the package, you can pull specifically the indicator you want:

```jsx
import React from "react";
import OrbitProgress from "react-loading-indicators/OrbitProgress";

const Loading = () => (
	<OrbitProgress variant="track-disc" color="crimson" size="small" />
);

export default Loading;
```

### Props

Each of these components will accept the following _optional props_.

|   Name    |       DataType        |     Default Value     |                                               Possible Values                                               |
| :-------: | :-------------------: | :-------------------: | :---------------------------------------------------------------------------------------------------------: |
|   size    |       `string`        |        medium         |                                            small, medium, large                                             |
|   color   |  `string` or `array`  |       limegreen       |                                              CSS color values                                               |
|   style   |       `object`        |        `null`         |                                CSS styles(<small>in Reactjs format</small>)                                 |
|   text    | `string` or `boolean` |        `false`        |                                         Boolean value or any string                                         |
| textColor |       `string`        |      `undefined`      |                                              CSS color values                                               |
| speedPlus |       `number`        |          `0`          |                                    Number in the range `-5` through `5`                                     |
|  easing   |       `string`        | default ease function | CSS [easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function, "Animation easing") |

#### What do these props do?

- `size` - Sets the size of the loading indicator.
- `color` - Sets the color of the loading indicator.
- `style` - Applies CSS styles to the loading indicator
- `text` - Displays message in the loading indicator.
- `textColor` - Sets the color of text message in the loading indicator.
- `speedPlus` - Controls speed of animation. _Negative_ values slows down. _Positive_ numbers speeds up animation.
- `easing` - Controls the smoothness of the animation, altered with values such as `linear`, `ease-in`.

Some components accept a `variant` prop, Specifically `<OrbitProgress />` and `<ThreeDot />`. This lets you choose a variation of a loading indicator that you want.

|  Name   | DataType |
| :-----: | :------: |
| variant | `string` |

See [DEMO](https://react-loading-indicators.netlify.app/) to know list of variants a loading indicator supports.

### How to resize

You can resize loader to fit into your needs with the `size` prop that accepts predefined string input.<br>
If this is not enough, you can give a loading indicator a `fontSize` property via the `style` prop. The style prop is an object that allows you to add your own css. Including `fontSize` in the style object will _evenly_ alter the animation's size, e.g

```jsx
const Loading = () => <ThreeDot style={{ fontSize: "8px" }} />;
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[@smitterhane](https://twitter.com/smitterhane)
