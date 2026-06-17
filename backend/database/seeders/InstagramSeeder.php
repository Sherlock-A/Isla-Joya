<?php

namespace Database\Seeders;

use App\Models\InstagramPost;
use Illuminate\Database\Seeder;

class InstagramSeeder extends Seeder
{
    public function run(): void
    {
        InstagramPost::truncate();

        $posts = [
            [
                'image_url'  => $this->img('1509631179021-9e6e5d3c6d86'),
                'caption'    => '✨ La lumière du matin et nos bracelets en or — une combinaison parfaite. #IslaJoya #BijouLuxe',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 847,
                'sort_order' => 1,
            ],
            [
                'image_url'  => $this->img('1583524505974-6facd53f4597'),
                'caption'    => '💍 Stack de bagues Duna & Lumière — le duo iconique de la saison. #Rings #IslaJoya',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 623,
                'sort_order' => 2,
            ],
            [
                'image_url'  => $this->img('1612817288484-6f916006741a'),
                'caption'    => '🌿 Notre collier Casablanca Pendant — l\'élégance à l\'état pur. #Necklace #LuxuryJewelry',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 412,
                'sort_order' => 3,
            ],
            [
                'image_url'  => $this->img('1545205597-3d9d02c29597'),
                'caption'    => '🌸 Les Perla Drop Earrings, pour les soirées qui brillent. #Earrings #PerlaDrops',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 938,
                'sort_order' => 4,
            ],
            [
                'image_url'  => $this->img('1583623025817-d180a2221d0a'),
                'caption'    => '🌊 Le Soleil Tennis Bracelet — 60 diamants de laboratoire. #Tennis #GoldBracelet',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 715,
                'sort_order' => 5,
            ],
            [
                'image_url'  => $this->img('1598560917807-1bae44bd2be8'),
                'caption'    => '✨ Croissant Hoops — la boucle signature de cet été. #Hoops #Earrings #IslaJoya',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 521,
                'sort_order' => 6,
            ],
            [
                'image_url'  => $this->img('1575393932798-91c49da4c132'),
                'caption'    => '🪷 Flat lay du jour : toute notre nouvelle collection printemps. #NewCollection #Jewelry',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 384,
                'sort_order' => 7,
            ],
            [
                'image_url'  => $this->img('1603561591411-fd0eb2024fb9'),
                'caption'    => '💛 La Reina Cocktail Ring — pour les femmes qui assument leur éclat. #Ring #Cocktail',
                'post_url'   => 'https://instagram.com/isla.joya',
                'likes'      => 296,
                'sort_order' => 8,
            ],
        ];

        foreach ($posts as $post) {
            InstagramPost::create(array_merge($post, ['is_featured' => true]));
        }
    }

    private function img(string $id): string
    {
        return "https://images.unsplash.com/photo-{$id}?auto=format&fit=crop&w=800&q=80";
    }
}
