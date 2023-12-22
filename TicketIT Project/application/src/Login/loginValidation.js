function Validation(values){
    let error = {}

    if(values.Username === ""){
        error.Username = "Username is Required";
    } else {
        error.Username = ""
    }

    if(values.Pass === ''){
        error.Pass = " Password is Required";
    } else {
        error.Pass = "";
    }
    return error
}

export default Validation;