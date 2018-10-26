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
                        <form action="{{ route('login') }}" method="post">
                            @csrf
                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">ایمیل :</div>
                                <div class="col-sm-9">
                                    <input type="email" name="email" id="email"
                                           placeholder="ایمیل خود را وارد کنید"
                                           value="{{ old('email') }}"
                                           class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                           required autofocus>
                                </div>
                            </div>

                            <div class="form-group row rtl">
                                <div class="col-sm-3 align_right m-auto">رمز عبور :</div>
                                <div class="col-sm-9">
                                    <input type="password" name="password" id="password"
                                           placeholder="رمز عبور خود را وارد کنید"
                                           value="{{ old('password') }}"
                                           class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                           required>
                                </div>
                            </div>
                            <div class="form-group row rtl">
                                <div class="col-sm-3"></div>
                                <div class="col-sm-9">
                                    <div class="form-check align_right">

                                        <input class="form-check-input" type="checkbox" name="remember"
                                               id="remember" {{ old('remember') ? 'checked' : '' }}>
                                        <label class="form-check-label mr-4" for="remember">
                                            مرا به خاطر بسپار
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div class="form-group mt-4">
                                <input type="submit" class="btn btn-outline-primary btn-block"
                                       value="ورود به سیستم">
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
