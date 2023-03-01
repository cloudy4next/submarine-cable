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
    <link rel="stylesheet" href="assets/plugins/sweetalert2/sweetalert2.min.css">
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

        .card .overlay,
        .info-box .overlay,
        .overlay-wrapper .overlay,
        .small-box .overlay {
            background-color: rgba(221, 221, 221, .7) !important;
            display: none !important;
        }

    </style>
</head>

<body class="hold-transition login-page bg">
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header text-center">
                <img width="100" src="/assets/dist/img/logo.png" alt="">
                <h4 class="font-weight-normal">Bangladesh Submerine Cable Company Limited</h4>
            </div>

            <div class="overlay" id="loading">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div class="card-body">
                <form id="loginForm">
                    @csrf
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" name="email" placeholder="Email/Mobile no">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" name="password" class="form-control" placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            {{-- <a href="forgot-password.html">I forgot my password</a> --}}
                            <p class="mb-0">

                            </p>
                        </div>
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </div>
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>

    <script src="assets/plugins/jquery/jquery.min.js"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/plugins/jquery-validation/jquery.validate.min.js"></script>
    <script src="assets/plugins/jquery-validation/additional-methods.min.js"></script>
    <script src="assets/plugins/sweetalert2/sweetalert2.min.js"></script>
    <script src="assets/plugins/toastr/toastr.min.js"></script>
    <script src="assets/dist/js/adminlte.min.js"></script>
    <script>
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    </script>
    <script>
        $(document).ready(function() {
            $('#loginForm').validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    terms: {
                        required: true
                    },
                },
                messages: {
                    email: {
                        required: "Please enter a email address",
                        email: "Please enter a valid email address"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    terms: "Please accept our terms"
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
                        url: "{{ route('user.login') }}",
                        method: "POST",
                        data: $('#loginForm').serialize(),
                        success: function(res) {
                            // $('#loading').css('cssText', 'display: none !important');
                            toastr.success('Login Successfull.')
                            window.location.href =
                                '/';
                        },
                        error: function() {
                            // $('#loading').css('cssText', 'display: none !important');
                            Swal.fire({
                                icon: 'error',
                                title: 'Cridentials not match!'
                            })
                        }
                    })
                }
            });
        });
    </script>
</body>

</html>
