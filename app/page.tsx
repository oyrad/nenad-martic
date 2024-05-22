export default function Home() {
  return (
    <section>
      <video muted loop autoPlay id="cover-video" className="md:hidden">
        <source src="/videos/cover-mobile.mp4" type="video/mp4" />
      </video>
      <video muted loop autoPlay id="cover-video" className="hidden md:block">
        <source src="/videos/cover-desktop.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
