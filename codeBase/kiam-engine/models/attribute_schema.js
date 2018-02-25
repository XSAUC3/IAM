const mongoose = require('mongoose');
const config = require('../../server/config/database');

//Attribute Schema
const AttributeSchema = mongoose.Schema({
    Name: {
        type: String,
        maxlength: 20,
        unique: true,
        required: true 
    },
    Type: {
        type: String,
        maxlength: 10,
        required: true,
        validate: [ TypeValidator, 'Type Must Be Either Fixed or Dynamic'] 
    },
    DataType: {
        type: String,
        maxlength: 10,
        required: true,
        validate: [ DataTypeValidator, 'DataType Must Be String, Boolean or Date'] 
    },
    Description: {
        type: String,
        maxlength: 100
    },
    Application_Id: {
        type: String,
        required: true
    },
    Single_Multiple: {
        type: String,
        maxlength: 10,
        required: true,
        validate: [ Single_MultipleValidator, 'Single_Multiple Must Be Either Single or Multiple'] 
    }
});

const attributes = module.exports = mongoose.model('attributes',AttributeSchema);

module.exports.addAttribute = function(newAttribute,callback){
    newAttribute.save(callback);
}

function TypeValidator(value){
    if((value == "Fixed") || (value == "Dynamic")){
        return true;
    } else {
        return false;
    }
}

function DataTypeValidator(value){
    if((value == 'String') || (value == 'Boolean') || (value == 'Date')){
        return true;
    } else {
        return false;
    }
}

function Single_MultipleValidator(value){
    if((value == 'Single') || (value == 'Multiple')){
        return true;
    } else {
        return false;
    }
}
