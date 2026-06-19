"use server";

export type ConsultationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitConsultationRequest(
  _prevState: ConsultationFormState,
  formData: FormData
): Promise<ConsultationFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const serviceInterest = String(formData.get("serviceInterest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !company || !role || !serviceInterest || !message) {
    return { status: "error", message: "Please complete all required fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid work email address." };
  }

  // Routing to a real inbox/CRM is not yet wired up — this is the integration
  // point to connect before launch (e.g. email delivery or CRM webhook).
  console.log("Consultation request received:", {
    name,
    email,
    company,
    role,
    serviceInterest,
    message,
  });

  return {
    status: "success",
    message: "Thanks — your request has been received. A member of the Claaps team will follow up.",
  };
}
