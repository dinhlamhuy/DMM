
import './loading.css';
const LoadingPage:React.FC= () => {
  return (
    <>
      <div className="loading-overlay">
        <div className="atom">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
