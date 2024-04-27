$(document).ready(function () {

    $(".approve-btn").on("click", function (event) {

        var button = $(this);
        var parent = button.parent();

        // Anti-forgery token
        var token = $('input[name=__RequestVerificationToken]').val();

        // Update the form record
        var pageDetails = {
            PageId: button.attr("data-id"),
            MemberName: approverName
        }

        $.ajax({
            type: 'POST',
            url: '/Umbraco/Api/ApprovalApi/ApprovePage',
            headers: { '__RequestVerificationToken': token },
            data: pageDetails,
            success: function () {
                console.log("Page approved.");
                parent.html("<p>Page approved.</p>")
            },
            error: function () {
                console.log("Error. Page not approved.");
            }
        });

    });

});