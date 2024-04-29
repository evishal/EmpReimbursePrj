//Just like a java model class, our React interface typically MODEL some data/data type we intend to use
export interface UserInterface{
    userID?:number, //optional
    userName :string, //mandatory userNAme
    userPass?: string //optional password
    fname?: string //optional firstName
    lname?: string //optional lastName
    role?: string //optional Role liek manager or employee
}