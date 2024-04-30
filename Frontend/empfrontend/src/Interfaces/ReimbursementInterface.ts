export interface ReimbInterface {
    description?: string,
    reimbid: number,
    amount: number,
    status?:string,    
    userID?:number // when we are storing new reimbursement, we don't need userID and hence it is optional here    
}