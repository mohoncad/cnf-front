const ENV = {
    /**
     * URL Configuration for the app
     */
    URL: {
        API: {
            //ROOT: process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "https://candf.dotlogic.xyz/api/public/api",
            ROOT: process.env.NODE_ENV === "development" ? "http://project.dotlogic.xyz/api/public/api" : "http://project.dotlogic.xyz/api/public/api",
        },
        FRONT_END: {
            ROOT: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://fahim.dotlogic.xyz",
        },
    },

    ABOUT_APP: {
        NAME: "C&F",
        DESCRIPTION: "",
        VERSION: "1.0",
        RELEASE_NOTE: "",
    },

    AUTHOR: {
        SIGNATURE: "",
        URL: "",
    }
};

export {ENV};
