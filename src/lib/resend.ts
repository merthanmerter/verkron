import { Resend } from "resend";

let _resend: Resend | null = null;

export const getResend = () => {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
};

export const resend = {
  get emails() {
    return getResend().emails;
  },
};
