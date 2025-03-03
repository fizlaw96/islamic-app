<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a default admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('1234qwer'), // Default password
        ]);

        // Run other seeders
        $this->call([
            IslamicContentSeeder::class, // Ensure Islamic content is seeded
        ]);
    }
}
