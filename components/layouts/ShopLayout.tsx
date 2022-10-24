import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { SideMenu } from "../ui";
import Navbar from "../ui/Navbar";

interface Props {
  title: string;
  pageDescription: string;
  imageFullURL?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  pageDescription,
  imageFullURL
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {
          imageFullURL && (
            <meta name="og:image" content={imageFullURL} />
          )
        }
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px'
        }}
      >
        {children}
      </main>

      <footer>
        {/* TODO: CustomFooter */}
      </footer>
    </>
  )
}
