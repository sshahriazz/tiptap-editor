import type {Config} from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import {nextui} from "@nextui-org/react";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // typography: (theme: (arg0: string) => any) => ({
            //     DEFAULT: {
            //         css: {
            //             p: {
            //                 margin: "0",
            //                 lineHeight: "1.5",
            //                 fontSize: "1rem",
            //             },
            //             ul: {
            //                 listStyleType: "disc",
            //                 paddingLeft: "1.5rem",
            //                 marginBottom: "1rem",
            //             },
            //             ol: {
            //                 listStyleType: "decimal",
            //                 paddingLeft: "1.5rem",
            //                 marginBottom: "1rem",
            //             },
            //             "li > p": {
            //                 marginBottom: "0.2rem",
            //                 marginTop: "0.2rem",
            //             },
            //             "ul li > p": {
            //                 marginBottom: "0.2rem",
            //                 marginTop: "0.2rem",
            //             },
            //             "ol li > p": {
            //                 marginBottom: "0.2rem",
            //                 marginTop: "0.2rem",
            //             },
            //             "ul :is(ul, ol) li > p, ol :is(ul, ol) li > p": {
            //                 marginBottom: "0.2rem",
            //                 marginTop: "0.2rem",
            //             },

            //             "ul > li::marker": {
            //                 color: theme("colors.gray.500"),
            //             },
            //             "ol > li::marker": {
            //                 color: theme("colors.gray.500"),
            //             },
            //         },
            //     },
            // }),
        },
    },
    plugins: [
        nextui(),
        tailwindTypography({
            target: "modern",
        }),
    ],
};

export default config;
