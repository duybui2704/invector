import Languages from '../common/languages';
import Validate from './Validate';

const validateEmoji = (username: string) => {
    return /!(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
        username
    );
};
const validateSpecialCharacters = (username: string) => {
    const reg = /^[a-zA-Z- ]+$/;
    return reg.test(removeAscent(username));
};
const validateNumber = (username: string) => {
    const reg = /^([^0-9]*)$/;
    return reg.test(username);
};
const validatePhone = (username: string) => {
    const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return reg.test(username);
};
const validateEmail = (email: string) => {
    return email.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    );
};
function removeAscent (str: string ) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}

function userNameValidate(userName: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(userName)) {
        errMsg = Languages.errorMsg.userNameRequired;
    } else if (userName.length < 8) {
        errMsg = Languages.errorMsg.userNameLength;
    } else if (!validateEmoji(userName) && !validateNumber(userName)) {
        errMsg = Languages.errorMsg.userNameRegex;
    } else if (!validateSpecialCharacters(userName)) {
        errMsg = Languages.errorMsg.userNameRegex;
    }
    return errMsg;
}
function emailValidate(email: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(email)) {
        errMsg = Languages.errorMsg.emailNull;
    } else if (!validateEmail(email)) {
        errMsg = Languages.errorMsg.emailRegex;
    }
    return errMsg;
}
function cardValidate(card: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(card)) {
        errMsg = Languages.errorMsg.cardNull;
    } else if (Number(card.length) !== 9 && card.length !== 12) {
        errMsg = Languages.errorMsg.cardCheck;
    } else if (validateNumber(card)) {
        errMsg = Languages.errorMsg.cardRegex;
    }
    return errMsg;
}

function passValidate(pwd: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(pwd)) {
        errMsg = Languages.errorMsg.pwdNull;
    } else if (pwd.length < 8) {
        errMsg = Languages.errorMsg.pwdCheck;
    }
    return errMsg;
}
function passConFirmValidate(pwd: string, conFirmPwd: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(conFirmPwd)) {
        errMsg = Languages.errorMsg.pwdNull;
    } else if (pwd !== conFirmPwd) {
        errMsg = Languages.errorMsg.conFirmPwd;
    }
    return errMsg;
}
function passConFirmPhone(phone: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(phone)) {
        errMsg = Languages.errorMsg.phoneIsEmpty;
    } else if (!validatePhone(phone)) {
        errMsg = Languages.errorMsg.phoneRegex;
    } else if (phone.length < 10 || phone.length > 10) {
        errMsg = Languages.errorMsg.phoneCount;
    }
    return errMsg;
}
function inputNameEmpty (value: any, errEmpty: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(value)) {
        errMsg = errEmpty;
    }
    return errMsg;
}
export default {
    userNameValidate,
    emailValidate,
    cardValidate,
    passValidate,
    passConFirmValidate,
    passConFirmPhone,
    inputNameEmpty
};
