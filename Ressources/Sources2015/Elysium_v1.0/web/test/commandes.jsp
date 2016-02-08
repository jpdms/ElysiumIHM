<%-- 
    Document    : Envoi de commande du client (AJAX) vers l'application (UDP)
    Description : Recoit une commande sur 3 lettres et l'envoi en UDP au serveur
    Created on  : 18 Février 2015, 15:40:42
    Author      : jpdms
--%>

<%@page import="java.net.DatagramPacket"%>
<%@page import="java.net.InetAddress"%>
<%@page import="java.net.DatagramSocket"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    int PORT_UDP = 5000;
    int CMD_LENGTH = 3;                 // les commandes sont sur 3 caractères
    
    String commande = request.getParameter("cmd");
    
    DatagramSocket clientSocket = new DatagramSocket();
    InetAddress IPAddress = InetAddress.getByName("localhost");
    byte[] outUDP = new byte[100];
    outUDP = commande.getBytes();
    DatagramPacket sendPacket = 
                    new DatagramPacket(outUDP, CMD_LENGTH, IPAddress, PORT_UDP);
    clientSocket.send(sendPacket);
    clientSocket.close();
%>