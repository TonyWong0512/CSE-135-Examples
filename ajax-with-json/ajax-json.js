/**
 * XMLHttpRequest with JSON results. This is a reference for CSE 135 at UCSD.
 *
 * Because this code uses parts of the document that haven't been made yet when it runs,
 * we don't want to run it until everything is ready. Attaching it to the window's "load"
 * event, triggered when all the content is loaded, ensures it won't run early.
 *
 * For situations like this, Javascript allows functions to be defined inside other 
 * functions. More on that in the XML example.
 */
window.onload = function() {
    /**
     * Returns an object used to make AJAX requests. We need this because
     * some browsers (mostly old IEs) don't provide AJAX support the standard way.
     *
     * This example uses nested try/catch because it's easier to read, but a real 
     * implementation could be less ugly. Don't try this at work.
     */
    function getXmlHttpRequest() {
        var xhr = null;

        try {
            // Modern browsers (Firefox, Opera 8+, Chrome, and IE 7+) implement
            // the standard XMLHttpRequest object. IE7's isn't quite right, but 
            // let's ignore that for now.
            xhr = new XMLHttpRequest();
        }
        catch (e) {
            try {
                // Older versions of IE use ActiveX for XMLHttpRequests. "MSXML2" refers to the 
                // current version of Microsoft's MSXML library, whatever its number happens to be.
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                try {
                    // Really old versions of IE will use the older "Microsoft" namespace, so 
                    // we'll keep that as a fallback.
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {
                    // Nothing left to try.
                    // jetpack.jpg
                }
            }
        }

        return xhr;
    }

    /**
     * Updates the page with info for the customer whose name is customerName.
     */
    function showCustomer(customerName) {
        /**
         * Sets the HTML inside the tag with ID fieldName to value. Whatever was 
         * there is replaced and the tag's class is set to 'visible'.
         */
        function setHtml(fieldName, value) {
            var element = document.getElementById(fieldName);

            element.innerHTML = value;
            element.className = 'visible'; // Just some cosmetic stuff.
        }

        var xhr = getXmlHttpRequest(),
            url = 'customer-info.jsp?customer=' + customerName + '&sid=' + Math.random(),
            response;

        if (xhr !== null) {
            /**
             * Attach a function to run when the XHR's readyState changes, which usually 
             * means something noteworthy has happened. We're particularly interested
             * in readyState 4, which means the request completed and the response 
             * is ready to use. HTTP status code 200 means the server responded without
             * error.
             *
             * For an explanation of the XHR's properties and methods, see:
             *     http://www.webdevstuff.com/86/javascript-xmlhttprequest-object.html
             */
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // JSON must be parsed into a Javascript object before we can use it.
                    // Do NOT use eval() for this.
                    // 
                    // Modern browsers provide JSON.parse() and JSON.stringify() for 
                    // JSON -> object and object -> JSON conversions, respectively,
                    // but ideally we'd have a fallback parsing function for the dinosaurs.
                    // 
                    // Douglas Crockford has a nice polyfill solution here:
                    //     https://github.com/douglascrockford/JSON-js
                    //
                    response = JSON.parse(this.responseText);

                    setHtml('companyName', response.name);
                    setHtml('address', response.address);
                    setHtml('city', response.city);
                    setHtml('country', response.country);
                }
            };

            // Set up a GET request to url.
            xhr.open('GET', url);

            // Send it off. Since we're using GET to send the data, the request payload 
            // can be null.
            xhr.send(null);
        }
    }

    /**
     * Attach a function to run when the dropdown field's value is changed. Using an 
     * anonymous function here is equivalent to something like:
     *
     * function changeHandler() {
     *     showCustomer(this.value);
     * }
     * dropdown.onchange = changeHandler;
     *
     * We can't just use "dropdown.onchange = showCustomer;" because showCustomer() 
     * requires an argument. Javascript's handling of "this" is kind of weird,
     * but in this case "this" will be set to the dropdown element.
     */
    document.getElementById('customer').onchange = function() {
        showCustomer(this.value);
    };
};