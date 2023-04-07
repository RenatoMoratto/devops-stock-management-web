import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ToastProviderProps, extendTheme } from "@chakra-ui/react";
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

const toastOptions: ToastProviderProps = {
	defaultOptions: {
		duration: 3_000,
		isClosable: true,
		position: "top-right",
		containerStyle: {
			width: "200px",
		},
	},
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme} toastOptions={toastOptions}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
);
