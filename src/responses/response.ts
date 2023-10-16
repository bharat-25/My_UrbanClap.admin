
export const LOGIN_ERROR={
    NOT_EXIST:'ADMIN NOT FOUND',
    NOT_MATCH:'WRONG PASSWORD',
    NOT_VERIFY:'NOT VERIFIED!, PLS VERIFY..',
    UNAUTHORIZED:'YOU ARE NOT AUTHORIZED TO DO THIS TASK'

}

export const RESPONSE_CODES = {
    CREATED: 201,
    SUCCESS: 200,
    BADREQUEST: 400,
    UNAUTHORIZED:401,
    NOTFOUND:404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    
};

export const RESPONSE_MESSAGES = {
    INTERNAL_SERVER_ERROR: 'INTERNAL SERVER ERROR',
    CREATED:'USER_CREATED_SUCCESSFULLY',
    SERVICE_ALREADY_EXIST: 'SERVICE WITH THE SAME CATEGORY_ID ALREADY EXISTS',
    SERVICE_ADDED: 'SERVICE ADDED SUCCESSFULLY',
    SHOW_ALL_SERVICES: 'ALL SERVICES GETTED',
    BAD_REQUEST: 'BAD REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    IS_ADMIN: 'ACCESS DENIED',
    ACCESS_DENIED: 'YOU ARE NOT ADMIN',
    NOT_FOUND:'TOKEN NOT FOUND',
    ALREADY_EXIST:'ALREADY EXIST',
    OFFER_CREATED:'OFFER SUCCESSFULLY CREATED',
    OFFER_DELETE:'OFFER DELETE SUCCESSFULLY',
    GET_OFFER:'ALL OFFER',
    RESULT:'ALL RESULT SHOW',
    EMAIL_SEND:'EMAIL SEND SUCCESSFULLY',
    USER_VERIFY:'USER VERIFY SUCCESSFULLY',
    SUCCESS:'USER_LOGIN_SUCCESSFULLY'
};

export const SERVICE_MSG={
    ISEXIST:'WITH THIS CATEGORY_ID,THE SERVICE ALREADY EXIST',
    CREATED:'SERVICE SUCCESSFULLY ADDED IN THE DATABASE'
}

export const SERVICE_MSG_CODE={
    ISEXIST:1
}