import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    publishedAt: Time;
    author: string;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export type Time = bigint;
export interface PortfolioItem {
    id: bigint;
    title: string;
    clientName: string;
    year: bigint;
    description: string;
    imageUrl: string;
    category: string;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: bigint;
    clientName: string;
    quote: string;
    company: string;
    avatarUrl: string;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(post: BlogPost): Promise<bigint>;
    createPortfolioItem(item: PortfolioItem): Promise<bigint>;
    createTestimonial(testimonial: Testimonial): Promise<bigint>;
    deleteBlogPost(id: bigint): Promise<void>;
    deleteContactMessage(id: bigint): Promise<void>;
    deletePortfolioItem(id: bigint): Promise<void>;
    deleteTestimonial(id: bigint): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getBlogPost(id: bigint): Promise<BlogPost>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessage(id: bigint): Promise<ContactMessage>;
    getPortfolioItem(id: bigint): Promise<PortfolioItem>;
    getPortfolioItemsByCategory(category: string): Promise<Array<PortfolioItem>>;
    getTestimonial(id: bigint): Promise<Testimonial>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedSampleData(): Promise<void>;
    submitContactMessage(message: ContactMessage): Promise<bigint>;
    updateBlogPost(post: BlogPost): Promise<void>;
    updatePortfolioItem(item: PortfolioItem): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
}
