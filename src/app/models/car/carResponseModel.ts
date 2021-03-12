import { ResponseModel } from "../responseModel";
import { Car } from "./car";

export interface CarResponeModel extends ResponseModel{
    data:Car[];
    
}