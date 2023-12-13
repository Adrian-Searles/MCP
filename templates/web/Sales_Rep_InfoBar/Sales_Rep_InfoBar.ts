export class StyleField {
    label: string;
    className: string;
}

export class InfobarWithUserAttrAndCTATemplate implements CampaignTemplateComponent {

    @subtitle("Define infobar background & text styling.")
    @options([
        { label: "Light on Dark", className: "evg-light-on-dark" },
        { label: "Dark on Light", className: "evg-dark-on-light" }
    ])
    style: StyleField = { label: "Light on Dark", className: "evg-light-on-dark" };

    @title("Pre-Attribute Message Text")
    @subtitle("Optional text field")
    preAttrMessageText: string = "Contact your sales rep today!";

    @title("OwnerName Attribute")
    @subtitle("OwnerName to display")
    ownerNameAttrDefault: string = " ";

    @title("OwnerEmail Attribute")
    @subtitle("OwnerEmail to display")
    ownerEmailAttrDefault: string = "- john.doe@gmail.com ";

    @title("OwnerPhone Attribute")
    @subtitle("OwnerPhone to display")
    ownerPhoneAttrDefault: string = " 555-555-5555 ";

    run(context: CampaignComponentContext) {
        const ownerNameAttr = context?.user?.attributes?.OwnerName as Attribute;
        const ownerEmailAttr = context?.user?.attributes?.OwnerEmail as Attribute;
        const ownerPhoneAttr = context?.user?.attributes?.OwnerPhone as Attribute;
        const ownerName = ownerNameAttr?.value;
        const ownerEmail = ownerEmailAttr?.value;
        const ownerPhone = ownerPhoneAttr?.value;

        
        // Check if ownerName is empty or undefined, and update preAttrMessageText accordingly
        const updatedPreAttrMessageText = ownerName ? this.preAttrMessageText : "Contact Customer Service Today!";
        const updatedownerPhone = ownerPhone ? ` - ${ownerPhone} - ` : this.ownerPhoneAttrDefault;
        const updatedownerName = ownerName ? ` ${ownerName}` : this.ownerNameAttrDefault;

        return {
            ownerAttr: updatedownerName || this.ownerNameAttrDefault,
            phone: updatedownerPhone || this.ownerPhoneAttrDefault ,
            email: ownerEmail || this.ownerEmailAttrDefault,
            preAttrMessageText: updatedPreAttrMessageText


        };
    }

}
