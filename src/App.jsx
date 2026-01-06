import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Wallet, 
  MessageSquare, 
  TrendingDown, 
  AlertCircle, 
  Plus, 
  Upload,
  ChevronRight,
  BrainCircuit,
  ArrowRightLeft,
  Info,
  PieChart,
  Zap
} from 'lucide-react';

// --- Componentes de UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-100"
  };
  return (
    <button onClick={onClick} className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strategy, setStrategy] = useState('avalanche');
  
  const [debts, setDebts] = useState([
    { id: 1, name: 'Santander Light', balance: 12500, rate: 45.5, minPayment: 850, logo: 'S', color: 'bg-red-500' },
    { id: 2, name: 'BBVA Platinum', balance: 45000, rate: 62.1, minPayment: 2200, logo: 'B', color: 'bg-indigo-900' }
  ]);

  const [atmWithdrawals, setAtmWithdrawals] = useState([
    { id: 101, amount: 2000, date: '02 Ene', source: 'BBVA Platinum', status: 'pending' }
  ]);

  const [cashExpenses, setCashExpenses] = useState([
    { id: 1, desc: 'Tacos y bebidas', amount: 150, date: 'Hoy' },
    { id: 2, desc: 'Uber / Didi', amount: 85, date: 'Hoy' }
  ]);

  const totalDebt = debts.reduce((acc, curr) => acc + curr.balance, 0);
  const dailyCash = cashExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const availableCashFromATM = atmWithdrawals.reduce((acc, curr) => acc + curr.amount, 0);

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-28">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-5 sticky top-0 z-20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 rotate-3">
              <Zap className="text-white fill-white w-5 h-5" />
            </div>
            <h1 className="font-black text-2xl tracking-tighter text-slate-800 italic">Lana<span className="text-indigo-600">IA</span></h1>
          </div>
          <div className="flex gap-3 items-center">
             <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-md"></div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 space-y-6">
        
        {activeTab === 'dashboard' && (
          <>
            {/* Promo Banner / Notification */}
            {atmWithdrawals.length > 0 && (
              <div className="bg-indigo-600 text-white p-5 rounded-[2rem] shadow-xl shadow-indigo-100 flex gap-4 items-center">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <ArrowRightLeft size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">¡Movimiento detectado!</p>
                  <p className="text-[11px] opacity-90 leading-tight mt-1">
                    Detectamos un retiro de <strong>${availableCashFromATM}</strong>. Ya está en tu billetera de efectivo para que no lo cuentes doble.
                  </p>
                </div>
                <button onClick={() => setAtmWithdrawals([])} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                   <Plus className="rotate-45" size={18} />
                </button>
              </div>
            )}

            <section className="space-y-4">
              <Card className="bg-slate-900 text-white border-none relative overflow-hidden p-8">
                <div className="absolute -top-10 -right-10 opacity-10">
                  <PieChart size={200} />
                </div>
                <div className="relative z-10">
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Deuda Consolidada</p>
                   <h3 className="text-4xl font-black mt-2 tracking-tight">${totalDebt.toLocaleString()} <span className="text-lg font-normal text-slate-500">MXN</span></h3>
                   
                   <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Lana disponible</p>
                        <p className="font-bold text-emerald-400 text-lg">${(availableCashFromATM - dailyCash).toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Próximos pagos</p>
                        <p className="font-bold text-indigo-400 text-lg">$3,050</p>
                      </div>
                   </div>
                </div>
              </Card>
            </section>

            {/* Listado de Tarjetas Estilo "Wallets" */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Mis Plásticos</h2>
                <Button variant="secondary" className="text-[10px] py-1 px-3 uppercase tracking-tighter">Scan PDF</Button>
              </div>
              <div className="flex flex-col gap-3">
                {debts.map(debt => (
                  <Card key={debt.id} className="flex items-center gap-4 py-4 px-5 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white ${debt.color} shadow-lg shadow-slate-100`}>
                      {debt.logo}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{debt.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold">CAT: {debt.rate}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-800">${debt.balance.toLocaleString()}</p>
                      {debt.rate > 50 && (
                        <span className="text-[8px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded-md font-black">CARA</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'strategy' && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Tu Plan Maestro</h2>
            
            <div className="flex p-1.5 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => setStrategy('avalanche')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${strategy === 'avalanche' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                AVALANCHA (IA)
              </button>
              <button 
                onClick={() => setStrategy('snowball')}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${strategy === 'snowball' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                BOLA DE NIEVE
              </button>
            </div>

            <Card className="border-none shadow-xl shadow-indigo-50 bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                  <TrendingDown size={120} />
               </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h4 className="font-black text-slate-800 uppercase tracking-tight">Análisis LanaIA</h4>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {strategy === 'avalanche' 
                  ? "Atacaremos BBVA Platinum primero. Su CAT del 62.1% es tu mayor fuga. Si abonas $500 extras este mes, ahorrarás $4,200 en intereses anuales."
                  : "Liquidaremos Santander Light. Solo te faltan $12,500. Cerrar esta cuenta te dará el impulso mental para ir por la siguiente."}
              </p>
              
              <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Progreso de ahorro</span>
                    <span className="text-xs font-black text-indigo-600">65%</span>
                 </div>
                 <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full w-[65%] rounded-full shadow-inner"></div>
                 </div>
              </div>
            </Card>

            <Button onClick={simulateAnalysis} className="w-full py-5 rounded-3xl text-md tracking-tight">
              {isAnalyzing ? "Calculando vibras financieras..." : "RECALCULAR CON IA"}
            </Button>
          </section>
        )}

        {activeTab === 'cash' && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tighter">La Lana</h2>
                <p className="text-xs text-slate-400 font-bold">GASTOS EN EFECTIVO</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-lg font-black shadow-sm">
                ${availableCashFromATM - dailyCash}
              </div>
            </div>

            <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
              <div className="p-5 flex gap-3 bg-slate-50/50">
                <input 
                  type="text" 
                  placeholder="¿En qué gastaste?" 
                  className="flex-1 bg-white border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                />
                <input 
                  type="number" 
                  placeholder="$0" 
                  className="w-24 bg-white border border-slate-100 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-black"
                />
                <Button className="rounded-2xl px-4"><Plus size={24}/></Button>
              </div>
              <div className="divide-y divide-slate-50">
                {cashExpenses.map(item => (
                  <div key={item.id} className="p-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                        <Wallet size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-700">{item.desc}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm text-slate-800">-${item.amount}</p>
                      <p className="text-[8px] text-emerald-600 font-black uppercase tracking-tighter bg-emerald-50 px-1 rounded">Ok</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-amber-50 p-5 rounded-[2rem] border border-amber-100 flex gap-4 items-center">
               <AlertCircle className="text-amber-500 shrink-0" size={24} />
               <p className="text-[11px] text-amber-800 font-bold leading-tight italic">
                 "Oye, tus gastos en 'Tacos' son un 15% más altos que el promedio EBC. Si bajas un poco, podrías liquidar Santander 1 mes antes."
               </p>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-5 pb-8 z-30">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-300'}`}>
            <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Feed</span>
          </button>
          <button onClick={() => setActiveTab('strategy')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'strategy' ? 'text-indigo-600 scale-110' : 'text-slate-300'}`}>
            <TrendingDown size={24} strokeWidth={activeTab === 'strategy' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Plan</span>
          </button>
          <button onClick={() => setActiveTab('cash')} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'cash' ? 'text-indigo-600 scale-110' : 'text-slate-300'}`}>
            <Wallet size={24} strokeWidth={activeTab === 'cash' ? 3 : 2} />
            <span className="text-[9px] font-black uppercase tracking-widest">Lana</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-slate-300">
            <MessageSquare size={24} />
            <span className="text-[9px] font-black uppercase tracking-widest">IA Chat</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
