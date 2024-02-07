import StylingWrapper from "./styling-wrapper";
import PageContainer from "../components/PageContainer.js";
import Navigation from "../components/Navigation.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StylingWrapper>
          <PageContainer>
            <Navigation />
            {children}
          </PageContainer>
        </StylingWrapper>
      </body>
    </html>
  );
}
