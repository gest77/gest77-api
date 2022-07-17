import { number } from "yup";
import { notifHelloAssoLogger } from "../toolsServices/LoggerService";

export type EventType = "Order" | "Payment" | "Form";

//#region order type
export type Payer = {
    dateOfBirth?: string; //($date-time)
    email?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    company?: string;
    firstName?: string;
    lastName?: string;
};

export type User = {
    firstName?: string;
    lastName?: string;
};

export const PriceCategory = ["Free", "Pwyw", "Fixed"] as const;
export type PriceCategory = typeof PriceCategory[number];

export type ItemDiscount = { code: string; amount: number };
export const FieldTypestring = ["Date", "TextInput", "FreeText", "ChoiceList", "File", "YesNo", "Phone", "Zipcode", "Number"] as const;
export type FieldTypestring = typeof FieldTypestring[number];

export type ItemCustomField = {
    name?: string;
    type?: FieldTypestring;
    answer?: string;
};

export type ItemOption = {
    name?: string;
    amount?: number;
    priceCategory?: PriceCategory;
    isRequired?: boolean;
    customFields?: Array<ItemCustomField>;
};

export const TierType = [
    "Donation",
    "Payment",
    "Registration",
    "Membership",
    "MonthlyDonation",
    "MonthlyPayment",
    "OfflineDonation",
    "Contribution",
    "Bonus",
    "Product",
] as const;
export type TierType = typeof TierType[number];

export const ItemState = ["Processed", "Registered", "Unknown", "Canceled"] as const;
export type ItemState = typeof ItemState[number];

export type ShareItem = {
    id?: number;
    shareAmount?: number;
    shareItemAmount?: number;
    shareOptionsAmount?: number;
};

export type SharedPayment = {
    id?: number;
    shareAmount?: number;
};

export const PaymentCashOutState = [
    "MoneyIn",
    "CantTransferReceiverFull",
    "Transfered",
    "Refunded",
    "Refunding",
    "WaitingForCashOutConfirmation",
    "CashedOut",
    "Unknown",
    "Contested",
    "TransferInProgress",
] as const;
export type PaymentCashOutState = typeof PaymentCashOutState[number];

export const PaymentMeans = ["None", "Card", "Sepa", "Check"] as const;
export type PaymentMeans = typeof PaymentMeans[number];

export const PaymentState = ["Pending", "Authorized", "Refused", "Unknown", "Registered", "Refunded", "Refunding", "Contested"] as const;
export type PaymentState = typeof PaymentState[number];

export const PaymentType = ["Offline", "Credit", "Debit"] as const;
export type PaymentType = typeof PaymentType[number];

export const PaymentOffLineMeansModel = ["Cash", "Check", "BankTransfer"] as const;
export type PaymentOffLineMeansModel = typeof PaymentOffLineMeansModel[number];

export type OrderAmountModel = {
    total?: number;
    vat?: number;
    discount?: number;
};

export const FormType = ["CrowdFunding", "Membership", "Event", "Donation", "PaymentForm", "Checkout", "Shop"] as const;
export type FormType = typeof FormType[number];

export type MetaModel = {
    createdAt?: string;
    updatedAt?: string;
};
export type OrderItem = {
    payments?: Array<SharedPayment>;
    name?: string;
    user?: User;
    priceCategory?: PriceCategory;
    minAmount?: number;
    discount?: ItemDiscount;
    customFields?: Array<ItemCustomField>;
    options?: Array<ItemOption>;
    ticketUrl?: string;
    membershipCardUrl?: string;
    dayOfLevy?: number;
    tierDescription?: string;
    id?: number;
    amount?: number;
    type?: TierType;
    initialAmount?: number;
    state?: ItemState;
};
export type OrderPayment = {
    items?: Array<ShareItem>;
    cashoutDate?: string;
    cashoutState?: PaymentCashOutState;
    paymentReceiptUrl?: string;
    fiscalReceiptUrl?: string;
    id?: number;
    amount?: number;
    amountTip?: number;
    date?: string;
    paymentMeans?: PaymentMeans;
    state?: PaymentState;
    type?: PaymentType;
    meta?: MetaModel;
    paymentOffLineMean?: PaymentOffLineMeansModel;
};

export type OrderDetail = {
    payer?: Payer;
    metadata?: any;
    items?: Array<OrderItem>;
    payments?: Array<OrderPayment>;
    amount?: OrderAmountModel;
    id?: number;
    date?: string;
    formSlug?: string;
    formType?: FormType;
    organisationName?: string;
    organizationSlug?: string;
    meta?: MetaModel;
};
// #endregion

//#region PaymentDetail
export type PaymentItem = {
    shareAmount?: number;
    shareItemAmount?: number;
    shareOptionsAmount?: number;
    id?: number;
    amount?: number;
    initialAMount?: number;
    state?: ItemState;
};

export type OrderLight = {
    id?: number;
    date?: string;
    formSlug?: string;
    formType?: FormType;
    organizationName?: string;
    organizationSlug?: string;
    meta?: MetaModel;
};

export type PaymentDetail = {
    payer?: Payer;
    order?: OrderLight;
    items?: Array<PaymentItem>;
    cashoutDate?: string;
    cashoutState?: PaymentCashOutState;
    paymentReceiptUrl?: string;
    fiscalReceiptUrl?: string;
    id?: number;
    amout?: number;
    amountTip?: number;
    date?: string;
    paymentMeans?: PaymentMeans;
    state?: PaymentState;
    type?: PaymentType;
    meta?: MetaModel;
    paymentOfflineMean?: PaymentOffLineMeansModel;
};

//#endregion

//#region form model
export const ValidityType = ["MovingYear", "Custom", "Illimited"] as const;
export type ValidityType = typeof ValidityType[number];
export const FormState = ["Public", "Private", "Draft", "Disabled"] as const;
export type FormState = typeof FormState[number];

export type DocumentModel = { fileName: string; publicUrl: string };

export const PaymentFrequencyType = ["Single", "Installment", "Monthly"] as const;
export type PaymentFrequencyType = typeof PaymentFrequencyType[number];

export type TierPublicModel = {
    id: number;
    label: string;
    description: string;
    tierType: TierType;
    price: number;
    vatRate: number;
    minAmount: number;
    paymentFrequency: PaymentFrequencyType;
    maxPerUser: number;
    meta: MetaModel;
    saleStartDate: string;
    saleEndDate: string;
    isElligibleTaxReceipt: boolean;
    terms: { date: string; amount: number };
    picture: DocumentModel;
};

export type PlaceModel = {
    address: string;
    name: string;
    city: string;
    zipCode: string;
    country: string;
    geoLocation: {
        latitude: number;
        longitude: number;
    };
};
export type FormPublicModel = {
    organizationLogo: string;
    organizationName: string;
    tiers: Array<TierPublicModel>;
    activityTypeId: number;
    place: PlaceModel;

    saleEndDate: string;
    saleStatDate: string;
    validityType: ValidityType;
    banner: DocumentModel;
    currency: string;
    description: string;
    startDate: string;
    endDate: string;
    logo: DocumentModel;
    meta: MetaModel;
    state: FormState;

    title: string;
    privateTitle: string;
    widgetButtonUrl: string;
    widgetFullUrl: string;
    widgetVignetteHorizontalUrl: string;
    widgetVignetteVerticalUrl: string;
    formSlug: string;
    formType: FormType;
    url: string;
    organizationSlug: string;
};

//#endregion

export type NotificationEvent = {
    eventType?: EventType;
    data?: FormPublicModel | OrderDetail | PaymentDetail;
};

export const manageRedirect = async (notif: NotificationEvent): Promise<void> => {
    let data;
    switch (notif.eventType) {
        case "Form":
            data = notif.data as FormPublicModel;
            break;
        case "Order":
            data = notif.data as OrderDetail;
            break;
        case "Payment":
            data = notif.data as PaymentDetail;
            break;
    }

    notifHelloAssoLogger.log("service : " + JSON.stringify(data, null, 2));

    return;
};

const payementExample: PaymentDetail = {
    payer: {
        dateOfBirth: "06/12/1978",
        email: "rom@gmail.com",
        address: "56 rue théodore honoré",
        city: "Nogent sur marne",
        zipCode: "94130",
        country: "France",
        company: "",
        firstName: "Romain",
        lastName: "TAILLANDIER",
    },
    order: {
        id: 123,
        date: "10/10/2022",
        formSlug: "FuckingSlug",
        formType: "Membership",
        organizationName: "GEST",
        organizationSlug: "gest",
        meta: undefined,
    },
    items: [
        {
            shareAmount: 123,
            shareItemAmount: 123,
            shareOptionsAmount: 123,
            id: 123,
            amount: 123,
            initialAMount: 123,
            state: "Processed",
        },
    ],
    cashoutDate: "10/10/2022",
    cashoutState: "Unknown",
    paymentReceiptUrl: "http://somewhere.com",
    fiscalReceiptUrl: "http://somewhere.com",
    id: 123,
    amout: 123,
    amountTip: 123,
    date: "10/10/2022",
    paymentMeans: "Card",
    state: "Authorized",
    type: "Credit",
    meta: undefined,
    paymentOfflineMean: undefined,
};
