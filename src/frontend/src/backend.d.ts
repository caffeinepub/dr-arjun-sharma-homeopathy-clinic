import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    id: bigint;
    title: string;
    description: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface DoctorProfile {
    bio: string;
    name: string;
    email: string;
    clinicHours: string;
    address: string;
    phone: string;
    qualification: string;
}
export type SessionToken = string;
export interface backendInterface {
    addService(title: string, description: string, token: SessionToken): Promise<bigint>;
    adminLogin(password: string): Promise<SessionToken>;
    deleteService(id: bigint, token: SessionToken): Promise<void>;
    getAllContactMessages(token: SessionToken): Promise<Array<ContactMessage>>;
    getAllServices(): Promise<Array<Service>>;
    getDoctorProfile(): Promise<DoctorProfile | null>;
    setDoctorProfile(profile: DoctorProfile, token: SessionToken): Promise<void>;
    submitContactMessage(name: string, phone: string, email: string, message: string): Promise<bigint>;
    updateService(id: bigint, title: string, description: string, token: SessionToken): Promise<void>;
    validateSession(token: SessionToken): Promise<boolean>;
}
