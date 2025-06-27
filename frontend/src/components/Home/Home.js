export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100">
      <h1 className="text-5xl font-bold text-blue-700 mb-6">Bem-vindo ao Sistema Acadêmico</h1>
      <p className="text-lg text-gray-700 mb-4 max-w-xl text-center">
        Este é um sistema acadêmico completo, com backend em NestJS + Sequelize/PostgreSQL e frontend em React, Axios, JSX, CSS e Tailwind.
      </p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Entrar</button>
    </div>
  );
}
