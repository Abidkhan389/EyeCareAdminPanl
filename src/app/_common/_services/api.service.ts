import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Helpers } from '../_helper/app_helper';
import { MessageTypes } from '../constant';
import { IPayload } from '../_interfaces/payload';
import { PayloadMapper } from '../_interfaces/payloadMapper';
import { showErrorMessage, showSuccessMessage } from '../messages';

export interface IBaseService {
  service: <T>(cb: Observable<{}>) => Observable<any>;
  get: <T>(endPoint: string, params?: any) => Observable<any>;
  post: <T>(endPoint: string, model?: any) => Observable<any>;
}
interface IProcessPayloadOptions<T> {
  messageTypeIds?: string[];
}
@Injectable({
  providedIn: 'root'
})
export abstract class ApiService implements IBaseService {

  constructor(protected httpClient: HttpClient) { }


  // processPayload<T>(payload: IPayload<T>, messageTypeIds?: string[]) {
  //   const message = payload.message;
  //    //messageTypeIds = messageTypeIds || [MessageTypes.error, MessageTypes.failure];
  //   // const messageTypeId = messageTypeIds.find(o => o === message.messageTypeId);
  //   if (payload.success) {
     
  //    return (payload);
  //   } else {
  //      return (payload);
  //   }
  // }
  processPayload<T>(payload: IPayload<T>): T {
  if (payload.success) {
    showSuccessMessage(payload.message);
    return payload.data!;  // ✅ sirf actual data return karo
  } else {
    showErrorMessage(payload.message);
    throw new Error(typeof payload.message === 'string' ? payload.message : JSON.stringify(payload.message)); // optional but recommended
  }
}

  service<T>(cb: Observable<{}>): Observable<IPayload<T>> {
    const onFulfilled = (value: any) => new PayloadMapper().fromObject<T>(value) as IPayload<T>;
    const onRejection = (reason: any) => new PayloadMapper().fromObject<T>(reason) as IPayload<T>;
  
    return cb.pipe(map(onFulfilled, onRejection));
  }
  
  

  /**
* POST request
* @param {string} endPoint end point of the api
* @param {Object} params body of the request.
* @param {IRequestOptions} options options of the request like headers, body, etc.
* @returns {Observable<T>}
*/
  post<T>(endPoint:any, model?:any): Observable<T> {
    if (model)
      model = Helpers.trimObject(model);
    return this.httpClient.post<T>(endPoint, model)
  }

  /**
* GET request
* @param {string} endPoint it doesn't need / in front of the end point
* @param {IRequestOptions} options options of the request like headers, body, etc.
* @returns {Observable<T>}
*/
  get<T>(endPoint:any, params?:any): Observable<T> {
    if (params)
      return this.httpClient.get<T>(endPoint, { params: params })
    else
      return this.httpClient.get<T>(endPoint)
  }

  /**
   * Central handler for list payloads
   * Shows error message automatically if success = false
   */
  protected handleListPayload<T>(payload: IPayload<T[]>): T[] {
    if (payload.success) {
      return payload.data ?? [];
    } else {
      showErrorMessage(payload.message);
      return [];
    }
  }
  
}