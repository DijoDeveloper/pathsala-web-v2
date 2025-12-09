
export interface IUserRecord {
    // Identification and Names
    id: number;
    username: string;
    email: string;
    firstName: string | null; // Can be a string or null if not provided
    lastName: string | null;   // Can be a string or null if not provided

    // Security and Verification
    passwordHash: string;
    emailVerified: boolean;
    verificationToken: string;
    active: boolean;

    // Timestamps
    registrationDate: string; // Typically a string in ISO 8601 format
    emailVerifiedDate: string | null; // Can be a string or null
}