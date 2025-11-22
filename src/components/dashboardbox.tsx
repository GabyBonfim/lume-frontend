interface DashboardBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function DashboardBox({ title = "Dashboard", children }: DashboardBoxProps) {
  return (
    <div className="bg-[#FFFDEB] shadow-lg rounded-2xl w-full max-w-4xl">
      {/* Título verde */}
      <div className="bg-[#B3E099] text-gray-900 text-lg font-semibold rounded-t-2xl px-6 py-3 -mt-8 mb-8 shadow">
        {title}
      </div>

      {/* Conteúdo interno */}
      <div className="p-10">{children}</div>
    </div>
  );
}
