export const environments = {
    development: {
        baseUrl: __ENV.BASE_URL || 'https://dummyjson.com'
    }
};

export const currentEnvironment = environments.development;
