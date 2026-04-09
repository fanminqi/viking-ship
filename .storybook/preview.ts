import "../src/styles/index.scss";
import type { Preview } from "@storybook/react-webpack5";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Welcome", "*"],
      },
    },
  },
};

export default preview;
