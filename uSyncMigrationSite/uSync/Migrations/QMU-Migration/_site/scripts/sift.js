// ********************************************
// Populate option list criteria from Umbraco
// ********************************************
var criteria = document.querySelectorAll(".sift .sift-criterion");
var numCriteriaBeingPopulated = 0;  // Have to wait for auto-load
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

criteria.forEach(function (criterion) {

    var recordedValue;
    var siftDiv = criterion.closest(".sift");
    var id = criterion.getAttribute("id");

    if (siftDiv) {

        var storage;
        var recordLevel = siftDiv.getAttribute("data-sift-remember-criteria") ?? "none";

        if (recordLevel == "local") {
            storage = localStorage;
        }
        else if (recordLevel == "session") {
            storage = sessionStorage;
        }

        if (storage) {
            recordedValue = storage.getItem("sift" + window.location.pathname + "/" + id);
        }
    }

    if (IsOptionListCriterion(criterion)) {

        var matchProperty = criterion.getAttribute("data-sift-match-property");
        var alreadyPopulated = hasClass(criterion, "sift-populated");

        if (matchProperty && siftDiv && !alreadyPopulated) {

            criterion.setAttribute("disabled", true);

            var documentType = siftDiv.getAttribute("data-sift-result-document-type");
            var culture = siftDiv.getAttribute("data-sift-culture");
            var displayProperty = criterion.getAttribute("data-sift-criterion-display-property");
            var sortBy = criterion.getAttribute("data-sift-criterion-sort-by");

            var parameters = {
                DocumentType: documentType,
                MatchProperty: matchProperty,
                DisplayProperty: displayProperty,
                Culture: culture,
                SortBy: sortBy
            }

            numCriteriaBeingPopulated++;

            PostRequest("/Umbraco/sift/SiftApi/GetCriterionOptions", parameters, function (result) {

                if (result.xhttpStatus == 200) {

                    if (criterion.tagName === "SELECT") {
                        PopulateOptions(result.Options, criterion, recordedValue);
                    }
                    else if (hasClass(criterion, "sift-checkboxes")) {
                        PopulateCheckboxes(result.Options, criterion, recordedValue);
                    }
                    else if (hasClass(criterion, "sift-radio-buttons")) {
                        PopulateRadioButtons(result.Options, criterion, recordedValue);
                    }

                    criterion.removeAttribute("disabled");
                }

                numCriteriaBeingPopulated--;
            });
        }
    }
    else {

        if (urlParams.has(id)) {
            recordedValue = urlParams.get(id);
        }

        if (recordedValue) {
            criterion.value = recordedValue;
        }
    }
});

function IsOptionListCriterion(criterion) {

    return criterion.tagName === "SELECT" || hasClass(criterion, "sift-checkboxes") || hasClass(criterion, "sift-radio-buttons");
}

function PopulateOptions(selectListItems, criterion, recordedValue) {

    criterion.innerHTML = "";
    var id = criterion.getAttribute("id");

    var selectedIndex = -1;
    var multiSelect = criterion.hasAttribute("multiple");
    var i = 0;
    var selectedValues = [];

    if (recordedValue && recordedValue.length > 0 && multiSelect) {

        selectedValues = JSON.parse(recordedValue);
    }

    if (urlParams.has(id)) {

        if (multiSelect) {
            selectedValues = urlParams.get(id).split(",");
        }
        else {
            recordedValue = urlParams.get(id);
        }
    }

    var defaultOption = criterion.getAttribute("data-sift-default-option");
    if (defaultOption) {

        var isSelected = false;
        if (multiSelect) {
            isSelected = selectedValues.length == 0;
        }
        else if (!recordedValue || recordedValue.length == 0) {
            selectedIndex = i;
        }

        criterion.add(new Option(defaultOption, "", "", isSelected, isSelected));
        i++;
    }

    selectListItems.forEach(function (option) {

        var isSelected = false;
        if (multiSelect) {
            isSelected = selectedValues.includes(option.Value);
        }
        else if (option.Value == recordedValue) {
            selectedIndex = i;
        }

        criterion.add(new Option(option.Text, option.Value, false, isSelected));

        i++;
    });

    if (selectedIndex >= 0) {
        criterion.selectedIndex = selectedIndex;
    }
}

function PopulateCheckboxes(items, criterion, recordedValue) {

    var id = criterion.getAttribute("id");

    var selectedValues = [];
    if (recordedValue && recordedValue.length > 0) {

        selectedValues = JSON.parse(recordedValue);
    }

    if (urlParams.has(id)) {
        selectedValues = urlParams.get(id).split(",");
    }

    var siftDiv = criterion.closest(".sift");
    var updateResultsOnChange = hasClass(siftDiv, "sift-update-on-change");

    var labelPlacement = criterion.getAttribute("data-sift-label-placement");
    if (!labelPlacement) {
        labelPlacement = "after";
    }

    var criterionId = criterion.getAttribute("id");
    var criterionName = criterion.getAttribute("name");

    if (!criterionId) {
        criterionId = "";
    }

    if (!criterionName || criterionName.length <= 0) {
        criterionName = criterionId;
    }

    var checkboxesHtml = "";
    var i = 0;

    items.forEach(function (option) {

        if (criterion.tagName == "UL") {
            checkboxesHtml += "<li>";
        }
        else {
            checkboxesHtml += '<div class="sift-checkbox">';
        }

        var checkboxId = criterionId + "_" + i;
        var checkboxName = criterionName + "_" + i;

        var labelHtml = "<label for='" + checkboxId + "'>" + option.Text + "</label>";

        if (labelPlacement == "before") {
            checkboxesHtml += labelHtml;
        }

        checkboxesHtml += "<input type='checkbox' id='" + checkboxId + "' name='" + checkboxName + "' value='" + option.Value + "'";

        if (selectedValues.includes(option.Value)) {
            checkboxesHtml += " checked";
        }

        if (updateResultsOnChange) {
            checkboxesHtml += " onchange='SiftSearch(this)'"
        }

        checkboxesHtml += ">";

        if (labelPlacement != "before" && labelPlacement != "none") {
            checkboxesHtml += labelHtml;
        }

        if (criterion.tagName == "UL") {
            checkboxesHtml += "</li>";
        }
        else {
            checkboxesHtml += "</div>";
        }

        i++;
    });

    criterion.innerHTML = checkboxesHtml;
}

function PopulateRadioButtons(items, criterion, recordedValue) {

    var id = criterion.getAttribute("id");

    var selectedValues = [];
    if (recordedValue && recordedValue.length > 0) {

        selectedValues = JSON.parse(recordedValue);
    }

    if (urlParams.has(id)) {
        selectedValues = urlParams.get(id).split(",");
    }

    var siftDiv = criterion.closest(".sift");
    var updateResultsOnChange = hasClass(siftDiv, "sift-update-on-change");

    var defaultOption = criterion.getAttribute("data-sift-default-option");
    if (defaultOption) {

        var isSelected = selectedValues.length == 0;

        var defaultItem = {
            Text: defaultOption,
            Value: "",
            Selected: isSelected
        }
        items.splice(0, 0, defaultItem);
    }

    var labelPlacement = criterion.getAttribute("data-sift-label-placement");
    if (!labelPlacement) {
        labelPlacement = "after";
    }

    var criterionId = criterion.getAttribute("id");
    var criterionName = criterion.getAttribute("name");

    if (!criterionId) {
        criterionId = "";
    }

    if (!criterionName || criterionName.length <= 0) {
        criterionName = criterionId;
    }

    var groupName = criterionName + "_sift_group";
    var radioButtonsHtml = "";
    var i = 0;

    items.forEach(function (option) {

        if (criterion.tagName == "UL") {
            radioButtonsHtml += "<li>";
        }
        else {
            radioButtonsHtml += '<div class="sift-radio-button">';
        }

        var radioButtonId = criterionId + "_" + i;

        var labelHtml = "<label for='" + radioButtonId + "'>" + option.Text + "</label>";

        if (labelPlacement == "before") {
            radioButtonsHtml += labelHtml;
        }

        radioButtonsHtml += "<input type='radio' id='" + radioButtonId + "' name='" + groupName + "' value='" + option.Value + "'";

        if (option.Selected || selectedValues.includes(option.Value)) {
            radioButtonsHtml += " checked";
        }

        if (updateResultsOnChange) {
            radioButtonsHtml += " onchange='SiftSearch(this)'"
        }

        radioButtonsHtml += ">";

        if (labelPlacement == "after") {
            radioButtonsHtml += labelHtml;
        }

        if (criterion.tagName == "UL") {
            radioButtonsHtml += "</li>";
        }
        else {
            radioButtonsHtml += "</div>";
        }

        i++;
    });

    criterion.innerHTML = radioButtonsHtml;
}


// *****************************************
// Add search functionality to Sift events
// *****************************************
var autoLoadTimer;
var siftFilters = document.querySelectorAll(".sift");
siftFilters.forEach(function (filter) {

    AddClickEventToSearchButtons(filter);

    if (hasClass(filter, "sift-auto-load-on-page-load")) {
        AutoLoad(filter);
    }
});

function AutoLoad(filter) {

    // Wait for the criteria to have been populated before Auto Load
    if (numCriteriaBeingPopulated == 0) {

        var recordLevel = filter.getAttribute("data-sift-remember-criteria") ?? "none";
        var storage;
        if (recordLevel == "local") {
            storage = localStorage;
        }
        else if (recordLevel == "session") {
            storage = sessionStorage;
        }

        var fromElement = filter;

        if (storage) {

            // Reload at last page visited
            var storageKey = "sift" + window.location.pathname + "/";
            var divId = filter.getAttribute("id");
            if (divId) {
                storageKey += divId + "/";
            }
            storageKey += "sift-page-number";

            var recordedPageNumber = storage.getItem(storageKey);
            if (recordedPageNumber) {

                // Add a temporary <div> to indicate the page number
                var pageNumberDiv = document.createElement("div");
                pageNumberDiv.setAttribute("hidden", true);
                pageNumberDiv.setAttribute("data-sift-results-page-number", recordedPageNumber);
                filter.appendChild(pageNumberDiv);

                fromElement = pageNumberDiv;
            }
        }

        SiftSearch(fromElement);
    }
    else {
        clearTimeout(autoLoadTimer);
        autoLoadTimer = setTimeout(function () {

            AutoLoad(filter);

        }, 10);
    }
}

var timer;

var onchangeCriteria = document.querySelectorAll(".sift.sift-update-on-change .sift-criterion");
onchangeCriteria.forEach(function (criterion) {

    if (criterion.tagName == "INPUT" && criterion.hasAttribute("data-sift-min-change-letters")) {

        var minLettersStr = criterion.getAttribute("data-sift-min-change-letters");
        var minLetters = parseInt(minLettersStr);
        if (minLetters == NaN) {
            minLetters = 0;
        }

        var keyPressDelay = 500;
        if (criterion.hasAttribute("data-sift-key-press-delay")) {

            var delayStr = criterion.getAttribute("data-sift-key-press-delay");
            var delay = parseInt(delayStr);
            if (delay != NaN) {
                keyPressDelay = delay;
            }
        }

        criterion.onkeyup = function (event) {

            clearTimeout(timer);
            timer = setTimeout(function () {

                if ((criterion.value && criterion.value.length >= minLetters) || event.key === "Backspace" || event.key === "Delete") {
                    SiftSearch(criterion);
                }

            }, keyPressDelay);
        }
    }
    else if (criterion.tagName == "INPUT" || criterion.tagName == "SELECT") {

        criterion.onchange = function () {
            SiftSearch(criterion);
        }
    }
});

function AddClickEventToSearchButtons(parentElement) {

    var siftButtons = parentElement.querySelectorAll(".sift-search");

    siftButtons.forEach(function (button) {

        button.onclick = function (event) {
            SiftSearch(button);
            event.preventDefault();
        }
    });

    // Allow implicit submit of form to fire the search (e.g. press enter in text field)
    var siftForms = parentElement.querySelectorAll("form.sift-criteria");
    siftForms.forEach(function (form) {

        form.onsubmit = function (event) {
            SiftSearch(form);
            event.preventDefault();
        }
    });
}

function SiftSearch(fromElement) {

    var siftDiv = fromElement.closest(".sift");

    if (siftDiv) {

        var startSearchFunction = siftDiv.getAttribute("data-sift-start-search");
        var endSearchFunction = siftDiv.getAttribute("data-sift-end-search");
        if (startSearchFunction && startSearchFunction.length > 0) {
            var continueSearch = eval(startSearchFunction);
            if (!continueSearch) {
                return;
            }
        }

        var documentType = siftDiv.getAttribute("data-sift-result-document-type");
        var rootId = siftDiv.getAttribute("data-sift-result-root");
        var partialView = siftDiv.getAttribute("data-sift-result-partial");
        var culture = siftDiv.getAttribute("data-sift-culture");
        var sortBy = siftDiv.getAttribute("data-sift-result-sort-by");
        var maxResults = siftDiv.getAttribute("data-sift-max-results") ?? 500;
        var resultsPerPage = siftDiv.getAttribute("data-sift-results-per-page") ?? 0;
        var pageNumber = fromElement.getAttribute("data-sift-results-page-number") ?? 0;
        var searcher = siftDiv.getAttribute("data-sift-searcher");

        var recordLevel = siftDiv.getAttribute("data-sift-remember-criteria") ?? "none";
        var storage;
        if (recordLevel == "local") {
            storage = localStorage;
        }
        else if (recordLevel == "session") {
            storage = sessionStorage;
        }

        if (storage) {
            var storageKey = "sift" + window.location.pathname + "/";
            var divId = siftDiv.getAttribute("id");
            if (divId) {
                storageKey += divId + "/";
            }
            storageKey += "sift-page-number";

            storage.setItem(storageKey, pageNumber);
        }

        var parameters = {
            DocumentType: documentType,
            RootId: rootId,
            PartialView: partialView,
            Culture: culture,
            SortBy: sortBy,
            MaxResults: maxResults,
            ResultsPerPage: resultsPerPage,
            PageNumber: pageNumber,
            Criteria: [],
            Searcher: searcher
        };

        var criteriaElements = siftDiv.querySelectorAll(".sift-criterion");
        criteriaElements.forEach(function (element) {

            var matchProperty = element.getAttribute("data-sift-match-property");

            if (matchProperty) {

                if (element.tagName == "SELECT" && element.hasAttribute("multiple")) {

                    PopulateMultiSelectCriteria(element, parameters, matchProperty, storage);
                }
                else if (element.tagName == "SELECT") {

                    if (storage) {
                        if (element.value && element.value.length > 0) {
                            storage.setItem("sift" + window.location.pathname + "/" + element.getAttribute("id"), element.value);
                        }
                        else {
                            storage.removeItem("sift" + window.location.pathname + "/" + element.getAttribute("id"));
                        }
                    }

                    var dateTimePart = element.getAttribute("data-sift-date-part");
                    if (!dateTimePart) {
                        dateTimePart = "date";
                    }

                    var dateTimeFormat = element.getAttribute("data-sift-date-format");

                    var criterion = {
                        MatchProperty: matchProperty,
                        Value: element.options[element.selectedIndex].value,
                        DateTimePart: dateTimePart,
                        DateTimeFormat: dateTimeFormat
                    };

                    parameters.Criteria.push(criterion);
                }
                else if (hasClass(element, "sift-checkboxes") || hasClass(element, "sift-radio-buttons")) {

                    PopulateMultiSelectCriteria(element, parameters, matchProperty, storage);
                }
                else {

                    if (storage) {
                        if (element.value && element.value.length > 0) {
                            storage.setItem("sift" + window.location.pathname + "/" + element.getAttribute("id"), element.value);
                        }
                        else {
                            storage.removeItem("sift" + window.location.pathname + "/" + element.getAttribute("id"));
                        }
                    }

                    var comparisonOperator = element.getAttribute("data-sift-comparison-operator");
                    if (!comparisonOperator) {
                        comparisonOperator = "EQ";
                    }

                    var dateTimePart = element.getAttribute("data-sift-date-part");
                    if (!dateTimePart) {
                        dateTimePart = "date";
                    }

                    var dateTimeFormat = element.getAttribute("data-sift-date-format");

                    var wildcard = false;
                    if (hasClass(element, "sift-wildcard")) {
                        wildcard = true;
                    }

                    var criterion = {
                        MatchProperty: matchProperty,
                        Value: element.value,
                        Wildcard: wildcard,
                        ComparisonOperator: comparisonOperator,
                        DateTimePart: dateTimePart,
                        DateTimeFormat: dateTimeFormat
                    };

                    parameters.Criteria.push(criterion);
                }
            }
        });

        PostRequest("/umbraco/sift/SiftSearch/Search", parameters, function (result) {

            if (result.xhttpStatus == 200) {

                var resultsDiv = siftDiv.querySelector(".sift-result");
                if (resultsDiv) {
                    resultsDiv.innerHTML = result.Results;
                    AddClickEventToSearchButtons(resultsDiv);
                }
            }

            if (endSearchFunction && endSearchFunction.length > 0) {
                eval(endSearchFunction);
            }
        });
    }
    else {
        console.error("Error in Sift search. Cannot find enclosing <div> with class 'sift'");
    }
}

function PopulateMultiSelectCriteria(element, parameters, matchProperty, storage) {

    var multiAll = hasClass(element, "sift-multi-all-selected") || hasClass(element, "sift-radio-buttons");     // Radio buttons have just one value

    var dateTimePart = element.getAttribute("data-sift-date-part");
    if (!dateTimePart) {
        dateTimePart = "date";
    }

    var dateTimeFormat = element.getAttribute("data-sift-date-format");

    var childElementTagName = "input";
    if (element.tagName == "SELECT") {
        childElementTagName = "option";
    }

    var values = [];

    var selectedOptions = element.querySelectorAll(childElementTagName + ":checked");
    selectedOptions.forEach(function (option) {

        if (multiAll) {

            // Match all of the options selected
            var criterion = {
                MatchProperty: matchProperty,
                Value: option.value,
                DateTimePart: dateTimePart,
                DateTimeFormat: dateTimeFormat
            };

            parameters.Criteria.push(criterion);
        }

        if (option.value && option.value.length > 0) {
            values.push(option.value);
        }
    });

    if (!multiAll) {

        // Match any of the options selected
        var criterion = {
            MatchProperty: matchProperty,
            Values: values,
            DateTimePart: dateTimePart
        };

        parameters.Criteria.push(criterion);
    }

    if (storage) {
        if (values.length > 0) {
            storage.setItem("sift" + window.location.pathname + "/" + element.getAttribute("id"), JSON.stringify(values));
        }
        else {
            storage.removeItem("sift" + window.location.pathname + "/" + element.getAttribute("id"));
        }
    }
}

// ********************************************
// Helper functions
// ********************************************
function PostRequest(url, requestObject, successFunction) {

    var tokenElement = document.querySelector('input[name="__RequestVerificationToken"]');
    if (!tokenElement) {
        console.error("Anti Forgery Token required on form. Please use @Html.AntiForgeryToken()");
        return;
    }

    var token = tokenElement.value;

    var requestBody = JSON.stringify(requestObject);

    var xhttp = GetRequestObject();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4) {

            var result = {};

            if (this.status == 200) {

                result = JSON.parse(this.responseText);
                result.xhttpStatus = this.status;
            }
            else {

                result = {
                    xhttpStatus: this.status
                };

                console.error("Error in post request.")
                console.error("Url: " + url);
                console.error("Request Body: " + requestBody);
                console.error("Status: " + this.status);
                console.error("Ready State: " + this.readyState);
                console.error("Ready State Change Object:")
                console.error(this);
            }

            successFunction(result);
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("__RequestVerificationToken", token);

    xhttp.send(requestBody);
}

function GetRequestObject() {

    if (window.XMLHttpRequest) {
        // code for modern browsers
        return new XMLHttpRequest();
    } else {
        // code for old IE browsers
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function hasClass(element, className) {

    var hasClass = false;

    var spacedClassName = " " + className + " ";
    if ((" " + element.className + " ").replace(/[\n\t\r\f]/g, " ").indexOf(spacedClassName) >= 0) {

        hasClass = true;
    }

    return hasClass;
}