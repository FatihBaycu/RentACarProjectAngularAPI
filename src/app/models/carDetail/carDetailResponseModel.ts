import { ResponseModel } from "../responseModel";
import { CarDetail } from "./carDetail";

export interface CarDetailResponeModel extends ResponseModel{
    data:CarDetail[];
    
}