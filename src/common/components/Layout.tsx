import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
