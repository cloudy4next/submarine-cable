@extends('layouts.app')
@section('content')
    <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>User List</h1>
                    </div>
                    <div class="col-md-6 text-right">
                        <button type="button" data-toggle="modal" data-target="#user-add-modal"
                            class="btn btn-outline-primary">
                            <i class="fa fa-plus mr-1"></i>
                            Add New User
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">

                            <div class="card-body">
                                <table id="example1" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($users as $key => $item)
                                            <tr>
                                                <td>{{ $key + 1 }}</td>
                                                <td>{{ $item->name }}</td>
                                                <td>{{ $item->email }}</td>
                                                <td>{{ $item->phone ? $item->phone : 'Data not found' }}</td>
                                                <td>{{ $item->address }}</td>
                                                <td>
                                                    @if ($data->role === 1)
                                                        <span class="badge badge-success">Super Admin</span>
                                                    @else
                                                        <span class="badge badge-info">User</span>
                                                    @endif
                                                </td>
                                                <td>
                                                    <button type="button" title="View Details"
                                                        class="btn btn-success btn-sm">
                                                        <i class="fa fa-edit action-btn-font m-0"></i>
                                                    </button>
                                                    <button type="button" title="Delete User" class="btn btn-danger btn-sm">
                                                        <i class="fa fa-trash action-btn-font m-0" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
        <x-user-module.user-add />
    </div>
@endsection
