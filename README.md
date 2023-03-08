# react-loading-indicators

A _light-weight library_ providing a _collection of easy to use loading indicators_ for your React projects. Waiting for a response has to be fun🥳.

Built with Typescript. Compatible with **react version >=16.8.0**.

View [DEMO](https://react-loading-indicators.netlify.app/).

## Installation

```
npm install react-loading-indicators
```

or

```
yarn add react-loading-indicators
```

## Components

```jsx
<Atom />
<Commet />
<CircularProgress /> // Default import
<FourSquare />
<Mosaic />
<Riple />
<Seek />

```

## Examples

### Import an individual loader

```jsx
import React from "react";
import { Atom } from "react-loading-indicators";

const Component = () => <Atom />;

export default Component;
```

### OR Import default loader

```jsx
import React from "react";
import Loader from "react-loading-indicators";

const Component = ({ variant, color, size }) => (
	<Loader variant={variant} color={color} size={size} />
);

export default Component;
```

### Props

Each of these components will accept the following _optional props_.

|   Name    |       DataType        | Default Value |               Possible Values                |
| :-------: | :-------------------: | :-----------: | :------------------------------------------: |
|   size    |       `string`        |    medium     |             small, medium, large             |
|   color   |  `string` or `array`  |   limegreen   |               CSS color values               |
|   style   |       `object`        |    `null`     | CSS styles(<small>in Reactjs format</small>) |
|   text    | `string` or `boolean` |    `false`    |         Boolean value or any string          |
| textColor |       `string`        |  `undefined`  |               CSS color values               |

#### What do these props do?

- `size` - Sets the size of the loader.
- `color` - Sets the color of the loader.
- `style` - Applies CSS styles to the loader
- `text` - Displays message in the loader.
- `textColor` - Sets the color of text message in the loader.

The `CircularProgress` component has a `variant` prop(_also optional_). Choose between variations of a circular loader that you want:

|  Name   | DataType | Default Value |                 values                  |
| :-----: | :------: | :-----------: | :-------------------------------------: |
| variant | `string` |     disc      | disc, split-disc, dotted, bubble-dotted |

### How to resize

You can resize loader to fit into your needs with the `size` prop that accepts predefined string input.<br>
You can _further customize_ size to your own preferences by setting `fontSize` in the style prop of the loader. The style prop is an object that allows you to add your own css. Including `fontSize` in the style object will _evenly_ alter size of the loader.

```jsx
const Component = () => <Commet style={{ fontSize: "10px" }} />;
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[@smitterhane](https://twitter.com/smitterhane)
