import { Box } from "@/components/box";
import { Header } from "@/components/header";

const SiteLayout = ({ children }) => {
  return (
    <Box className="overflow-y-auto max-h-[calc(100vh-1.5rem)] bg-gradient-to-b from-orange-800/40">
      <Header />
      <div className="p-4">{children}</div>
    </Box>
  );
};

export default SiteLayout;
