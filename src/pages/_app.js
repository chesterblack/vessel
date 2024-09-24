import '../styles/global.css';

import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head key="head">
				<title>Vessel</title>
			</Head>
			<Layout key="main">
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
