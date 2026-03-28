import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BlogPost,
  ContactMessage,
  PortfolioItem,
  Testimonial,
} from "../backend.d";
import { useActor } from "./useActor";

export function usePortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedData() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.seedSampleData();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolioItems"] });
      qc.invalidateQueries({ queryKey: ["blogPosts"] });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (msg: Omit<ContactMessage, "id" | "submittedAt">) => {
      if (!actor) throw new Error("No actor");
      const message: ContactMessage = {
        id: 0n,
        submittedAt: BigInt(Date.now()) * 1_000_000n,
        ...msg,
      };
      return actor.submitContactMessage(message);
    },
  });
}

// Portfolio mutations
export function useCreatePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: Omit<PortfolioItem, "id">) => {
      if (!actor) throw new Error("No actor");
      return actor.createPortfolioItem({ id: 0n, ...item });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

export function useUpdatePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: PortfolioItem) => {
      if (!actor) throw new Error("No actor");
      return actor.updatePortfolioItem(item);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

export function useDeletePortfolioItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deletePortfolioItem(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["portfolioItems"] }),
  });
}

// Blog mutations
export function useCreateBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: Omit<BlogPost, "id">) => {
      if (!actor) throw new Error("No actor");
      return actor.createBlogPost({ id: 0n, ...post });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPost) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBlogPost(post);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

// Testimonial mutations
export function useCreateTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Omit<Testimonial, "id">) => {
      if (!actor) throw new Error("No actor");
      return actor.createTestimonial({ id: 0n, ...t });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Testimonial) => {
      if (!actor) throw new Error("No actor");
      return actor.updateTestimonial(t);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteContactMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteContactMessage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactMessages"] }),
  });
}
