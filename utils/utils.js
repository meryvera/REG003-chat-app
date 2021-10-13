const isValidEmail = (email) => {
    const regExpEmail = /^[^@]+@[^@]+\\.[a-zA-Z]{2,}$/;
    return regExpEmail.test(email);
};

module.exports ={
    isValidEmail
}
