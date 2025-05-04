import React from 'react';
export type ProfileFormData = {
    name: string;
    email: string;
    company: string;
    role: string;
    phone: string;
    location: string;
    website: string;
    bio: string;
    stripe_key: string;
    twilio_sid: string;
    twilio_token: string;
    heygen_key: string;
};
export type ApiKeys = {
    stripe: string;
    twilio_sid: string;
    twilio_token: string;
    heygen: string;
};
declare const ProfileForm: React.FC;
export default ProfileForm;
