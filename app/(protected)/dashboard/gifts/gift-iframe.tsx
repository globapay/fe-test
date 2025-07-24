"use client"

import {useEffect, useState} from "react";
import {getSSOUrl} from "@/services/auth/authApi";

export default function GiftIframe() {
    const [ssoUrl, setSsoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const ssoUrl: string = await getSSOUrl();
            setSsoUrl(ssoUrl);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            console.log(event, "event useEffect")
            if (event.origin !== "https://selfservice-test.diggecard.com") {
                return;
            }
            console.log("event receiver: ", event.data);
        };

        window.addEventListener("message", handleMessage, false);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return ssoUrl !== null ? (
        <iframe
            id="giftcard-system-iframe"
            allow="camera; microphone"
            width="100%"
            height="100%"
            title="Gift card"
            src={ssoUrl}
            style={{ height: "100%"}}
        >
        </iframe>
    ) : null;
}