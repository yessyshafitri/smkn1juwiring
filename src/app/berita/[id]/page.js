import BeritaDetail from "@/components/BeritaDetail";

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;
  return <BeritaDetail id={id} />;
}