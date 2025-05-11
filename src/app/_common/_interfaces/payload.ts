import { IPayloadMessage } from "./payloadMessage";

export interface IPayload<T> {
    data: T | null;
    success?: string;
    message: IPayloadMessage;
}