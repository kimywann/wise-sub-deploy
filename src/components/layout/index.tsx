import Header from "./Header";
import ErrorBoundary from "@components/common/ErrorBoundary";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <Header />
      <ErrorBoundary>{children}</ErrorBoundary>
    </div>
  );
};

export default Layout;
