import {klientList,klientDetailList} from "./klientApiMockData";

export function getKlientApiCall()
{
    return klientList;
}

export function getKlientByIdApiCall(klientId)
{
   const klient = klientDetailList.find(klient => klient._id === klientId)
    return klient;
}