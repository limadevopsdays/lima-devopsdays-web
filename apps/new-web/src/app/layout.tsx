
export const metadata = {
  metadataBase: new URL('https://devopsdays.pe'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 