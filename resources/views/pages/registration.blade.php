<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BSCCL</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <link rel="stylesheet" href="assets/plugins/toastr/toastr.min.css">
    <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
    <style>
        .bg {
            background-image: url(/assets/dist/img/login-bg.png);
            background-repeat: round
        }

        .card-header {
            border-bottom: none !important;
        }

        .login-box-msg,
        .register-box-msg {
            padding: 0px !important;
        }

        .card-primary.card-outline {
            border-top: none !important;
        }

        .fa-spin {
            font-size: 30px;
            margin-top: 50% !important;
            margin-left: 46%;
        }

        #loading {
            background-color: rgba(221, 221, 221, .7) !important;
            display: none !important;
        }

    </style>
</head>

<body class="hold-transition login-page bg">
    <div class="register-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <a href="#" class="h1"><b>BSCCL</b>Billing</a>
            </div>
            <div class="overlay" id="loading">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div class="card-body">
                <form id="regForm">
                    @csrf
                    <div class="input-group mb-3">
                        <input type="text" name="name" class="form-control" placeholder="Full name">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" name="email" placeholder="Email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" name="retype" placeholder="Retype password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <a href="{{ route('login') }}" class="text-center">I already have a account</a>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </div>
            <!-- /.form-box -->
        </div><!-- /.card -->
    </div>


    <script src="assets/plugins/jquery/jquery.min.js"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/plugins/jquery-validation/jquery.validate.min.js"></script>
    <script src="assets/plugins/jquery-validation/additional-methods.min.js"></script>
    <script src="assets/plugins/toastr/toastr.min.js"></script>
    <script src="assets/dist/js/adminlte.min.js"></script>

    <script>
        $(document).ready(function() {
            // $.validator.setDefaults({
            //     submitHandler: function() {
            //         alert("Form successful submitted!");
            //     }
            // });
            $('#regForm').validate({
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    retype: {
                        required: true,
                        minlength: 5
                    },
                },
                messages: {
                    name: {
                        required: "Please enter full name",
                        name: "Please enter full name"
                    },
                    email: {
                        required: "Please enter a email address",
                        email: "Please enter a valid email address"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    retype: {
                        required: "Please provide a correct password",
                        minlength: "Your password must be at least 5 characters long"
                    }
                },
                errorElement: 'span',
                errorPlacement: function(error, element) {
                    error.addClass('invalid-feedback');
                    element.closest('.input-group').append(error);
                },
                highlight: function(element, errorClass, validClass) {
                    $(element).addClass('is-invalid');
                },
                unhighlight: function(element, errorClass, validClass) {
                    $(element).removeClass('is-invalid');
                },
                submitHandler: function(form) {
                    $('#loading').css('cssText', 'display: block !important');
                    $.ajax({
                        url: "{{ url('/store') }}",
                        method: "POST",
                        data: $('#regForm').serialize()
                    }).done(function(data) {
                        $('#loading').css('cssText', 'display: none !important');
                        toastr.success('Data Upload Successfull.')
                        window.location.href = '/';
                    });

                }
            });
        });
    </script>
</body>

</html>
