
export interface Category {
    CatId?: number;
    CatCode: string;
    CatDesc: string;
    CatActive: boolean;
}

export interface CategoryDetails {
    CDId?: number;
    CDCatCode: string;
    CDFieldLabel: string;
    CDFieldType: string;
    CDFieldActive: boolean;
}

export interface KeyValueHeader {
    KVId?: number;
    KVDocName: string;
    KVCatCode: string;
    KVCatDesc: string;
    KVSearchTags: string;
    details: KeyValueDetails[]; // Its in interface and not in the table. Used like JSON object for code purpose
}

export interface KeyValueDetails {
    KVDId?: number;
    KVDKVId: number;
    KVDCatFieldName: string;
    KVDCatFieldType: string;
    KVDFieldValue: string;
}
