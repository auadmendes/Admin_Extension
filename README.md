# Admin Extension

## Description

This Google Chrome extension enhances the functionality of Admin Console, a software used at Trustly's company, by providing additional features and tools for users.

## Features

- **Transaction Information Box:** Displays important information above the table in the transaction search tab, including special links for quick access.
- **PTX Display and Copy:** Shows the PTX (transaction ID) with a copy function to easily create POAs (Power of Attorney).
- **Customer ID Search:** Adds an input field to search for customer IDs, enhancing user efficiency by bypassing hidden filters.
- **Action Button:** A button above the table that provides useful functions such as copying selected transaction IDs or merchant references.
- **Merchant Portal Integration:** Adds a button in the Merchant Portal's report tab during the recoup process, allowing users to download the result for further analysis or communication with merchants.

## Images

![admin Extension](https://github.com/auadmendes/adminExtension/assets/5294488/64f8cc07-4cb3-4cf2-88ed-c3a2d3341020)
![Admin1-fotor-2024042114638](https://github.com/auadmendes/adminExtension/assets/5294488/99a20e3e-484a-4b24-bfa0-7d3ef0826e38)


## Installation

1. Clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode in the top right corner.
4. Click on "Load unpacked" and select the directory where you cloned the repository.
5. The Admin Extension should now appear in your list of extensions. Activate it to start using the enhanced features.

## Usage

Once the extension is activated, visit Admin Console or the Merchant Portal in your browser. The added functionalities will be available in the relevant tabs and sections, improving your workflow and productivity.

## Dependencies

- axios: ^1.6.8
- date-fns: ^3.4.0
- react: ^18.2.0
- react-dom: ^18.2.0
- react-icons: ^5.0.1
- react-router-dom: ^6.22.3
- [@crxjs/vite-plugin](https://github.com/extend-chrome/crxjs): ^2.0.0-beta.23
- [@types/chrome](https://www.npmjs.com/package/@types/chrome): ^0.0.263
- [@types/react](https://www.npmjs.com/package/@types/react): ^18.2.64
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin): ^7.1.1
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser): ^7.1.1
- [@vitejs/plugin-react](https://vitejs.dev/plugins/react.html): ^4.2.1
- autoprefixer: ^10.4.18
- eslint: ^8.57.0
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.5
- postcss: ^8.4.35
- tailwindcss: ^3.4.1
- typescript: ^5.2.2
- vite: ^5.1.6

## License

This project is licensed under the [MIT License](LICENSE).
