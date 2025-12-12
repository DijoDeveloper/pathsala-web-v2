import { useState } from "react";

type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
};

type ProfessionalInfo = {
  designation: string;
  joiningDate: string;
  schoolId: string;
};

type EmergencyContact = {
  emergencyContactName: string;
  emergencyContactPhone: string;
  healthConditions: string;
};

const steps = [
  { id: 1, title: "Personal Details" },
  { id: 2, title: "Professional Details" },
  { id: 3, title: "Emergency Contact & Health" },
  { id: 4, title: "Review" },
];

const designations = [
  "Teacher",
  "Assistant Teacher",
  "Principal",
  "Vice Principal",
  "Administrative Staff",
  "Support Staff",
  "Counselor",
  "Librarian",
  "Lab Technician",
];

const schools = [
  { id: 1, name: "Central School" },
  { id: 2, name: "North Branch" },
  { id: 3, name: "South Branch" },
  { id: 4, name: "East Campus" },
  { id: 5, name: "West Campus" },
];

export default function StaffRegistration() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [personal, setPersonal] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  });

  const [professional, setProfessional] = useState<ProfessionalInfo>({
    designation: "",
    joiningDate: "",
    schoolId: "",
  });

  const [emergency, setEmergency] = useState<EmergencyContact>({
    emergencyContactName: "",
    emergencyContactPhone: "",
    healthConditions: "",
  });

  const validatePersonalInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!personal.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!personal.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!personal.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!personal.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(personal.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    if (!personal.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!personal.gender) newErrors.gender = "Gender is required";
    if (!personal.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfessionalInfo = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!professional.designation)
      newErrors.designation = "Designation is required";
    if (!professional.joiningDate)
      newErrors.joiningDate = "Joining date is required";
    if (!professional.schoolId) newErrors.schoolId = "School is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmergencyContact = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!emergency.emergencyContactName.trim()) {
      newErrors.emergencyContactName = "Emergency contact name is required";
    }
    if (!emergency.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = "Emergency contact phone is required";
    } else if (
      !/^\d{10}$/.test(emergency.emergencyContactPhone.replace(/\D/g, ""))
    ) {
      newErrors.emergencyContactPhone =
        "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    let isValid = false;

    if (step === 1) {
      isValid = validatePersonalInfo();
    } else if (step === 2) {
      isValid = validateProfessionalInfo();
    } else if (step === 3) {
      isValid = validateEmergencyContact();
    } else {
      isValid = true;
    }

    if (isValid) {
      setStep((s) => Math.min(s + 1, steps.length));
    }
  };

  const prev = () => {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  };

  const handleSubmit = () => {
    const payload = {
      firstName: personal.firstName,
      lastName: personal.lastName,
      email: personal.email,
      phoneNumber: personal.phoneNumber,
      dateOfBirth: personal.dateOfBirth,
      gender: personal.gender,
      address: personal.address,
      designation: professional.designation,
      joiningDate: professional.joiningDate,
      schoolId: parseInt(professional.schoolId),
      emergencyContactName: emergency.emergencyContactName,
      emergencyContactPhone: emergency.emergencyContactPhone,
      healthConditions: emergency.healthConditions,
    };

    console.log("Staff Registration Payload:", payload);
    // Add your API call or submission logic here
    alert("Staff registration submitted successfully!");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] md:p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-white/90">
        Staff Registration
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
                    className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${
                      active || completed
                        ? "bg-brand-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {s.id}
                  </span>
                  <span
                    className={`text-sm ${
                      active ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
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
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={personal.firstName}
                  onChange={(e) => {
                    setPersonal({ ...personal, firstName: e.target.value });
                    if (errors.firstName)
                      setErrors({ ...errors, firstName: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={personal.lastName}
                  onChange={(e) => {
                    setPersonal({ ...personal, lastName: e.target.value });
                    if (errors.lastName) setErrors({ ...errors, lastName: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={personal.email}
                  onChange={(e) => {
                    setPersonal({ ...personal, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={personal.phoneNumber}
                  onChange={(e) => {
                    setPersonal({ ...personal, phoneNumber: e.target.value });
                    if (errors.phoneNumber)
                      setErrors({ ...errors, phoneNumber: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={personal.dateOfBirth}
                  onChange={(e) => {
                    setPersonal({ ...personal, dateOfBirth: e.target.value });
                    if (errors.dateOfBirth)
                      setErrors({ ...errors, dateOfBirth: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  value={personal.gender}
                  onChange={(e) => {
                    setPersonal({ ...personal, gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter full address"
                  rows={3}
                  value={personal.address}
                  onChange={(e) => {
                    setPersonal({ ...personal, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Professional Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-3">
                <h3 className="text-lg font-medium mb-4">
                  Professional Information
                </h3>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <select
                  value={professional.designation}
                  onChange={(e) => {
                    setProfessional({
                      ...professional,
                      designation: e.target.value,
                    });
                    if (errors.designation)
                      setErrors({ ...errors, designation: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.designation ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                >
                  <option value="">Select designation</option>
                  {designations.map((des) => (
                    <option key={des} value={des}>
                      {des}
                    </option>
                  ))}
                </select>
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joining Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={professional.joiningDate}
                  onChange={(e) => {
                    setProfessional({
                      ...professional,
                      joiningDate: e.target.value,
                    });
                    if (errors.joiningDate)
                      setErrors({ ...errors, joiningDate: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.joiningDate ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.joiningDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.joiningDate}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School <span className="text-red-500">*</span>
                </label>
                <select
                  value={professional.schoolId}
                  onChange={(e) => {
                    setProfessional({
                      ...professional,
                      schoolId: e.target.value,
                    });
                    if (errors.schoolId) setErrors({ ...errors, schoolId: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.schoolId ? "border-red-500" : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                >
                  <option value="">Select school</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id.toString()}>
                      {school.name}
                    </option>
                  ))}
                </select>
                {errors.schoolId && (
                  <p className="text-red-500 text-sm mt-1">{errors.schoolId}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Emergency Contact & Health Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <h3 className="text-lg font-medium mb-4">
                  Emergency Contact & Health Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter emergency contact name"
                  value={emergency.emergencyContactName}
                  onChange={(e) => {
                    setEmergency({
                      ...emergency,
                      emergencyContactName: e.target.value,
                    });
                    if (errors.emergencyContactName)
                      setErrors({ ...errors, emergencyContactName: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.emergencyContactName
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.emergencyContactName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Phone{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter emergency contact phone"
                  value={emergency.emergencyContactPhone}
                  onChange={(e) => {
                    setEmergency({
                      ...emergency,
                      emergencyContactPhone: e.target.value,
                    });
                    if (errors.emergencyContactPhone)
                      setErrors({ ...errors, emergencyContactPhone: "" });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.emergencyContactPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none`}
                />
                {errors.emergencyContactPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Health Conditions
                </label>
                <textarea
                  placeholder="Enter any health conditions or medical conditions (Optional)"
                  rows={4}
                  value={emergency.healthConditions}
                  onChange={(e) =>
                    setEmergency({
                      ...emergency,
                      healthConditions: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-6">Review Information</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Please review all the information below before submitting.
                </p>
              </div>

              {/* Personal Details Review */}
              <div className="border-l-4 border-brand-600 pl-4 py-2">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Personal Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">First Name</p>
                    <p className="text-gray-900 font-medium">
                      {personal.firstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Name</p>
                    <p className="text-gray-900 font-medium">
                      {personal.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-gray-900 font-medium">
                      {personal.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone Number</p>
                    <p className="text-gray-900 font-medium">
                      {personal.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p className="text-gray-900 font-medium">
                      {personal.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Gender</p>
                    <p className="text-gray-900 font-medium">
                      {personal.gender}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Address</p>
                    <p className="text-gray-900 font-medium">
                      {personal.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Details Review */}
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Professional Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Designation</p>
                    <p className="text-gray-900 font-medium">
                      {professional.designation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Joining Date</p>
                    <p className="text-gray-900 font-medium">
                      {professional.joiningDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">School</p>
                    <p className="text-gray-900 font-medium">
                      {
                        schools.find(
                          (s) => s.id.toString() === professional.schoolId
                        )?.name
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Health Information Review */}
              <div className="border-l-4 border-orange-600 pl-4 py-2">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Emergency Contact & Health Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Contact Name</p>
                    <p className="text-gray-900 font-medium">
                      {emergency.emergencyContactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Contact Phone</p>
                    <p className="text-gray-900 font-medium">
                      {emergency.emergencyContactPhone}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Health Conditions</p>
                    <p className="text-gray-900 font-medium">
                      {emergency.healthConditions || "None"}
                    </p>
                  </div>
                </div>
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
