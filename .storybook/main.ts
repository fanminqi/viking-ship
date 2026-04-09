import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-styling-webpack",
  ],
  // 关键修复：强制禁用静态目录，彻底解决 ../public 找不到的报错
  staticDirs: [],
  framework: "@storybook/react-webpack5",
  webpackFinal: async (baseConfig) => {
    // 🌟 修复 1：webpackFinal 必须返回配置，这里加箭头函数体
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

    // 🌟 修复 2：必须调用 patchRules，否则 SASS 配置不生效
    patchRules(baseConfig.module?.rules as any[]);

    // 🌟 修复 3：webpackFinal 必须 return baseConfig
    return baseConfig;
  },
};

export default config;
