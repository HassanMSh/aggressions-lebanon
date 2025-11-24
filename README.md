# **Lebanon Aggressions Archive (1949–1985)**

A digital archive that documents and organizes historical aggression events that occurred in Lebanon between **1949 and 1985**.
This project transforms the contents of the original book:

**“لبنان 1949–1985: الاعتداءات الإسرائيلية”**

into a **searchable, filterable, and user-friendly** web platform.

---

## **✨ Features**

* 🔎 **Full-text search** across all events
* 🗂️ **Filter by year, month, exact date, or date range**
* 📅 Beautiful **date picker** for easier filtering
* 📋 **Copy-to-clipboard** for quick sharing
* 📨 **Correction request tool** (RequestFix)
* 📄 **Export database (JSON)**
* 📱 **Fully responsive design** with a mobile-first search UI
* 🚀 Modern React + Tailwind architecture

---

## **📚 Purpose**

* Digitize an important historical reference
* Make research and fact-checking accessible
* Preserve Lebanese historical documentation
* Enable fast navigation across decades of recorded events

---

## **📁 Data Source**

The dataset is based on the published book:

**“لبنان 1949–1985: الاعتداءات الإسرائيلية”**

Copyright and intellectual rights belong to the original authors and publishers.

---

## **📥 Data Extraction & OCR Pipeline**

The initial digitization of the book relied on a companion project:

### **Arabic Chrono Dots OCR**

GitHub: [https://github.com/HassanMSh/arabic-chrono-dots-ocr](https://github.com/HassanMSh/arabic-chrono-dots-ocr)

This system performs OCR on Arabic chronological text using:

* **dots.ocr-4bit (Quantized Version)**
  [https://huggingface.co/helizac/dots.ocr-4bit](https://huggingface.co/helizac/dots.ocr-4bit)

* **Original dots.ocr Model**
  [https://huggingface.co/rednote-hilab/dots.ocr](https://huggingface.co/rednote-hilab/dots.ocr)

This OCR pipeline generated the base text used to build the structured dataset powering this archive.

---

## **🔧 Tech Stack**

* **React (Vite)**
* **Tailwind CSS**
* **Netlify (Deployment)**
* Modern hooks, responsive layout, and clean component structure.

---

## **📬 Contact**

For improvements, corrections, or contributions:
**[hassan.m.shamseddine@gmail.com](mailto:hassan.m.shamseddine@gmail.com)**

---

## **📝 License**

This project is open-source under the **MIT License**.
The dataset remains the property of its original creators.
