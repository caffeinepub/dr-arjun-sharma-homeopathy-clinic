import type {
  ContactMessage,
  DoctorProfile,
  Service,
  SessionToken,
} from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createActorWithConfig } from "@/config";
import {
  ArrowLeft,
  Leaf,
  Loader2,
  LogOut,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Stethoscope,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_PROFILE: DoctorProfile = {
  name: "Dr. Sheeba",
  qualification: "BHMS, Surgery",
  bio: "Dedicated to providing gentle, effective homeopathic treatment for acute and chronic conditions. Dr. Sheeba believes in treating the whole person — mind, body, and spirit — rather than just symptoms.",
  address: "Flat C-502, Rajasthan Apartment\nSector 4, Dwarka, Delhi — 110078",
  phone: "+91 92893 71243",
  email: "dr.sheeba@homeopathy.com",
  clinicHours: "Mon–Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 1:00 PM",
};

// ─── Login Screen ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: SessionToken) => void }) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const actor = await createActorWithConfig();
      const token = await actor.adminLogin(password);
      if (token) {
        onLogin(token);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Login failed. Please check your password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "oklch(0.97 0.01 158)" }}
    >
      <Card className="w-full max-w-sm shadow-xl border-border">
        <CardHeader className="text-center pb-2">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.42 0.085 158 / 0.12)" }}
          >
            <Leaf className="w-7 h-7 text-forest" />
          </div>
          <CardTitle className="font-display text-2xl text-forest">
            Admin Login
          </CardTitle>
          <p className="text-sm text-muted-foreground font-body">
            Dr. Sheeba Homeopathy Clinic
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-forest hover:bg-forest-light text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Profile Editor ──────────────────────────────────────────────────────────

function ProfileEditor({ token }: { token: SessionToken }) {
  const [profile, setProfile] = useState<DoctorProfile>(DEFAULT_PROFILE);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    createActorWithConfig()
      .then((actor) => actor.getDoctorProfile())
      .then((result) => {
        if (result !== null) setProfile(result);
      })
      .catch(() => {})
      .finally(() => setIsFetching(false));
  }, []);

  const handleChange =
    (field: keyof DoctorProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const actor = await createActorWithConfig();
      await actor.setDoctorProfile(profile, token);
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="prof-name">Doctor Name</Label>
          <Input
            id="prof-name"
            value={profile.name}
            onChange={handleChange("name")}
            placeholder="Dr. Sheeba"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prof-qual">Qualification</Label>
          <Input
            id="prof-qual"
            value={profile.qualification}
            onChange={handleChange("qualification")}
            placeholder="BHMS, Surgery"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prof-bio">Bio / About</Label>
        <Textarea
          id="prof-bio"
          value={profile.bio}
          onChange={handleChange("bio")}
          rows={4}
          className="resize-none"
          placeholder="About the doctor..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prof-address">Address</Label>
        <Textarea
          id="prof-address"
          value={profile.address}
          onChange={handleChange("address")}
          rows={2}
          className="resize-none"
          placeholder="Flat C-502, Rajasthan Apartment..."
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="prof-phone">Phone</Label>
          <Input
            id="prof-phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange("phone")}
            placeholder="+91 92893 71243"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prof-email">Email</Label>
          <Input
            id="prof-email"
            type="email"
            value={profile.email}
            onChange={handleChange("email")}
            placeholder="dr.sheeba@homeopathy.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prof-hours">Clinic Hours</Label>
        <Textarea
          id="prof-hours"
          value={profile.clinicHours}
          onChange={handleChange("clinicHours")}
          rows={2}
          className="resize-none"
          placeholder="Mon–Sat: 9:00 AM – 7:00 PM..."
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className="bg-forest hover:bg-forest-light text-white font-semibold"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Services Manager ────────────────────────────────────────────────────────

interface EditingService {
  id: bigint | null; // null = new
  title: string;
  description: string;
}

function ServicesManager({ token }: { token: SessionToken }) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState<EditingService | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const actor = await createActorWithConfig();
      const list = await actor.getAllServices();
      setServices(list);
    } catch {
      toast.error("Failed to load services.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleStartEdit = (service: Service) => {
    setEditing({
      id: service.id,
      title: service.title,
      description: service.description,
    });
  };

  const handleStartAdd = () => {
    setEditing({ id: null, title: "", description: "" });
  };

  const handleCancelEdit = () => setEditing(null);

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setIsSaving(true);
    try {
      const actor = await createActorWithConfig();
      if (editing.id === null) {
        await actor.addService(editing.title, editing.description, token);
        toast.success("Service added successfully!");
      } else {
        await actor.updateService(
          editing.id,
          editing.title,
          editing.description,
          token,
        );
        toast.success("Service updated successfully!");
      }
      setEditing(null);
      await fetchServices();
    } catch {
      toast.error("Failed to save service. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    setDeletingId(id);
    try {
      const actor = await createActorWithConfig();
      await actor.deleteService(id, token);
      toast.success("Service deleted.");
      await fetchServices();
    } catch {
      toast.error("Failed to delete service.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add new service button */}
      {!editing && (
        <Button
          onClick={handleStartAdd}
          className="bg-forest hover:bg-forest-light text-white font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      )}

      {/* Inline edit/add form */}
      {editing && (
        <Card className="border-forest/30 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-forest">
              {editing.id === null ? "Add New Service" : "Edit Service"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="svc-title">Title</Label>
                <Input
                  id="svc-title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, title: e.target.value } : null,
                    )
                  }
                  placeholder="e.g., Laser Treatment"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-desc">Description</Label>
                <Textarea
                  id="svc-desc"
                  value={editing.description}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, description: e.target.value } : null,
                    )
                  }
                  rows={3}
                  className="resize-none"
                  placeholder="Describe this service..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-forest hover:bg-forest-light text-white font-semibold"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Services list */}
      {services.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Stethoscope className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-body text-sm">
            No services yet. Add your first service above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <Card key={service.id.toString()} className="border-border">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-forest text-sm font-display">
                      {service.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartEdit(service)}
                      disabled={!!editing}
                      className="text-forest border-forest/30 hover:bg-forest/10"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                      disabled={deletingId === service.id}
                      className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      {deletingId === service.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Messages Viewer ─────────────────────────────────────────────────────────

function MessagesViewer({ token }: { token: SessionToken }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createActorWithConfig()
      .then((actor) => actor.getAllContactMessages(token))
      .then(setMessages)
      .catch(() => toast.error("Failed to load messages."))
      .finally(() => setIsLoading(false));
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-forest" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-body text-sm">No contact messages yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Phone</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id.toString()}>
              <TableCell className="font-medium text-sm">{msg.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {msg.phone}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground break-all">
                {msg.email}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs">
                <span className="line-clamp-2">{msg.message}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({
  token,
  onLogout,
}: { token: SessionToken; onLogout: () => void }) {
  const handleBackToWebsite = () => {
    window.location.hash = "";
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.01 158)" }}
    >
      {/* Header */}
      <header className="bg-forest text-white shadow-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "oklch(1 0 0 / 0.15)" }}
            >
              <Leaf className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-lg leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs text-white/60">
                Dr. Sheeba Homeopathy Clinic
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-none text-xs hidden sm:flex"
            >
              Admin
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToWebsite}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to Website
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white border border-border shadow-sm">
            <TabsTrigger
              value="profile"
              className="gap-2 data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              <UserCog className="h-4 w-4" />
              Doctor Profile
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="gap-2 data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              <Stethoscope className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="gap-2 data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <UserCog className="h-5 w-5 text-forest" />
                  <CardTitle className="font-display text-xl text-forest">
                    Doctor Profile
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  Update the doctor's information. Changes will appear on the
                  website immediately.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ProfileEditor token={token} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-forest" />
                  <CardTitle className="font-display text-xl text-forest">
                    Services
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  Manage the treatments and services shown on the website.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ServicesManager token={token} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="shadow-sm border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-forest" />
                  <CardTitle className="font-display text-xl text-forest">
                    Contact Messages
                  </CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-body">
                  Messages submitted through the contact form on the website.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <MessagesViewer token={token} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────

export function AdminPanel() {
  const [token, setToken] = useState<SessionToken | null>(null);

  const handleLogin = (sessionToken: SessionToken) => {
    setToken(sessionToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  if (!token) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
