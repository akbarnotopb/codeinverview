<?php


namespace App\Traits;


use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

trait UploadFile
{
    private function uploadImage($file, $dir) {
        if ($file) {
            $image = $file;
            $name = $this->filename($image);
            $store = $this->putOnStorage($this->pathToFile(true, $dir, null), $image, $name);
            if ($store->status)
                return (object)['status' => true, 'path' => $this->pathToFile(false, $dir, $name)];
            return $store;
        }

        return $this->message(false, null);
    }

    private function filename($image) {
        $format = $image->getClientOriginalExtension();
        $time = Carbon::now('+07:00')->timestamp;
        return $time . '-' . uniqid() . '.' . $format;
    }

    private function pathToFile($store, $dir, $name) {
        return $store ?
            '/'.$dir :
            'storage/'.$name;
    }

    private function putOnStorage($path, $image, $name) {
        try {
            Storage::putFileAs($path, $image, $name);
            return $this->message(true, null);
        } catch (\Exception $exception) {
            return $this->message(false, $exception->getMessage());
        }
    }

    private function updatingFile($file, $old_path) {
        if ($file->status) {
            $img_path = $file->path;
            if ($old_path != null) Storage::delete($old_path);
        } else $img_path = $old_path;

        return $img_path;
    }

    private function message($status, $message) {
        return (object)[
            'status' => $status,
            'message' => $message
        ];
    }
}
