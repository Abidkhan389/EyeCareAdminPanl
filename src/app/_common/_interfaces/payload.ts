import { IPayloadMessage } from "./payloadMessage";

export interface IPayload<T> {
    data: T | null;
    success?:boolean;
    message: IPayloadMessage;
}