<?php
// php artisan db:seed --class=AddStreaksToExistingUsers
namespace Database\Seeders;
use App\Models\User;
use App\Models\Streak;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddStreaksToExistingUsers extends Seeder
{
    public function run()
    {
        $usersWithoutStreak = User::whereDoesntHave('streak')->get();

        foreach ($usersWithoutStreak as $user) {
            Streak::create([
                'user_id' => $user->id,
                'streak_count' => 0,
                'last_completed_date' => null,
            ]);
            echo "✅ Streak added for user: {$user->id}\n";
        }

        echo "🚀 All users now have a streak record!\n";
    }
}
