interface NODE_ENV_OPTIONS {
  production: string;
  staging: string;
  qa: string;
  development: string;
}

/**
 * System information used to configure builds
 * @namespace
 * @property {string} environment - Name of the current build environment
 */
export const system = {
  environment: (process.env.NEXT_ENV || process.env.NEXT_PUBLIC_ENV) as keyof NODE_ENV_OPTIONS,
};
