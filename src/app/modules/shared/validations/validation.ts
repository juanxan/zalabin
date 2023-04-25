export const Expressions = {
    // eslint-disable-next-line no-useless-escape
    phone: '/[^0-9\+]/',
    phones: '/^[0-9]{1,15}$/',
    email: new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')
};