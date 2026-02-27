import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  type OldActor = {
    appointments : Map.Map<Nat, { id : Nat; name : Text; phone : Text; email : Text; preferredDate : Text; preferredTime : Text; reason : Text; status : { #pending; #confirmed; #cancelled }; createdAt : Time.Time }>;
    contactMessages : Map.Map<Nat, { id : Nat; name : Text; phone : Text; email : Text; message : Text; createdAt : Time.Time }>;
    testimonials : Map.Map<Nat, { id : Nat; patientName : Text; testimonialText : Text; rating : Nat; date : Time.Time; approved : Bool }>;
    nextAppointmentId : Nat;
    nextMessageId : Nat;
    nextTestimonialId : Nat;
  };

  type NewActor = {
    services : Map.Map<Nat, { id : Nat; title : Text; description : Text }>;
    nextServiceId : Nat;
    nextMessageId : Nat;
    doctorProfile : ?{ name : Text; qualification : Text; bio : Text; address : Text; phone : Text; email : Text; clinicHours : Text };
    contactMessages : Map.Map<Nat, { id : Nat; name : Text; phone : Text; email : Text; message : Text; timestamp : Time.Time }>;
    validSessionTokens : Map.Map<Text, Time.Time>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      services = Map.empty<Nat, { id : Nat; title : Text; description : Text }>();
      nextServiceId = 1;
      nextMessageId = 1;
      doctorProfile = null;
      contactMessages = Map.empty<Nat, { id : Nat; name : Text; phone : Text; email : Text; message : Text; timestamp : Time.Time }>();
      validSessionTokens = Map.empty<Text, Time.Time>();
    };
  };
};
