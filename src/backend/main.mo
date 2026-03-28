import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Mixins for modular functionality
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profile type as required by frontend
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types for portfolio, blog, testimonials, and contact messages
  type PortfolioItem = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    imageUrl : Text;
    clientName : Text;
    year : Nat;
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    publishedAt : Time.Time;
    imageUrl : Text;
  };

  type Testimonial = {
    id : Nat;
    clientName : Text;
    company : Text;
    quote : Text;
    rating : Nat;
    avatarUrl : Text;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  // Map-based persistent storage
  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  let blogPosts = Map.empty<Nat, BlogPost>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  var nextPortfolioId = 1;
  var nextBlogPostId = 1;
  var nextTestimonialId = 1;
  var nextContactMessageId = 1;

  // Portfolio CRUD operations
  module PortfolioItem {
    public func compareByTitle(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Text.compare(a.title, b.title);
    };
    public func compareByYear(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Nat.compare(a.year, b.year);
    };
    public func compareById(a : PortfolioItem, b : PortfolioItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  public shared ({ caller }) func createPortfolioItem(item : PortfolioItem) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create portfolio items");
    };
    let id = nextPortfolioId;
    nextPortfolioId += 1;
    let newItem = { item with id };
    portfolioItems.add(id, newItem);
    id;
  };

  public query func getPortfolioItem(id : Nat) : async PortfolioItem {
    switch (portfolioItems.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?item) { item };
    };
  };

  public query func getAllPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray().sort(PortfolioItem.compareById);
  };

  public query func getPortfolioItemsByCategory(category : Text) : async [PortfolioItem] {
    portfolioItems.filter(func(_, item) { item.category == category : Bool }).values().toArray();
  };

  public shared ({ caller }) func updatePortfolioItem(item : PortfolioItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };
    switch (portfolioItems.get(item.id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (_) {
        portfolioItems.add(item.id, item);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };
    if (not (portfolioItems.containsKey(id))) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioItems.remove(id);
  };

  // Blog CRUD operations
  module BlogPost {
    public func compareByDate(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.publishedAt, a.publishedAt);
    };
  };

  public shared ({ caller }) func createBlogPost(post : BlogPost) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create blog posts");
    };
    let id = nextBlogPostId;
    nextBlogPostId += 1;
    let newPost = { post with id; publishedAt = Time.now() };
    blogPosts.add(id, newPost);
    id;
  };

  public query func getBlogPost(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public query func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareByDate);
  };

  public query func getBlogPostsByCategory(category : Text) : async [BlogPost] {
    blogPosts.filter(func(_, post) { post.category == category : Bool }).values().toArray();
  };

  public shared ({ caller }) func updateBlogPost(post : BlogPost) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    switch (blogPosts.get(post.id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (_) {
        blogPosts.add(post.id, post);
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    if (not (blogPosts.containsKey(id))) {
      Runtime.trap("Blog post not found");
    };
    blogPosts.remove(id);
  };

  // Testimonials CRUD operations
  module Testimonial {
    public func compareByRating(a : Testimonial, b : Testimonial) : Order.Order {
      Nat.compare(b.rating, a.rating);
    };
  };

  public shared ({ caller }) func createTestimonial(testimonial : Testimonial) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create testimonials");
    };
    let id = nextTestimonialId;
    nextTestimonialId += 1;
    let newTestimonial = { testimonial with id };
    testimonials.add(id, newTestimonial);
    id;
  };

  public query func getTestimonial(id : Nat) : async Testimonial {
    switch (testimonials.get(id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (?testimonial) { testimonial };
    };
  };

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareByRating);
  };

  public shared ({ caller }) func updateTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    switch (testimonials.get(testimonial.id)) {
      case (null) { Runtime.trap("Testimonial not found") };
      case (_) {
        testimonials.add(testimonial.id, testimonial);
      };
    };
  };

  public shared ({ caller }) func deleteTestimonial(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    if (not (testimonials.containsKey(id))) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  // Contact messages (public submit, admin read/delete)
  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async Nat {
    // Public endpoint - no authorization check needed
    let id = nextContactMessageId;
    nextContactMessageId += 1;
    let newMessage = { message with id; submittedAt = Time.now() };
    contactMessages.add(id, newMessage);
    id;
  };

  public query ({ caller }) func getContactMessage(id : Nat) : async ContactMessage {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    switch (contactMessages.get(id)) {
      case (null) { Runtime.trap("Contact message not found") };
      case (?message) { message };
    };
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func deleteContactMessage(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    if (not (contactMessages.containsKey(id))) {
      Runtime.trap("Contact message not found");
    };
    contactMessages.remove(id);
  };

  // Seed with sample data (admin only)
  public shared ({ caller }) func seedSampleData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };

    // Portfolio samples
    let portfolioSamples = [
      {
        id = 0;
        title = "E-commerce Website";
        description = "Online store for electronics";
        category = "Web Development";
        imageUrl = "/images/portfolio/ecommerce.jpg";
        clientName = "TechMart";
        year = 2023;
      },
      {
        id = 0;
        title = "Brand Identity";
        description = "Logo and branding for startup";
        category = "Design";
        imageUrl = "/images/portfolio/branding.jpg";
        clientName = "StartUp Co.";
        year = 2022;
      },
    ];

    for (item in portfolioSamples.values()) {
      ignore await createPortfolioItem(item);
    };

    // Blog samples
    let blogSamples = [
      {
        id = 0;
        title = "Design Trends 2024";
        excerpt = "Explore the latest design trends";
        content = "Lorem ipsum dolor sit amet...";
        category = "Design";
        author = "Jane Doe";
        publishedAt = Time.now();
        imageUrl = "/images/blog/trends.jpg";
      },
      {
        id = 0;
        title = "Web Development Best Practices";
        excerpt = "Tips for building scalable web apps";
        content = "Lorem ipsum dolor sit amet...";
        category = "Web Development";
        author = "John Smith";
        publishedAt = Time.now();
        imageUrl = "/images/blog/webdev.jpg";
      },
    ];

    for (post in blogSamples.values()) {
      ignore await createBlogPost(post);
    };

    // Testimonial samples
    let testimonialSamples = [
      {
        id = 0;
        clientName = "Alice Johnson";
        company = "TechMart";
        quote = "Amazing work on our website!";
        rating = 5;
        avatarUrl = "/images/testimonials/alice.jpg";
      },
      {
        id = 0;
        clientName = "David Lee";
        company = "StartUp Co.";
        quote = "Professional branding and design.";
        rating = 4;
        avatarUrl = "/images/testimonials/david.jpg";
      },
    ];

    for (testimonial in testimonialSamples.values()) {
      ignore await createTestimonial(testimonial);
    };
  };
};
