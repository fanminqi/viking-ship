import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-styling-webpack"
  ],
  "framework": "@storybook/react-webpack5",
  "staticDirs": [
    "..\\public"
  ],
  webpackFinal: async (baseConfig) => {
    const patchRules = (rules: any[] | undefined) => {
      if (!rules) return;
      rules.forEach((rule) => {
        if (rule.oneOf) patchRules(rule.oneOf);
        const useLoaders = Array.isArray(rule.use) ? rule.use : [];
        useLoaders.forEach((loader: any) => {
          if (
            loader &&
            typeof loader.loader === "string" &&
            loader.loader.includes("sass-loader")
          ) {
            loader.options = loader.options || {};
            loader.options.sassOptions = loader.options.sassOptions || {};
            loader.options.sassOptions.silenceDeprecations = [
              "import",
              "global-builtin",
              "color-functions",
            ];
          }
        });
      });
    };

    patchRules(baseConfig.module?.rules as any[]);
    return baseConfig;
  },
};
export default config;