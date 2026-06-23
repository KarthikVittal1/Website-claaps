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
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName  = String(formData.get("lastName")  ?? "").trim();
  const email     = String(formData.get("email")     ?? "").trim();
  const company   = String(formData.get("company")   ?? "").trim();
  const message   = String(formData.get("message")   ?? "").trim();

  if (!firstName || !lastName || !email || !company || !message) {
    return { status: "error", message: "Please complete all required fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid work email address." };
  }

  const name = `${firstName} ${lastName}`;

  console.log("Consultation request received:", { name, email, company, message });

  return {
    status: "success",
    message: "Thanks — your request has been received. A member of the Claaps team will follow up.",
  };
}
