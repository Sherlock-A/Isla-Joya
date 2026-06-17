<?php

namespace Database\Seeders;

use App\Models\Faq;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // Testimonials
        $testimonials = [
            ['quote' => "The Lumière ring is even more beautiful in person. It hasn't left my finger since it arrived in Casablanca.", 'name' => 'Yasmine B.', 'city' => 'Casablanca 🇲🇦', 'sort_order' => 1],
            ['quote' => "Ordered three pieces over WhatsApp and the whole thing felt personal — like shopping with a friend who has impeccable taste.", 'name' => 'Carla M.', 'city' => 'Barcelona 🇪🇸', 'sort_order' => 2],
            ['quote' => "I stock Isla Joya in my boutique. The quality and the margins are exactly what my clients and my business needed.", 'name' => 'Nour & Co. Boutique', 'city' => 'Rabat 🇲🇦', 'sort_order' => 3],
        ];

        foreach ($testimonials as $t) {
            Testimonial::firstOrCreate(['name' => $t['name'], 'city' => $t['city']], $t);
        }

        // FAQs
        $faqs = [
            ['question' => 'How do I place an order?', 'answer' => 'Everything happens on WhatsApp. Tap any "Order on WhatsApp" button, send us the piece you love, and we\'ll confirm price, availability and delivery in minutes.', 'sort_order' => 1],
            ['question' => 'Where do you deliver?', 'answer' => 'Across all of Morocco 🇲🇦 and to Barcelona, Spain 🇪🇸. Delivery is free on orders over €150; smaller orders carry a small flat fee we\'ll confirm in chat.', 'sort_order' => 2],
            ['question' => 'What are your pieces made of?', 'answer' => 'Our jewelry is crafted from 18K gold vermeil, sterling silver, sparkling zircon and freshwater pearls — designed to keep their shine from daylight to candlelight.', 'sort_order' => 3],
            ['question' => 'Do you offer wholesale pricing?', 'answer' => 'Yes. Our stockist program starts from 12 pieces with low minimums, fast restock and ready-to-sell content. Send us a wholesale enquiry on WhatsApp to receive the catalogue.', 'sort_order' => 4],
            ['question' => 'How should I care for my jewelry?', 'answer' => 'Keep pieces away from water, perfume and friction, and store them in the pouch provided. With a little care, they\'re built to become modern heirlooms.', 'sort_order' => 5],
        ];

        foreach ($faqs as $f) {
            Faq::firstOrCreate(['question' => $f['question']], $f);
        }

        // Site settings
        $settings = [
            ['key' => 'whatsapp_number', 'label' => 'Numéro WhatsApp (avec indicatif pays, ex: 212600000000)', 'value' => '212600000000'],
            ['key' => 'site_email',      'label' => 'Email de contact', 'value' => 'hello@islajoya.com'],
            ['key' => 'instagram_url',   'label' => 'URL Instagram', 'value' => 'https://www.instagram.com/isla.joya'],
            ['key' => 'announcement',    'label' => 'Annonce bandeau (vide = caché)', 'value' => ''],
        ];

        foreach ($settings as $s) {
            SiteSetting::firstOrCreate(['key' => $s['key']], $s);
        }
    }
}
