/// <reference path="jquery-3.1.0.js" />
/// <reference path="js.cookie.js" />

function authorizeUser(user, password)
{
    $.ajax({
        url: "http://localhost:35853/token",
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            },
        data: {
            grant_type: "password",
            username: user,
            password: password
            }
    })
    .done(function (response) {
        console.log(response);
        authSuccess(response);
    })
    .fail(function (jqXHR, textStatus) {
        authFail(jqXHR.responseText);
    });
}

function authSuccess(tokenInfo)
{
    // tokenInfo:
    //  - access_token
    //  - expires_in (expire in seconds)

    // Store the token at localStorage
    // localStorage.setItem("token",token);

    // Store the token into a cookie
    var expire_day = tokenInfo.expires_in / (60 * 60 * 24) // [expires_in_seconds / seconds_by_day]
    Cookies.set("token", tokenInfo.access_token, { expires: expire_day }) // expires unit is a day

    getUser();
    responseMessage("User authorized!");
}

function getUser()
{
    $.ajax({
        method: "GET",
        url: "http://localhost:35853/api/account/user",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": "Bearer " + Cookies.get("token")
        }
    })
    .done(function (result) {
        // Set user info
        setUserInfo(result);

        // Enable controls
        showBookForm();
    })
    .fail(function (jqXHR, textStatus) {
        responseMessage("Something went wrong on get your name");
    });
}

function authFail(error)
{
    // Delete the token at localStorage
    // localStorage.removeItem("token");

    // Delete the cookie token
    Cookies.remove("token");

    responseMessage("Unable to authorize user: " + error);
}

function setUserInfo(user)
{
    $("#userName").text(user);
}

function bookingDate(bookingUser, bookingDate) {
    // Send booking date
    // http://localhost:35853/api/booking/book

    $.ajax({
        method: "POST",
        url: "http://localhost:35853/api/booking/book?user=" + bookingUser + "&date=" + bookingDate,
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization" : "Bearer " + Cookies.get("token")
        }
    })
    .done(function (result) {
        if (result)
        {
            bookSuccess();
        }
        else
        {
            bookUnsuccess();
        }
    })
    .fail(function (jqXHR, textStatus) {
        bookFailure(jqXHR.responseText);
    });
};

function bookSuccess() {
    responseMessage("Booking completed successful");

    // Refresh data
    getUserBooks();
    getAllBooks();
};

function bookUnsuccess() {
    responseMessage("Sorry, the date is not available. Please, select another date");
};

function bookFailure(error) {
    responseMessage("Failure booking the date: " + error);
};

function getUserBooks() {
    $.ajax({
        method: "GET",
        url: "http://localhost:35853/api/booking/user",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "authorization": "Bearer " + Cookies.get("token")
        }
    })
        .done(function (result) {
            printUserBooks(result);
        })
        .fail(function (jqXHR, textStatus) {
            responseMessage("Unable to get your books");
        });
}

function getAllBooks() {
    $.ajax({
        method: "GET",
        url: "http://localhost:35853/api/booking",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            // "authorization": "Bearer " + Cookies.get("token") // En este caso es una llamada abierta
        }
    })
        .done(function (result) {
            printAllBooks(result);
        })
        .fail(function (jqXHR, textStatus) {
            responseMessage("Unable to get all books");
        });
}

function printUserBooks(books) {
    printBooks(books, $("#bookedList"));
}

function printAllBooks(books) {
    printBooks(books, $("#allBookedList"));
}

function printBooks(books, ulList) {
    ulList.empty();
    $.each(books, function (index, book) {
        ulList.append("<li>" + book + "</li>")
    }
    );
}
function showBookForm()
{
    // Hide sign in
    $("#userForm").hide();

    // Show user info book form
    $("#userInfo").show();
    $("#bookForm").show();
}

function showUserLogin()
{
    // Show sign in
    $("#userForm").show();

    // Hide user info book form
    $("#userInfo").hide();
    $("#bookForm").hide();
}

function responseMessage(message)
{
    $("#response").text(message);
}

function start() {
    
    // Handle sign in event
    $("#signIn").click(function () {
        var user = $("#user").val();
        var pass = $("#pass").val();

        authorizeUser(user, pass);
    });

    // Handle book event
    $("#book").click(function () {

        var user = $("#user").val();
        var date = $("#date").val();
        
        bookingDate(user, date);
    });

    // Handle booked list
    $("#viewBooked").click(function () {
        getUserBooks();
    });

    $("#viewAllBooked").click(function () {
        getAllBooks();
    });

    showUserLogin();

};


$(document).ready(start);