<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            [
               'school_id'=> 1,
               'room_name'=> 'Room 1',
               
            ],
            [
               'school_id'=> 1,
               'room_name'=> 'Room 2',
               
            ],
            [
               'school_id'=> 1,
               'room_name'=> 'Room 3',
               
            ],
             [
               'school_id'=> 1,
               'room_name'=> 'Room info',
               
            ],
        ]);

    }
}
