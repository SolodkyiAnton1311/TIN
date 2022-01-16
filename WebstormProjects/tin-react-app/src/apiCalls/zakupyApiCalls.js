import {ZakupyList,ZakupyDetails} from './zakupyApiMockData'

export function getZakupyApiCall()
{
    return ZakupyList;
}

export function getZakupyByIdApiCall(zakupyId)
{
    const zak = ZakupyDetails.find(zakupy => zakupy._id === zakupyId)
    return zak;
}
