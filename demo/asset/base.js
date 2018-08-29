$(document).ready(function () {
    $('.target').fyl({
        bank: 'response.php',
        lang: {
            blank: "Enter minimum {x} characters.",
            more: "Enter {x} more characters.",
            none: "No record found.",
            unexp: "Unexpected data received.",
            error: "Error encountered while obtaining data."
        }
    });
});