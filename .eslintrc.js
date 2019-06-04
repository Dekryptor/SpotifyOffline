module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    extends: [
        "standard",
        "plugin:vue/recommended"
    ],
    plugins: ["vue"],
};