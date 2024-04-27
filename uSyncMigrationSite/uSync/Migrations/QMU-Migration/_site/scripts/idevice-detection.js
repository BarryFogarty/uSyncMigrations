$(document).ready(function () {
 
    //DETECT DEVICES 
    function useriPhone() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    }
    function useriPad() {
        return (
            (navigator.platform.indexOf("iPad") != -1)
        );
    }
 
    //variables
    var $body = $('body'),
        ipadH = 'iPad-horizontal',
        ipadV = 'iPad-vertical',
        iphoneH = 'iPhone-horizontal',
        iphoneV = 'iPhone-vertical';
 
    //orientation functions
    function ipadOrientation() {
        if ((window.orientation) === 90 || (window.orientation) === -90) {
            $body.addClass(ipadH);
            $body.removeClass(ipadV);
        }
        else {
            $body.removeClass(ipadH);
            $body.addClass(ipadV);
        }
    }
    function iphoneOrientation() {
        if ((window.orientation) === 90 || (window.orientation) === -90) {
            $body.addClass(iphoneH);
            $body.removeClass(iphoneV);
        }
        else {
            $body.removeClass(iphoneH);
            $body.addClass(iphoneV);
        }
    }
 
    //if user is using iPad
    if (useriPad()) {
        $body.addClass('iPad');
 
        ipadOrientation();
 
        // Listen for orientation change when device is rotated
        window.addEventListener("orientationchange", function () {
            ipadOrientation();
        }, false);
    }
 
    //if user is using iPhone
    if (useriPhone()) {
        $('body').addClass('iPhone');
 
        iphoneOrientation();
 
        // Listen for orientation change when device is rotated
        window.addEventListener("orientationchange", function () {
            iphoneOrientation();
        }, false);
    }
});
                        