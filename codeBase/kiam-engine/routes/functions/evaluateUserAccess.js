
//#region FUNCTIONS FOR CREATING RESPONSE OBJECT AND EVALUATING USER ACCESS

module.exports.evaluateConstraintForPolicy = (policy, environmentAttributes) => {
    //RETURN TRUE or FALSE BASED on Constraint
    // CHINMAY
}

module.exports.evaluatePolicy = (resource, resourceAction, policy) => {
    // RETURN TRUE or FALSE
    // CHINMAY
}

module.exports.addToResponseObject = (responseObject, environmentAttributes) => {
    // ADD 
    // Vrushank
    /*environmentAttributes.forEach(attribute => {
        let KeyArray = Object.keys(attribute);
        let key = KeyArray[0];
        responseObject[key] = attribute[key];
    });

    return responseObject;*/
}

//#endregion
