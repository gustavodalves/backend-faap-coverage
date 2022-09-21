/* eslint-disable no-useless-escape */
interface PatternsType {
    [key: string]: RegExp
}

const patterns: PatternsType = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[(){}\[\]\+\-\=_.,:;?!@#\$%\^&\*]).{8,}$/,
};

export default patterns;
