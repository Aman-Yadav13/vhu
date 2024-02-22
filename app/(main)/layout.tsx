import "./styles.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backgroundCover">
      <video autoPlay muted loop>
        <source src="/playback.mp4" type="video/mp4" />
      </video>
      {children}
    </div>
  );
};
export default MainLayout;
