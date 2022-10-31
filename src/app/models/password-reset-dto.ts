export interface PasswordResetDto{
    userId:number;
    code:string;
    newPassword:string;
}