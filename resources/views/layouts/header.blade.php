<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> test</title>
    <link rel="stylesheet" href="assets/plugins/animate/animate.css">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <style>
        .width {
            min-width: 150px !important;
        }

        .user-name {
            font-size: 20px;
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
    <div class="wrapper">
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i
                            class="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i class="fas fa-search"></i>
                    </a>
                    <div class="navbar-search-block">
                        <form class="form-inline">
                            <div class="input-group input-group-sm">
                                <input class="form-control form-control-navbar" type="search" placeholder="Search"
                                    aria-label="Search">
                                <div class="input-group-append">
                                    <button class="btn btn-navbar" type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                {{-- <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li> --}}
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-user"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right width">
                        <span class="dropdown-header user-name">{{ $data->name }}</span>
                        <div class="dropdown-divider"></div>
                        <a href="{{ route('user.logout') }}" class="dropdown-item">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
        <script src="{{ mix('js/app.js') }}"></script>
        <script type="text/javascript">
            window.Laravel = {
                csrfToken: "{{ csrf_token() }}",
                jsPermissions: {!! auth()->check()?auth()->user()->jsPermissions():0 !!}
            }
        </script>
</body>

</html>
