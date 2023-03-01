<div class="modal fade" id="role-permission-modal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title mr-5">Role & Permission Form</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card card-primary">
                    <div class="overlay" id="loading">
                        <i class="fa fa-spinner fa-spin"></i>
                    </div>
                    <div class="card-body">
                        <form id="add-user">
                            @csrf
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="name">Role Name</label>
                                        <input type="text" name="name" class="form-control" id="role_name"
                                            placeholder="Enter role name">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="custom-control custom-checkbox">
                                            <input class="custom-control-input" type="checkbox" id="menu1" checked="">
                                            <label for="menu1" class="custom-control-label">Custom Checkbox
                                                checked</label>
                                        </div>
                                        <div class="row ml-2">
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per1"
                                                        checked="">
                                                    <label for="per1" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per2"
                                                        checked="">
                                                    <label for="per2" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per3"
                                                        checked="">
                                                    <label for="per3" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="custom-control custom-checkbox">
                                            <input class="custom-control-input" type="checkbox" id="menu1" checked="">
                                            <label for="menu1" class="custom-control-label">Custom Checkbox
                                                checked</label>
                                        </div>
                                        <div class="row ml-2">
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per1"
                                                        checked="">
                                                    <label for="per1" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per2"
                                                        checked="">
                                                    <label for="per2" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="per3"
                                                        checked="">
                                                    <label for="per3" class="custom-control-label">Custom Checkbox
                                                        checked</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-right">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
    {{-- <script>
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
    </script> --}}
@endsection
