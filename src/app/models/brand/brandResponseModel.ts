import { ResponseModel } from "../responseModel";
import { Brand } from "./brand";

export interface BrandResponeModel extends ResponseModel{
    data:Brand[];
    
}