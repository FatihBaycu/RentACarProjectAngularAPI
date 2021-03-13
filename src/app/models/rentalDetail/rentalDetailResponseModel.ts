import { ResponseModel } from "../responseModel";
import { RentalDetail } from "./rentalDetail";

export interface RentalDetailResponseModel extends ResponseModel{
    data:RentalDetail[];
    
}