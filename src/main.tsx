import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";

const colors = {
	brand: {
		500: "#007452",
	},
};

const fonts = {
	heading: `'Open Sans', sans-serif`,
	body: `'Raleway', sans-serif`,
};

const theme = extendTheme({ fonts, colors });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
