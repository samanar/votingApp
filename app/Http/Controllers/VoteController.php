<?php

namespace App\Http\Controllers;

use App\User;
use App\Vote;
use App\VoteOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{

    private $vote_validation = [
        'user_id' => 'required',
        'question' => 'required',
        'vote_type' => 'required',
        'privacy' => 'required',
    ];

    public function __construct()
    {
        $this->middleware('auth');
    }

//    showing all votes
    public function index()
    {
        $votes = Vote::all();
        return view('votes.index')->with('votes', $votes);
    }

    public function user_votes(Request $request, $user_id)
    {
        $user = User::where('id', $user_id)->first();
        $votes = Vote::where('user_id', $user_id)->get();
        return view('votes.user')
            ->with('votes', $votes)
            ->with('user', $user);
    }

    public function create()
    {
        return view('votes.create');
    }

    public function store(Request $request)
    {
//        $request->validate($this->vote_validation);
        $vote = new Vote();
        $vote->user_id = Auth::user()->id;
        $vote->question = $request->question;
        $vote->type = $request->vote_type;
        $vote->privacy = $request->privacy;
        $vote->save();

        if ($request->vote_type == "2") {
            $options = json_decode($request->options, true);
            foreach ($options as $key => $value) {
                $option = new VoteOption();
                $option->vote_id = $vote->id;
                $option->name = $value['value'];
                $option->save();
            }
        }

        return redirect()->route('votes.user', Auth::user()->id);
    }
}
