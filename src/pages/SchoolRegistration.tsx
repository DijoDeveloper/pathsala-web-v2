import { useState } from "react";

type BasicInfo = {
  schoolName: string;
  affiliationNumber: string;
  address: string;
};

type ContactInfo = {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
};

type AcademicInfo = {
  totalClasses: string;
  academicYearStart: string; // ISO month string e.g. 2025-06
};

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Contact Details" },
  { id: 3, title: "Academic Setup" },
  { id: 4, title: "Review & Submit" },
];

export default function SchoolRegistration() {
  const [step, setStep] = useState(1);
  const [basic, setBasic] = useState<BasicInfo>({
    schoolName: "",
    affiliationNumber: "",
    address: "",
  });
  const [contact, setContact] = useState<ContactInfo>({
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [academic, setAcademic] = useState<AcademicInfo>({
    totalClasses: "",
    academicYearStart: "",
  });

  function next() {
    setStep((s) => Math.min(s + 1, steps.length));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 1));
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-white/90">
        School Registration
      </h2>

      {/* Stepper */}
      <div className="mt-6">
        <div className="flex items-center justify-center gap-4">
          {steps.map((s, i) => {
            const active = step === s.id;
            const completed = step > s.id;
            return (
              <div key={s.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 whitespace-nowrap`}>
                  <span
                    className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${
                      active || completed
                        ? "bg-brand-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s.id}
                  </span>
                  <span className={`text-sm ${active ? "text-gray-900" : "text-gray-400"}`}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block h-px w-16 bg-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="mt-8">
        {step === 1 && (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                School Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="School Name"
                value={basic.schoolName}
                onChange={(e) => setBasic({ ...basic, schoolName: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
            <div className="col-span-12 md:col-span-6 xl:col-span-4">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Affiliation Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Affiliation Number"
                value={basic.affiliationNumber}
                onChange={(e) => setBasic({ ...basic, affiliationNumber: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
            <div className="col-span-12 md:col-span-12 xl:col-span-4">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                School Address
              </label>
              <textarea
                placeholder="School Address"
                rows={3}
                value={basic.address}
                onChange={(e) => setBasic({ ...basic, address: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Primary Contact"
                value={contact.contactName}
                onChange={(e) => setContact({ ...contact, contactName: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={contact.contactPhone}
                onChange={(e) => setContact({ ...contact, contactPhone: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
            <div className="col-span-12">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={contact.contactEmail}
                onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Total Classes
              </label>
              <input
                type="number"
                min={1}
                placeholder="e.g. 12"
                value={academic.totalClasses}
                onChange={(e) => setAcademic({ ...academic, totalClasses: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Academic Year Start
              </label>
              <input
                type="month"
                value={academic.academicYearStart}
                onChange={(e) => setAcademic({ ...academic, academicYearStart: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-0 focus:border-brand-500 dark:border-gray-800 dark:bg-transparent"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90">Basic Information</h4>
                <ul className="space-y-1">
                  <li><span className="text-gray-500">School Name:</span> {basic.schoolName || "—"}</li>
                  <li><span className="text-gray-500">Affiliation Number:</span> {basic.affiliationNumber || "—"}</li>
                  <li><span className="text-gray-500">Address:</span> {basic.address || "—"}</li>
                </ul>
              </div>
              <div className="col-span-12 md:col-span-6">
                <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90">Contact Details</h4>
                <ul className="space-y-1">
                  <li><span className="text-gray-500">Name:</span> {contact.contactName || "—"}</li>
                  <li><span className="text-gray-500">Phone:</span> {contact.contactPhone || "—"}</li>
                  <li><span className="text-gray-500">Email:</span> {contact.contactEmail || "—"}</li>
                </ul>
              </div>
              <div className="col-span-12">
                <h4 className="mb-2 mt-4 font-semibold text-gray-800 dark:text-white/90">Academic Setup</h4>
                <ul className="space-y-1">
                  <li><span className="text-gray-500">Total Classes:</span> {academic.totalClasses || "—"}</li>
                  <li><span className="text-gray-500">Academic Year Start:</span> {academic.academicYearStart || "—"}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={prev}
          disabled={step === 1}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
        >
          Back
        </button>
        <button
          onClick={next}
          className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          {step === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
