const messages = require("../messages");
const  {exceptions} = require("../core");
const bcrypt = require("bcrypt");


/**
 * Validation on params
 * ``` js
 * appUtils.validator({
 *  container: params, 
 *  fields: [
 *    { key: 'key_name', trimmed: true, type: 'data_type' }
 *  ],
 *  return: false, //If false it will throw error otherwise return validator boolean
 * })
 * ```
 * @param obj Object contain validation rules
 */
const validator = function(obj){
  obj = {
    container: obj.container || {},
    return: obj.return || false,
    fields: obj.fields || []
  };
  let isValid = true;
  let message = "";

  for( field of obj.fields ){
      
    let value = obj.container[field.key];
    isUndefined = (value == undefined);

    //should be required
    if( (field.required || field.trimmed) && value == undefined ){
      isValid = false;
      message = messages.missingKey.replace("{key}",field.key);
      break;
    }

    //should be trimmed
    if( !isUndefined && field.trimmed && String(value).trim() == ""){
      isValid = false;
      message = messages.invalidValue.replace("{key}",field.key);
      break;
    }

    //should be integer id
    if( !isUndefined && field.type == 'id' && ( parseInt(value) != value || value == '0' ) ){
      isValid = false;
      message = messages.invalidIntegerValue.replace("{key}",field.key);
      break;
    }

    //should be valid email
    if( !isUndefined && field.type == 'email' && !String(value).match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ){
      isValid = false;
      message = messages.invalidValue.replace("{key}",field.key);
      break;
    }

    //should be integer or float
    if( !isUndefined && field.type == 'number' && !String(value).match(/^-?\d*(\.\d+)?$/) ){
      isValid = false;
      message = messages.invalidValue.replace("{key}",field.key);
      break;
    }
    //should be in the given range
    if(!isUndefined && field.type == 'between' && !(value >= field.range[0] && value <= field.range[1]) ){
      isValid = false;
      message = messages.invalidValue.replace("{key}",field.key);
      break;
    }
   
  }
  
  if(obj.return){
    return isValid;

  }else if(!isValid){
    throw  exceptions.badRequestError(message);
  }
}

const encryptPassword = (pass) => {
  if (pass) {
    var hash = bcrypt.hashSync(pass, 10);
    return hash;
  }
}

const decryptPassword = (pass, hash) => {
  if (pass && hash) {
    return bcrypt.compareSync(pass, hash);
  }
  else {
    return false;
  }
}

const isValidDate  = (dateString) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}
  module.exports = {
      validator,
      encryptPassword,
      decryptPassword,
      isValidDate
  }