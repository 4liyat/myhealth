import React, { useState } from 'react';
import { ShieldCheck, CreditCard, ChevronRight, Bell, Eye, FileText, Activity, Phone, Heart, Hash, Globe, Lock, User } from 'lucide-react';

const ProfileView = ({ data }) => {
  const [userData] = useState({
    name: data?.name || "Juan Pérez",
    phone: data?.phone || "No registrado",
    nss: data?.nss || "No registrado",
    bloodType: data?.bloodType || "O+",
    religion: data?.religion || "No especificada",
    chronicDisease: data?.chronicDisease || "Ninguna registrada",
    allergies: data?.allergies || "Ninguna registrada",
    baseMedication: data?.baseMedication || "Sin medicación",
    history: data?.history || "Sin historial registrado",
    isDonor: data?.isDonor ?? false,
    pin: data?.pin || "****",
    contacts: data?.contacts || [
      { 
        name: "María García", 
        phone: "+52 33 1234 5678",
        relation: "Contacto Principal",
        email: "maria@example.com",
        active: true
      }
    ]
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* HEADER DEL PERFIL */}
      <div className="flex flex-col items-center text-center space-y-4 pt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-200 flex items-center justify-center text-slate-400">
            <User size={48} />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-myhealth-blue border-2 border-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
            <ShieldCheck size={14} className="text-white" />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">{userData.name}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Blockchain: {userData.nss}</p>
        </div>
      </div>

      {/* SECCIÓN 1: DATOS DE IDENTIDAD */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
          <ShieldCheck size={14} /> Información de Identidad
        </h3>
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><Hash size={10}/> NSS</p>
              <p className="text-sm font-bold text-slate-800">{userData.nss}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><Phone size={10}/> Teléfono</p>
              <p className="text-sm font-bold text-slate-800">{userData.phone}</p>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><Lock size={10}/> PIN de Seguridad</p>
              <p className="text-xs font-mono font-bold text-slate-500">**** (Configurado)</p>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="text-[9px] font-black text-myhealth-blue uppercase">Protección Activa</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: FICHA MÉDICA COMPLETA */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <Eye size={14} className="text-myhealth-red" /> Ficha Médica
          </h3>
          <span className="text-[9px] bg-red-100 text-myhealth-red px-2 py-0.5 rounded-full font-bold uppercase">Uso en Emergencias</span>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-xl border-l-[12px] border-myhealth-red relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Activity size={80} />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Sangre</p>
                <p className="text-xl font-black text-myhealth-red leading-none">{userData.bloodType}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Donador</p>
                <p className={`text-xs font-black leading-none ${userData.isDonor ? 'text-green-600' : 'text-slate-400'}`}>
                  {userData.isDonor ? 'SÍ' : 'NO'}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-bold text-slate-400 uppercase">Religión</p>
                <p className="text-[10px] font-black text-slate-800 leading-none truncate">{userData.religion}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1 tracking-widest mb-2">
                  <FileText size={10} /> Alergias & Historial Clínico
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 leading-relaxed">
                  <p className="text-xs font-black text-red-600 uppercase">Críticas: {userData.allergies}</p>
                  <p className="text-xs font-semibold text-slate-700">{userData.history}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Enfermedades</p>
                  <p className="text-slate-800 text-xs font-black uppercase italic">{userData.chronicDisease}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Medicación</p>
                  <p className="text-myhealth-blue text-xs font-bold leading-tight">{userData.baseMedication}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: RED DE APOYO */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
          <Bell size={14} className="text-myhealth-red" /> Contactos SOS
        </h3>
        <div className="space-y-3">
          {userData.contacts.map((contact, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-[24px] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-myhealth-red/10 rounded-full flex items-center justify-center text-myhealth-red text-xs font-black">
                  {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{contact.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{contact.relation} • {contact.phone}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          ))}
        </div>
      </section>

      <div className="p-6 bg-slate-50 rounded-[32px] border border-dashed border-slate-200 text-center">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          Sincronizado con Monad Blockchain
        </p>
      </div>

    </div>
  );
};

export default ProfileView;
