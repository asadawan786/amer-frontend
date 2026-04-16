interface GoogleMapEmbedProps {
  height?: number;
}

export default function GoogleMapEmbed({ height = 400 }: GoogleMapEmbedProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
            Amer Center DAFZA Al Twar
          </h2>
          <p className="text-xl font-light text-gray-700">Inside Dubai Immigration Building</p>
          <p className="text-gray-500 mt-2">DAFZA - Al Twar, Dubai</p>
        </div>
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4627.861606053007!2d55.37023557538386!3d25.25973277767082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d293c44280d%3A0x532b4ea0d44dad31!2sAmer%20Center%20Al%20Tawar!5e1!3m2!1sen!2sae!4v1770185961634!5m2!1sen!2sae"
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Amer Center Dubai Location"
          />
        </div>
      </div>
    </section>
  );
}
