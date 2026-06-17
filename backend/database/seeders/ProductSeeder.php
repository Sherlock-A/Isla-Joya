<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    private function img(string $id): string
    {
        return "https://images.unsplash.com/photo-{$id}?auto=format&fit=crop&w=800&q=80";
    }

    public function run(): void
    {
        $products = [
            [
                'slug'         => 'lumiere-signet-ring',
                'name'         => 'Lumière Signet Ring',
                'material'     => '18K Gold Vermeil',
                'description'  => 'Un signet contemporain aux proportions sculptées, poli à la main en vermeil 18 carats. Porter la lumière à chaque geste.',
                'price'        => 68,
                'category'     => 'rings',
                'badge'        => 'new',
                'rating'       => 4.9,
                'reviews'      => 212,
                'tone'         => 'gold',
                'is_bestseller'=> false,
                'is_new'       => true,
                'images'       => [
                    $this->img('1605100804763-247f67b3557e'),
                    $this->img('1576618402253-15e30d9882ae'),
                ],
            ],
            [
                'slug'         => 'etoile-pendant',
                'name'         => 'Étoile Pendant',
                'material'     => 'Rose Gold · Zircon',
                'description'  => 'Un pendant étoile serti d\'un zircon taille brillant. Léger comme la lumière, précieux comme le ciel nocturne de Marrakech.',
                'price'        => 74,
                'category'     => 'necklaces',
                'badge'        => 'bestseller',
                'rating'       => 4.8,
                'reviews'      => 180,
                'tone'         => 'rose',
                'is_bestseller'=> true,
                'is_new'       => false,
                'images'       => [
                    $this->img('1611591437281-460bfbe1220a'),
                    $this->img('1603561591411-fd0eb2024fb9'),
                ],
            ],
            [
                'slug'         => 'perla-drop-earrings',
                'name'         => 'Perla Drop Earrings',
                'material'     => 'Pearl & Gold',
                'description'  => 'Perles d\'eau douce suspendues en or vermeil. Une élégance intemporelle qui traverse les saisons et les frontières.',
                'price'        => 92,
                'category'     => 'earrings',
                'badge'        => 'limited',
                'rating'       => 5.0,
                'reviews'      => 88,
                'tone'         => 'ivory',
                'is_bestseller'=> false,
                'is_new'       => false,
                'images'       => [
                    $this->img('1598560917807-1bae44bd2be8'),
                    $this->img('1535632066927-ab7c9ab60908'),
                ],
            ],
            [
                'slug'         => 'soleil-tennis-bracelet',
                'name'         => 'Soleil Tennis Bracelet',
                'material'     => '18K Gold · Zircon',
                'description'  => 'Bracelet tennis en or 18 carats pavé de zircons taille brillant. Chaque mouvement reflète la lumière du soleil.',
                'price'        => 120,
                'category'     => 'bracelets',
                'badge'        => 'bestseller',
                'rating'       => 4.9,
                'reviews'      => 64,
                'tone'         => 'champagne',
                'is_bestseller'=> true,
                'is_new'       => false,
                'images'       => [
                    $this->img('1573408301185-9519f94815cd'),
                    $this->img('1603561591411-fd0eb2024fb9'),
                ],
            ],
            [
                'slug'         => 'croissant-hoops',
                'name'         => 'Croissant Hoops',
                'material'     => 'Gold Vermeil',
                'description'  => 'Créoles sculpturales en forme de croissant, dorées à l\'or 18 carats. Une forme architecturale au service de la féminité.',
                'price'        => 58,
                'category'     => 'earrings',
                'badge'        => 'bestseller',
                'rating'       => 4.7,
                'reviews'      => 301,
                'tone'         => 'gold',
                'is_bestseller'=> true,
                'is_new'       => false,
                'images'       => [
                    $this->img('1535632066927-ab7c9ab60908'),
                    $this->img('1612817288484-6f916006741a'),
                ],
            ],
            [
                'slug'         => 'olas-chain-necklace',
                'name'         => 'Olas Chain Necklace',
                'material'     => 'Gold Vermeil',
                'description'  => 'Chaîne en or vermeil à maillons vague, inspirée des côtes andalouses. Fine et résistante, elle s\'adapte à toutes les longueurs.',
                'price'        => 84,
                'category'     => 'necklaces',
                'badge'        => 'new',
                'rating'       => 4.8,
                'reviews'      => 57,
                'tone'         => 'champagne',
                'is_bestseller'=> false,
                'is_new'       => true,
                'images'       => [
                    $this->img('1611591437281-460bfbe1220a'),
                    $this->img('1573408301185-9519f94815cd'),
                ],
            ],
            [
                'slug'         => 'duna-stacking-ring',
                'name'         => 'Duna Stacking Ring',
                'material'     => 'Gold · Champagne',
                'description'  => 'Une bague fine à empiler conçue pour vivre en famille. Elle s\'associe à toutes les pièces Isla Joya pour créer une composition personnelle.',
                'price'        => 46,
                'category'     => 'rings',
                'badge'        => 'new',
                'rating'       => 4.6,
                'reviews'      => 140,
                'tone'         => 'champagne',
                'is_bestseller'=> false,
                'is_new'       => true,
                'images'       => [
                    $this->img('1576618402253-15e30d9882ae'),
                    $this->img('1605100804763-247f67b3557e'),
                ],
            ],
            [
                'slug'         => 'marbella-cuff',
                'name'         => 'Marbella Cuff',
                'material'     => 'Polished Gold',
                'description'  => 'Un manchette statement en or poli, née de l\'architecture blanche de Marbella. Sa forme ouverte s\'ajuste à chaque poignet.',
                'price'        => 110,
                'category'     => 'bracelets',
                'badge'        => 'limited',
                'rating'       => 5.0,
                'reviews'      => 41,
                'tone'         => 'nude',
                'is_bestseller'=> false,
                'is_new'       => false,
                'images'       => [
                    $this->img('1603561591411-fd0eb2024fb9'),
                    $this->img('1573408301185-9519f94815cd'),
                ],
            ],
            [
                'slug'         => 'aretes-luna-earrings',
                'name'         => 'Aretes Luna',
                'material'     => 'Rose Gold',
                'description'  => 'Boucles d\'oreilles lunaires en or rose, à la fois graphiques et douces. Un équilibre parfait entre modernité et romantisme.',
                'price'        => 64,
                'category'     => 'earrings',
                'badge'        => 'bestseller',
                'rating'       => 4.9,
                'reviews'      => 96,
                'tone'         => 'rose',
                'is_bestseller'=> true,
                'is_new'       => false,
                'images'       => [
                    $this->img('1598560917807-1bae44bd2be8'),
                    $this->img('1535632066927-ab7c9ab60908'),
                ],
            ],
            [
                'slug'         => 'casablanca-pendant',
                'name'         => 'Casablanca Pendant',
                'material'     => 'Gold · Onyx',
                'description'  => 'Un pendant en onyx noir cerclé d\'or, inspiré des zellige de Casablanca. Une pièce de caractère pour qui porte sa culture avec fierté.',
                'price'        => 98,
                'category'     => 'necklaces',
                'badge'        => 'new',
                'rating'       => 4.8,
                'reviews'      => 73,
                'tone'         => 'noir',
                'is_bestseller'=> false,
                'is_new'       => true,
                'images'       => [
                    $this->img('1611591437281-460bfbe1220a'),
                    $this->img('1576618402253-15e30d9882ae'),
                ],
            ],
            [
                'slug'         => 'infinito-bracelet',
                'name'         => 'Infinito Bracelet',
                'material'     => 'Gold Vermeil',
                'description'  => 'Un bracelet jonc infini en vermeil, symbole de continuité et d\'harmonie. La pièce quotidienne que l\'on ne retire jamais.',
                'price'        => 72,
                'category'     => 'bracelets',
                'badge'        => 'bestseller',
                'rating'       => 4.7,
                'reviews'      => 152,
                'tone'         => 'gold',
                'is_bestseller'=> true,
                'is_new'       => false,
                'images'       => [
                    $this->img('1573408301185-9519f94815cd'),
                    $this->img('1603561591411-fd0eb2024fb9'),
                ],
            ],
            [
                'slug'         => 'reina-cocktail-ring',
                'name'         => 'Reina Cocktail Ring',
                'material'     => 'Gold · Zircon',
                'description'  => 'La bague cocktail de la collection — un zircon taille émeraude serti d\'or. Pour les soirées qui méritent qu\'on s\'en souvienne.',
                'price'        => 105,
                'category'     => 'rings',
                'badge'        => 'limited',
                'rating'       => 4.9,
                'reviews'      => 60,
                'tone'         => 'champagne',
                'is_bestseller'=> false,
                'is_new'       => false,
                'images'       => [
                    $this->img('1605100804763-247f67b3557e'),
                    $this->img('1612817288484-6f916006741a'),
                ],
            ],
        ];

        foreach ($products as $data) {
            Product::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($data, ['is_active' => true])
            );
        }
    }
}
