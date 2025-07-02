<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Configuration\ConfigurationController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Configuration\SchoolWorkingDayController;
use App\Http\Controllers\Configuration\TimeSlotsController;
use App\Http\Controllers\FiliereController as ControllersFiliereController;
use App\Http\Controllers\Schedules\ScheduleController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\OptionController;

use App\Http\Middleware\Authenticate;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\RedirectTo;
use Illuminate\Support\Facades\Route;

// Public routes - no middleware
Route::middleware([RedirectTo::class])->group(function (){
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    
});

// Protected routes by role
Route::middleware([Authenticate::class, CheckRole::class.':Admin'])->group(function() {
    Route::get('/', [DashboardController::class , 'adminDashboard'])->name('admin.dashboard');
    Route::inertia('/profile', 'admin/Profile')->name('admin.profile');
    Route::inertia('/humanResources', 'admin/Indexes/HumanRessources')->name('humanResources');
    Route::get('/configuration', [ConfigurationController::class,'showConfiguration'])->name('configuration');
    Route::post('/configuration/workingDays', [SchoolWorkingDayController::class,'save'])->name('save_working_days');
    Route::post('/configuration/timeSlots', [TimeSlotsController::class,'save'])->name('save_time_slots');
    Route::prefix('schoolResources')->group(function () {
        Route::inertia('/', 'admin/SchoolsResources/SchoolResources')->name('schoolResources');
        //Route::inertia('/groups', 'admin/SchoolsResources/Groups/Groups')->name('schoolResources.groups');
        Route::get('/fields', [FiliereController::class,'index'])->name('schoolResources.fields');
        Route::get('/addField', [FiliereController::class, 'create'])->name('schoolResources.addField');
        Route::post('/filieres', [FiliereController::class, 'store'])->name('filieres.store');
        Route::get('/filieres/{filiere}', [FiliereController::class, 'show'])->name('filieres.show');
        Route::get('/filieres/{filiere}/edit', [FiliereController::class, 'edit'])->name('filieres.edit');
        Route::put('/filieres/{filiere}', [FiliereController::class, 'update'])->name('filieres.update');
        Route::delete('/filieres/{filiere}', [FiliereController::class, 'destroy'])->name('filieres.destroy');
        Route::get('/addGroup', [GroupController::class, 'create'])->name('schoolResources.addGroup');
        Route::get('/groups', [GroupController::class,'index'])->name('schoolResources.groups');
        Route::get('/groups/{group}', [FiliereController::class, 'show'])->name('groups.show');
        Route::get('/groups/{group}/edit', [FiliereController::class, 'edit'])->name('groups.edit');
        Route::put('/groups/{group}', [FiliereController::class, 'update'])->name('groups.update');
        Route::delete('/groups/{group}', [FiliereController::class, 'destroy'])->name('groups.destroy');
        
        // Route::resource('schoolResources/fields', FiliereController::class);
        Route::resource('schoolResources/groups', GroupController::class);
        Route::resource('schoolResources/levels', LevelController::class);
        Route::resource('schoolResources/rooms', RoomController::class);
        Route::resource('schoolResources/options', OptionController::class);

        Route::get('/rooms',[RoomController::class,'index'] )->name('schoolResources.rooms');
        Route::get('/addRoom', [RoomController::class,'create'])->name('schoolResources.addRoom');

        // Route::get('/options',[OptionController::class,'index'] )->name('schoolResources.options');
        // Route::get('/addOption', [OptionController::class,'create'])->name('schoolResources.addOption');
        ////////////////////////////////////////////////
        Route::get('/options', [OptionController::class, 'index'])->name('schoolResources.options');
        Route::get('/addOption', [OptionController::class, 'create'])->name('schoolResources.addOption');
        ////////////////////////////////////////////////


        Route::get('/levels',  [LevelController::class,'index'])->name('schoolResources.levels');
        Route::get('/addLevel', [LevelController::class,'create'])->name('schoolResources.addLevel'); 
        Route::get('/levels/{level}', [LevelController::class, 'show'])->name('levels.show');
        Route::get('/levels/{level}/edit', [LevelController::class, 'edit'])->name('levels.edit');
        Route::put('/levels/{level}', [LevelController::class, 'update'])->name('levels.update');
        Route::delete('/levels/{level}', [LevelController::class, 'destroy'])->name('levels.destroy');

        Route::inertia('/schedules', 'admin/SchoolsResources/Schedules/schedulePages/Home')->name('schoolResources.schedules.index');
        Route::get('/schedules/{type}', [ScheduleController::class ,'showSchedulesList'])->name('schoolResources.schedules.list');
        Route::get('/schedules/{type}/{id}', [ScheduleController::class ,'getSchedule'])->name('schoolResources.schedules.schedule');
        Route::inertia('/progress', 'admin/SchoolsResources/Progress/Progress')->name('schoolResources.progress.index');

        // Route::inertia('/options', 'admin/Indexes/SchoolRessources')->name('schoolResources.options');
        // Route::inertia('/levels', 'admin/Indexes/SchoolRessources')->name('schoolResources.levels');
    });
    Route::inertia('/archive', 'admin/Indexes/History')->name('archive');
});

Route::middleware([Authenticate::class, CheckRole::class.':Absence Manager'])->group(function() {
    Route::get('/absenceManager', [DashboardController::class , 'absenceManagerDashBoard'])->name('absenceManager.dashboard');
    Route::get('/students', [DashboardController::class , 'absenceManagerDashBoard'])->name('students');
    Route::get('/justification', [DashboardController::class , 'absenceManagerDashBoard'])->name('justification');
    Route::get('/absence/lists', [DashboardController::class , 'absenceManagerDashBoard'])->name('absence.lists');
    Route::get('/schedules/lists', [DashboardController::class , 'absenceManagerDashBoard'])->name('schedules.lists');

});



Route::middleware([Authenticate::class, CheckRole::class.':Teacher'])->group(function() {
    Route::inertia('/teacher', 'Teacher/Dashboard')->name('teacher.dashboard');
    Route::inertia('/takeAbsence', 'Teacher/Dashboard')->name('teacher.dashboard');
    Route::inertia('/updateAbsence', 'Teacher/Dashboard')->name('teacher.dashboard');
    Route::inertia('/schedule/archive/teachers/{id}', 'Teacher/Dashboard')->name('schedule.archive');
    Route::inertia('/progress/teachers/{id}', 'Teacher/Dashboard')->name('progress');

});

Route::middleware([Authenticate::class, CheckRole::class.':Student'])->group(function() {
    Route::inertia('/student', 'Student/Dashboard')->name('student.dashboard');
    Route::inertia('/student/profile', 'Student/Dashboard')->name('student.profile');
    Route::inertia('/student/absence/history/{id}', 'Student/Dashboard')->name('student.absence.history');
    Route::inertia('/student/courses', 'Student/Dashboard')->name('student.courses');
});

// Shared authenticated routes (like logout)
Route::middleware([Authenticate::class])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

