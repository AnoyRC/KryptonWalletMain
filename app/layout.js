import { store } from "@/redux/store";
import localFont from "next/font/local";
import ReduxProvider from "@/providers/ReduxProvider";
import { WagmiProvider } from "@/providers/wagmiProviders";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AnonProvider from "@/providers/AnonProvider";
// import DataverseProvider from '@/providers/DataverseProvider';

const fhtotal = localFont({
  src: "../public/fonts/FH-total/FHTotalDisplay-Test-Black.woff2",
  variable: "--font-fhtotal",
});

const uni = localFont({
  src: [
    {
      path: "../public/fonts/uni-neue/UniNeueLight.woff2",
      weight: "200",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueThin.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueRegular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueBook.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueBold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueHeavy.woff2",
      weight: "800",
    },
    {
      path: "../public/fonts/uni-neue/UniNeueBlack.woff2",
      weight: "900",
    },
  ],

  variable: "--font-uni",
});

export const metadata = {
  title: "B-Wallet",
  description: "By Bankless DAO",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${fhtotal.variable} ${uni.variable}`} lang="en">
      <body className="overflow-x-hidden font-uni">
        <ReduxProvider store={store}>
          {/* <DataverseProvider> */}
          <WagmiProvider>
            <AnonProvider>
              <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    fontFamily: "var(--font-uni)",
                    background: "#333",
                    color: "#fff",
                  },
                  iconTheme: {
                    primary: "#ffffff",
                    secondary: "#333",
                  },
                }}
              />

              {children}
              {/*  */}
            </AnonProvider>
          </WagmiProvider>
          {/* </DataverseProvider> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
