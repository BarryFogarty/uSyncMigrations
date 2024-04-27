

if (window.location.search.includes("feeCategory=Rest+of+UK") && !window.location.search.includes("feeCategory=Rest+of+UK+(England,+Wales,+Northern+Ireland)")) {

    if (history.pushState) {

        var newQuery = window.location.search.replace("feeCategory=Rest+of+UK", "feeCategory=Rest+of+UK+(England,+Wales,+Northern+Ireland)");
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newQuery;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

