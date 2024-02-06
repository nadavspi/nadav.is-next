import StylingWrapper from "./styling-wrapper"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StylingWrapper>{children}</StylingWrapper>
      </body>
    </html>
  );
}
