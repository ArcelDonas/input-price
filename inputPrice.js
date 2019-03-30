/**
 * This class handle all that concern this plugin
 */
class InputPrice
{
    /**
     * The constructor doc
     *
     * @param  {Object} jQel             The jQuery element on which apply this
     * @param  {String} milleSeparator   The separator of milles
     * @param  {String} decimalSeparator The separator of decimals
     */
    constructor(jQel, milleSeparator = ' ', decimalSeparator = ',') {
        this._milleSeparator = milleSeparator;
        this._decimalSeparator = decimalSeparator;

        this.orignalElement = jQel;

        this._bootstraping();
    }

    /**
     * Excecute when this class is instanciate to set up some stucs
     *
     * @return {Void}
     */
    _bootstraping() {
        this._stringHepler = new StringHelper();
        this._cloneElement = this.orignalElement.clone();

        this.orignalElement.prop('type', 'hidden')
                        .before(this._cloneElement);
        this._cloneElement.prop({
                            type: 'text',
                            pattern: '[\\d' + this._stringHepler.convertStringIntoRegex(this._milleSeparator + this._decimalSeparator) + ']+',
                        })
                        .on('keydown', this._onKeyDown.bind(this))
                        .on('keyup', this._onKeyUp.bind(this))
                        .removeAttr('id')
                        .removeAttr('name')
                        .on('change', function() { this.orignalElement.get(0).dispatchEvent(new Event('change')) }.bind(this))
                        .val(this._stringHepler.formatPrice(this.orignalElement.val(), this._milleSeparator));

        this._assignAccessorsOnValueAttribute();

    }

    /**
     * Allows to overwrite the setter and getter of the tagged element value attribute
     *
     * @return {Void}
     */
    _assignAccessorsOnValueAttribute() {
        const originalJsEl = this.orignalElement.get(0);

        Object.defineProperty(originalJsEl, 'value', {
            set: function(newValue) {
                const formatedPrice = this._stringHepler.formatPrice(newValue, this._milleSeparator);
                this._cloneElement.val() != formatedPrice && this._cloneElement.val(formatedPrice);
                originalJsEl.dispatchEvent(new Event('valueHasChanged'));
            }.bind(this),
            get: function() {
                return this._stringHepler.originalPrice(this._cloneElement.val());
            }.bind(this),
        });
    }

    /**
     * Handle what happens on keyDown on clone element
     *
     * @param  {Event} event The event thrown
     *
     * @return {Void}
     */
    _onKeyDown(event) {
        const key = event.originalEvent.key;
        switch(key) {
            case 'Backspace':
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'F1':
            case 'F2':
            case 'F3':
            case 'F4':
            case 'F5':
            case 'F6':
            case 'F7':
            case 'F8':
            case 'F9':
            case 'F10':
            case 'F11':
            case 'F12':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
//            case ',':
//            case '.':
                return;
            case 'Escape':
                this._cloneElement.val('');

                return;
            default:
                /*if (key === this._decimalSeparator) {
                    return;
                }*/
                event.preventDefault();

                return;
        }
    }

    /**
     * Handle what happens on keyUp on the cloned element
     *
     * @param  {Event} event The keyUp event
     *
     * @return {Void}
     */
    _onKeyUp(event) {
        switch(event.originalEvent.key) {
            case 'Backspace':
            case ',':
            case '.':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this._cloneElement.val(this._stringHepler.formatPrice(this._cloneElement.val(), this._milleSeparator));
                this.orignalElement.val(this._stringHepler.originalPrice(this._cloneElement.val()));
                this.orignalElement.get(0).dispatchEvent(new Event('hasOwnChanged'));

                return;
            default:
                return;
        }
    }
};

/**
 * This class holds all string utilities usefull for this plugin
 */
class StringHelper
{
    convertStringIntoRegex(string) {
        let regex = '';
        for (let i = 0; i < string.length; i++) {
            regex += this._regexEquiv(string[i]);
        }

        return regex;
    }

    /**
     * Retrieves the original price behind a certain string
     *
     * @param  {String} formatedPrice The string representing the price
     *
     * @return {String|Number}        Either the price or an empty string if given string can't be decoded
     */
    originalPrice(formatedPrice) {
        const treated = parseFloat(('' + formatedPrice).replace(new RegExp('[^\\d]+', 'g'), ''));

        return  isNaN(treated) ? '' : treated;
    }

    /**
     * Encode price into a string separating milles with milleSeperator
     *
     * @param  {Number} currentPrice   The price to format
     * @param  {String} milleSeparator The mille separator
     *
     * @return {String}                The string formated
     */
    formatPrice(currentPrice, milleSeparator) {
        const millesDigitsNumber = 3;
        let price = '' + this.originalPrice(currentPrice);
        let treatedNumber = '';
        let indice = 0;
        do {
            indice = price.length - millesDigitsNumber;
            indice = indice > 0 ? indice : 0;
            treatedNumber = price.substr(indice) + milleSeparator + treatedNumber;
            price = price.substr(0, indice);
        } while (price.length > 0);

        return treatedNumber.replace(new RegExp('^[^\\d]+|[^\\d]+$', 'g'), '');
    }

    /**
     * Convert the given character into its regex representation, escaptig what should be
     *
     * @param  {String} char The char to give equiv. Must be of lenght 1
     *
     * @return {String}      The regex representation
     */
    _regexEquiv(char) {
        switch(char) {
            case ' ':
                return '\\s';
            case '.':
            case '\\':
            case '^':
            case '[':
            case ']':
            case '$':
            case '(':
            case ')':
            case '*':
            case '+':
            case '?':
            case '|':
            case '{':
            case '}':
                return '\\' + char;
            default:
                return char;
        }
    }

}


/**
 * The plugin definiition function
 *
 * @param  {String} milleSeparator   The mille seperator
 * @param  {String} decimalSeparator The decimal seperator
 *
 * @return {Void}
 */
 $.fn.inputPrice = function(milleSeparator = ' ', decimalSeparator = ',') {
    $(this).each(function () {
        new InputPrice($(this), milleSeparator, decimalSeparator);
    });
}
