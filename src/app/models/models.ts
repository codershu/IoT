export interface container{
    name: string;
    uri: string;
    updatedOn: Date;
}

export interface blob{
    name: string;
    uri: string;
    updatedOn: Date;
    container: string;
}