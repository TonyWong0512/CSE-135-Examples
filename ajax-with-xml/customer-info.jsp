<% response.setContentType("text/xml"); %>

<%

String customerName = request.getParameter("customer");

if (customerName != null) {
    if (customerName.equals("Bruce Wayne")) { %>

        <company>
            <name>Wayne Enterprises</name>
            <address>Wayne Tower</address>
            <city>Gotham City</city>
            <country>United States</country>
        </company>

    <% }
    else if (customerName.equals("Kuat of Kuat")) { %>

        <company>
            <name>Kuat Drive Yards</name>
            <address>Kuat System</address>
            <city>Kuat Sector</city>
            <country>A Galaxay Far, Far Away</country>
        </company>

    <% }
    else if (customerName.equals("Lando Calrissian")) { %>

        <company>
            <name>Cloud City</name>
            <address>Bespin</address>
            <city>Outer Rim Territories</city>
            <country>A Galaxy Far, Far Away</country>
        </company>

    <% }
}

%>