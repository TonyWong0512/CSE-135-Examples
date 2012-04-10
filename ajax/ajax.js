/**
 * A basic XMLHttpRequest demo for CSE 135 at UCSD.
 *
 * Because this code uses parts of the document that haven't been made yet when it runs,
 * we don't want to run it until everything is ready. Attaching it to the window's "load"
 * event, triggered when all the content is loaded, ensures it won't run early.
 */
window.onload = function() {
    /**
     * Returns an object used to make AJAX requests. We need this because
     * some browsers (mostly old IEs) don't follow the XMLHttpRequest standard.
     *
     * This example uses nested try/catch because it's easier to read, but a 
     * real implementation could be a lot less ugly.
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
                // current version of Microsoft's MSXML library.
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

    function updateLastModifiedTime() {
        var xhr = getXmlHttpRequest();

        if (xhr !== null) {
            /**
             * Attach a function to run when the XHR's readyState changes, which usually 
             * means something noteworthy has happened. We're particularly interested
             * in readyState 4, which means the request was successful and the response 
             * is ready to use. HTTP status code 200 means the server responded without
             * error.
             *
             * For an explanation of the XHR's properties and methods, see:
             *     http://www.webdevstuff.com/86/javascript-xmlhttprequest-object.html
             */
            xhr.onreadystatechange = function() {
                if (this.readyState === 4) {
                    document.getElementById('lastUpdated').innerHTML = 'You last typed on ' + this.responseText;
                }
            };

            // Set up a GET request for date.jsp.
            xhr.open('GET', 'date.jsp');

            // Send it off. Since we're using GET to send the data, the request payload 
            // can be null.
            xhr.send(null);
        }
    }

    // Note the missing parens. This is a reference to a function, not 
    // the result of a function call.
    document.getElementById('story').onkeyup = updateLastModifiedTime;
};