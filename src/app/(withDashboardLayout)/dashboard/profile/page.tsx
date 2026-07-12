"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getUserProfile, updateUserProfile } from "@/lib/api/user";
import { Loader2, User, Phone, MapPin, AlignLeft, Image as ImageIcon, Save, Shield } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();
  
  // Profile state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    bio: "",
    phoneNumber: "",
    location: "",
  });

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await getUserProfile();
      if (res.success && res.data) {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          image: res.data.image || "",
          bio: res.data.bio || "",
          phoneNumber: res.data.phoneNumber || "",
          location: res.data.location || "",
        });
      } else {
        setError(res.message || "Failed to load profile details");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchProfile();
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await updateUserProfile(formData);
      if (res.success && res.data) {
        try {
          await authClient.updateUser({
            name: formData.name,
            image: formData.image || undefined,
          });
        } catch (authErr) {
          console.warn("Failed to sync session with authClient:", authErr);
        }
        setSuccess(true);
        setProfile(res.data);
        window.location.reload(); // reload to sync header layout avatar & name
      } else {
        setError(res.message || "Failed to update profile");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthPending || (session && isLoading)) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col h-[60vh] items-center justify-center text-gray-900">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500">Please log in to access your profile.</p>
      </div>
    );
  }

  const inputStyles = "w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--ternary)] focus:border-[var(--ternary)] transition-colors text-sm font-medium";

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 text-gray-900">
      
      {/* Banner / Card Header Profile info */}
      <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        
        {/* Profile Avatar */}
        {profile?.image ? (
          <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-200 shadow-sm shrink-0">
            <Image
              src={profile.image}
              alt={profile.name || "Profile avatar"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shadow-inner shrink-0">
            <User size={48} />
          </div>
        )}

        {/* User Quick Info */}
        <div className="text-center md:text-left space-y-1.5 flex-1">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              {profile?.name || "Guest Account"}
            </h2>
            <span className="inline-flex items-center gap-1 bg-orange-50 text-[var(--ternary)] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-orange-100 font-sans">
              <Shield size={10} />
              {profile?.role || "user"}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-500">{profile?.email}</p>
          {profile?.bio ? (
            <p className="text-sm text-gray-600 mt-2 italic font-medium max-w-xl leading-relaxed">
              &ldquo;{profile.bio}&rdquo;
            </p>
          ) : (
            <p className="text-sm text-gray-400 mt-2 font-medium italic">
              No bio added yet. Write something about yourself below!
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
          Profile successfully updated!
        </div>
      )}

      {/* Edit Form Card */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <User size={18} className="text-[var(--ternary)]" />
          Edit Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Display Name */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-semibold text-gray-600 block">Display Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required name="name" value={formData.name} onChange={handleChange} className={inputStyles} placeholder="Your display name" />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-semibold text-gray-600 block">Profile Avatar URL</label>
            <div className="relative">
              <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="image" value={formData.image} onChange={handleChange} className={inputStyles} placeholder="e.g. https://example.com/avatar.jpg" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-semibold text-gray-600 block">Phone Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputStyles} placeholder="e.g. +1 234 567 890" />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5 relative">
            <label className="text-xs font-semibold text-gray-600 block">Location</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="location" value={formData.location} onChange={handleChange} className={inputStyles} placeholder="e.g. New York, USA" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5 relative">
          <label className="text-xs font-semibold text-gray-600 block">Biography</label>
          <div className="relative">
            <AlignLeft size={16} className="absolute left-4 top-3 text-gray-400" />
            <textarea rows={4} name="bio" value={formData.bio} onChange={handleChange} className={`${inputStyles} pl-11 py-3 resize-y min-h-[100px]`} placeholder="Tell us about yourself..." />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end border-t border-gray-100">
          <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-[var(--ternary)] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50">
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
