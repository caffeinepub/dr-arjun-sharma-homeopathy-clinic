import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";



actor {
  type DoctorProfile = {
    name : Text;
    qualification : Text;
    bio : Text;
    address : Text;
    phone : Text;
    email : Text;
    clinicHours : Text;
  };

  type Service = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type SessionToken = Text;

  let services = Map.empty<Nat, Service>();
  var nextServiceId = 1;
  var nextMessageId = 1;
  var doctorProfile : ?DoctorProfile = null;
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let validSessionTokens = Map.empty<SessionToken, Time.Time>();
  let sessionTimeout : Nat = 24 * 60 * 60 * 1_000_000_000;
  let adminPassword = "sheeba2024";

  public shared ({ caller }) func setDoctorProfile(profile : DoctorProfile, token : SessionToken) : async () {
    if (not validateSessionInternal(token)) {
      Runtime.trap("Invalid session token");
    };
    doctorProfile := ?profile;
  };

  public query ({ caller }) func getDoctorProfile() : async ?DoctorProfile {
    doctorProfile;
  };

  public shared ({ caller }) func addService(title : Text, description : Text, token : SessionToken) : async Nat {
    if (not validateSessionInternal(token)) {
      Runtime.trap("Invalid session token");
    };
    let id = nextServiceId;
    let service : Service = { id; title; description };
    services.add(id, service);
    nextServiceId += 1;
    id;
  };

  public shared ({ caller }) func updateService(id : Nat, title : Text, description : Text, token : SessionToken) : async () {
    if (not validateSessionInternal(token)) {
      Runtime.trap("Invalid session token");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        let updatedService : Service = { id; title; description };
        services.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteService(id : Nat, token : SessionToken) : async () {
    if (not validateSessionInternal(token)) {
      Runtime.trap("Invalid session token");
    };
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service not found") };
      case (?_) {
        services.remove(id);
      };
    };
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, email : Text, message : Text) : async Nat {
    let id = nextMessageId;
    let contactMessage : ContactMessage = {
      id;
      name;
      phone;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(id, contactMessage);
    nextMessageId += 1;
    id;
  };

  public shared ({ caller }) func getAllContactMessages(token : SessionToken) : async [ContactMessage] {
    if (not validateSessionInternal(token)) {
      Runtime.trap("Invalid session token");
    };
    contactMessages.values().toArray();
  };

  public shared ({ caller }) func adminLogin(password : Text) : async SessionToken {
    if (password != adminPassword) {
      Runtime.trap("Invalid password");
    };

    let token = generateSessionToken();
    let expiration = Time.now() + sessionTimeout;
    validSessionTokens.add(token, expiration);
    token;
  };

  public query ({ caller }) func validateSession(token : SessionToken) : async Bool {
    validateSessionInternal(token);
  };

  func validateSessionInternal(token : SessionToken) : Bool {
    switch (validSessionTokens.get(token)) {
      case (?expiration) {
        if (Time.now() > expiration) {
          validSessionTokens.remove(token);
          false;
        } else {
          true;
        };
      };
      case (null) { false };
    };
  };

  func generateSessionToken() : SessionToken {
    let timestamp = Time.now().toText();
    let token = timestamp;
    token;
  };
};
