<%-- 
    Document   : index
    Created on : 6 févr. 2015, 14:01:48
    Author     : jpdms
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="js/LStream.js"></script>
        <title>JSP Page</title>

    </head>
    <body>
        <form name="sseForm">
            <input type="button" value="SSE Connexion" onClick="sseConnexion()">
        </form>
        <p id="reception"></p>

    </body>
</html>
