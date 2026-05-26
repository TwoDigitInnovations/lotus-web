import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getEmbedUrl(url) {
  if (!url || url === "#") return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  if (url.includes("youtube.com/embed")) {
    return url.includes("autoplay") ? url : url + (url.includes("?") ? "&autoplay=1" : "?autoplay=1");
  }
  return url;
}

function isDirectVideo(url) {
  return url && /\.(mp4|webm|ogg)(\?|$)/i.test(url);
}

export default function VideoModal({ video, onClose }) {
  const url = video?.videoUrl || null;
  const embedUrl = url ? getEmbedUrl(url) : null;
  const isVideo = url ? isDirectVideo(url) : false;

  useEffect(() => {
    if (!video) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.88)" }} />

          {/* Player */}
          <motion.div
            className="relative w-full z-10"
            style={{ maxWidth: "860px" }}
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 16:9 wrapper */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ paddingBottom: "56.25%" }}>
              {isVideo ? (
                <video
                  src={url}
                  autoPlay
                  controls
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  title={video.name}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    <polygon points="20,16 38,26 20,36" fill="rgba(255,255,255,0.4)" />
                  </svg>
                  <p className="text-white/50 text-sm">Video coming soon</p>
                </div>
              )}
            </div>

            {/* Title + Close row */}
            <div className="flex items-center justify-between mt-3 px-1">
              <div>
                <p className="text-white font-medium text-sm">{video.name}</p>
                {video.location && (
                  <p className="text-white/50 text-xs mt-0.5">{video.location}</p>
                )}
              </div>
              <motion.button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-4"
                style={{ background: "rgba(255,255,255,0.12)" }}
                whileHover={{ background: "rgba(255,255,255,0.22)", scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 2L2 12M2 2l10 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
