<div class="modal fade" id="user-add-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">User Form</h4>
                <p class="bulk-tag">If you import bulk user data <a onclick="bulkModal()"
                        href="javascript:void(0)">Click Here</a></p>
                <p class="single-tag">If you add single user data <a onclick="singleUserModal()"
                        href="javascript:void(0)">Click Here</a></p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card card-primary">
                    <div class="overlay" id="loading">
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <div class="card-body user-modal animate__animated">
                        <form id="add-user">
                            @csrf
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="name">Name</label>
                                        <input type="text" name="name" class="form-control" id="name"
                                            placeholder="Enter name">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">Email address</label>
                                        <input type="email" name="email" class="form-control" id="email"
                                            placeholder="Enter email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="phone">Phone Number</label>
                                        <input type="number" name="phone" class="form-control" id="phn-number"
                                            placeholder="Enter phone number">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input type="password" name="password" class="form-control" id="password"
                                            placeholder="Enter Password">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>User Type</label>
                                        <select class="form-control" style="width: 100%;" tabindex="-1"
                                            aria-hidden="true">
                                            <option selected="selected" disabled>Select type</option>
                                            <option value="1">IPLC</option>
                                            <option value="2">IP Transit</option>
                                            <option value="3">Colocation Service</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>User Role</label>
                                        <select class="form-control" style="width: 100%;">
                                            <option value="3" selected="selected">User</option>
                                            <option value="2">Admin</option>
                                            <option value="1">Super Admin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input type="text" name="address" class="form-control" id="address"
                                    placeholder="Enter your address">
                            </div>
                            <div class="card-footer text-right">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <x-file-import />
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
    <script>
        function bulkModal() {
            $(".user-modal").removeClass('animate__backInLeft');
            $(".user-modal").addClass('animate__backOutLeft');
            $(".user-modal").css("display", "none");
            $(".bulk-modal").removeClass('animate__backOutRight');
            $(".bulk-modal").addClass('animate__backInRight');
            $(".bulk-modal").css("display", "block");
            $(".bulk-tag").css('display', 'none')
            $(".single-tag").css('display', 'block')
        }

        function singleUserModal() {
            $(".user-modal").css("display", "block");
            $(".user-modal").removeClass('animate__backOutLeft');
            $(".user-modal").addClass('animate__backInLeft');
            $(".bulk-modal").removeClass('animate__backInRight');
            $(".bulk-modal").addClass('animate__backOutRight');
            $(".bulk-modal").css("display", "none");
            $(".bulk-tag").css('display', 'block')
            $(".single-tag").css('display', 'none')
        }
    </script>
    <script>
        $(document).ready(function() {
            $('#add-user').validate({
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    phone: {
                        required: true,
                        minlength: 11
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    address: {
                        required: true
                    },
                },
                messages: {
                    name: {
                        required: "Please enter name",
                    },
                    email: {
                        required: "Please enter a email address",
                        email: "Please enter a valid email address"
                    },
                    phone: {
                        required: "Please provide a phone number",
                        minlength: "Your phone number must be at least 11 characters long"
                    },
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 5 characters long"
                    },
                    address: "Please enter address"
                },
                errorElement: 'span',
                errorPlacement: function(error, element) {
                    error.addClass('invalid-feedback');
                    element.closest('.form-group').append(error);
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
                        url: "{{ route('register.store') }}",
                        method: "POST",
                        data: $('#add-user').serialize(),
                        success: function(res) {
                            console.log('test')
                            $('#loading').css('cssText', 'display: none !important');
                            toastr.success('Data Upload Successfull.')
                            $('#add-user').trigger("reset");
                            $("#user-add-modal").modal('hide');
                            window.location.href = '/user-list';
                        },
                        error: function() {
                            $('#loading').css('cssText', 'display: none !important');
                            Swal.fire({
                                icon: 'error',
                                title: 'Wrong Data Entry!'
                            })
                        }
                    })
                }
            });
        });
    </script>
    <script>
        $(document).ready(function() {
            $('#import').validate({
                rules: {
                    file: {
                        required: true
                    }
                },
                messages: {
                    file: {
                        required: "File Required",
                    }
                },
                errorElement: 'span',
                errorPlacement: function(error, element) {
                    error.addClass('invalid-feedback');
                    element.closest('.form-group').append(error);
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
                        url: "{{ route('user.import') }}",
                        method: "POST",
                        data: new FormData(document.getElementById("import")),
                        enctype: 'multipart/form-data',
                        dataType: 'JSON',
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function(res) {
                            $('#loading').css('cssText', 'display: none !important');
                            toastr.success('File Upload Successfull.')
                            $('#import').trigger("reset");
                            $("#user-add-modal").modal('hide');
                            window.location.href = '/user-list';
                        },
                        error: function() {
                            $('#loading').css('cssText', 'display: none !important');
                            Swal.fire({
                                icon: 'error',
                                title: 'Wrong Data Entry!'
                            })
                        }
                    })
                }
            });
        });
    </script>
@endsection
<style>
    .bulk-tag {
        margin-left: 16%;
        margin-bottom: 0;
        margin-top: 9px;
    }

    .single-tag {
        margin-left: 16%;
        margin-bottom: 0;
        margin-top: 9px;
        display: none;
    }

    .bulk-modal {
        display: none;
    }

    .width {
        width: 100%;
    }

    .card-footer {
        background: none;
    }

</style>
