<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NoBadWords implements Rule
{
    protected $badWords = [
        // 🔹 Malay Bad Words
        'babi', 'sial', 'bangsat', 'bodoh', 'bodo', 'tolol', 'anjing', 'setan', 'laknat', 'cilaka', 'celaka', 'syaitan',
        'pukimak', 'haram jadah', 'goblok', 'jahanam', 'keparat', 'bahlul', 'mampus', 'mampos', 'cibai', 'bangang',
        'pengecut', 'sundal', 'pantat', 'kote', 'puki', 'jubur', 'kontol', 'kimak', 'konek',

        // 🔹 English Bad Words
        'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'dick', 'cunt', 'fucker', 'motherfucker',
        'slut', 'whore', 'pussy', 'cock', 'douche', 'retard', 'scumbag', 'twat', 'wanker',
        'prick', 'arse', 'jackass', 'dipshit', 'jerk', 'dumbass', 'nigga', 'nigger',
        'chink', 'spic', 'beaner', 'cracker', 'kyke', 'coon', 'gook', 'wetback', 'tranny',

        // 🔹 Gen Z & Meme Words (To Prevent Troll Names)
        'skibidi', 'sigma', 'rizz', 'gyatt', 'zamn', 'cap', 'no cap', 'drip', 'deez', 'sus',
        'bussin', 'ligma', 'balls', 'ratio', 'npc', 'goofy ahh', 'skull', 'bozo', 'sheesh',
        'yeet', 'bruh', 'based', 'cringe', 'sussy', 'mid', 'sigma male', 'sigma grindset',
        'devious', 'skibidi toilet', 'gyat', 'zesty', 'griddy', 'womp womp', 'fortnite balls',
        'malding', 'goofy', 'lit', 'dab', 'pov', 'vibe check', 'shadowban',

        // 🔹 Trolling & Offensive Gamer Lingo
        'ez', 'rekt', 'lmao', 'lmfao', 'noob', 'pwned', 'git gud', 'cringe', 'cope',
        'clown', 'alt f4', 'you fell off', 'we do not care', 'touch grass',
        'your mom', 'ur mom', 'ur dad left', 'imagine',

        // 🔹 Abbreviated or Coded Inappropriate Words
        'fck', 'sh!t', 'b!tch', 'd!ck', 'c0ck', 'f@ggot', 'p*ssy', 'd*mn', 'a$$', 'wtf',
        'l+ratio', 'l+bozo', 'xd', 'uwu', 'owo'
    ];

    public function passes($attribute, $value)
    {
        // Convert to lowercase for case-insensitive matching
        $lowercaseValue = strtolower($value);

        // Check if the name contains any inappropriate words
        foreach ($this->badWords as $badWord) {
            if (str_contains($lowercaseValue, $badWord)) {
                return false; // Fail validation if a bad word is found
            }
        }

        return true; // Pass validation if no bad words are found
    }

    public function message()
    {
        return 'The :attribute contains inappropriate or meme words. Please use a proper name.';
    }
}
