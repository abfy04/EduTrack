<?php

namespace Database\Seeders;

use App\Models\TimeSlotsMode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TimeSlotsModeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TimeSlotsMode::create([
              'school_id'=>1,
              'mode_name'=>'Default',
              'is_active'=>true
        ]);
    }
}
