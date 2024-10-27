import { Tooltip } from "@nextui-org/react";
import React from "react";

const ActionButton = ({
    children,
    contentForMac,
    contentForWindows,
}: {
    children: React.ReactNode;
    contentForMac: React.ReactNode;
    contentForWindows: React.ReactNode;
}) => {
    const getOS = () => {
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
        const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
        const iosPlatforms = ["iPhone", "iPad", "iPod"];
        let os = null;
        if (macosPlatforms.indexOf(platform) !== -1) {
            os = "Mac";
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = "iOS";
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = "Windows";
        } else if (/Android/.test(userAgent)) {
            os = "Android";
        } else if (!os && /Linux/.test(platform)) {
            os = "Linux";
        }
        return os;
    };

    const osName = getOS();

    switch (osName) {
        case "Mac":
            return <Tooltip content={contentForMac}>{children}</Tooltip>;
        case "Windows":
            return <Tooltip content={contentForWindows}>{children}</Tooltip>;
        default:
            return children;
    }
};

export default ActionButton;
