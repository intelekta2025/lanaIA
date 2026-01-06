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
  Zap,
  Lock,
  Mail,
  Fingerprint,
  FileText,
  Trash2,
  CheckCircle2,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  X
} from 'lucide-react';

// --- Componentes de UI Base ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-100",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100",
    amber: "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-100"
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- VISTAS DE FLUJO ---

const LoginView = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border-t-8 border-indigo-600">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl mb-6 shadow-xl shadow-indigo-100 rotate-3">
              <Zap className="text-white fill-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Lana<span className="text-indigo-600">IA</span></h1>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-[0.2em]">Inteligencia Financiera</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 mb-1 block">Email Corporativo</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@lanaia.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-4 mb-1 block">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700"
                />
              </div>
            </div>

            <Button variant="primary" className="w-full py-5 text-lg mt-4" disabled={loading}>
              {loading ? "Iniciando..." : "Entrar a mi Lana"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AnalysisStartView = ({ onNext }) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-indigo-600 text-white">
    <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white/10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md border border-white/20">
        <BrainCircuit size={48} className="text-white" />
      </div>
      <div className="space-y-2">
        <h2 className="text-4xl font-black tracking-tighter">Inicia Análisis</h2>
        <p className="text-indigo-100 font-medium">LanaIA necesita leer tus movimientos para optimizar tu deuda.</p>
      </div>
      <Button onClick={onNext} variant="secondary" className="w-full py-5 text-lg text-indigo-600 bg-white hover:bg-indigo-50 shadow-2xl">
        Comenzar Escaneo
      </Button>
    </div>
  </div>
);

const UploadView = ({ onNext }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const addFile = () => {
    const newFile = { id: Date.now(), name: `Estado_Cuenta_${files.length + 1}.pdf`, size: '1.2 MB' };
    setFiles([...files, newFile]);
  };

  const removeFile = (id) => setFiles(files.filter(f => f.id !== id));

  const handleProcess = () => {
    setUploading(true);
    setTimeout(() => onNext(), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Sube tu estado de cuenta</h2>
          <p className="text-sm text-slate-500 font-medium">Puedes subir varios archivos para un análisis completo.</p>
        </div>

        <Card className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 flex flex-col items-center py-10 space-y-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
            <Upload size={24} />
          </div>
          <button onClick={addFile} className="text-indigo-600 font-bold hover:underline">
            Click para seleccionar archivos
          </button>
        </Card>

        <div className="space-y-3">
          {files.map(file => (
            <div key={file.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm animate-in zoom-in duration-300">
              <div className="flex items-center gap-3">
                <FileText className="text-indigo-600" size={20} />
                <div>
                  <p className="text-sm font-bold text-slate-700">{file.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{file.size}</p>
                </div>
              </div>
              <button onClick={() => removeFile(file.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {files.length > 0 && (
          <Button onClick={handleProcess} className="w-full py-4 text-md" disabled={uploading}>
            {uploading ? "Procesando archivos..." : `Analizar ${files.length} documentos`}
          </Button>
        )}
      </div>
    </div>
  );
};

// --- VISTA HOMOLOGADA: ALERTA DE DETECCIÓN (COLOR AZUL/MORADO) ---
const DetectionAlertView = ({ amount, onNext }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-slate-900 text-center">
    <div className="max-w-md w-full space-y-8 animate-in zoom-in duration-500">
      <div className="relative mx-auto w-32 h-32">
        <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-10"></div>
        <div className="relative bg-indigo-600 w-32 h-32 rounded-full flex items-center justify-center shadow-xl shadow-indigo-200">
          <AlertCircle size={64} className="text-white" />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-black tracking-tight italic uppercase">¡Movimiento Detectado!</h2>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-100/50">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Retiro en Efectivo</p>
          <p className="text-6xl font-black text-indigo-600 tracking-tighter">${amount}</p>
        </div>
        <p className="text-slate-600 text-lg font-medium leading-relaxed px-4">
          Lo detectamos en tu estado de cuenta. <br /><span className="text-indigo-600 font-bold italic">¿En qué se gastó esta lana?</span>
        </p>
      </div>
      <Button onClick={onNext} variant="primary" className="w-full py-5 text-lg shadow-lg shadow-indigo-100 uppercase font-black tracking-tight">
        Registrar mis gastos
      </Button>
    </div>
  </div>
);

// --- VISTA HOMOLOGADA: CAPTURA DE GASTOS (COLORES CONSISTENTES) ---
const CashCaptureView = ({ totalAmount, onFinish }) => {
  const [expenses, setExpenses] = useState([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  const remaining = totalAmount - expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const addExpense = () => {
    if (!desc || !amount) return;
    setExpenses([...expenses, { id: Date.now(), desc, amount: parseFloat(amount) }]);
    setDesc('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col pb-10 text-slate-900">
      <header className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 z-10 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Wallet size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight italic text-slate-800">Lana<span className="text-indigo-600">IA</span></h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Registro de Flujo</p>
          </div>
        </div>
        <div className={`px-5 py-2.5 rounded-2xl font-black flex flex-col items-end border border-slate-100 transition-colors ${remaining === 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
          <span className="text-[10px] opacity-60 uppercase tracking-widest mb-0.5 font-bold">Pendiente</span>
          <span className="text-xl leading-none tracking-tighter font-black">${remaining}</span>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full animate-in fade-in duration-500">
        <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 space-y-5 shadow-xl shadow-indigo-50/50">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Concepto del gasto</label>
            <input
              type="text"
              placeholder="Ej. Tacos, Gasolina..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Monto gastado</label>
              <input
                type="number"
                placeholder="$0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 font-black text-2xl transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addExpense}
                className="bg-indigo-600 text-white p-5 rounded-2xl shadow-xl shadow-indigo-200 active:scale-90 transition-all hover:bg-indigo-700"
              >
                <Plus size={28} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Historial de captura</h3>
          {expenses.map(exp => (
            <div key={exp.id} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-[2rem] animate-in slide-in-from-right-6 duration-300 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl text-slate-400"><Receipt size={20} /></div>
                <div>
                  <p className="font-bold text-slate-700 text-sm tracking-tight">{exp.desc}</p>
                  <p className="text-[9px] text-indigo-500 font-black uppercase tracking-widest">Gasto en Efectivo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900 text-lg tracking-tighter">-${exp.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="px-6 max-w-md mx-auto w-full">
        <Button
          onClick={onFinish}
          variant={remaining === 0 ? "emerald" : "outline"}
          className={`w-full py-5 text-lg uppercase tracking-tight font-black transition-all ${remaining !== 0 ? 'border-slate-200 text-slate-600' : ''}`}
          disabled={remaining !== 0 && expenses.length === 0}
        >
          {remaining === 0 ? "Guardar y Analizar" : "Omitir el resto"}
        </Button>
      </div>
    </div>
  );
};

const SummaryView = ({ onNext }) => (
  <div className="min-h-screen bg-slate-50 p-6 flex flex-col justify-center">
    <div className="max-w-md mx-auto w-full space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <header className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic">Resumen Lana<span className="text-indigo-600">IA</span></h2>
        <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest mt-1">Análisis de Movimientos</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 border-none shadow-lg bg-indigo-600 text-white rounded-[2rem]">
          <ArrowUpRight className="mb-2 opacity-50 text-indigo-200" size={24} />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Egresos</p>
          <p className="text-2xl font-black tracking-tight mt-1">$36,250</p>
        </Card>
        <Card className="p-5 border-none shadow-lg bg-emerald-500 text-white rounded-[2rem]">
          <CreditCard className="mb-2 opacity-50 text-emerald-100" size={24} />
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Pagos Tarjeta</p>
          <p className="text-2xl font-black tracking-tight mt-1">$12,400</p>
        </Card>
      </div>

      <Card className="space-y-5 rounded-[2rem]">
        <h3 className="font-black text-slate-800 flex items-center gap-2 text-sm uppercase tracking-tight">
          <PieChart size={18} className="text-indigo-600" />
          Distribución de Lana
        </h3>
        <div className="space-y-4">
          {[
            { cat: 'Vivienda y Servicios', perc: 45, color: 'bg-indigo-600' },
            { cat: 'Alimentos y Gastos', perc: 30, color: 'bg-emerald-500' },
            { cat: 'Suscripciones', perc: 15, color: 'bg-amber-500' },
            { cat: 'Otros', perc: 10, color: 'bg-slate-300' }
          ].map((i, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-black uppercase">
                <span className="text-slate-500 tracking-tighter">{i.cat}</span>
                <span className="text-slate-900 tracking-tighter">{i.perc}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className={`${i.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${i.perc}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-slate-900 text-white rounded-[2rem] border-none">
        <div className="flex items-center gap-4">
          <div className="bg-amber-500 p-3 rounded-2xl text-white">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ahorro potencial detectado</p>
            <p className="text-xl font-black text-amber-500">$3,400 <span className="text-[10px] text-white opacity-40 font-bold uppercase tracking-widest">al mes</span></p>
          </div>
        </div>
      </Card>

      <Button onClick={onNext} className="w-full py-5 text-lg group flex items-center justify-center gap-2 tracking-tighter uppercase font-black">
        Análisis de mejoras <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  </div>
);

const ImprovementsView = ({ onRestart }) => (
  <div className="min-h-screen bg-indigo-900 p-6 flex flex-col justify-center">
    <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in zoom-in duration-700">
      <div className="text-center space-y-4">
        <div className="bg-white/10 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md border border-white/20 shadow-2xl">
          <Sparkles size={48} className="text-amber-400 fill-amber-400" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter italic">Estrategias Lana<span className="text-indigo-400">IA</span></h2>
        <p className="text-indigo-200 font-medium text-sm px-4 leading-relaxed">He analizado tus deudas y gastos. Aquí está tu plan maestro de optimización:</p>
      </div>

      <div className="space-y-4">
        {[
          { title: 'Consolidación de Deuda', desc: 'Mueve el saldo de BBVA a un plan de pagos fijos y ahorra 15% en CAT.', icon: <ArrowRightLeft size={20} /> },
          { title: 'Optimización de Suscripciones', desc: 'Detecté 3 servicios duplicados. Cancelarlos te libera $450/mes.', icon: <Trash2 size={20} /> },
          { title: 'Abono Inteligente', desc: 'Abonar $500 extras a Santander reduce tu tiempo de deuda en 4 meses.', icon: <TrendingDown size={20} /> }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex gap-4 backdrop-blur-sm">
            <div className="text-amber-400 mt-1 shrink-0">{item.icon}</div>
            <div className="space-y-1">
              <h4 className="text-white font-bold tracking-tight leading-none mb-1">{item.title}</h4>
              <p className="text-indigo-200 text-xs leading-relaxed opacity-80">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4">
        <Button onClick={onRestart} className="w-full py-5 text-lg bg-emerald-500 text-white hover:bg-emerald-600 font-black uppercase tracking-tight shadow-xl shadow-emerald-900/20">
          Finalizar Análisis
        </Button>
        <button onClick={onRestart} className="w-full py-2 text-indigo-300 font-bold text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
          Volver a empezar
        </button>
      </div>
    </div>
  </div>
);

// --- APP PRINCIPAL ---

const App = () => {
  const [view, setView] = useState('login');
  const [userName, setUserName] = useState('');
  const [atmAmount] = useState(2000);

  const handleLogin = (email) => {
    setUserName(email.split('@')[0]);
    setView('analysis');
  };

  const resetFlow = () => {
    setView('login');
    setUserName('');
  };

  // Flujo de navegación lineal sin Dashboard final
  if (view === 'login') return <LoginView onLogin={handleLogin} />;
  if (view === 'analysis') return <AnalysisStartView onNext={() => setView('upload')} />;
  if (view === 'upload') return <UploadView onNext={() => setView('alert')} />;
  if (view === 'alert') return <DetectionAlertView amount={atmAmount} onNext={() => setView('capture')} />;
  if (view === 'capture') return <CashCaptureView totalAmount={atmAmount} onFinish={() => setView('summary')} />;
  if (view === 'summary') return <SummaryView onNext={() => setView('improvements')} />;
  if (view === 'improvements') return <ImprovementsView onRestart={resetFlow} />;

  return null;
};

export default App;
