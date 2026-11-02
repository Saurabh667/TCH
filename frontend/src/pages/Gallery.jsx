
import { useState } from "react";
import {
  Camera,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Community Moments",
    category: "Community",
    date: "TCH Community",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&auto=format&fit=crop",
    size: "large",
  },
  {
    id: 2,
    title: "Coding Together",
    category: "Workshops",
    date: "Learning & Development",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 3,
    title: "Team Collaboration",
    category: "Community",
    date: "Team Moments",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 4,
    title: "Innovation in Action",
    category: "Events",
    date: "Tech & Innovation",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop",
    size: "large",
  },
  {
    id: 5,
    title: "Ideas into Reality",
    category: "Hackathons",
    date: "Building Together",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 6,
    title: "Learning Never Stops",
    category: "Workshops",
    date: "Knowledge Sharing",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 7,
    title: "The Power of Teamwork",
    category: "Community",
    date: "Together We Grow",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop",
    size: "normal",
  },
  {
    id: 8,
    title: "Tech Talks & Discussions",
    category: "Events",
    date: "Sharing Knowledge",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop",
    size: "large",
  },
  {
    id: 9,
    title: "Creating the Future",
    category: "Hackathons",
    date: "Think. Build. Innovate.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop",
    size: "normal",
  },
];

const categories = [
  "All",
  "Events",
  "Workshops",
  "Hackathons",
  "Community",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  const showPrevious = () => {
    const currentIndex = filteredImages.findIndex(
      (item) => item.id === selectedImage.id
    );

    const previousIndex =
      (currentIndex - 1 + filteredImages.length) %
      filteredImages.length;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    const currentIndex = filteredImages.findIndex(
      (item) => item.id === selectedImage.id
    );

    const nextIndex = (currentIndex + 1) % filteredImages.length;

    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <main className="gallery-page min-h-screen overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#07111f] dark:text-white">

      {/* HERO SECTION */}
      <section className="relative px-5 pb-14 pt-20 sm:px-8 lg:px-16 lg:pt-28">
        <div className="gallery-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
            <Camera size={16} />
            Moments That Matter
          </div>

          <div className="grid items-center gap-10 md:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Capturing Our{" "}
                <span className="gallery-gradient">
                  Journey.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
                Every picture tells a story. Explore the moments,
                memories, collaborations, and experiences that
                make The Coders Hub community special.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <ImageIcon size={17} className="text-cyan-500" />
                  Our Memories
                </span>

                <span className="h-1 w-1 rounded-full bg-cyan-500" />

                <span className="flex items-center gap-2">
                  <Sparkles size={17} className="text-cyan-500" />
                  Our Community
                </span>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              <div className="absolute inset-3 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-9 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-16 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-400/40 bg-white shadow-xl shadow-cyan-500/10 dark:bg-[#102238]">
                <Camera size={60} className="text-cyan-500" />
              </div>

              <div className="absolute right-7 top-8 rounded-xl border border-cyan-500/20 bg-white p-3 shadow-lg dark:bg-[#102238]">
                <ImageIcon size={22} className="text-cyan-500" />
              </div>

              <div className="absolute bottom-8 left-5 rounded-xl border border-cyan-500/20 bg-white p-3 shadow-lg dark:bg-[#102238]">
                <Sparkles size={22} className="text-cyan-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="px-5 pb-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-9">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
              The TCH Experience
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Explore Our Gallery
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
              A glimpse into our events, workshops, and community.
            </p>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-cyan-500 hover:text-cyan-600 dark:border-cyan-500/20 dark:bg-[#0c1b2c] dark:text-slate-300 dark:hover:text-cyan-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* IMAGE GRID */}
          <div className="grid auto-rows-[220px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`gallery-item group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#102238] text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 ${
                  item.size === "large" && activeCategory === "All"
                    ? "sm:col-span-2 lg:col-span-2"
                    : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading={index > 2 ? "lazy" : "eager"}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/10 to-transparent opacity-80 transition group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <span className="mb-2 inline-block rounded-full border border-cyan-300/30 bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur-md">
                      {item.category}
                    </span>

                    <h3 className="text-lg font-bold text-white sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-300">
                      {item.date}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition group-hover:border-cyan-400 group-hover:bg-cyan-500">
                    <ArrowUpRight size={19} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 px-6 py-12 text-center sm:px-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15">
            <Camera size={28} className="text-cyan-500" />
          </div>

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Every Moment Has a Story.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Be a part of our journey. Learn, collaborate, innovate,
            and create memories with The Coders Hub.
          </p>
        </div>
      </section>

      {/* IMAGE LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-cyan-500"
            aria-label="Close image preview"
          >
            <X size={23} />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                className="absolute left-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-cyan-500 sm:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft size={25} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-cyan-500 sm:right-8"
                aria-label="Next image"
              >
                <ChevronRight size={25} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />

            <div className="px-2 pt-5 text-center">
              <h3 className="text-xl font-bold text-white">
                {selectedImage.title}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {selectedImage.category} · {selectedImage.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
