export const metadata = {
  title: "BDH-CQ Explainer",
  description: "Interactive Post-Transformer Memory Substrate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#020617" }}>
        {children}
      </body>
    </html>
  );
}
