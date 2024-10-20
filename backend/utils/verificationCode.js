export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getExpire = ()=>  Date.now() + 24*60*60*1000
