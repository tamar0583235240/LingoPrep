import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import { AiFillDelete, AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FaPen, FaSave, FaTimes, FaUserCircle } from "react-icons/fa";
import { useMessageModal } from "../shared/ui/MessageModalContext";
import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "../shared/ui/ToggleSwitch";
import { Button } from "../shared/ui/button";
import { Card } from "../shared/ui/card";
import {
  useGetProfileByIdQuery,
  useUpdateProfileMutation,
} from "../features/profile/services/profileApi";
import { Profile } from "../features/profile/types/profileTypes";

interface ExternalLink {
  url: string;
  label: string;
}

const EditProfilePage = () => {
  const navigate = useNavigate();

  const { showMessage, hideMessage } = useMessageModal();

  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "",
    location: "",
    preferred_job_type: "",
    external_links: [] as { url: string; label: string }[],
    bio: "",
    is_public: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [linkErrors, setLinkErrors] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    data: profileData,
    isLoading,
    error: fetchProfileError,
    refetch,
  } = useGetProfileByIdQuery(user?.id || "");

  const API_BASE_URL = "http://localhost:5000";

  const labelOptions = [
    "LinkedIn",
    "GitHub",
    "Stack Overflow",
    "Dev.to",
    "Medium",
    "Behance",
    "Dribbble",
    "CodePen",
    "Notion",
    "Google Drive / PDF",
    // "Other",
  ];

  useEffect(() => {
    if (profileData) {
      setFormData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        status: profileData.status || "Available",
        preferred_job_type: profileData.preferred_job_type || "Any",
        external_links: Array.isArray(profileData.external_links)
          ? profileData.external_links
          : [],
        bio: profileData.bio || "",
        is_public: profileData.is_public ?? false,
      });
    }
  }, [profileData]);

  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Profile) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
  };

  const handleLinkChange = (
    index: number,
    field: "url" | "label",
    value: string
  ) => {
    const updatedLinks = [...formData.external_links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: value.trim(),
    };

    const updatedErrors = [...linkErrors];

    const currentLabel = updatedLinks[index].label;
    const currentUrl = updatedLinks[index].url;

    updatedErrors[index] = validateLink(currentLabel, currentUrl);

    setFormData((prev: any) => ({
      ...prev,
      external_links: updatedLinks,
    }));
    setLinkErrors(updatedErrors);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateLink = (label: string, url: string): string => {
    if (!url) return "";
    if (!isValidUrl(url)) return "כתובת לא תקינה";

    if (
      label !== "Other" &&
      labelUrlMatchers[label] &&
      !labelUrlMatchers[label](url)
    ) {
      return `כתובת ה-URL לא תואמת לתווית "${label}"`;
    }

    return "";
  };

  const handleAddLink = () => {
    const emptyLink = formData.external_links.some(
      (link: ExternalLink) => !link.url?.trim()
    );
    if (emptyLink) return;

    setFormData((prev: any) => ({
      ...prev,
      external_links: [...prev.external_links, { url: "", label: "" }],
    }));
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = formData.external_links.filter(
      (_: any, i: number) => i !== index
    );
    setFormData((prev: any) => ({
      ...prev,
      external_links: updatedLinks,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("אין משתמש מחובר.");
      return;
    }

    if (linkErrors.some((err) => err)) {
      setError("אנא תקני את הקישורים הלא תקינים לפני שמירה.");
      return;
    }

    setFormSubmitted(true);

    let hasEmptyLinkFields = false;
    const newLinkErrors = formData.external_links.map((link: ExternalLink) => {
      if (!link.label || !link.url) {
        hasEmptyLinkFields = true;
        return "שדה חובה";
      }
      return validateLink(link.label, link.url);
    });
    setLinkErrors(newLinkErrors);

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      hasEmptyLinkFields ||
      newLinkErrors.some((err: any) => err)
    ) {
      return;
    }

    const fd = new FormData();
    fd.append("first_name", formData.first_name);
    fd.append("last_name", formData.last_name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("status", formData.status);
    fd.append("location", formData.location);
    fd.append("preferred_job_type", formData.preferred_job_type);
    fd.append("bio", formData.bio);
    fd.append("is_public", String(formData.is_public));
    fd.append("external_links", JSON.stringify(formData.external_links));

    if (selectedImage) {
      fd.append("image", selectedImage);
    }

    try {
      await updateProfile({ id: user.id, formData: fd }).unwrap();
      await refetch();

      showMessage("", "הפרופיל עודכן בהצלחה");
      setTimeout(() => {
        hideMessage();
        navigate("/my-profile", { replace: true });
      }, 2000);
    } catch (err) {
      setError("שגיאה בעדכון הפרופיל.");
    } finally {
      setSaving(false);
    }
  };

  const onCancelEdit = () => {
    navigate("/my-profile");
  };

  const labelUrlMatchers: Record<string, (url: string) => boolean> = {
    LinkedIn: (url) => url.includes("linkedin.com"),
    GitHub: (url) => url.includes("github.com"),
    "Stack Overflow": (url) => url.includes("stackoverflow.com"),
    "Dev.to": (url) => url.includes("dev.to"),
    Medium: (url) => url.includes("medium.com"),
    Behance: (url) => url.includes("behance.net"),
    Dribbble: (url) => url.includes("dribbble.com"),
    CodePen: (url) => url.includes("codepen.io"),
    Notion: (url) => url.includes("notion.so"),
    "Google Drive / PDF": (url) =>
      url.includes("drive.google.com") || url.endsWith(".pdf"),
    Other: () => true,
  };

  if (isLoading) return <p className="text-center mt-8">טוען פרופיל...</p>;
  if (!user) return <p className="text-center mt-8">אין משתמש מחובר</p>;
  if (fetchProfileError) {
    return (
      <p className="text-center mt-8 text-red-500">שגיאה בטעינת הפרופיל</p>
    );
  }
  if (error && !error.includes("קישורים")) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  const isAddButtonDisabled = Object.values(formData.external_links).some(
    (link) => !(link as ExternalLink).url?.trim()
  );

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="">
          <ToggleSwitch
            checked={formData.is_public}
            onToggle={() =>
              setFormData((prev: any) => ({
                ...prev,
                is_public: !prev.is_public,
              }))
            }
          />
          {!formData.is_public && (
            <span className="text-xs text-text-secondary">
              (לא יוצג בפרופיל הציבורי)
            </span>
          )}
        </div>

        <div className="flex justify-center mb-4">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : profileData?.image_url ? (
            <img
              src={profileData.image_url}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
        </div>

        <input
          type="file"
          name="profile_image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <input
          type="text"
          name="first_name"
          placeholder="הקלד שם פרטי"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {formSubmitted && !formData.first_name && (
          <p className="text-sm text-red-500 mb-2">שדה חובה</p>
        )}

        <input
          type="text"
          name="last_name"
          placeholder="הקלד שם משפחה"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {formSubmitted && !formData.last_name && (
          <p className="text-sm text-red-500 mb-2">שדה חובה</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="הקלד מייל"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {formSubmitted && !formData.email && (
          <p className="text-sm text-red-500 mb-2">שדה חובה</p>
        )}

        <input
          type="string"
          name="phone"
          placeholder="הקלד טלפון"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <input
          type="string"
          name="location"
          placeholder="הקלד עיר"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        <div>
          <label className="block mb-1 font-medium">סטטוס</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">בחר סטטוס</option>
            <option value="Available">פתוחה להצעות</option>
            <option value="Not Available">לא מחפשת כרגע</option>
            <option value="working">עובדת כרגע</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">סוג משרה מועדף</label>
          <select
            name="preferred_job_type"
            value={formData.preferred_job_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Full-time">משרה מלאה</option>
            <option value="Part-time">משרה חלקית</option>
            <option value="Freelance">פרילנס</option>
            <option value="Internship">התמחות</option>
            <option value="Any">כל האפשרויות</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">קישורים חיצוניים</label>

          {formData.external_links.map(
            (link: { url: string; label: string }, index: number) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 items-start p-4"
              >
                <div className="col-span-1 order-last flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="text-lg"
                    title="מחק קישור"
                  >
                    <AiFillDelete />
                  </button>
                </div>

                <div className="col-span-5 grid grid-cols-2 gap-2">
                  <select
                    value={
                      labelOptions.includes(link.label) ? link.label : "Other"
                    }
                    onChange={(e) =>
                      handleLinkChange(index, "label", e.target.value)
                    }
                    className={`border rounded px-3 py-2 ${
                      labelOptions.includes(link.label) &&
                      link.label !== "Other"
                        ? "col-span-2"
                        : "col-span-1"
                    }`}
                  >
                    <option value="" disabled hidden>
                      תווית הקישור
                    </option>
                    {labelOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                    <option value="Other">אחר</option>
                  </select>

                  {!labelOptions.includes(link.label) ||
                  link.label === "Other" ? (
                    <input
                      type="text"
                      placeholder="הקלד תווית"
                      value={
                        labelOptions.includes(link.label) ? "" : link.label
                      }
                      required
                      onChange={(e) =>
                        handleLinkChange(index, "label", e.target.value)
                      }
                      className="border rounded px-3 py-2 col-span-1"
                    />
                  ) : null}
                </div>
                {formSubmitted && !link.label && (
                  <p className="text-sm text-red-500 mb-2">שדה חובה</p>
                )}

                <div className="col-span-6">
                  <input
                    type="text"
                    required
                    placeholder={`URL ${index + 1}`}
                    value={link.url || ""}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                  {linkErrors[index] && (
                    <p className="text-sm text-red-500 mt-1">
                      {linkErrors[index]}
                    </p>
                  )}
                </div>
                {formSubmitted && !link.url && (
                  <p className="text-sm text-red-500 mb-2">שדה חובה</p>
                )}
              </div>
            )
          )}

          <button
            type="button"
            onClick={handleAddLink}
            disabled={isAddButtonDisabled}
            className="text-primary text-sm"
          >
            הוסף קישור חדש
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex gap-2 justify-start ltr">
          <Button
            size="sm"
            variant="primary-dark"
            type="submit"
            disabled={saving}
          >
            <FaSave /> שמור
          </Button>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={onCancelEdit}
          >
            <FaTimes /> בטל
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
