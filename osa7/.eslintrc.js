module.exports = {
	"env": {
		"browser": true,
		"commonjs": false,
		"es6": true,
		"jest/globals": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react", "jest"
	],
    "rules": {
		"eol-last": ["error", "always"],
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};