import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = 'https://localhost:44342/api/cards/';

  constructor(private httpClient:HttpClient) { }

  getAllCards():Observable<ListResponseModel<Card>>{let newPath=this.apiUrl+"getall";       return this.httpClient.get<ListResponseModel<Card>>(newPath);}

  addCard(card:Card):Observable<ResponseModel>    {let newPath=this.apiUrl+"addcard";       return this.httpClient.post<ResponseModel>(newPath,card);}

  updateCard(card:Card):Observable<ResponseModel> {let newPath=this.apiUrl+"updatecard";    return this.httpClient.post<ResponseModel>(newPath,card);}

  deleteCard(card:Card):Observable<ResponseModel> {let newPath=this.apiUrl+"deletecard";    return this.httpClient.post<ResponseModel>(newPath,card);}

  getCardsByCustomerId(customerId:number):Observable<ListResponseModel<Card>>{let newPath=this.apiUrl+"getcardsbycustomerid?customerid="+customerId;
  return this.httpClient.get<ListResponseModel<Card>>(newPath);}

  getCardById(cardId:number):Observable<SingleResponseModel<Card>>{let newPath=this.apiUrl+"getcardbyid?cardid="+cardId; return this.httpClient.get<SingleResponseModel<Card>>(newPath);}

  

}
