import './index.css';

interface ProgressButtonProps {
  inProgress: boolean;
  getImages: () => Promise<null>;
  nameOfTheButton: string;
}

const ProgressButton = (props: ProgressButtonProps) => {
  const { inProgress, getImages, nameOfTheButton } = props;
  return (
    <div className={`progress-btn ${inProgress ? 'active' : ''}`} data-progress-style="indefinite-circle">
      <div className="btn" onClick={getImages}>{nameOfTheButton}</div>
      <svg className="progress circle-loader" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="15" />
      </svg>
    </div>
  )
}

export default ProgressButton;