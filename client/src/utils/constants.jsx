export const ACCESS_TOKEN = 'accessToken'
export const GUEST_TOKEN = 'guestToken'
export const USER_ID = 'user_id'
export const MOBILE_NO = 'mobile_no'
export const COUNTRY_CODE = 'country_code'
export const FBM_USER_ID = 'fbmUserId'
export const URL_REGEX = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i');

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
export const RECENT_SEARCH = 'recent_search'