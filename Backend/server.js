// -----------------------
// IMPORTS
// -----------------------
const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------
// MONGODB CONNECTION
// -----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// -----------------------
// NODEMAILER TRANSPORTER
// -----------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// -----------------------
// QUICK BOOKING SCHEMA
// -----------------------
const QuickBookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  tournamentType: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuickBooking = mongoose.model("QuickBooking", QuickBookingSchema);

// -----------------------
// SCHEMAS
// -----------------------
const trialFormSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  email: String,
  level: String,
  preferredTime: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const TrialForm = mongoose.model("TrialForm", trialFormSchema);

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  inquiryType: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", ContactSchema);

// -----------------------
// TRIAL FORM API (already correct)
// -----------------------
app.post("/api/trial-form", async (req, res) => {
  try {
    const newEntry = new TrialForm(req.body);
    await newEntry.save();

    const { name, age, phone, email, level, preferredTime, message } = req.body;

    // USER EMAIL
    const userMailOptions = {
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Your Free Trial Session is Confirmed — SSBA",
      text: `Hello ${name}, we received your trial booking.`,
    };

    // ADMIN EMAIL
    const adminMailOptions = {
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Trial Booking Received — SSBA Academy",
      text: `New Booking from ${name}, Phone: ${phone}`,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.json({ message: "Trial form saved + emails sent!" });
  } catch (error) {
    console.error("Trial Error:", error);
    res.status(500).json({ error: "Error sending trial form" });
  }
});

// -----------------------
// CONTACT FORM API (SAVE + ADMIN EMAIL + USER EMAIL)
// -----------------------
app.post("/api/contact", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();

    const { name, email, phone, subject, message, inquiryType } = req.body;

    // ADMIN EMAIL
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Inquiry Type:</b> ${inquiryType}</p>
        <p><b>Subject:</b> ${subject || "Not provided"}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    // USER EMAIL
    const userMailOptions = {
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message — SSBA Badminton Academy",
      html: `
        <h2>Thank you for contacting SSBA</h2>
        <p>Hello <b>${name}</b>,</p>
        <p>Your message has been received. We will respond shortly.</p>
      `,
    };

    // SEND BOTH EMAILS
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ success: true, message: "Message saved + emails sent!" });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ success: false, message: "Error sending email or saving form" });
  }
});

// -----------------------
// GROQ AI
// -----------------------
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/ask", async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful badminton assistant." },
        { role: "user", content: req.body.message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.log("Groq Error:", error);
    res.json({ reply: "AI error" });
  }
});
// -----------------------
// QUICK BOOKING API
// -----------------------
app.post("/api/quick-booking", async (req, res) => {
  try {
    console.log("API HIT:", req.body); // DEBUG

    const { name, phone, tournamentType } = req.body;

    if (!name || !phone || !tournamentType) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const newBooking = new QuickBooking({
      name,
      phone,
      tournamentType,
    });

    await newBooking.save();

    res.json({
      success: true,
      message: "Quick booking saved",
    });
  } catch (error) {
    console.error("Quick Booking Error:", error);
    res.status(500).json({ success: false });
  }
});

// -----------------------
// START SERVER
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
