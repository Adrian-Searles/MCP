(function() {

    /**
     * @function setInfobarPosition
     * @param {Object} context
     * @description Sets the position of the infobar via class assignments, based on content zone selected.
     */
    function setInfobarPosition(context,headerElement) {
        if (context.infobarClass === "evg-infobar-top") {
            SalesforceInteractions.cashDom(headerElement).css({ "margin-bottom": "0"});
        } 
    }

    /**
     * @function setDismissal
     * @param {Object} context
     * @description Adds click listener to the "X" button that removes the template from the DOM.
     */
    function setDismissal(context, headerElement) {
        SalesforceInteractions.cashDom(`#evg-infobar-with-user-attr.${context.infobarClass} .evg-btn-dismissal`).on("click", () => {
            SalesforceInteractions.cashDom(`#evg-infobar-with-user-attr.${context.infobarClass}`).remove();
            SalesforceInteractions.cashDom(headerElement).css({ "margin-top": "0", "margin-bottom": "0" });
        });
    }

    function apply(context, template) {
        if (!context.contentZone) return;

        context.infobarClass = context.contentZone == "global_infobar_top_of_page"
            ? "evg-infobar-top"
            : "evg-infobar-bottom";

        if (SalesforceInteractions.cashDom(`#evg-infobar-with-user-attr.${context.infobarClass}`).length > 0) return;

        const { preAttrMessageText, ownerAttr, phone, email } = context;
        context.messageText = `${preAttrMessageText}${ownerAttr}${phone}${email}`;
        var headerElement = document.querySelector('.header');

        setInfobarPosition(context,headerElement);
        const html = template(context);
        SalesforceInteractions.cashDom(headerElement).append(html);
        setDismissal(context);
    }

    function reset(context, template, headerElement) {
        SalesforceInteractions.cashDom(`#evg-infobar-with-user-attr.${context.infobarClass}`).remove();
        SalesforceInteractions.cashDom(headerElement).css({ "margin-top": "0", "margin-bottom": "0" });
    }

    function control(context) {
        return new Promise(resolve => { if (context.contentZone) resolve(); });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();
