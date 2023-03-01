<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index3.html" class="brand-link">
        <img width="100" src="/assets/dist/img/logo.png" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">{{ $data->name }}</span>
    </a>
    <div class="sidebar">
        {{-- <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">Alexander Pierce</a>
            </div>
        </div> --}}
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <p>
                            Configuration
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Users</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('role.permission.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Role & Permission</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fa fa-users" aria-hidden="true"></i>
                        <p>
                            Users
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Customer List</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('system.user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>System User List</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fa fa-text-width" aria-hidden="true"></i>
                        <p>
                            Tariff
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="{{ route('user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>IPLC</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>IP Transit</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('user.list') }}" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Colocation Service</p>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</aside>
