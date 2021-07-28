module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "eslint:recommended",
        // "plugin:react/recommended",
        "react-app",
        // "react-app/jest",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        // "react",
        "react-hooks",
    ],
    "rules": {
        // 规则制定 0:close 1:warn 2:error
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1,
        "react/react-in-jsx-scope": 0,
        "eqeqeq": 2,
        "no-unused-vars": 1,
        "react/prop-types": 0
    }
};
