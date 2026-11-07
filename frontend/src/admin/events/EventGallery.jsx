import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Trash2, RefreshCw, ImagePlus } from "lucide-react";
import {
  getEventGallery,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../../services/events";

const getList = (data) =>
  Array.isArray(data) ? data :
  Array.isArray(data?.results) ? data.results :
  Array.isArray(data?.images) ? data.images :
  Array.isArray(data?.gallery) ? data.gallery : [];

export default function EventGallery() {
  const { eventId } = useParams();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getEventGallery(eventId);
      setImages(getList(data));
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [eventId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    setUploading(true);
    setError("");
    try {
      await uploadGalleryImage(eventId, formData);
      setFile(null);
      setCaption("");
      e.target.reset();
      await load();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Image upload failed. Check the image format and size."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    try {
      await deleteGalleryImage(id);
      await load();
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to delete image.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <Link to={`/dashboard/events/${eventId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cyan-600">
        <ArrowLeft size={17} /> Back to Event
      </Link>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-600">TCH / Events / Gallery</p>
          <h1 className="mt-2 text-3xl font-extrabold">Event Gallery</h1>
          <p className="mt-2 text-sm text-slate-500">Upload and manage event photographs.</p>
        </div>
        <button onClick={load} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <RefreshCw size={18} />
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</div>}

      <form onSubmit={handleUpload} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0B1220]">
        <h2 className="font-bold">Upload Gallery Image</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Image caption (optional)"
            className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-slate-700"
          />
        </div>
        <button disabled={uploading || !file} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
          <Upload size={17} /> {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Gallery Images</h2>
          <span className="text-sm text-slate-500">{images.length} images</span>
        </div>

        {loading ? (
          <p className="p-8 text-center text-slate-500">Loading gallery...</p>
        ) : images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
            <ImagePlus size={38} className="mx-auto text-slate-400" />
            <p className="mt-3 font-semibold">No gallery images yet</p>
            <p className="mt-1 text-sm text-slate-500">Upload your first event photograph.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => {
              const id = image.image_id || image.id;
              const src = image.image || image.image_url || image.url;
              return (
                <article key={id || src} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
                  {src ? (
                    <img src={src} alt={image.caption || "Event gallery"} className="h-52 w-full object-cover" />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-slate-100 dark:bg-slate-900">
                      <ImagePlus size={35} className="text-slate-400" />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-3 p-4">
                    <p className="truncate text-sm font-semibold">{image.caption || "Event photograph"}</p>
                    {id && (
                      <button onClick={() => handleDelete(id)} title="Delete image" className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
