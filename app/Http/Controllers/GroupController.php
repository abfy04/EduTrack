<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\School;

use App\Models\SchoolStructureInstance;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index()
    {
     $groups = SchoolStructureInstance::with('parent')
            ->whereNotNull('parent_id')
            ->where('school_structure_unit_id', 5) // Assuming 5 is the ID for 'Groups'
            ->get();
        $niveaux = SchoolStructureInstance::whereNull('parent_id')->get(['id', 'name']);
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->get(['id','parent_id', 'name']);
    
    $years = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 3)
        ->get(['id','name']);
    $options = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 4)
        ->get(['id', 'name']);

        return Inertia::render('admin/SchoolsResources/Groups/Groups', compact('groups', 'filieres', 'years', 'niveaux', 'options'));
    }

public function create()
    {
        $niveaux = SchoolStructureInstance::whereNull('parent_id')->get(['id', 'name']);
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 2)
        ->get(['id','parent_id', 'name']);
    
    $years = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 3)
        ->get(['id','parent_id','name']);
    $options = SchoolStructureInstance::whereNotNull('parent_id')
        ->where('school_structure_unit_id', 4)
        ->get(['id','parent_id', 'name']);
        return Inertia::render('Forms/AddForms/AddGroup', compact('filieres', 'years','niveaux','options'));
    }


   public function store(Request $request)
{
    $validated = $request->validate([
        'libel' => 'required|string',
        'filiere' => 'required|exists:school_structure_instances,id',
        'year' => 'required|exists:school_structure_instances,id',
        'option' => 'nullable|exists:school_structure_instances,id',
    ]);

    // Create structure instance (DEV101)
    $instance = SchoolStructureInstance::create([
        'name' => $validated['libel'],
        'parent_id' => $validated['option'], 
        'school_id' => auth()->school_id ?? 1,
        'school_structure_unit_id' => 5, // 'Groups'
    ]);


    return redirect()->route('schoolResources.groups');
}


    public function show(Group $group)
    {
        return Inertia::render('admin/SchoolsResources/Groups/ProfileGroup', [
            'group' => $group->load('schoolStructureInstance.parent')
        ]);
    }

    public function edit($id)
    {
        $group = Group::findOrFail($id);
        $filieres = SchoolStructureInstance::whereNotNull('parent_id')->get(['id', 'name']);

        return Inertia::render('Forms/EditForms/EditGroup', compact('group', 'filieres'));
    }

    public function update(Request $request, Group $group)
    {
        $validated = $request->validate([
            'libel' => 'required|string',
            'filiere_id' => 'required|exists:school_structure_instances,id',
        ]);

        $group->update([
            'name' => $validated['libel'],
            'school_structure_instance_id' => $validated['filiere_id'],
        ]);

        return redirect()->route('schoolResources.groups')->with('toastMessage', 'Group updated successfully!');
    }

    public function destroy(Group $group)
    {
        $group->delete();

        return redirect()->route('schoolResources.groups')->with('toastMessage', 'Group deleted successfully!');
    }
}
