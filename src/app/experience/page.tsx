import PS4Menu from "@/components/features/portfolio/PS4Menu";

export const metadata = {
  title: "Experience | Pablo's Portfolio",
  description: "The interactive PS4-style portfolio experience.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <PS4Menu />
    </main>
  );
}
