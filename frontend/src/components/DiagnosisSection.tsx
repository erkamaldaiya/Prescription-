import AutocompleteTextarea from './AutocompleteTextarea';

interface Props {
  diagnosis: string;
  chiefComplaint: string;
  onDiagnosisChange: (val: string) => void;
  onChiefComplaintChange: (val: string) => void;
  provider: string;
  context: Record<string, string>;
}

const inputClass =
  'w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm px-3 py-2';

export default function DiagnosisSection({
  diagnosis,
  chiefComplaint,
  onDiagnosisChange,
  onChiefComplaintChange,
  provider,
  context,
}: Props) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
        Diagnosis
        <span className="ml-1 text-xs font-normal text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">AI Autocomplete</span>
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Chief Complaint</label>
          <input
            type="text"
            value={chiefComplaint}
            onChange={(e) => onChiefComplaintChange(e.target.value)}
            placeholder="Main reason for visit"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Diagnosis / Clinical Notes
            <span className="ml-2 text-blue-400 font-normal">— AI will suggest as you type</span>
          </label>
          <AutocompleteTextarea
            value={diagnosis}
            onChange={onDiagnosisChange}
            field="diagnosis"
            context={context}
            provider={provider}
            placeholder="Start typing diagnosis..."
            rows={3}
          />
        </div>
      </div>
    </section>
  );
}
