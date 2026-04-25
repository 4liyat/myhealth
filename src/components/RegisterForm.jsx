import React, { useState } from 'react';
import { User, Droplet, ShieldAlert, CheckCircle, ArrowRight, ArrowLeft, Cpu, Heart, Phone, Lock, FileText, Edit2 } from 'lucide-react';

const RegisterForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nss: '',
    bloodType: '',
    religion: '',
    chronicDisease: '',
    baseMedication: '',
    history: '',
    pin: '',
    isDonor: 'No',
    contact1Name: '',
    contact1Phone: '',
    contact2Name: '',
    contact2Phone: ''
  });
  const [isMinting, setIsMinting] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const goToStep = (s) => setStep(s);

  const handleFinish = async () => {
    if (formData.pin.length !== 4) {
      alert("El PIN debe ser de 4 dígitos");
      return;
    }
    setIsMinting(true);
    console.log("Registrando en Monad...", formData);
    await new Promise(r => setTimeout(r, 3000));
    setIsMinting(false);
    onComplete(formData);
  };

  const inputStyle = "w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-myhealth-blue outline-none transition-all font-medium text-slate-700 bg-white shadow-sm text-sm";
  const labelStyle = "text-[10px] font-black uppercase text-slate-400 ml-4 mb-1 block tracking-widest";

  if (isMinting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center animate-in fade-in duration-500">
        <div className="relative">
          <Cpu size={80} className="text-myhealth-blue animate-spin duration-[3000ms]" />
          <div className="absolute inset-0 border-4 border-myhealth-blue rounded-full animate-ping opacity-20"></div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase">Cifrando Datos</h3>
          <p className="text-slate-500 text-sm font-medium max-w-[250px]">Guardando tu identidad médica en la red de seguridad Monad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-50 animate-in slide-in-from-bottom-8 duration-500 pb-10">
      {/* Progreso */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${step >= i ? 'bg-myhealth-blue' : 'bg-slate-100'}`}></div>
        ))}
      </div>

      {/* PASO 1: Identificación */}
      {step === 1 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <header>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Identidad</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Información oficial</p>
          </header>
          
          <div>
            <label className={labelStyle}>Nombre Completo</label>
            <input type="text" className={inputStyle} placeholder="Nombre y Apellidos" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyle}>Teléfono</label>
              <input type="tel" className={inputStyle} placeholder="Tu número" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className={labelStyle}>NSS</label>
              <input type="text" className={inputStyle} placeholder="Seguro Social" value={formData.nss} onChange={(e) => setFormData({...formData, nss: e.target.value})} />
            </div>
          </div>

          <button onClick={handleNext} disabled={!formData.name || !formData.nss} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 mt-4">
            Siguiente <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* PASO 2: Datos Médicos */}
      {step === 2 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <header>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Ficha Médica</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Vital para rescate</p>
          </header>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyle}>Sangre</label>
              <select className={inputStyle} value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})}>
                <option value="">Tipo</option>
                <option value="O+">O+</option><option value="O-">O-</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>¿Donador?</label>
              <select className={inputStyle} value={formData.isDonor} onChange={(e) => setFormData({...formData, isDonor: e.target.value})}>
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelStyle}>Religión (Opcional)</label>
              <input type="text" className={inputStyle} placeholder="Ej. Católico..." value={formData.religion} onChange={(e) => setFormData({...formData, religion: e.target.value})} />
            </div>
            <div>
              <label className={labelStyle}>Enfermedad Crónica</label>
              <input type="text" className={inputStyle} placeholder="Ej. Diabetes..." value={formData.chronicDisease} onChange={(e) => setFormData({...formData, chronicDisease: e.target.value})} />
            </div>
          </div>

          <div>
            <label className={labelStyle}>Medicamento Base / Historial</label>
            <textarea 
              className={`${inputStyle} h-20 resize-none`} 
              placeholder="Ej. Insulina, Cirugía de apéndice (2020)..." 
              value={formData.history} 
              onChange={(e) => setFormData({...formData, history: e.target.value})}
            />
          </div>

          <div className="flex gap-3">
            <button onClick={handleBack} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest">Atrás</button>
            <button onClick={handleNext} className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2">Siguiente <ArrowRight size={18} /></button>
          </div>
        </div>
      )}

      {/* PASO 3: Contactos SOS */}
      {step === 3 && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <header>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Contactos SOS</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">¿A quién avisamos?</p>
          </header>

          <div className="bg-slate-50 p-4 rounded-3xl space-y-4">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Phone size={10} /> Contacto Principal</p>
            <input type="text" className={inputStyle} placeholder="Nombre del contacto" value={formData.contact1Name} onChange={(e) => setFormData({...formData, contact1Name: e.target.value})} />
            <input type="tel" className={inputStyle} placeholder="Teléfono" value={formData.contact1Phone} onChange={(e) => setFormData({...formData, contact1Phone: e.target.value})} />
          </div>

          <div className="flex gap-3">
            <button onClick={handleBack} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest">Atrás</button>
            <button onClick={handleNext} disabled={!formData.contact1Name || !formData.contact1Phone} className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2">Siguiente <ArrowRight size={18} /></button>
          </div>
        </div>
      )}

      {/* PASO 4: Seguridad (PIN) */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <header className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-myhealth-blue mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">PIN de Bóveda</h2>
            <p className="text-slate-500 text-xs font-medium px-4">Solo los rescatistas autorizados verán tu historial al ingresar este PIN.</p>
          </header>

          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-[280px]">
              <input 
                type="password" 
                maxLength="4"
                className="w-full text-center text-4xl tracking-[0.8em] font-black p-5 rounded-3xl border-2 border-slate-100 focus:border-myhealth-blue outline-none transition-all bg-slate-50/50 pr-0 pl-[0.8em]"
                placeholder="****"
                value={formData.pin}
                onChange={(e) => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">4 dígitos numéricos</p>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={handleBack} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest">Atrás</button>
            <button onClick={handleNext} disabled={formData.pin.length !== 4} className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50">Revisar <ArrowRight size={18} /></button>
          </div>
        </div>
      )}

      {/* PASO 5: Revisión Final */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <header className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Revisión Final</h2>
            <p className="text-slate-500 text-xs font-medium">Verifica tus datos antes de subirlos a la red.</p>
          </header>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border-y border-slate-50 py-4">
            {/* Sección 1: Personal */}
            <div className="bg-slate-50 p-4 rounded-3xl relative group">
              <button onClick={() => goToStep(1)} className="absolute top-4 right-4 text-myhealth-blue opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 size={16} />
              </button>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><User size={10}/> Personal</p>
              <p className="text-sm font-black text-slate-800 uppercase">{formData.name}</p>
              <p className="text-[10px] text-slate-500 font-bold">NSS: {formData.nss} • Tel: {formData.phone}</p>
            </div>

            {/* Sección 2: Médica */}
            <div className="bg-slate-50 p-4 rounded-3xl relative group">
              <button onClick={() => goToStep(2)} className="absolute top-4 right-4 text-myhealth-blue opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 size={16} />
              </button>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Droplet size={10}/> Médica</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="bg-white p-2 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Sangre</p>
                  <p className="text-xs font-black text-myhealth-red">{formData.bloodType}</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-bold text-slate-400 uppercase">Religión</p>
                  <p className="text-xs font-black text-slate-800">{formData.religion || 'N/A'}</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium"><strong>Crónica:</strong> {formData.chronicDisease || 'Ninguna'}</p>
              <p className="text-[10px] text-slate-700 font-medium truncate"><strong>Historial:</strong> {formData.history || 'Sin registros'}</p>
            </div>

            {/* Sección 3: Seguridad */}
            <div className="bg-slate-50 p-4 rounded-3xl relative group">
              <button onClick={() => goToStep(4)} className="absolute top-4 right-4 text-myhealth-blue opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 size={16} />
              </button>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Lock size={10}/> Seguridad</p>
              <p className="text-sm font-black text-slate-800 uppercase tracking-widest">PIN: ****</p>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button onClick={handleFinish} className="w-full bg-myhealth-blue text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-95 transition-all">
              VINCULAR Y GUARDAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
