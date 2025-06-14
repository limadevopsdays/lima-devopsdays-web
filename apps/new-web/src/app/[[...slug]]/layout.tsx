import type { Metadata } from "next";
import Script from "next/script";

import { Space_Grotesk } from "next/font/google";
import Header, { NavItem } from "react-components/sections/Header";
import container from "@/globals/container";
import { IContentData } from "@/services/IContentData";
import { ContainerIdentifiers } from "@/globals/identifiers";
import Footer, { LinkItem } from "react-components/sections/Footer";
import { IGlobalConfig } from "@/services/IGlobalConfig";

import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevOps Days Lima",
  description: "DevOps Days Lima es un evento que reúne a profesionales de la tecnología para compartir conocimientos y experiencias sobre DevOps.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string[] }>
}>) {

  const { slug = [""] } = await params;

  const contentDataService = container.get<IContentData>(ContainerIdentifiers.IContentData)

  const pages = await contentDataService.getPages();

  //TODO: this is too atached to the data source, Contentful, we should rethink the way
  //of consuming and sorting the data
  const navItems: NavItem[] = pages
    .filter(({ fields }) => fields.includedInNavbar)
    .toSorted((currentPage, nextPage) => currentPage.fields.navbarOrder - nextPage.fields.navbarOrder)
    .map((page) => ({
      text: String(page.fields.title),
      href: `/${page.fields.slug}`,
      variant: "text",
    }));

  const footerLegalItems: LinkItem[] = pages
    .filter(({ fields }) => fields.includedInLegal)
    .toSorted((currentPage, nextPage) => currentPage.fields.legalOrder - nextPage.fields.legalOrder)
    .map((page) => ({
      text: String(page.fields.title),
      url: `/${page.fields.slug}`,
    }));

  const globalConfig = await container
    .get<IGlobalConfig>(ContainerIdentifiers.IGlobalConfig)
    .getGlobalConfig()

  const { name, paymentExternalLink, gtmId } = globalConfig.fields;

  //TODO: we need to express intention, rahter abstract the navbar configuration/rendering
  const currentPage = pages.find((page) => {
    const pageSlug = String(page.fields.slug).split("/").filter(Boolean);
    return pageSlug.join("/") === slug.join("/");
  });

  const { logoText, ctaText, ctaHref, showCta } = currentPage.fields.theme?.fields ?? {};

  const newNavItems = navItems
    .concat(
      showCta ?
        [{ text: ctaText ?? name, href: ctaHref ?? paymentExternalLink ?? "/pago", variant: "secondary" }] : []
    )

  return (
    <html lang="en">
      <head>
        {gtmId && (
          <>
            <Script
              id="gtm-datalayer-init"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                `,
              }}
            />

            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
              `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${spaceGrotesk.variable} min-h-screen max-w-screen grid bg-gray-4`}
      >
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>
        )}

        <Header
          logoText={logoText}
          navItems={newNavItems}
        />
        <main>
          {children}
        </main>
        <Footer
          about={{
            title: "DevOpsDay Lima",
            description:
              "Buscamos ser el hub de la transformación tecnológica, brindando a los participantes inspiración, conocimiento y herramientas para liderar el cambio.",
          }}
          links={{
            title: "Enlaces",
            items: [
              { text: "Conócenos", url: "#conocenos" },
              { text: "Speakers", url: "/speakers" },
              { text: "Agenda", url: "/agenda" },
              { text: "Call for Speakers", url: "#call-for-speakers" },
            ],
          }}
          contact={{
            title: "Contacto",
            location: "Lima, Peru",
            email: "contacto@devopsdays.pe",
          }}
          social={{
            title: "Síguenos",
            location: "Lima, Peru",
            email: "contacto@devopsdays.pe",
          }}
          copyright="© 2025 DevOpsDays. Made with <3 in Peru"
          legalLinks={footerLegalItems?.length ? footerLegalItems : [
            { text: "Política de Privacidad", url: "/privacidad" },
            { text: "Código de Conducta", url: "/conducta" },
          ]}
        />
      </body>
    </html>
  );
}
