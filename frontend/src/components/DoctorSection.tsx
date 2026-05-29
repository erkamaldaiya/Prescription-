interface DoctorData {
  name: string;
  license: string;
  specialization: string;
  clinic: string;
  date: string;
}

interface Props {
  data: DoctorData;
  onChange: (data: DoctorData) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm px-3 py-2';

export default function DoctorSection({ data, onChange }: Props) {
  const set = (key: keyof DoctorData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">4</span>
        Doctor Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Doctor Name *</label>
          <input type="text" value={data.name} onChange={set('name')} placeholder="Dr. John Smith" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">License No.</label>
          <input type="text" value={data.license} onChange={set('license')} placeholder="MED-12345" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Specialization</label>
          <input type="text" value={data.specialization} onChange={set('specialization')} placeholder="General Physician" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Clinic / Hospital</label>
          <input type="text" value={data.clinic} onChange={set('clinic')} placeholder="City Medical Center" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
          <input type="date" value={data.date} onChange={set('date')} className={inputClass} />
        </div>
      </div>

      {/* Signature area */}
      <div className="mt-6 flex justify-end">
        <div className="text-center">
          <div className="w-48 border-b border-gray-400 mb-1 h-10" />
          <p className="text-xs text-gray-500">Doctor's Signature</p>
          {data.name && <p className="text-sm font-semibold text-gray-700 mt-1">{data.name}</p>}
          {data.license && <p className="text-xs text-gray-500">Lic: {data.license}</p>}
        </div>
      </div>
    </section>
  );
}

export type { DoctorData };
