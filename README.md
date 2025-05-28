# atomyCyprus
The main web-shop Atomy in Cyprus!

**Software Requirements Specification**

1. Introduction

The purpose of the document is to define the functional and non-functional requirements for the Atomy Cyprus website, designed for users who want to order the company's products and receive support from live mentors via Telegram.

Audience: developers, testers, customers and stakeholders of the project.

Project Area: A web application that provides registration, authentication, product viewing, order processing, and mentor communication.


---

**2. General description**

*Product Perspective*

The product is a website for the promotion and ordering of Atomy products in Cyprus. The user can register, log in to the account, select the product of interest and place an order. After the order is placed, it is sent to a live mentor in Telegram, who processes it and arranges delivery.

*User Functions*

Registration - Log in to your account - Viewing products - Making an order - Receiving confirmation of the transfer of data to the mentor


*User Characteristics*

Low technical level (the interface should be simple) - Users speak Russian or English.


*Restrictions*

The web application runs in a local or hosted environment

Communication with the Telegram mentor is implemented manually (by sending a message from the website to a live person)

---

**3. Functional requirements**

*Registration*

The user fills out the form with the name, email and password - And the email is confirmed via a link in the mail


*Entrance*

The user logs in by email and password - Access to the orders page only after logging in


*Viewing products*

The user sees a list of available products with a description and price.


*Making an order*

The user selects the product and site provide the mentor's telegram phone number for the contact information

After confirmation, the website generates a message with the order data.


*Order confirmation*

The user sees a message in email that the order has been transferred to the mentor and he will contact him.


---

**4. Non-functional requirements**

*Easy of use*

Simple, adaptive form (mobile device support will be too soon)

*Security*

Password encryption (via password_hash in PHP) and email verification before logging in

*Reliability*

Checking all required form fields and error handling (when sending data to the mentor or developers)


*Support and maintenance*

Simple setup via XAMPP and phpMyAdmin

---

**5. Assumptions and dependencies**

The user has access to the email and is able to click on the confirmation link. The mentor is available on Telegram and processes orders promptly. The server is configured to send emails (SMTP)

---

**6. Applications**

HTML pages: mainpage.html (as index.html) , cart.html, form.html , item.html , login.html

PHP scripts: register.php , verify.php , login.php

JS scripts: cart.js , item.js , product-array.js , lang.js

CSS script: style.css

Database structure in phpMyAdmin

---

Author: Roman Myslov
