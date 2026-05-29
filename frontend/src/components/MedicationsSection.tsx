import AutocompleteInput from './AutocompleteInput';
import AutocompleteTextarea from './AutocompleteTextarea';

export interface Medication {
  id: string;
  drugName: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Props {
  medications: Medication[];
  onChange: (meds: Medication[]) => void;
  provider: string;
  context: Record<string, string>;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm px-3 py-2';

function newMed(): Medication {
  return { id: crypto.randomUUID(), drugName: '', dose: '', frequency: '', duration: '', instructions: '' };
}

export default function MedicationsSection({ medications, onChange, provider, context }: Props) {
  const update = (id: string, key: keyof Medication, val: string) =>
    onChange(medications.map((m) => (m.id === id ? { ...m, [key]: val } : m)));

  const remove = (id: string) => onChange(medications.filter((m) => m.id !== id));

  const add = () => onChange([...medications, newMed()]);

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
        Medications
        <span className="ml-1 text-xs font-normal text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">AI Autocomplete</span>
      </h2>

      <div className="space-y-4">
        {medications.map((med, idx) => (
          <div key={med.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Medication {idx + 1}
              </span>
              {medications.length > 1 && (
                <button
                  onClick={() => remove(med.id)}
                  className="text-red-400 hover:text-red-600 text-xs font-medium no-print transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Drug Name</label>
                <AutocompleteInput
                  value={med.drugName}
                  onChange={(v) => update(med.id, 'drugName', v)}
                  field="medication_name"
                  context={context}
                  provider={provider}
                  placeholder="e.g. Amoxicillin"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Dose</label>
                <input
                  type="text"
                  value={med.dose}
                  onChange={(e) => update(med.id, 'dose', e.target.value)}
                  placeholder="e.g. 500mg"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Frequency</label>
                <select
                  value={med.frequency}
                  onChange={(e) => update(med.id, 'frequency', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily (BD)</option>
                  <option value="Three times daily">Three times daily (TDS)</option>
                  <option value="Four times daily">Four times daily (QID)</option>
                  <option value="Every 4 hours">Every 4 hours</option>
                  <option value="Every 6 hours">Every 6 hours</option>
                  <option value="Every 8 hours">Every 8 hours</option>
                  <option value="At night">At night (HS)</option>
                  <option value="As needed">As needed (PRN)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                <input
                  type="text"
                  value={med.duration}
                  onChange={(e) => update(med.id, 'duration', e.target.value)}
                  placeholder="e.g. 5 days"
                  className={inputClass}
                />
              </div>
              <div className="col-span-2 sm:col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Instructions
                  <span className="ml-2 text-blue-400 font-normal">— AI suggests</span>
                </label>
                <AutocompleteTextarea
                  value={med.instructions}
                  onChange={(v) => update(med.id, 'instructions', v)}
                  field="instructions"
                  context={{ ...context, drugName: med.drugName }}
                  provider={provider}
                  placeholder="e.g. Take after meals with water"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={add}
          className="no-print flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Medication
        </button>
      </div>
    </section>
  );
}
