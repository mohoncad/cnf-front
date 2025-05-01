const ROUTE_PATHS = {
    ROOT: "/",

    COMMON: {
        ROOT: "/",
        REACT: "/react",
        ABOUT: "/about",
    },

    PUBLIC: {
        ROOT: "/",
        LOGIN: "/login",
        RECOVER_PASSWORD: "/recover_password",
        REGISTER: "/register",
        SUPPORT_LOGIN: "/support/login",
    },

    PRIVATE: {
        ROOT: "/app",
        DASHBOARD: "/app",
        MY_PROFILE: "/app/my-profile",
        USER: "/app/users",
        LOGOUT: "/app/logout",

        USER_ROLE: "/app/uap/user-role",
        BRANCH: "/app/company/branches",
        BANK: "/app/company/banks",
        CLIENT_GROUPS: "/app/company/client",
        CURRENCY: "/app/company/currency",
        UNIT: "/app/company/unit",
        PORT: "/app/company/port",
        CLIENT: "/app/company/clients",
        SUPPLIER: "/app/company/suppliers",
        COMPANY: "/app/company/company",

        IMPORT: "/app/company/import-bill",
        EXPORT: "/app/company/export-bill",
        TRANSPORT: "/app/company/transport-bill",
        BILL_SUMMARY: "/app/company/bill-summary",
        REPORT:  "/app/company/report/:bill_id/:type/:from",
        TRANSPORT_REPORT:  "/app/company/transport/report/:bill_id/:type",
        SUMMARY_REPORT:  "/app/company/summary/report/:bill_id/",
        BILL_PAYMENT:  "/app/company/bill-payment",
    },
};

export {ROUTE_PATHS};
