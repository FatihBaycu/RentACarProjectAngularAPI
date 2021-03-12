import { ResponseModel } from "../responseModel";
import { Color } from "./color";


export interface ColorResponeModel extends ResponseModel{
    data:Color[];
    
}