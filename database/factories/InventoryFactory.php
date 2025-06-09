<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'retail_id' => 1,
            'product_id' => function () {
                return Product::factory()->create()->id;
            },
            'quantity' => $this->faker->numberBetween(0, 100),
            'cost_price' => $this->faker->randomFloat(2, 5, 500),
            'selling_price' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
