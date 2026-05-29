interface PatientData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  contact: string;
}

interface Props {
  data: PatientData;
  onChange: (data: PatientData) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm px-3 py-2';

export default function PatientInfo({ data, onChange }: Props) {
  const set = (key: keyof PatientData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
        Patient Information
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={set('name')}
            placeholder="Patient full name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Age</label>
          <input
            type="text"
            value={data.age}
            onChange={set('age')}
            placeholder="e.g. 35"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
          <select value={data.gender} onChange={set('gender')} className={inputClass}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Weight (kg)</label>
          <input
            type="text"
            value={data.weight}
            onChange={set('weight')}
            placeholder="e.g. 70"
            className={inputClass}
          />
        </div>
        <div className="col-span-2 sm:col-span-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">Contact / Phone</label>
          <input
            type="text"
            value={data.contact}
            onChange={set('contact')}
            placeholder="Phone number"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}

export type { PatientData };
