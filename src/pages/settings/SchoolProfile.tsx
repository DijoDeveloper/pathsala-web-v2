import React, { useState } from 'react';
import {
    UserCircleIcon,
    CalenderIcon,
    UserIcon,
    EnvelopeIcon,
    PencilIcon,
    BoxIcon,
} from '../../icons';

// Placeholder components for missing icons
const GlobeIcon = ({ className }: { className?: string }) => (
    <svg className={`w-5 h-5 mt-1 text-gray-500 flex-shrink-0 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={`w-5 h-5 mt-1 text-gray-500 flex-shrink-0 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={`w-5 h-5 mt-1 text-gray-500 flex-shrink-0 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const SchoolProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);

    // School overview data
    const [overview, setOverview] = useState({
        principal: 'Dr. Eleanor Vance',
        establishedYear: '1998',
        affiliation: 'National Board of Education - NBE/AFF/98765',
        schoolType: 'Co-educational',
        about: 'Pathshala International Academy is committed to fostering a dynamic learning environment that encourages intellectual curiosity, critical thinking, and a lifelong passion for learning. We aim to develop well-rounded individuals prepared to meet the challenges of a globalized world.'
    });

    // Contact information
    const [contact, setContact] = useState({
        phone: '+1-234-567-8900',
        email: 'contact@pathshalainternational.edu',
        website: 'www.pathshalainternational.edu',
        street: '456 Wisdom Drive',
        city: 'Learnington',
        state: 'EduState',
        postalCode: '67890',
        country: 'Republic of Knowledge'
    });

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">School Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    <PencilIcon className="w-4 h-4" />
                    {isEditing ? 'Save Changes' : 'EDIT PROFILE'}
                </button>
            </div>

            {/* School Overview Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {/* <h2 className="text-xl font-semibold mb-4">School Overview</h2> */}

                <div className="flex flex-col md:flex-row gap-6">
                    {/* School Logo/Image */}
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500 mb-4">
                            S
                        </div>
                        <button className="text-blue-500 text-sm">Change Logo</button>
                    </div>

                    {/* School Details */}
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start gap-3">
                                <UserIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Principal</p>
                                    <p className="font-medium">{overview.principal}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <CalenderIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Established Year</p>
                                    <p className="font-medium">{overview.establishedYear}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <BoxIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Affiliation</p>
                                    <p className="font-medium">{overview.affiliation}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <UserCircleIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">School Type</p>
                                    <p className="font-medium">{overview.schoolType}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">About Our School</h3>
                            <p className="text-gray-600">{overview.about}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact & Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Contact & Location</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <PhoneIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="font-medium">{contact.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <EnvelopeIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium">{contact.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <GlobeIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Website</p>
                                <a href={`https://${contact.website}`} className="font-medium text-blue-500 hover:underline">
                                    {contact.website}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPinIcon className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-500">Street Address</p>
                                <p className="font-medium">{contact.street}</p>
                                <p className="text-gray-600">
                                    {contact.city}, {contact.state} {contact.postalCode}<br />
                                    {contact.country}
                                </p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                            Map View
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfile;
