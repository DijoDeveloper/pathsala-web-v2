import { useState } from "react";

type AcademicInfo = {
    previousSchool: string;
    previousClass: string;
    marksOrGrade: string;
};

type SessionInfo = {
    academicYear: string;
    class: string;
    section: string;
};

type PersonalInfo = {
    fullName: string;
    dateOfBirth: string;
    fathersName: string;
    mothersName: string;
    address: string;
};

type InterestInfo = {
    hobbies: string;
    extracurricularActivities: string;
    specialTalents: string;
};

const steps = [
    { id: 1, title: "Academic Details" },
    { id: 2, title: "Session Details" },
    { id: 3, title: "Personal Details" },
    { id: 4, title: "Interest Information" },
];

export default function StudentRegistration() {
    const [step, setStep] = useState(1);

    const [academic, setAcademic] = useState<AcademicInfo>({
        previousSchool: "",
        previousClass: "",
        marksOrGrade: "",
    });

    const [session, setSession] = useState<SessionInfo>({
        academicYear: "",
        class: "",
        section: "",
    });

    const [personal, setPersonal] = useState<PersonalInfo>({
        fullName: "",
        dateOfBirth: "",
        fathersName: "",
        mothersName: "",
        address: "",
    });

    const [interest, setInterest] = useState<InterestInfo>({
        hobbies: "",
        extracurricularActivities: "",
        specialTalents: "",
    });

    function next() {
        setStep((s) => Math.min(s + 1, steps.length));
    }

    function prev() {
        setStep((s) => Math.max(s - 1, 1));
    }

    function handleSubmit() {
        // Handle form submission
        console.log({
            academic,
            session,
            personal,
            interest,
        });
        // Add your submission logic here
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
            <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-white/90">
                Student Registration
            </h2>

            {/* Stepper */}
            <div className="mt-6">
                <div className="flex items-center justify-center gap-4 overflow-x-auto">
                    {steps.map((s, i) => {
                        const active = step === s.id;
                        const completed = step > s.id;
                        return (
                            <div key={s.id} className="flex items-center gap-4">
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    <span
                                        className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${active || completed
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
                {/* Step 1: Academic Details */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <h3 className="text-lg font-medium mb-4">Academic Information</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Previous School Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter previous school name"
                                    value={academic.previousSchool}
                                    onChange={(e) => setAcademic({ ...academic, previousSchool: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Previous Class <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={academic.previousClass}
                                    onChange={(e) => setAcademic({ ...academic, previousClass: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                >
                                    <option value="">Select class</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="LKG">LKG</option>
                                    <option value="UKG">UKG</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={`Class ${i + 1}`}>
                                            Class {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Marks/Grade <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter marks or grade"
                                    value={academic.marksOrGrade}
                                    onChange={(e) => setAcademic({ ...academic, marksOrGrade: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Session Details */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-3">
                                <h3 className="text-lg font-medium mb-4">Session Information</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Academic Year <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={session.academicYear}
                                    onChange={(e) => setSession({ ...session, academicYear: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                >
                                    <option value="">Select academic year</option>
                                    <option value="2024-2025">2024-2025</option>
                                    <option value="2023-2024">2023-2024</option>
                                    <option value="2022-2023">2022-2023</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Class <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={session.class}
                                    onChange={(e) => setSession({ ...session, class: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                >
                                    <option value="">Select class</option>
                                    <option value="Nursery">Nursery</option>
                                    <option value="LKG">LKG</option>
                                    <option value="UKG">UKG</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={`Class ${i + 1}`}>
                                            Class {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Section <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={session.section}
                                    onChange={(e) => setSession({ ...session, section: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                >
                                    <option value="">Select section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Personal Details */}
                {step === 3 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={personal.fullName}
                                    onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={personal.dateOfBirth}
                                    onChange={(e) => setPersonal({ ...personal, dateOfBirth: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Father's Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Father's name"
                                    value={personal.fathersName}
                                    onChange={(e) => setPersonal({ ...personal, fathersName: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mother's Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mother's name"
                                    value={personal.mothersName}
                                    onChange={(e) => setPersonal({ ...personal, mothersName: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    placeholder="Enter full address"
                                    rows={3}
                                    value={personal.address}
                                    onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Interest Information */}
                {step === 4 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <h3 className="text-lg font-medium mb-4">Interest Information</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hobbies
                                </label>
                                <textarea
                                    placeholder="Enter hobbies (comma separated)"
                                    rows={2}
                                    value={interest.hobbies}
                                    onChange={(e) => setInterest({ ...interest, hobbies: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Extra-curricular Activities
                                </label>
                                <textarea
                                    placeholder="List any extra-curricular activities"
                                    rows={2}
                                    value={interest.extracurricularActivities}
                                    onChange={(e) => setInterest({ ...interest, extracurricularActivities: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Special Talents
                                </label>
                                <textarea
                                    placeholder="Mention any special talents or achievements"
                                    rows={2}
                                    value={interest.specialTalents}
                                    onChange={(e) => setInterest({ ...interest, specialTalents: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={prev}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                        Back
                    </button>
                ) : (
                    <div></div>
                )}

                {step < steps.length ? (
                    <button
                        type="button"
                        onClick={next}
                        className="ml-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                    >
                        Continue
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="ml-auto px-6 py-2 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}
