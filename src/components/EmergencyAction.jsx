import React, { useState } from 'react';
import { ShieldAlert, MapPin, Cpu, CheckCircle2, AlertCircle, Droplet, Phone, FileText, Lock, Unlock, Heart, Hash } from 'lucide-react';
import ActivityView from './ActivityView';

const EmergencyAction = () => {
  const [step, setStep] = useState('idle'); 
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pin, setPin] = useState('');
  const [location, setLocation] = useState(null);
  const [basicData, setBasicData] = useState(null);

  const fetchFullData = async (id) => {
    return {
      name: "JUAN PÉREZ",
      bloodType: "O+",
      criticalAllergy: "Penicilina",
      nss: "1234-56-7890",
      religion: "Católico",
      chronicDisease: "Diabetes Tipo 2",
      baseMedication: "Metformina / Insulina",
      isDonor: "SÍ, DONADOR",
      history: "Cirugía de Apéndice (2024), Tratamiento Hipertensión desde 2023.",
      contacts: [
        { name: "María (Esposa)", phone: "+52 33 1234 5678" },
        { name: "Carlos (Hijo)", phone: "+52 33 8765 4321" }
      ]
    };
  };

  const handleStartScan = () => {
    setStep('scanning');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, (err) => {
        console.warn("GPS Requerido para protocolizar el rescate");
      });
    }

    // Simulación de 4 segundos en total
    setTimeout(() => {
      setStep('loading'); // Cambia a "Validando..."
      
      setTimeout(async () => {
        const data = await fetchFullData("nfc_001");
        setBasicData(data);
        setStep('success');
      }, 2000); // Otros 2 segundos validando
    }, 2000); // 2 segundos buscando
  };

  const handleAuthorize = () => {
    if (pin === '1234') { 
      setIsAuthorized(true);
    } else {
      alert("PIN Incorrecto");
    }
  };

  if (step === 'idle') return (
    <button onClick={handleStartScan} className="w-full bg-myhealth-red text-white py-12 rounded-[40px] shadow-2xl shadow-red-200 flex flex-col items-center gap-4 active:scale-95 transition-all">
      <Cpu size={56} className="animate-pulse" />
      <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">Escanear Brazalete NFC</span>
    </button>
  );

  if (step === 'scanning' || step === 'loading') return (
    <div className="w-full bg-slate-50 p-12 rounded-[40px] border-2 border-myhealth-blue overflow-hidden relative flex flex-col items-center gap-8 shadow-xl">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-myhealth-blue rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 border-t-4 border-myhealth-blue rounded-full animate-spin"></div>
        <Cpu size={48} className="text-myhealth-blue relative z-10" />
      </div>
      <p className="text-xl font-black italic uppercase tracking-tighter text-center text-slate-800">
        {step === 'scanning' ? 'Buscando NFC...' : 'NFC detectado, validando informacion...'}
      </p>
    </div>
  );

  return (
    <div className="w-full space-y-6 animate-in slide-in-from-bottom-8 duration-500 pb-10">
      {/* FICHA VITAL PÚBLICA */}
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-myhealth-red p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span className="font-black italic tracking-widest text-[10px]">FICHA MÉDICA DE EMERGENCIA</span>
          </div>
          <CheckCircle2 size={16} />
        </div>
        
        <div className="p-6 space-y-6">
          {/* Identificación con Foto */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl bg-slate-200">
                <img 
                  src="/assets/patient-photo.png" 
                  alt="Foto del paciente" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"; }}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 border-4 border-white w-6 h-6 rounded-full shadow-sm"></div>
            </div>
            
            <div className="w-full">
              <h2 className="text-3xl font-black text-slate-900 leading-none italic uppercase tracking-tighter">{basicData?.name}</h2>
              <div className="mt-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center justify-center gap-1">
                   <Hash size={10}/> Número de Seguro Social
                 </p>
                 <span className="text-2xl font-black text-slate-800 uppercase tracking-widest block">
                   {basicData?.nss}
                 </span>
              </div>
            </div>
          </div>
          
          {/* Grid de Datos Críticos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Droplet size={10} className="text-myhealth-red" /> Sangre
              </p>
              <p className="text-3xl font-black text-slate-800 leading-none">{basicData?.bloodType}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                <Heart size={10} className="text-myhealth-red" /> Donante
              </p>
              <p className="text-sm font-black text-slate-800 uppercase leading-none truncate">{basicData?.isDonor}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Alergias</p>
              <p className="text-sm font-black text-red-600 uppercase leading-tight truncate">{basicData?.criticalAllergy}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Religión</p>
              <p className="text-sm font-black text-slate-800 uppercase leading-tight truncate">{basicData?.religion}</p>
            </div>
          </div>

          {/* Contactos de Emergencia */}
          <div className="space-y-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Contactos de Auxilio</p>
            {basicData?.contacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-myhealth-blue/10 rounded-full flex items-center justify-center text-myhealth-blue">
                     <Phone size={18} />
                   </div>
                   <div>
                     <p className="text-sm font-black text-slate-800 leading-tight">{contact.name}</p>
                     <p className="text-[11px] font-bold text-slate-400">{contact.phone}</p>
                   </div>
                </div>
                <a href={`tel:${contact.phone}`} className="bg-myhealth-blue text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform">
                  <Phone size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BÓVEDA PROTEGIDA (HISTORIAL PRIVADO) */}
      <div className="bg-white rounded-[40px] p-8 border-2 border-slate-100 shadow-xl overflow-hidden relative">
        {!isAuthorized ? (
          <div className="space-y-6 text-center animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-myhealth-blue border border-blue-100">
                <Lock size={32} />
              </div>
              <h4 className="font-black text-slate-900 uppercase italic tracking-tighter text-xl leading-none">Bóveda Médica</h4>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Historial Privado Cifrado</p>
            </div>
            <div className="space-y-4">
              <div className="w-full max-w-[280px] mx-auto">
                <input 
                  type="password" 
                  maxLength="4"
                  placeholder="****" 
                  className="w-full p-5 rounded-[24px] border-2 border-slate-100 outline-none font-black text-center text-4xl tracking-[0.8em] bg-slate-50/50 text-slate-800 focus:border-myhealth-blue transition-all pr-0 pl-[0.8em]"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <button onClick={handleAuthorize} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                Desbloquear Historial
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-widest">
                <Unlock size={14} /> Acceso Autorizado
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1 tracking-widest mb-2">
                  <FileText size={10} /> Historial Clínico
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 text-xs font-semibold border border-slate-100 leading-relaxed">
                  {basicData?.history}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Enfermedad</p>
                  <p className="text-slate-800 text-xs font-black uppercase italic">{basicData?.chronicDisease}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Medicación</p>
                  <p className="text-slate-800 text-[10px] font-bold leading-tight">{basicData?.baseMedication}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <ActivityView 
                title="Historial de Accesos" 
                subtitle="Registros de esta pulsera en la Blockchain" 
              />
            </div>
          </div>
        )}
      </div>

      <button onClick={() => window.location.reload()} className="w-full text-slate-300 font-bold text-[10px] uppercase tracking-widest py-4">
        Cerrar Sesión de Rescate
      </button>
    </div>
  );
};

export default EmergencyAction;
