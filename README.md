# jquery.fyl
Yet another full-fledged jQuery AJAX auto-complete plugin with bare minimum code.
4034 bytes / 3.93 KB only (2226 bytes / 2.17 KB : js, 1808 bytes / 1.76 KB : css)

## Description
This is the third component in YAFF jQ plugin series using minimum possible code covering maximum features keeping resource size as low as possible. This plugin can make asynchronous AJAX post request (over XMLHttpRequest, jqXHR) to get data from backend in JSON object format. Useful to fetch data array from database based on defined search string as user types in.

## Dependency
Since it is a jQuery plugin; jQuery library should be included on prior.

## Features
### Predefined Values:
- _Input inheritance_ : You can set some values in text input field (string, comma separated) while generating your page and after initializing the plugin the existing values will be inherited and selected bits will be created.
  
- _Option Pass_ : You can pass the predefined values through options as well (similar, comma separated string) and the values will be available as selected bits after initialization of plugin.
    ```
    $('#target').fyl({
        vals: 'Manchester United, Barcelona, Chelsea'
    });
    ```
  Note that this is in higher preference over input inheritance, that means if the target text input field contains values and user passes values through options also - the later will affect.

### Result Filter:
If the backend returned values contain any value which is already selected and available the same will not appear in selectable result list.

### Single Selection:
You can define the component to be single selection (like select dropdown / combo form element) and it will act that way.

`$('#target').fyl({ only: true });`

Note that with this option set to true if predefined value string contains more than one value - only the first one will be considered.

### Custom Message (Language Support):
The component contains an info / error message field and the messages can be customized through option, that says you can even customise the messages to be in other languages also.

Currently there are 5 possible message strings.

```
$('#target').fyl({
    lang: {
        blank:  "Zadejte minimální znaky {x}.", // Enter minimum {x} characters.
        more:   "Zadejte {x} další znaky.", // Enter {x} more characters.
        none:   "Záznam nenalezen.", // No record found.
        unexp:  "Byly přijaty neočekávané údaje.", // Unexpected data received.
        error:  "Při získávání dat došlo k chybě." // Error encountered while obtaining data.
    }
});
```

## Possibilities

### Match Highlight
The plugin doesn't highlight the search part in result list itself (atleast as of initial release) but if the backend returned values are configured to highlight match part it can be styled further in results to look different. For example, while you search for `las` and get a result `Alaska` you can make the return result to be *`A<span>las</span>ka`* from backend and the match part will appear in result list with different color, underlined by default.

## Installation
Include `jquery.fyl.min.css` from dist folder.
```
<link rel="stylesheet" href="./dist/jquery.fyl.min.css">
```

Include `jquery.fyl.min.js` from dist folder.
```
<script src="./dist/jquery.fyl.min.js"></script>
```
Initiate the plugin.
```
$('#target').fyl({
    bank: 'examples/jqfyl.php' // Source link : mandatory option value
});
```

... or you can use the HTML data attributes and the plugin will load automatically
```
<input type="text" name="users" data-plugin="fyl" data-bank="examples/user.php" value="effone, Eric J" />
```

Thats all. Your target text input field is replaced by __fyl__ (autocomplete component).

## Options
```
$('#target').fyl({
    bank: '', // Source link : mandatory option value (example: 'xmlhttp/username').
    only: false, // Set 'true' make single value accepted.
    char: 3, // Minimum user input characters to initiate search. Blank, 0 or non-numeric resets the value to 1.
    vals: '', // Predefined values, comma separated string (example: 'Eric J, Euan T, Ben').
    lang: {} // Error / info message strings (refer 'Custom Message' section for details).
});
```

**Note**: You can target the input text element as you wish but be sure the target element carries a unique ID, this is required to keep the component unique while using multi-instances in a single page.

## Example

## Version History
