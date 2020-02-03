# RGBA Widget

The rgba widget helps you chose to best color for element properties

## Basic Usage

First, you need to include rgba-widget.js and rgba-widget.css in your page:

```html
<link rel="stylesheet" href="rgba-widget.css" />
<script src="rgba-widget.js"></script>
```

After the javascript and css files are included in the page the widget 
will be available for use. 

The widget is designed to be used during development

The widget is a movable/draggable `form` with text `input` for a css property and a query selector
and then 4 range `input`s (one for each rgba component). The range inputs (sliders) control the rgba color value 
of the property provided for the elements matching the selector.

This makes it easy to see what color would look best for a border or background or font-color or any
other css property by moving the sliders. No need to fiddle with values manually and reload the page. 

A future enhancement includes adding an additional text `input` for the property value but would
allow the user to provide a partial value. For example, if you wanted to see how a linear-gradient
value would look the text input would allow you to provide the value with a parameter for the rgba
color that would be controlled by the sliders. The `input` would look something like:
`linear-gradient(to right, blue, ##widget-param##, blue)`
