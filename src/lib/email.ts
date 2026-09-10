import emailjs from '@emailjs/browser';

export interface ContactEmailParams {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

export const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_zkqt4no',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_vwkec8j',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'Qww1hpZoe-WFgtbSk',
};

/**
 * Sends a contact inquiry using EmailJS.
 * Maps parameters to common EmailJS template variables:
 * - {{name}}, {{from_name}}
 * - {{email}}, {{from_email}}, {{reply_to}}
 * - {{service}}, {{project_type}}
 * - {{message}}
 * - {{to_name}}
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<SendEmailResult> {
  const serviceId = EMAILJS_CONFIG.serviceId;
  const templateId = EMAILJS_CONFIG.templateId;
  const publicKey = EMAILJS_CONFIG.publicKey;

  if (!serviceId) {
    return {
      success: false,
      error: 'Missing EmailJS Service ID.',
    };
  }

  if (!templateId || !publicKey) {
    return {
      success: false,
      error: 'EmailJS Template ID or Public Key is not configured yet.',
    };
  }

  try {
    const templateParams: Record<string, unknown> = {
      name: params.name,
      from_name: params.name,
      email: params.email,
      from_email: params.email,
      reply_to: params.email,
      service: params.service,
      project_type: params.service,
      message: params.message,
      to_name: 'Uday Kiran Tella',
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
    });

    if (response.status === 200) {
      return { success: true };
    }

    return {
      success: false,
      error: `EmailJS response status: ${response.status} (${response.text})`,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : typeof err === 'object' && err !== null && 'text' in err
        ? String((err as { text: unknown }).text)
        : 'Failed to send message via EmailJS.';
    return {
      success: false,
      error: errorMsg,
    };
  }
}

