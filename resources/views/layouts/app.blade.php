<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BSCCL | Billing Software</title>
    <link rel="stylesheet" href="assets/plugins/animate/animate.css">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="user" content="Auth::user()">



    <script type="text/javascript">
        window.Laravel = {
            csrfToken: "{{ csrf_token() }}",
            jsPermissions: {!! auth()->check()?auth()->user()->jsPermissions():0 !!}
        }
    </script>

{{-- <script type="text/javascript">
    window.Laravel = {
        csrfToken: "{{ csrf_token() }}",
        jsPermissions: {!! auth()->check()?auth()->user()->jsPermissions():0 !!}
    }
</script> --}}

 <script>
  @auth
    window.Permissions = {!! json_encode(Auth::user()->allPermissions, true) !!};
  @else
    window.Permissions = [];
  @endauth
</script>



    <style>
        .user-name {
            font-size: 20px;
        }

        .fa-spin {
            font-size: 30px;
            /* margin-top: 50% !important;
            margin-left: 46%; */
        }

        .card .overlay,
        .info-box .overlay,
        .overlay-wrapper .overlay,
        .small-box .overlay {
            background-color: rgba(221, 221, 221, .7) !important;
            /* display: block !important; */
        }

        .btn-group-sm>.btn,
        .btn-sm {
            padding: 0.15rem 0.2rem !important;
            font-size: 0. !important;
            line-height: 1 !important;
            border-radius: 0.2rem !important;
        }

        .action-btn-font {
            font-size: 12px !important;
        }

        .table td,
        .table th {
            padding: 5px !important;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
        }

    </style>
</head>

<body class="hold-transition sidebar-mini">
    <div id="app">
        <div id="second-app">
        <app-component></app-component>
    </div>
    </div>
    <script src="{{ mix('js/app.js') }}"></script>
    <script>
        $(function() {
            $("#example1").DataTable({
                "responsive": true,
                "lengthChange": false,
                "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
            $('#example2').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
            });
        });
    </script>




</body>

</html>
