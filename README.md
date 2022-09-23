# @hane-smitter/react-loading-indicator

A _light-weight library_ providing a _collection of easy to use loading indicators_ for your React projects. Waiting for a response has to be fun🥳.

Compatible with **react version >=16.8.0**.

## Installation

```
npm i @hane-smitter/react-loading-indicator
```

or

```
yarn add @hane-smitter/react-loading-indicator
```

## Components

```jsx
<Atom>
<Commet>
<CircularProgress> // Default import
<Mosaic>
<Riple>
<Seek>

```

## Examples

### Import an individual loader

```jsx
import React from "react";
import { Atom } from "@hane-smitter/react-loading-indicator";

const Component = () => <Atom />;

export default Component;
```

### OR Import default loader

```jsx
import React from "react";
import Spinner from "@hane-smitter/react-loading-indicator";

const Component = ({ variant, color, size }) => (
  <Spinner variant={variant} color={color} size={size} />
);

export default Component;
```

### Props

Each of these components will accept the following _optional props_.

|   Name    |       DataType        | Default Value |
| :-------: | :-------------------: | :-----------: |
|   size    |       `string`        |    medium     |
|   color   |  `string` or `array`  |   limegreen   |
|   style   |       `object`        |    `null`     |
|   text    | `string` or `boolean` |  `undefined`  |
| textColor |       `string`        |  `undefined`  |

The `CircularProgress` component has an additional `variant` prop. Choose between variations of loader you want:

|  Name   | DataType | Default Value |                 values                  |
| :-----: | :------: | :-----------: | :-------------------------------------: |
| variant | `string` |     disc      | disc, split-disc, dotted, bubble-dotted |

### How to resize

You can resize loader to suit your needs with the `size` prop that accepts predefined strings.<br>
You can customize the size further to your preferences by setting `fontSize` in the style prop of the loader. The style prop allows you to add your own css.

```jsx
const Component = () => <Commet style={{ fontSize: "10px" }} />;
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[@smitterhane](https://twitter.com/smitterhane)
