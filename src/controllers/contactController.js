import Contact from '../models/Contact.js';
import { contactSchema } from '../validators/contactValidator.js';
import { sendEmail } from '../utils/email.js';
import { 
  contactConfirmationTemplate, 
  contactNotificationTemplate 
} from '../utils/emailTemplates.js';

export const submitContactForm = async (req, res) => {
  try {
    // ✅ Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // ✅ Check if user already exists
    let contact = await Contact.findOne({ email: value.email });

    if (contact) {
      // ✅ Existing user → push new message
      contact.messages.push({ text: value.message });
      await contact.save();
    } else {
      // ✅ New user → create document
      contact = await Contact.create({
        name: value.name,
        email: value.email,
        messages: [{ text: value.message }],
      });
    }

    // ✅ Send notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${value.name}`,
      html: contactNotificationTemplate({
        name: value.name,
        email: value.email,
        message: value.message,
      }),
    });

    // ✅ Send confirmation to user
    await sendEmail({
      to: value.email,
      subject: 'Thank you for contacting me!',
      html: contactConfirmationTemplate({ name: value.name }),
    });

    // ✅ Return success
    res.status(201).json({
      message: 'Message sent successfully',
      contactId: contact._id,
    });

  } catch (err) {
    console.error('Contact form error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
