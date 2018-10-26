@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header align_right">
                        <h5>ایجاد نظرسنجی جدید</h5>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('votes.store') }}" method="post">
                            @csrf
                            <div class="form-group row rtl">
                                <div class="col-sm-12 mb-2 align_right">
                                    سوال خود را وارد کنید :
                                </div>
                                <div class="col-sm-12">
                                    <textarea id="question"
                                              placeholder="سوال خود را وارد کنید"
                                              class="form-control{{ $errors->has('question') ? ' is-invalid' : '' }}"
                                              name="question"
                                              value="{{ old('question') }}" required autofocus>
                                    </textarea>

                                    @if ($errors->has('question'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('question') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group row rtl">
                                <div class="col-sm-6">
                                    <div class="form_radio_header">
                                        <button
                                                class="tooltips btn btn-light"
                                                data-toggle="tooltip"
                                                data-placement="left"
                                                title="نوع پاسخ های نمایش داده شده برای نظرسنجی را در این جا مشخص کنید">
                                            نوع ؟
                                        </button>
                                    </div>
                                    <div class="form-check align_right">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                   name="vote_type"
                                                   value="0"
                                                   checked>
                                            <label class="form-check-label">
                                                دو گزینه ای (بله خیر)
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                   name="vote_type"
                                                   value="1">
                                            <label class="form-check-label">
                                                محدوده ای (0 تا 100)
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                   name="vote_type"
                                                   value="2">
                                            <label class="form-check-label">
                                                چند گزینه ای (دلخواه)
                                            </label>
                                        </div>
                                    </div>
                                    @if ($errors->has('vote_type'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('vote_type') }}</strong>
                                    </span>
                                    @endif
                                </div>
                                <div class="col-sm-6">
                                    <div class="form_radio_header">
                                        <button
                                                class="tooltips btn btn-light"
                                                data-toggle="tooltip"
                                                data-placement="left"
                                                title="در حالت محرمانه مشخص نمی شود که چه کسی چه گزینه ای را انتخاب کرده و فقط نتیجه ی نظرسنجی قابل مشاهده است">
                                            محرمانگی ؟
                                        </button>
                                    </div>
                                    <div class="form-check align_right">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                   name="privacy"
                                                   value="0"
                                                   checked>
                                            <label class="form-check-label">
                                                خیر
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                   name="privacy"
                                                   value="1">
                                            <label class="form-check-label">
                                                بله
                                            </label>
                                        </div>
                                    </div>
                                    @if ($errors->has('privacy'))
                                        <span class="invalid-feedback align_right" role="alert">
                                        <strong>{{ $errors->first('privacy') }}</strong>
                                    </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group rtl" id="show_options">
                                <div class="row">
                                    <div class="col-sm-2 align_right m-auto">
                                        گزینه ها :
                                    </div>
                                    <div class="col-sm-10">
                                        <input name='options' class='form-control' id="options"
                                               placeholder='گزینه های مورد نظر خود را وارد کنید'>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row rtl">
                                <div class="col-sm-12 rtl align_right mb-2">
                                    اضافه کردن پیوست :
                                </div>
                                <div class="col-sm-12">
                                    <input type="file"
                                           id="attachments"
                                           class="filepond"
                                           name="attachments[]"
                                           multiple
                                           data-max-file-size="5MB"
                                           data-max-files="5"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-outline-primary btn-block">
                                    ثبت نظرسنجی
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    {{--<script src="https://unpkg.com/filepond-plugin-file-validate-size/dist/filepond-plugin-file-validate-size.js"></script>--}}
    <script src="{{ asset('js/filepond.js') }}"></script>
    <script>
        $(document).ready(function () {
            $(".tooltips").tooltip();
            $('input[type=radio][name="vote_type"]').change(function () {
                if (this.value === "2") {
                    $("#show_options").show();
                }
            });

            var input = document.querySelector('#options');
            let tagify = new Tagify(input, {});
            FilePond.registerPlugin(
                FilePondPluginFileValidateSize
            );
            FilePond.create(
                document.querySelector('#attachments'),
                {
                    labelIdle: `فایل های خود را بکشید و اینجا رها کنید یا <span class="filepond--label-action">انتخاب کنید</span>`,
                    allowFileSizeValidation: true,
                    maxFileSize: '10MB',
                    labelMaxFileSizeExceeded: 'سایز فایل خیلی بزرگ است',
                    labelMaxFileSize: 'حداکثر سایز قابل قبول 10 مگابایت است'
                }
            );
        });
    </script>
@endsection