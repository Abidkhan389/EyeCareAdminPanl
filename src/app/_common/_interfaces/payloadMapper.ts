import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { MessageTypes } from "../constant";
import { IPayload } from "./payload";

export class PayloadMapper {

    private fromError<T>(o: Error): IPayload<T> {
      return {
        data: null,
        message: {
          messageTypeId: MessageTypes.error,
          text: o.message,
          title: o.name
        }
      };
    }
  
    private fromHttpError<T>(o: any): IPayload<T> {
      let data: T | null = null;
  
      if (o && isPayLoadResponse(o)) {
        const response = this.fromResponse<T>(o);
        data = response.data;
      }
  
      return {
        data,
        message: {
          messageTypeId: MessageTypes.error,
          text: o.message ?? 'Unknown error',
          title: 'Code: ' + (o.name ?? 'N/A')
        }
      };
    }
  
    private fromResponse<T>(o: any): IPayload<T> {

        let value: IPayload<T>;
      
        if (isPayload<T>(o)) {
          // Agar payload valid hai, directly return karo
          value = o;
        } else {
          // Agar payload valid nahi hai, to `data` ko handle karte hain
          value = {
            data: o as T || null, // Agar data null hai toh, explicitly null set karo
            message: {
              messageTypeId: MessageTypes.success,
              text: 'Operation Successful' // Default message agar text null ho toh
            }
          };
        }
      
        return value;
      }
      
  
    public fromObject<T>(o: any): IPayload<T> | null {
      if (isHttpError(o)) {
        return this.fromHttpError<T>(o);
      }
  
      if (o instanceof Error) {
        return this.fromError<T>(o);
      }
  
      if (isPayLoadResponse(o)) {
        return this.fromResponse<T>(o);
      }
  
      return null;
    }
  }
function isPayLoadResponse(o: HttpResponse<any>): o is HttpResponse<any> {
    let obj= o instanceof Object && 'data' in o && 'message' in o;
  //  let obj= o instanceof Object && 'data' in o && 'config' in o && 'status' in o && 'statusText' in o && 'headers' in o;
    return obj;
}

function isHttpError(o: any): o is HttpErrorResponse {
    return o instanceof Object && o instanceof Error && 'config' in o;
}

function isPayload<T>(o: any): o is IPayload<T> {
    return o instanceof Object && 'data' in o && 'message' in o;
}