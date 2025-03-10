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
        User::factory()->create([
            'name' => 'Admin Hafiz',
            'email' => 'admin@tafheem.com', // ✅ Updated email
            'password' => bcrypt('1234qwer'), // ✅ Stronger password
            'role' => 'admin', // ✅ Assign admin role
        ]);

        // Run other seeders
        $this->call([
            IslamicContentSeeder::class,
            LessonSeeder::class,
        ]);
    }
}
