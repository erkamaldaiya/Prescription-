import { useState } from 'react';
import ProviderSettings, { AIProvider } from './ProviderSettings';
import PatientInfo, { PatientData } from './PatientInfo';
import DiagnosisSection from './DiagnosisSection';
import MedicationsSection, { Medication } from './MedicationsSection';
import DoctorSection, { DoctorData } from './DoctorSection';

const defaultPatient: PatientData = { name: '', age: '', gender: '', weight: '', contact: '' };
const defaultDoctor: DoctorData = {
  name: '',
  license: '',
  specialization: '',
  clinic: '',
  date: new Date().toISOString().split('T')[0],
};
const defaultMedication: Medication = {
  id: crypto.randomUUID(),
  drugName: '',
  dose: '',
  frequency: '',
  duration: '',
  instructions: '',
};

export default function PrescriptionForm() {
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [patient, setPatient] = useState<PatientData>(defaultPatient);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState<Medication[]>([defaultMedication]);
  const [doctor, setDoctor] = useState<DoctorData>(defaultDoctor);

  const aiContext = {
    patientAge: patient.age,
    patientGender: patient.gender,
    diagnosis,
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Prescription</h1>
          <p className="text-sm text-gray-500 mt-0.5">AI-powered autocomplete as you type</p>
        </div>
        <div className="flex items-center gap-3">
          <ProviderSettings provider={provider} onChange={setProvider} />
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Prescription Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden print-page">
        {/* Prescription Header (print letterhead) */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Medical Prescription</span>
              </div>
              <h2 className="text-xl font-bold">{doctor.clinic || 'Clinic / Hospital Name'}</h2>
              {doctor.name && <p className="text-blue-200 text-sm mt-0.5">{doctor.name}{doctor.specialization ? ` — ${doctor.specialization}` : ''}</p>}
            </div>
            <div className="text-right text-sm text-blue-200">
              <p>Rx</p>
              <p className="text-xs mt-1">{doctor.date}</p>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="p-8 space-y-8">
          <PatientInfo data={patient} onChange={setPatient} />
          <hr className="border-gray-100" />
          <DiagnosisSection
            diagnosis={diagnosis}
            chiefComplaint={chiefComplaint}
            onDiagnosisChange={setDiagnosis}
            onChiefComplaintChange={setChiefComplaint}
            provider={provider}
            context={aiContext}
          />
          <hr className="border-gray-100" />
          <MedicationsSection
            medications={medications}
            onChange={setMedications}
            provider={provider}
            context={aiContext}
          />
          <hr className="border-gray-100" />
          <DoctorSection data={doctor} onChange={setDoctor} />
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
          This prescription is generated digitally. Please verify with the prescribing physician.
        </div>
      </div>

      {/* AI hint */}
      <div className="max-w-3xl mx-auto mt-4 no-print">
        <p className="text-xs text-center text-gray-400">
          AI autocomplete powered by <span className="font-medium capitalize">{provider}</span> — type in diagnosis or medication fields, then press Tab to accept suggestions
        </p>
      </div>
    </div>
  );
}
