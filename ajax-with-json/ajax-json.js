/**
 * XMLHttpRequest with JSON results. This is a reference for CSE 135 at UCSD.
 *
 * Because this code uses parts of the document that haven't been created when
 * the <head> section is parsed, we don't want to run it until everything is
 * ready. Attaching it to the window's "load" event, triggered when all the
 * content is loaded, ensures that it won't run early.
 *
 * For situations like this, Javascript allows functions to be defined inside
 * other functions. More on that in the XML example.
 */
window.onload = function() {
    /**
     * Returns an object used to make AJAX requests. We need this function
     * because some browsers (old IEs) don't provide AJAX support the standard
     * way.
     *
     * You should note the bad terminology here -- we use terms like "XHR" and
     * "XML HTTP request" for both the XMLHttpRequest object (which lets us send
     * requests) and the asynchronous requests it actually sends. This function
     * gets and returns the former.
     *
     * This example uses nested try/catch because it's easier to read, but a
     * real implementation could be better and less ugly. Don't try this at
     * work.
     */
    function getXmlHttpRequest() {
        var xhr = null;

        try {
            // Not-ancient browsers (Firefox, Opera 8+, Chrome, and IE 7+)
            // implement the standard XMLHttpRequest object. IE7's isn't quite
            // right, but let's ignore that for now.
            xhr = new XMLHttpRequest();
        }
        catch (e) {
            try {
                // Older versions of IE use ActiveX for XMLHttpRequests.
                // "MSXML2" refers to the current version of Microsoft's MSXML
                // library, whatever its number happens to be.
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            }
            catch (e) {
                // Some implementations of this function test for other kinds of
                // ActiveX objects in IE, but I'm leaving them out to avoid any
                // more try/catches. This should be good enough for class, and
                // in real life you should just use a library like jQuery to
                // handle this stuff. It's not worth your time.
            }
        }

        return xhr;
    }

    /**
     * Updates the page with info for the customer whose name is customerName.
     */
    function showCustomer(customerName) {
        /**
         * Sets the HTML inside the tag with ID fieldName to value. Whatever
         * was there is replaced and the tag's class is set to 'visible'.
         */
        function setHtml(fieldName, value) {
            var element = document.getElementById(fieldName);

            element.innerHTML = value;
            element.className = 'visible'; // Just some cosmetic stuff.
        }

        var xhr = getXmlHttpRequest(),
            url = 'customer-info.jsp?customer='
                + customerName + '&sid=' + Math.random(),
            response;

        if (xhr !== null) {
            /**
             * Attach a function to run when the XHR's readyState changes, which
             * usually means something noteworthy has happened.
             * *
             * We're particularly interested in readyState 4, which means the
             * request completed and the response is ready to use. HTTP status
             * code 200 means the server responded without error.
             *
             * For an explanation of the XHR's properties and methods, see:
             *     http://tinyurl.com/3crsr8c
             */
            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    // JSON must be parsed into a Javascript object before we
                    // can use it. Do NOT use eval() for this.
                    //
                    // Modern browsers provide JSON.parse() and JSON.stringify() for
                    // JSON -> object and object -> JSON conversions,
                    // respectively, but ideally we'd have a fallback parsing
                    // function for the dinosaurs.
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

            // Send it off. Since we're using GET to send the data, the payload
            // argument to send() can be omitted.
            xhr.send();
        }
    }

    /**
     * Attach a function to run when the dropdown field's value is changed.
     * Using an anonymous function here is equivalent to something like:
     *
     * function changeHandler() {
     *     showCustomer(this.value);
     * }
     * dropdown.onchange = changeHandler;
     *
     * We can't just use "dropdown.onchange = showCustomer;" because
     * showCustomer() requires an argument. Javascript's handling of "this" is
     * kind of weird, but in this case "this" refers to the dropdown element.
     */
    document.getElementById('customer').onchange = function() {
        showCustomer(this.value);
    };
};