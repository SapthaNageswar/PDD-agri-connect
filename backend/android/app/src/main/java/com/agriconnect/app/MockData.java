package com.agriconnect.app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MockData {

    // ───────────── Product ─────────────
    public static class Product {
        public String id, name, seller, location, category, image;
        public int price, quantity;
        public float rating;
        public Product(String id, String name, String seller, String location, String category,
                       int price, int quantity, float rating, String image) {
            this.id = id; this.name = name; this.seller = seller;
            this.location = location; this.category = category;
            this.price = price; this.quantity = quantity;
            this.rating = rating; this.image = image;
        }
    }

    public static List<Product> getProducts() {
        return Arrays.asList(
            new Product("1","Premium Wheat","Ramesh Kumar","Ludhiana, Punjab","Grains",2450,500,4.8f,"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400"),
            new Product("2","Organic Basmati Rice","Suresh Singh","Karnal, Haryana","Grains",3800,200,4.9f,"https://images.unsplash.com/photo-1536304993881-ff86e6d29d77?w=400"),
            new Product("3","Fresh Tomatoes","Ravi Patil","Nashik, Maharashtra","Vegetables",45,1000,4.6f,"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"),
            new Product("4","Yellow Mustard","Harpreet Singh","Bathinda, Punjab","Oilseeds",5200,150,4.7f,"https://images.unsplash.com/photo-1612204103590-b46e2ee89a71?w=400"),
            new Product("5","Green Chillies","Lakshmi Devi","Guntur, AP","Spices",120,300,4.5f,"https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=400"),
            new Product("6","Alphonso Mangoes","Dinesh Jadhav","Ratnagiri, MH","Fruits",480,80,5.0f,"https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400")
        );
    }

    // ───────────── Market Price ─────────────
    public static class MarketPrice {
        public String crop, current, trend, status;
        public MarketPrice(String crop, String current, String trend, String status) {
            this.crop = crop; this.current = current;
            this.trend = trend; this.status = status;
        }
    }

    public static List<MarketPrice> getMarketPrices() {
        return Arrays.asList(
            new MarketPrice("Wheat",    "₹2,450", "+₹32 (1.3%)",  "up"),
            new MarketPrice("Rice",     "₹3,800", "+₹120 (3.2%)", "up"),
            new MarketPrice("Mustard",  "₹5,200", "-₹80 (1.5%)",  "down"),
            new MarketPrice("Tomato",   "₹45",    "+₹8 (21.6%)",  "up"),
            new MarketPrice("Onion",    "₹38",    "-₹5 (11.6%)",  "down"),
            new MarketPrice("Soybean",  "₹4,350", "+₹65 (1.5%)",  "up")
        );
    }

    // ───────────── Expert ─────────────
    public static class Expert {
        public String name, specialty, location, experience;
        public float rating;
        public Expert(String name, String specialty, String location, String experience, float rating) {
            this.name = name; this.specialty = specialty;
            this.location = location; this.experience = experience;
            this.rating = rating;
        }
    }

    public static List<Expert> getExperts() {
        return Arrays.asList(
            new Expert("Dr. Anand Kumar",   "Soil Science & Crop Nutrition",  "IARI, New Delhi",      "15 yrs", 4.9f),
            new Expert("Dr. Priya Sharma",  "Plant Pathology & Disease Mgmt", "PAU, Ludhiana",        "12 yrs", 4.8f),
            new Expert("Dr. Rajesh Patel",  "Irrigation & Water Management",  "TNAU, Coimbatore",     "18 yrs", 4.7f),
            new Expert("Dr. Meena Joshi",   "Organic Farming & Certification","MPKV, Rahuri",         "10 yrs", 4.9f),
            new Expert("Dr. Suresh Reddy",  "Pest Management & Pesticides",   "PJTSAU, Hyderabad",    "14 yrs", 4.6f)
        );
    }

    // ───────────── Notification ─────────────
    public static class Notification {
        public String title, message, time, type;
        public Notification(String title, String message, String time, String type) {
            this.title = title; this.message = message;
            this.time = time; this.type = type;
        }
    }

    public static List<Notification> getNotifications() {
        return Arrays.asList(
            new Notification("Price Alert",        "Wheat price increased by ₹32 today in Ludhiana mandi.", "2 min ago",  "price"),
            new Notification("Weather Advisory",   "Heavy rain forecast for next 3 days. Delay irrigation.", "1 hr ago",   "weather"),
            new Notification("Order Confirmed",    "Your order for Alphonso Mangoes has been confirmed.",   "3 hrs ago",  "order"),
            new Notification("AI Advisory Ready",  "New advisory for your wheat crop available.",            "5 hrs ago",  "advisory"),
            new Notification("Market Update",      "New buyers looking for organic produce in your area.",   "Yesterday",  "market"),
            new Notification("Expert Reply",       "Dr. Anand Kumar replied to your soil query.",            "2 days ago", "expert")
        );
    }

    // ───────────── Advisory Tips ─────────────
    public static class AdvisoryTip {
        public String question, answer;
        public AdvisoryTip(String q, String a) { this.question = q; this.answer = a; }
    }

    public static List<AdvisoryTip> getAdvisoryTips() {
        return Arrays.asList(
            new AdvisoryTip("Best time to sow wheat in Punjab?",
                "Optimal sowing window is Oct 25 – Nov 10 for maximum yield. Use HD-2967 or PBW-550 varieties. Seed rate: 40-45 kg/hectare."),
            new AdvisoryTip("How to deal with yellow rust in wheat?",
                "Apply Propiconazole 25% EC at 500ml/ha at first sign of infection. Repeat after 15 days if needed. Ensure good drainage."),
            new AdvisoryTip("Organic fertilizer recommendation for tomato?",
                "Apply 25 t/ha FYM before transplanting, 50 kg N, 60 kg P2O5, 60 kg K2O per ha. Top dress with 25 kg N at 30 and 60 days."),
            new AdvisoryTip("How to increase mango yield?",
                "Apply 10 kg FYM + 1 kg urea + 500g SSP + 500g MOP per tree. Prune after harvest. Spray 10% urea before flowering for better fruit set.")
        );
    }
}
