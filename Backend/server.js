// -----------------------
// IMPORTS
// -----------------------
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Groq = require("groq-sdk");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------
// MONGODB CONNECTION
// -----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

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
// HELPER: REVERSE GEOCODING
// -----------------------
async function getAddressFromCoords(lat, lon) {
  try {
    const res = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon,
        },
        headers: {
          "User-Agent": "SSBA-App",
        },
      }
    );

    const a = res.data.address || {};

    return {
      city: a.city || a.town || a.village || "",
      state: a.state || "",
      country: a.country || "",
      fullAddress: res.data.display_name || "",
    };
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return {};
  }
}

// -----------------------
// QUICK BOOKING SCHEMA
// -----------------------
const QuickBookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  tournamentType: String,
  createdAt: { type: Date, default: Date.now },
});

const QuickBooking = mongoose.model("QuickBooking", QuickBookingSchema);

// -----------------------
// TRIAL FORM SCHEMA
// -----------------------
const TrialFormSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  email: String,
  level: String,
  preferredTime: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const TrialForm = mongoose.model("TrialForm", TrialFormSchema);

// -----------------------
// CONTACT SCHEMA (FINAL LOCATION VERSION)
// -----------------------
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  inquiryType: String,

  location: {
    latitude: Number,
    longitude: Number,
    city: String,
    state: String,
    country: String,
    fullAddress: String,
  },

  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", ContactSchema);

// -----------------------
// TRIAL FORM API
// -----------------------
app.post("/api/trial-form", async (req, res) => {
  try {
    const newEntry = new TrialForm(req.body);
    await newEntry.save();

    const { name, phone, email } = req.body;

    await transporter.sendMail({
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Trial Session Confirmed — SSBA",
      text: `Hello ${name}, your trial session request is received.`,
    });

    await transporter.sendMail({
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Trial Booking",
      text: `New trial booking from ${name}, Phone: ${phone}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Trial Error:", error);
    res.status(500).json({ success: false });
  }
});

// -----------------------
// CONTACT FORM API (WITH FULL LOCATION)
// -----------------------
app.post("/api/contact", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
      location,
    } = req.body;

    let addressData = {};

    if (location?.latitude && location?.longitude) {
      addressData = await getAddressFromCoords(
        location.latitude,
        location.longitude
      );
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      inquiryType,
      location: {
        latitude: location?.latitude,
        longitude: location?.longitude,
        ...addressData,
      },
    });

    await newContact.save();

    // ADMIN EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `📍 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Inquiry:</b> ${inquiryType}</p>
        <p><b>Subject:</b> ${subject || "N/A"}</p>
        <p><b>Message:</b> ${message}</p>
        <hr/>
        <h3>📍 User Location</h3>
        <p>${addressData.fullAddress || "Not Available"}</p>
        <a href="https://www.google.com/maps?q=${location?.latitude},${location?.longitude}">
          View on Google Maps
        </a>
      `,
    });

    // USER EMAIL
    await transporter.sendMail({
      from: `"SSBA Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your message — SSBA",
      html: `
        <p>Hello <b>${name}</b>,</p>
        <p>Thank you for contacting SSBA. We will get back to you shortly.</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ success: false });
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
  } catch {
    res.json({ reply: "AI error" });
  }
});

// -----------------------
// QUICK BOOKING API
// -----------------------
app.post("/api/quick-booking", async (req, res) => {
  try {
    const { name, phone, tournamentType } = req.body;

    if (!name || !phone || !tournamentType) {
      return res.status(400).json({ success: false });
    }

    await new QuickBooking({ name, phone, tournamentType }).save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

// -----------------------
// START SERVER
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
