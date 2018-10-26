@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row rtl mb-4">
            <div class="col-sm-4 align_right">
                <a href="{{ route('votes.create') }}" class="btn btn-block btn-primary">
                    ایجاد نظرسنجی جدید
                </a>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header align_right">
                        <h5 class="rtl">نظرسنجی های ایجاد شده توسط
                            <strong>{{ $user->name }}</strong>
                        </h5>
                    </div>
                    <div class="card-body">
                        @if(count($votes) == 0)
                            <h5 class="text-center text-primary">
                                هیچ نظرسنجی ای توسط این کاربر ایجاد نشده است
                            </h5>
                        @else
                            <table class="table table-striped rtl text-center">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>سوال نظر سنجی</th>
                                    <th>تاریخ ایجاد نظرسنجی</th>
                                    <th>وضعیت</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($votes as $vote)
                                    <tr>
                                        <td>{{ $vote->id }}</td>
                                        <td>{{ str_limit($vote->question , 200) }}</td>
                                        <td>{{ $vote->created_at }}</td>
                                        <td>{!!  status_string($vote->status) !!}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection