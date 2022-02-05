import {Page} from "@components/Page";
import {AppProps} from "next/app";

export default function MyApp({Component, pageProps}: AppProps) {
    return <Page>
        <Component {...pageProps}/>
    </Page>
}
