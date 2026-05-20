"use client";
import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText, ChevronDown } from "lucide-react";

const ROLES = [
  { title: "Product Analyst — QMS", responsibilities: ["Gather URS, translate into user stories", "Validate acceptance criteria", "Liaise with QA & engineering"], musts: ["Understanding of GxP processes or strong curiosity and ability to learn quickly"] },
  { title: "QA Engineer — Regulated Apps", responsibilities: ["Automation and manual testing", "Release gating", "Validation artifacts"], musts: ["ISTQB / practical experience with regulated validation desirable"] },
];

// Country codes with phone number validation rules
const COUNTRY_CODES = [
  { country: "United States", code: "+1", flag: "🇺🇸", digits: 10 },
  { country: "United Kingdom", code: "+44", flag: "🇬🇧", digits: 10 },
  { country: "India", code: "+91", flag: "🇮🇳", digits: 10 },
  { country: "Canada", code: "+1", flag: "🇨🇦", digits: 10 },
  { country: "Australia", code: "+61", flag: "🇦🇺", digits: 9 },
  { country: "Germany", code: "+49", flag: "🇩🇪", digits: 11 },
  { country: "France", code: "+33", flag: "🇫🇷", digits: 9 },
  { country: "China", code: "+86", flag: "🇨🇳", digits: 11 },
  { country: "Japan", code: "+81", flag: "🇯🇵", digits: 10 },
  { country: "Brazil", code: "+55", flag: "🇧🇷", digits: 11 },
  { country: "Mexico", code: "+52", flag: "🇲🇽", digits: 10 },
  { country: "South Africa", code: "+27", flag: "🇿🇦", digits: 9 },
  { country: "Spain", code: "+34", flag: "🇪🇸", digits: 9 },
  { country: "Italy", code: "+39", flag: "🇮🇹", digits: 10 },
  { country: "Netherlands", code: "+31", flag: "🇳🇱", digits: 9 },
  { country: "Singapore", code: "+65", flag: "🇸🇬", digits: 8 },
  { country: "UAE", code: "+971", flag: "🇦🇪", digits: 9 },
  { country: "Saudi Arabia", code: "+966", flag: "🇸🇦", digits: 9 },
  { country: "Russia", code: "+7", flag: "🇷🇺", digits: 10 },
  { country: "South Korea", code: "+82", flag: "🇰🇷", digits: 10 },
];

export default function CareersPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    linkedin: "",
    currentLocation: "",
    resume: null as File | null,
    coverLetter: "",
    whyJoin: "",
    references: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard search when dropdown is open
  useEffect(() => {
    if (!showCountryDropdown) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore special keys
      if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) return;

      // Add character to search
      setCountrySearch((prev) => prev + e.key);

      // Clear search after 1.5 seconds of no typing
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        setCountrySearch("");
      }, 1500);
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [showCountryDropdown]);

  // Filter countries based on search
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  // Get current country data
  const currentCountry = COUNTRY_CODES.find((c) => c.code === formData.countryCode) || COUNTRY_CODES[2];

  // Handle phone number input with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    const maxDigits = currentCountry.digits;
    
    if (value.length <= maxDigits) {
      setFormData({ ...formData, phone: value });
    }
  };

  // Select country code
  const selectCountry = (code: string) => {
    setFormData({ ...formData, countryCode: code, phone: "" }); // Reset phone when country changes
    setShowCountryDropdown(false);
    setCountrySearch("");
  };

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setShowForm(true);
    setStatus("idle");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload PDF or Word document only");
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("role", selectedRole);
    submitData.append("fullName", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("phone", `${formData.countryCode} ${formData.phone}`);
    submitData.append("linkedin", formData.linkedin);
    submitData.append("currentLocation", formData.currentLocation);
    submitData.append("coverLetter", formData.coverLetter);
    submitData.append("whyJoin", formData.whyJoin);
    submitData.append("references", formData.references);
    if (formData.resume) {
      submitData.append("resume", formData.resume);
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        setStatus("success");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          countryCode: "+91",
          linkedin: "",
          currentLocation: "",
          resume: null,
          coverLetter: "",
          whyJoin: "",
          references: "",
        });
        setTimeout(() => {
          setShowForm(false);
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      setStatus("error");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setStatus("idle");
  };

  return (
    <>
      <section className="section">
        <h1 className="h1">Careers at Aurexa</h1>
        <div className="mt-6 p-6 bg-gradient-to-r from-brand-blue/5 to-brand-teal/5 border-l-4 border-brand-blue rounded-lg">
          <p className="text-xl font-semibold text-slate-900 leading-relaxed">
            Join a specialist team building regulated software that matters. Expect collaborative teams, domain learning opportunities and real ownership over quality-critical products.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {ROLES.map(r => (
            <details key={r.title} className="rounded-2xl border border-slate-200 bg-white p-6" open>
              <summary className="cursor-pointer font-semibold text-lg text-black">{r.title}</summary>
              <div className="mt-4 grid gap-3 text-sm text-black">
                <div>
                  <p className="font-medium text-black">Responsibilities</p>
                  <ul className="mt-1 space-y-1">{r.responsibilities.map(x => <li key={x}>• {x}</li>)}</ul>
                </div>
                <div>
                  <p className="font-medium text-black">Must-have</p>
                  <ul className="mt-1 space-y-1">{r.musts.map(x => <li key={x}>• {x}</li>)}</ul>
                </div>
                <button 
                  onClick={() => handleApply(r.title)}
                  className="mt-2 self-start px-4 py-2 rounded-lg bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blueDark transition-colors"
                >
                  Apply
                </button>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Apply for Position</h2>
                <p className="text-sm text-slate-600 mt-1">{selectedRole}</p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Personal Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        >
                          <span className="text-xl">{currentCountry.flag}</span>
                          <span className="text-sm font-medium">{currentCountry.code}</span>
                          <ChevronDown size={16} className="text-slate-400" />
                        </button>

                        {/* Dropdown */}
                        {showCountryDropdown && (
                          <div className="absolute z-50 mt-2 w-72 bg-white border border-slate-300 rounded-lg shadow-xl max-h-80 overflow-hidden">
                            {/* Search Indicator (shows when typing) */}
                            {countrySearch && (
                              <div className="px-4 py-2 bg-brand-blue/10 border-b border-slate-200">
                                <p className="text-xs text-brand-blue font-medium">
                                  Searching: "{countrySearch}"
                                </p>
                              </div>
                            )}

                            {/* Country List */}
                            <div className="overflow-y-auto max-h-72">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <button
                                    key={country.code + country.country}
                                    type="button"
                                    onClick={() => selectCountry(country.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-brand-blue/10 transition-colors text-left ${
                                      formData.countryCode === country.code ? "bg-brand-blue/20" : ""
                                    }`}
                                  >
                                    <span className="text-2xl">{country.flag}</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-slate-900 truncate">
                                        {country.country}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        {country.code} • {country.digits} digits
                                      </p>
                                    </div>
                                    {formData.countryCode === country.code && (
                                      <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-8 text-center text-sm text-slate-500">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="flex-1">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder={`Enter ${currentCountry.digits}-digit number`}
                          maxLength={currentCountry.digits}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          {formData.phone.length} / {currentCountry.digits} digits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      placeholder="City, Country"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Resume & Documents
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Resume <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-brand-blue transition-colors">
                    <input
                      type="file"
                      id="resume"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {formData.resume ? (
                        <>
                          <FileText size={32} className="text-brand-blue" />
                          <p className="text-sm font-medium text-slate-900">{formData.resume.name}</p>
                          <p className="text-xs text-slate-500">
                            {(formData.resume.size / 1024).toFixed(1)} KB
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload size={32} className="text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">
                            Click to upload resume
                          </p>
                          <p className="text-xs text-slate-500">
                            PDF or Word document (Max 5MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your background and interest in this role..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Short Answer */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  Short Answer
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Why do you want to join Aurexa? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.whyJoin}
                    onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                    rows={5}
                    placeholder="Share your motivation for joining our team and how your experience aligns with our mission..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Minimum 100 characters</p>
                </div>
              </div>

              {/* References */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
                  References
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Professional References
                  </label>
                  <textarea
                    value={formData.references}
                    onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                    rows={5}
                    placeholder="Please provide 2-3 professional references with their name, position, company, email, and phone number..."
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Optional - can be provided later if selected</p>
                </div>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">✓ Application submitted successfully!</p>
                  <p className="text-sm text-green-700 mt-1">We'll review your application and get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">✗ Submission failed</p>
                  <p className="text-sm text-red-700 mt-1">Please try again or contact careers@aurexatech.com</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-blueDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
