@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header align_right">
                        <h5>ورود به سیستم</h5>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('register') }}" method="post">
                            @csrf
                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">نام :</div>
                                <div class="col-sm-9">
                                    <input id="name" type="text"
                                           placeholder="نام خود را وارد کنید"
                                           class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}"
                                           name="name" value="{{ old('name') }}" required autofocus>

                                    @if ($errors->has('name'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">ایمیل :</div>
                                <div class="col-sm-9">
                                    <input id="email" type="email"
                                           placeholder="ایمیل خود را وارد کنید"
                                           class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                           name="email" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">رمز عبور :</div>
                                <div class="col-sm-9">
                                    <input id="email" type="password"
                                           placeholder="رمز عبور خود را وارد کنید"
                                           class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                           name="password" value="{{ old('password') }}" required>

                                    @if ($errors->has('password'))
                                        <span class="invalid-feedback align_right " role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">تکرار رمز عبور :</div>
                                <div class="col-sm-9">
                                    <input id="password_confirmation" type="password"
                                           placeholder="رمز عبور خود را دوباره وارد کنید"
                                           class="form-control{{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}"
                                           name="password_confirmation" value="{{ old('password_confirmation') }}"
                                           required>

                                    @if ($errors->has('password_confirmation'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group mt-4">
                                <input type="submit" class="btn btn-outline-primary btn-block"
                                       value="ثبت نام در سیستم">
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
