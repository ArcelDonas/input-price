# input-price
Helps yout to format your prices in your inputs

This is a jQuery Plugin
- Maintain all your css stylisation
- Very simple to deploy
- ultra Heavy

```javascript
  $(yourElement).inputPrice(milleDelimitter = ' ', decimalDelimiter = ',')
```

The test is given to see it an action

# What this is?
This is a jQuery plugin helping you to format your prices into an input and when asked, it retrieves the price into the correct form. For instance if user type (or is passed dynamicaly to the input) 2500000000, this plugin displays 2 500 000 000 (if seperator is ' ') and when the input value is required, the plugin retrives 2500000000.
# Installation
## Via npm
`npm install ak_price_input`
## By loading js file
Only file you file you have to load in the page you want to use this is `inputPrice.js`. Just copy the file and insert it into your project and refer it into your project

# How this works
His principle is simple. This replace the target element by a clone keeping thus all it'attributes and then all the styles you had applied. After that clone is placed before the target element. All changes done on clone element are repercuted on the target element, since their values are always equivalent.
Anyway, some of these attributes can are changed
## For the target element
- `type` passes to `hidden`
## For the clone element
- `type` is changed into `number`
- `pattern` attribute is modified or (set if not exists) into the pattern waited, regarding also the separator passed as plugin parameter
- `id` attribute is removed. (To avoid have 2 same id on your page)

# Cautions
Since `id` attribute is removed on the new input which is displayed on your page (the clone input) and `type` changed into `number`, ensure your original input style is not only based on it `id` (mean `#yourInputId {...}` in your *css* file), same for the `type` attribue (mean `input[type="yourOriginalType"] {...}` or in this particular case ensure both rules are applied on `input[type=["number"]`. If you use basically some toolkit such as *Bootstrap*, you don't have to care about that.


ENJOY :-)
