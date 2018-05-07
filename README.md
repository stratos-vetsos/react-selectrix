# React Selectrix
A beautiful, materialized, easy to use and flexible **Select** replacement for React.js
### Installing
Stay tuned. React Selectrix will be bundled through npm soon.

### Demo
Check out the demo and use examples [here](https://stratos-vetsos.github.io/react-selectrix/)!

### Import to your project
```
import Selectrix from "react-selectrix";
```

### Basic Example

```javascript
<Selectrix
	multiple={true}
	materialize={true}
	options={[
		{
			key: "javascript",
			label: "Javascript"
		},
		{
			key: "go",
			label: "Go"
		},
		{
			key: "ruby",
			label: "Ruby On Rails"
		},
		{
			key: "php",
			label: "PHP"
		}
	]}
	onChange={ value => console.log( value ) }
/>
```

### Props

Name  | Type | Default Value | Description
--- | --- | --- | ---
options | array | [] | An array of the available options ( Objects with "key", "label" pairs and optionally "disabled" property ).
multiple | boolean | false | Whether the Select supports multiple values.
searchable | boolean | true | Whether the Select is **searchable**.
materialize | boolean | true | Whether the style of the Select should be **Materialized** or default.
defaultValue | boolean / array / string | false | If you have preselected values use this property. Use an array of option keys for multiple selections, or key as a string for single selection.
checkBoxes | boolean | false | Set this to true if you want to render **Checkboxes** instead of list items.
height | number | 190 | The height of the dropdown.
placeHolderInside  | boolean | true | If the placeholder should be an option.
placeholder | string | Please Select | The placeholder of the Select.
isOpen | boolean | false | If the Select should be rendered open.
arrow | boolean | true | Whether to show an arrow on Select's header.
disabled | boolean | false | Whether the Select should be disabled.
customScrollbar | boolean | false | A custom scrollbar ( only for Chrome )
stayOpen | boolean | false | If the Select should stay open or not.
commaSeperated | boolean | false | If you want the selected values to be a comma seperated string, turn this to "true".  ( Available only with multiple prop set to "true". )
singleLine | boolean | false | Where the selected values ( Select's Header ) should be contained to one line.
lifo | boolean | false | **Last In First Out Mode**. The user's last selection, goes first. ( Available only with multiple prop set to "true". )
selectAllButton | boolean | false | Whether a "select all button" should be visible on Select's header.
isDropDown | boolean | true | Set this to true if you want to use the Select as a **Dropdown**. When you select an option, the Select collapses and the header continue to have the placeholder as a value.
tags | boolean | false | Whether to support custom tags.
customKeys | object / boolean | false | Pass an object to change the default option keys ( key, label ). Example Syntax: ``{ key: "url", label: "title" }`` , to change the key to "url" and the label to "title".
ajax | boolean / object | false | Whether to enable ajax. The library supports asynchronous calls through fetch API. Available default properties of ajax object: ``{ url: '', debounce: 200, fetchOnSearch: false, q: "", nestedKey: false, searchPrompt: true, minLength: 1  }.`` You can find details for all the ajax object properties, in the next section and in our demo page.
onRenderOption | function / boolean | false | Use this function to render custom option items
onRenderSelection | function / boolean | false | Use this function to render custom selected items

### ajax prop - analysis

Name  | Type | Default Value | Description
--- | --- | --- | ---
url | string | '' | The url which the Select going to fetch the available options.
debounce | number | 200 | The debounce of the ajax calls in milliseconds.
fetchOnSearch | boolean | false | Whether you don't want to have the options prepopulated, when the Select opens, but you want to query them based on user's search value.
q | string | '' | This property goes alongside with fetchOnSearch property, setted to "true". Depending the REST API providing you with options, you have to change this value accordingly. e.g. "&search={q}". Wherever you use the pseudo variable {q}, the user's search query will injected in the final request.
nestedKey | string / boolean | false | If your REST API returns the actual data in a deeper level, inside a nested key, let's say "articles", set nestedKey to "articles".
searchPrompt | boolean | true | This property goes alongside with fetchOnSearch property and indicates the user how many more characters should type, before the ajax search will happen.
minLength | number | 1 | This property goes alongside with fetchOnSearch property and searchPrompt setted to "true". It is the min length of characters the user should type, before the ajax call search takes place.

### Ajax Example
Many thanks to [newsapi.org](https://newsapi.org/) for their great api.
Check this example in action, in our [demo](https://stratos-vetsos.github.io/react-selectrix/) page.

```javascript
<Selectrix
	customKeys={{
		key: "url",
		label: "title"
	}}
	ajax={{
		url: "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=9342a9a707ca49c4b2da34e9ea238ea6",
		nestedKey: "articles"
	}}
/>
```

### Ajax Example with fetchOnSearch
Check this example in action, in our [demo](https://stratos-vetsos.github.io/react-selectrix/) page.

```javascript
<Selectrix
	multiple={true}
	stayOpen={true}
	materialize={true}
	customKeys={{
		key: "url",
		label: "title"
	}}
	ajax={{
		url: "https://newsapi.org/v2/top-headlines?apiKey=9342a9a707ca49c4b2da34e9ea238ea6",
		fetchOnSearch: true,
		q: "&q={q}",
		nestedKey: "articles",
		minLength: 3,
		debounce: 300
	}}
/>
```

### License
MIT Licensed. Stratos Vetsos.

### Contributions
Contributions are more than welcome, when we pass the 0.1 beta stage.
