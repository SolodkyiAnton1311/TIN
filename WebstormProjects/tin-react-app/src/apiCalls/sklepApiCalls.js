import {sklepDetailList, sklepList} from "./sklepApiMockData";

export function getSklepApiCalls()
{
    return sklepList;
}

export function getSklepByIdApiCall(sklepId)
{
    const sklep = sklepDetailList.find(sklep => sklep._id === sklepId)
    return sklep;
}