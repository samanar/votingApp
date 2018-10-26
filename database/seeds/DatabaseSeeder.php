<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Saman',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);
    }
}
