import { useState } from "react";
import { ISchoolCreateData, post } from "../services/apiService";
import { AlertState } from "../services/models/auth-model";
import Alert from "../components/ui/alert/Alert";

interface IAddress {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type SchoolType = 'INTERNATIONAL' | 'NATIONAL' | string;
type BoardType = 'IB' | 'CBSE' | 'ICSE' | string;
type OwnershipType = 'PRIVATE' | 'GOVERNMENT' | string;

interface SchoolFormData {
  name: string;
  schoolCode: string;
  description: string;
  affiliationNumber: string;
  principalName: string;
  establishedYear: number;
  schoolType: SchoolType;
  board: BoardType;
  ownershipType: OwnershipType;
  address: IAddress;
}

type FormErrors = Partial<Record<keyof SchoolFormData, string>> & {
  address?: Partial<Record<keyof IAddress, string>>;
};

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "School Details" },
  { id: 3, title: "Address" },
  { id: 4, title: "Review & Submit" },
];

const currentYear = new Date().getFullYear();

const initialFormData = {
  name: "",
  schoolCode: "",
  description: "",
  affiliationNumber: "",
  principalName: "",
  establishedYear: currentYear,
  schoolType: "INTERNATIONAL",
  board: "CBSE",
  ownershipType: "PRIVATE",
  address: {
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India"
  }
}

export default function SchoolRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SchoolFormData>(initialFormData);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "School name is required";
      if (!formData.schoolCode.trim()) newErrors.schoolCode = "School code is required";
      if (!formData.affiliationNumber.trim()) newErrors.affiliationNumber = "Affiliation number is required";
      if (!formData.principalName.trim()) newErrors.principalName = "Principal name is required";
      if (formData.establishedYear < 1900 || formData.establishedYear > currentYear) {
        newErrors.establishedYear = `Year must be between 1900 and ${currentYear}`;
      }
    } else if (step === 2) {
      if (!formData.schoolType) newErrors.schoolType = "School type is required";
      if (!formData.board) newErrors.board = "Board is required";
      if (!formData.ownershipType) newErrors.ownershipType = "Ownership type is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
    } else if (step === 3) {
      const addressErrors: Partial<Record<keyof IAddress, string>> = {};
      if (!formData.address.addressLine1.trim()) addressErrors.addressLine1 = "Address line is required";
      if (!formData.address.city.trim()) addressErrors.city = "City is required";
      if (!formData.address.state.trim()) addressErrors.state = "State is required";
      if (!formData.address.postalCode.trim()) addressErrors.postalCode = "Postal code is required";
      if (!formData.address.country.trim()) addressErrors.country = "Country is required";

      if (Object.keys(addressErrors).length > 0) {
        newErrors.address = addressErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const next = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Prevent form submission
    }
    if (validateStep()) {
      setStep(s => Math.min(s + 1, steps.length));
    }
  };

  const prev = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const response = await post<any, ISchoolCreateData>('/schools', formData);
      console.log(response);

      if (response.success) {
        // Reset form to initial state
        setFormData(initialFormData);

        // Reset to first step
        setStep(1);

        // Show success message
        setAlert({
          show: true,
          variant: 'success',
          title: 'School Registration Successful!',
          message: 'Start registring staff and students'
        });

        setTimeout(() => {
          setAlert(null);
        }, 3000);

      } else {
        throw new Error(response.error || 'Failed to register school');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setAlert({
        show: true,
        variant: 'error',
        title: 'Registration Failure!',
        message: error.toString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            School Registration
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Complete the following steps to register your school
          </p>
        </div>

        {/* Alert Messages */}
        {alert?.show && (
          <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Alert
                variant={alert.variant}
                title={alert.title}
                message={alert.message}
                showLink={false}
              />
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-5">
              {steps.map((s, i) => (
                <li key={s.id} className="flex items-center">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= s.id
                      ? "bg-brand-500 text-white"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      } text-sm font-medium`}
                  >
                    {s.id}
                  </span>
                  <span
                    className={`ml-2 text-sm font-medium ${step >= s.id
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-500 dark:text-gray-400"
                      }`}
                  >
                    {s.title}
                  </span>
                  {i < steps.length - 1 && (
                    <svg
                      className="w-5 h-5 mx-2 text-gray-300 dark:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    School Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    School Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.schoolCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.schoolCode && <p className="mt-1 text-sm text-red-500">{errors.schoolCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Principal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.principalName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.principalName && <p className="mt-1 text-sm text-red-500">{errors.principalName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Established Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="establishedYear"
                    min="1900"
                    max={currentYear}
                    value={formData.establishedYear}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.establishedYear ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.establishedYear && <p className="mt-1 text-sm text-red-500">{errors.establishedYear}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Affiliation Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="affiliationNumber"
                    value={formData.affiliationNumber}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.affiliationNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.affiliationNumber && <p className="mt-1 text-sm text-red-500">{errors.affiliationNumber}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: School Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                School Details
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    School Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.schoolType ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  >
                    <option value="INTERNATIONAL">International</option>
                    <option value="NATIONAL">National</option>
                  </select>
                  {errors.schoolType && <p className="mt-1 text-sm text-red-500">{errors.schoolType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Board <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.board ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="IB">IB</option>
                  </select>
                  {errors.board && <p className="mt-1 text-sm text-red-500">{errors.board}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ownership Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="ownershipType"
                    value={formData.ownershipType}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${errors.ownershipType ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  >
                    <option value="PRIVATE">Private</option>
                    <option value="GOVERNMENT">Government</option>
                  </select>
                  {errors.ownershipType && <p className="mt-1 text-sm text-red-500">{errors.ownershipType}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Address Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.address.addressLine1}
                    onChange={handleAddressChange}
                    className={`w-full rounded-lg border ${errors.address?.addressLine1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.address?.addressLine1 && <p className="mt-1 text-sm text-red-500">{errors.address.addressLine1}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    className={`w-full rounded-lg border ${errors.address?.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-500">{errors.address.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleAddressChange}
                    className={`w-full rounded-lg border ${errors.address?.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.address?.state && <p className="mt-1 text-sm text-red-500">{errors.address.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.address.postalCode}
                    onChange={handleAddressChange}
                    className={`w-full rounded-lg border ${errors.address?.postalCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.address?.postalCode && <p className="mt-1 text-sm text-red-500">{errors.address.postalCode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleAddressChange}
                    className={`w-full rounded-lg border ${errors.address?.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } dark:bg-gray-900 dark:text-white p-2`}
                  />
                  {errors.address?.country && <p className="mt-1 text-sm text-red-500">{errors.address.country}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Review & Submit
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 border-b pb-2">
                    School Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">School Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">School Code:</span>
                      <span className="font-medium">{formData.schoolCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Principal Name:</span>
                      <span className="font-medium">{formData.principalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Established Year:</span>
                      <span className="font-medium">{formData.establishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Affiliation Number:</span>
                      <span className="font-medium">{formData.affiliationNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">School Type:</span>
                      <span className="font-medium">{formData.schoolType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Board:</span>
                      <span className="font-medium">{formData.board}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Ownership Type:</span>
                      <span className="font-medium">{formData.ownershipType}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-600 dark:text-gray-400 mb-1">Description:</p>
                      <p className="text-gray-900 dark:text-white">{formData.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3 border-b pb-2">
                    Address
                  </h3>
                  <div className="space-y-1">
                    <p className="font-medium">{formData.address.addressLine1}</p>
                    <p>{formData.address.city}, {formData.address.state}</p>
                    <p>{formData.address.postalCode}, {formData.address.country}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg border ${step === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Previous
            </button>

            {step < steps.length ? (
              <button
                type="button"  // Explicitly set to button to prevent form submission
                onClick={(e) => next(e)}
                className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
