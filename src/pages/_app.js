import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
