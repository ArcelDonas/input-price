# input-price
Helps yout to format your prices in your inputs

This is a jQuery Plugin
- Maintain all yours css stylisation
- Very simple to deploy
- ultra Heavy

`$(yourElement).inputPrice(milleDelimitter = ' ', decimalDelimiter = ',')`

The test is given to see it an action

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
Since `id` attribute is removed from the new input which is displayed on your page (the cloned input) and `type` changed to `number`, ensure your original input style is not only based on it `id` (mean `#yourInputId {...}` in your *css* file), same for the `type` attribue (mean `input[type="yourOriginalType"] {...}` or in this particular case ensure both rules are applied on `input[type=["number"]`. If you uses some basically toolkit such as *Bootstrap*, you don't have to care about that.

# See it in action
See it in cation via this link

ENJOY :-)
