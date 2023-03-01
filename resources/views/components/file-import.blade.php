<div class="card-body bulk-modal animate__animated">
    <form id="import">
        @csrf
        <div class="row">
            <div class="form-group width">
                <label for="file-input">File input</label>
                <small class="color-red">Only (.csv, .xls, .xlsx) file accepeted</small>
                <div class="form-group">
                    <div class="custom-file">
                        <input type="file" name="file" class="custom-file-input" id="file-input">
                        <label class="custom-file-label" for="file-input">Choose file</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-right">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
