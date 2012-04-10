<% response.setContentType("text/json"); %>

<%

String customerName = request.getParameter("customer");

if (customerName != null) {
    if (customerName.equals("Bruce Wayne")) { %>

        {
            "name": "Wayne Enterprises",
            "address": "Wayne Tower",
            "city": "Gotham City",
            "country": "United States"
        }

    <% }
    else if (customerName.equals("Kuat of Kuat")) { %>

        {
            "name": "Kuat Drive Yards",
            "address": "Kuat System",
            "city": "Kuat Sector",
            "country": "A Galaxy Far, Far Away"
        }

    <% }
    else if (customerName.equals("Lando Calrissian")) { %>

        {
            "name": "Cloud City",
            "address": "Bespin",
            "city": "Outer Rim Territories",
            "country": "A Galaxy Far, Far Away"
        }

    <% }
}

%>