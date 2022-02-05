import Document, {Head, Html, Main, NextScript} from "next/document";

export default class AppDocument extends Document {
    render() {
        return <Html lang={'en'}>
            <Head>
                <title>Shop</title>
                <body>
                <Main/>
                <NextScript />
                </body>
            </Head>
        </Html>
    }
}
