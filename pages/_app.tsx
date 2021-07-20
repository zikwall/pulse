import type { AppContext, AppProps } from 'next/app'
import ErrorPage from 'next/error';
import { Asside } from "@pulse:components/index";

function PulseApplication({ Component, pageProps }: AppProps) {
    if (pageProps.statusCode != 200) {
        return <ErrorPage statusCode={pageProps.statusCode} />
    }

    return (
        <div className="app dk" id="app">
            <Asside />
            <Component {...pageProps} />
        </div>
    )
}

PulseApplication.getInitialProps = async ({ ctx, Component }: AppContext) => {
    const appProps = {
        statusCode: 0, ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    if (appProps.statusCode && ctx.res) {
        ctx.res.statusCode = appProps.statusCode
    }

    return {
        pageProps: appProps
    };
}

export default PulseApplication
